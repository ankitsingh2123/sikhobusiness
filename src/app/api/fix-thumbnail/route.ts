import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const course = await prisma.course.findFirst({
      where: { title: { contains: "History of Modern India", mode: "insensitive" } },
    });

    if (!course) {
      return NextResponse.json({ error: "Course not found" });
    }

    const updated = await prisma.course.update({
      where: { id: course.id },
      data: { thumbnail: null }, // Clears the incorrect reels thumbnail
    });

    return NextResponse.json({ success: true, updated });
  } catch (err: any) {
    return NextResponse.json({ error: err.message });
  }
}
