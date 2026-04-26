import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchase = await prisma.purchase.findFirst({
      where: {
        cashfreeOrderId: orderId,
        userId: user.id, // Security: only own purchases
      },
      include: {
        course: {
          select: {
            id: true,
            title: true,
            description: true,
            thumbnail: true,
            category: true,
            price: true,
          },
        },
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    if (!purchase) {
      return NextResponse.json({ error: "Invoice not found" }, { status: 404 });
    }

    if (purchase.status !== "SUCCESS") {
      return NextResponse.json({ error: "Invoice available only for successful payments" }, { status: 400 });
    }

    // Build invoice data object
    const invoice = {
      invoiceNumber: `INV-${purchase.cashfreeOrderId?.replace("order_", "").slice(-8).toUpperCase()}`,
      orderId: purchase.cashfreeOrderId,
      purchaseId: purchase.id,
      issuedAt: purchase.updatedAt,
      customer: {
        name: purchase.user.name || "Student",
        email: purchase.user.email,
        id: purchase.user.id.slice(0, 8).toUpperCase(),
      },
      course: {
        title: purchase.course.title,
        category: purchase.course.category,
        id: purchase.course.id,
      },
      payment: {
        subtotal: purchase.amount,
        tax: 0, // 0 for now, add GST logic if needed
        total: purchase.amount,
        currency: "INR",
        status: purchase.status,
      },
      company: {
        name: "Seekho Business",
        address: "India",
        email: "support@seekhobusiness.co.in",
        website: "https://seekhobusiness.co.in",
        gstin: "GST_NOT_APPLICABLE", // Update with real GSTIN
      },
    };

    return NextResponse.json({ invoice });
  } catch (error) {
    console.error("Invoice Generation Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
