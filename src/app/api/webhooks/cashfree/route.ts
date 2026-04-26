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
      return NextResponse.json({ error: "Missing webhook signature or timestamp" }, { status: 400 });
    }

    // Verify Cashfree Webhook Signature
    const dataToSign = timestamp + rawBody;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.CASHFREE_SECRET_KEY!)
      .update(dataToSign)
      .digest("base64");

    if (expectedSignature !== signature) {
      console.error("Invalid Webhook Signature");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    const payload = JSON.parse(rawBody);

    // Handle Payment Success
    if (payload.type === "PAYMENT_SUCCESS_WEBHOOK") {
      const orderId = payload.data.order.order_id;
      
      await prisma.purchase.updateMany({
        where: { cashfreeOrderId: orderId },
        data: { status: "SUCCESS" }
      });
      console.log(`Webhook: Order ${orderId} marked as SUCCESS`);
    } 
    // Handle Payment Failure
    else if (payload.type === "PAYMENT_FAILED_WEBHOOK") {
      const orderId = payload.data.order.order_id;
      
      await prisma.purchase.updateMany({
        where: { cashfreeOrderId: orderId, status: "PENDING" },
        data: { status: "FAILED" }
      });
      console.log(`Webhook: Order ${orderId} marked as FAILED`);
    }

    return NextResponse.json({ status: "OK" }, { status: 200 });
  } catch (error) {
    console.error("Webhook Processing Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
