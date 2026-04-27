import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const VIDEO_DB_ID = "e99e7c13-479e-4d4e-9fa9-47cb6d57ca3c";
const BUNNY_EMBED = "https://iframe.mediadelivery.net/embed/645588/f6995151-82f3-4c19-9dc2-fc81809a3dc3";

async function main() {
  const updated = await prisma.video.update({
    where: { id: VIDEO_DB_ID },
    data:  { videoUrl: BUNNY_EMBED },
    select: { id: true, title: true, videoUrl: true },
  });
  console.log("✅ Done!");
  console.log("   Title   :", updated.title);
  console.log("   videoUrl:", updated.videoUrl);
}

main()
  .catch((e) => { console.error("❌", e.message); process.exit(1); })
  .finally(() => prisma.$disconnect());
