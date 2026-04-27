import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Bunny auto-generates this thumbnail when video is encoded
const BUNNY_AUTO_THUMB = "https://vz-82a5778a-b1c.b-cdn.net/f6995151-82f3-4c19-9dc2-fc81809a3dc3/thumbnail.jpg";
const VIDEO_DB_ID      = "e99e7c13-479e-4d4e-9fa9-47cb6d57ca3c";

(async () => {
  try {
    const video = await prisma.video.findUnique({
      where: { id: VIDEO_DB_ID },
      include: { module: { include: { course: true } } },
    });
    if (!video) throw new Error("Video not found");

    const course = await prisma.course.update({
      where: { id: video.module.course.id },
      data:  { thumbnail: BUNNY_AUTO_THUMB },
      select: { id: true, title: true, thumbnail: true },
    });

    console.log("✅ Course thumbnail updated!");
    console.log("   Course:", course.title);
    console.log("   Thumb :", course.thumbnail);
    console.log("\n🎉 Refresh the watch page!");
  } catch (e) {
    console.error("❌", e.message);
  } finally {
    await prisma.$disconnect();
  }
})();
