import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { upiId, bankAccount, phone, address, legalName, instagram, youtube, category, experience } = body;

    // Upgrade the user to ADMIN (Creator) in the database
    await prisma.user.update({
      where: { id: user.id },
      data: { 
        role: "ADMIN",
        ...(upiId && { upiId }),
        ...(bankAccount && { bankAccount }),
        ...(phone && { phone }),
        ...(address && { address }),
        ...(legalName && { legalName }),
        ...(instagram && { instagram }),
        ...(youtube && { youtube }),
        ...(category && { category }),
        ...(experience && { experience }),
      }
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Upgrade error:", error);
    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
