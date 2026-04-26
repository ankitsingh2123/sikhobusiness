import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order_id");

  if (!orderId) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  try {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_APP_ID!,
        "x-client-secret": process.env.CASHFREE_SECRET_KEY!,
      },
    };

    const response = await fetch(`https://sandbox.cashfree.com/pg/orders/${orderId}`, options);
    const data = await response.json();

    // Fetch the purchase record to know which course to redirect to
    const purchase = await prisma.purchase.findFirst({
      where: { cashfreeOrderId: orderId },
      select: { id: true, courseId: true, status: true }
    });

    if (!purchase) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (data.order_status === "PAID") {
      // Update purchase in DB if it hasn't been updated by webhook yet
      if (purchase.status !== "SUCCESS") {
        await prisma.purchase.update({
          where: { id: purchase.id },
          data: { status: "SUCCESS" },
        });
      }
      return NextResponse.redirect(new URL(`/courses/${purchase.courseId}?payment=success`, req.url));
    } else {
      // Payment failed or is pending
      if (purchase.status !== "FAILED" && data.order_status !== "PENDING") {
        await prisma.purchase.update({
          where: { id: purchase.id },
          data: { status: "FAILED" },
        });
      }
      return NextResponse.redirect(new URL(`/courses/${purchase.courseId}?payment=failed`, req.url));
    }

  } catch (error) {
    console.error("Verification Error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}
