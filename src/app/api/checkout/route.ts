import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // --- SYNC USER TO PRISMA ---
    // Ensure user exists in our database before creating a purchase
    await prisma.user.upsert({
      where: { id: user.id },
      update: { email: user.email || "" },
      create: {
        id: user.id,
        email: user.email || "",
        name: user.user_metadata?.full_name || "Student",
      },
    });

    const body = await req.json();
    const courseId = body.courseId;
    console.log("Checkout Request for Course:", courseId, "by User:", user.id);

    if (!courseId) {
      return NextResponse.json({ error: "Course ID required" }, { status: 400 });
    }

    // --- IDEMPOTENCY LOCK (REDIS) ---
    // Prevent multiple clicks creating multiple orders in Cashfree
    let lockKey = `lock:checkout:${user.id}:${courseId}`;
    let isLocked = true;
    
    try {
      if (process.env.REDIS_URL) {
        const result = await redis.set(lockKey, "locked", { nx: true, ex: 30 });
        isLocked = result === "OK";
      }
    } catch (e) {
      console.warn("Redis is not configured or failed, bypassing lock");
    }

    if (!isLocked) {
      return NextResponse.json({ error: "Transaction already in progress. Please wait." }, { status: 429 });
    }

    try {
      // Check if course exists
      const course = await prisma.course.findUnique({
        where: { id: courseId },
      });

      if (!course) {
        console.error("Course not found:", courseId);
        try { if (process.env.REDIS_URL) await redis.del(lockKey); } catch (e) {}
        return NextResponse.json({ error: "Course not found" }, { status: 404 });
      }

      // Check if user already purchased
      const existingPurchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId,
          },
        },
      });

      if (existingPurchase && existingPurchase.status === "SUCCESS") {
        console.log("User already purchased course:", courseId);
        try { if (process.env.REDIS_URL) await redis.del(lockKey); } catch (e) {}
        return NextResponse.json({ error: "Already purchased" }, { status: 400 });
      }

      // Prepare Cashfree API Request
      const orderId = `order_${courseId}_${user.id}_${Date.now()}`;
      const amount = Number(course.price);

      console.log("Creating Cashfree Order:", orderId, "Amount:", amount);

      const options = {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_APP_ID!,
          "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
        },
        body: JSON.stringify({
          customer_details: {
            customer_id: user.id,
            customer_email: user.email || "student@seekhobusiness.co.in",
            customer_phone: "9999999999", 
            customer_name: user.user_metadata?.full_name || "Student",
          },
          order_meta: {
            return_url: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/checkout/verify?order_id=${orderId}`,
          },
          order_amount: amount,
          order_currency: "INR",
          order_id: orderId,
          order_note: `Purchase of ${course.title}`,
        }),
      };

      const CASHFREE_URL = "https://sandbox.cashfree.com/pg/orders"; 

      const response = await fetch(CASHFREE_URL, options);
      const data = await response.json();

      if (!response.ok) {
        console.error("Cashfree API Error Response:", JSON.stringify(data, null, 2));
        try { if (process.env.REDIS_URL) await redis.del(lockKey); } catch (e) {}
        return NextResponse.json({ error: data.message || "Payment gateway error" }, { status: 500 });
      }

      console.log("Cashfree Order Created Successfully:", data.order_id);

      // Create PENDING purchase in database
      await prisma.purchase.upsert({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId: courseId
          }
        },
        update: {
          amount: amount,
          status: "PENDING",
          cashfreeOrderId: orderId,
        },
        create: {
          userId: user.id,
          courseId: courseId,
          amount: amount,
          status: "PENDING",
          cashfreeOrderId: orderId,
        }
      });

      return NextResponse.json({ paymentSessionId: data.payment_session_id, orderId });

    } catch (innerError) {
      console.error("Internal API Error:", innerError);
      try { if (process.env.REDIS_URL) await redis.del(lockKey); } catch (e) {}
      throw innerError;
    }

  } catch (error) {
    console.error("Final Catch Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
