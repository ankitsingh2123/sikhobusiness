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

    // Get all SUCCESS purchases with full course details
    const purchases = await prisma.purchase.findMany({
      where: { userId: user.id, status: "SUCCESS" },
      include: {
        course: {
          include: {
            modules: {
              include: {
                videos: { select: { id: true } },
              },
            },
          },
        },
      },
    });

    // Get user's completed video IDs
    const completedProgress = await prisma.progress.findMany({
      where: { userId: user.id, isCompleted: true },
      select: { videoId: true },
    });
    const completedVideoIds = new Set(completedProgress.map((p) => p.videoId));

    // Build certificate data for each course
    const certificates = purchases.map((purchase) => {
      const allVideoIds = purchase.course.modules.flatMap((m) =>
        m.videos.map((v) => v.id)
      );
      const totalVideos = allVideoIds.length;
      const completedVideos = allVideoIds.filter((id) =>
        completedVideoIds.has(id)
      ).length;
      const completionPercent =
        totalVideos > 0 ? Math.round((completedVideos / totalVideos) * 100) : 0;
      const isEligible = completionPercent === 100 && totalVideos > 0;

      return {
        courseId: purchase.course.id,
        courseTitle: purchase.course.title,
        courseCategory: purchase.course.category,
        courseThumbnail: purchase.course.thumbnail,
        totalVideos,
        completedVideos,
        completionPercent,
        isEligible,
        purchasedAt: purchase.createdAt,
        // Certificate issue date = date when fully completed (approximate: updatedAt of last progress)
        issuedAt: isEligible ? purchase.updatedAt : null,
      };
    });

    // Get user profile
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { name: true, email: true },
    });

    return NextResponse.json({
      certificates,
      userName: dbUser?.name || user.user_metadata?.full_name || user.email?.split("@")[0] || "Student",
    });
  } catch (error) {
    console.error("Certificates API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
