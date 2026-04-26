import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const purchases = await prisma.purchase.findMany({
      where: { userId: user.id },
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
      },
      orderBy: { createdAt: "desc" },
    });

    const totalSpent = purchases
      .filter((p) => p.status === "SUCCESS")
      .reduce((sum, p) => sum + p.amount, 0);

    const successCount = purchases.filter((p) => p.status === "SUCCESS").length;

    return NextResponse.json({
      purchases,
      stats: {
        totalSpent,
        totalCourses: successCount,
      },
    });
  } catch (error) {
    console.error("Purchase History Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
