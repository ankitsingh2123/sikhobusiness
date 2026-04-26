import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const headers = req.headers;

    const signature = headers.get("x-webhook-signature");
    const timestamp = headers.get("x-webhook-timestamp");

    if (!signature || !timestamp) {
      return NextResponse.json({ error: "Missing signature" }, { status: 400 });
    }

    // Verify Cashfree Signature
    const dataToSign = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_WEBHOOK_SECRET!)
      .update(dataToSign)
      .digest("base64");

    if (signature !== expectedSignature) {
      console.error("Invalid webhook signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(rawBody);

    // Process Payment Success Event
    if (payload.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderId = payload.data.order.order_id;
      
      await prisma.purchase.updateMany({
        where: { cashfreeOrderId: orderId },
        data: { status: "SUCCESS" },
      });
      
      console.log(`Payment successful for order: ${orderId}`);
    }

    return NextResponse.json({ status: "OK" });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
