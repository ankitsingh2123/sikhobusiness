import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";
import prisma from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: videoId } = await params;

    const video = await prisma.video.findUnique({
      where: { id: videoId },
      include: {
        module: {
          include: {
            videos: { orderBy: { order: "asc" } },
            course: {
              include: {
                modules: {
                  orderBy: { order: "asc" },
                  include: {
                    videos: { orderBy: { order: "asc" } },
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!video) {
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    const courseId = video.module.courseId;

    // Check access
    let hasAccess = video.isFreePreview;

    if (!hasAccess) {
      const supabase = await createClient();
      const { data: { user }, error: authError } = await supabase.auth.getUser();

      if (authError || !user) {
        return NextResponse.json({ error: "Unauthorized", courseId }, { status: 401 });
      }

      const purchase = await prisma.purchase.findUnique({
        where: {
          userId_courseId: {
            userId: user.id,
            courseId,
          },
        },
      });

      if (purchase?.status === "SUCCESS") {
        hasAccess = true;
      } else {
        return NextResponse.json({ error: "Forbidden", courseId }, { status: 403 });
      }
    }

    return NextResponse.json({
      video: {
        id: video.id,
        title: video.title,
        videoUrl: video.videoUrl,
        duration: video.duration,
        order: video.order,
        isFreePreview: video.isFreePreview,
      },
      module: {
        id: video.module.id,
        title: video.module.title,
        order: video.module.order,
        videos: video.module.videos,
      },
      course: video.module.course,
      hasAccess,
    });
  } catch (error) {
    console.error("Video GET Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
