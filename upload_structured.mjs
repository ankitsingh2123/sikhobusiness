/**
 * ╔════════════════════════════════════════════════════════════════╗
 * ║   Seekho Business — Bunny Structured Upload                  ║
 * ║                                                               ║
 * ║   Bunny Collection Structure:                                 ║
 * ║   {userId} / {category} / {course} / Part-{N}                ║
 * ║     └── video + auto thumbnail                                ║
 * ╚════════════════════════════════════════════════════════════════╝
 *
 * Usage:
 *   node upload_structured.mjs \
 *     --userId    user123 \
 *     --category  Finance \
 *     --course    "Rich Dad Poor Dad" \
 *     --part      1 \
 *     --video     "D:\SikhoBussiness\data\video.mp4" \
 *     --title     "Assets vs Liabilities" \
 *     --duration  600 \
 *     --free      false
 */

import fs from "fs";
import https from "https";
import { PrismaClient } from "@prisma/client";

const prisma     = new PrismaClient();
const LIBRARY_ID = "645588";
const API_KEY    = "682128ff-78af-48f1-a9e70913d121-3e4d-45b3";
const CDN_HOST   = "vz-82a5778a-b1c.b-cdn.net";

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function parseArgs() {
  const map = {};
  const raw = process.argv.slice(2);
  for (let i = 0; i < raw.length; i += 2)
    map[raw[i].replace("--", "")] = raw[i + 1];
  return map;
}

function bunnyJson(method, path, body) {
  return new Promise((resolve, reject) => {
    const payload = body ? JSON.stringify(body) : null;
    const req = https.request({
      hostname: "video.bunnycdn.com", path, method,
      headers: {
        AccessKey: API_KEY, "Content-Type": "application/json",
        ...(payload ? { "Content-Length": Buffer.byteLength(payload) } : {}),
      },
    }, (res) => {
      let d = "";
      res.on("data", c => d += c);
      res.on("end", () => {
        try { resolve({ status: res.statusCode, data: JSON.parse(d) }); }
        catch { resolve({ status: res.statusCode, data: d }); }
      });
    });
    req.on("error", reject);
    if (payload) req.write(payload);
    req.end();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 1: Get or Create Bunny Collection (acts as folder)
// Collection name = userId/category/course/Part-N
// ─────────────────────────────────────────────────────────────────────────────
async function getOrCreateCollection(collectionName) {
  // List existing collections
  const list = await bunnyJson("GET", `/library/${LIBRARY_ID}/collections?page=1&itemsPerPage=100`);
  const existing = list.data?.items?.find(c => c.name === collectionName);

  if (existing) {
    console.log(`\n📁 Collection exists: "${collectionName}"`);
    console.log(`   ID: ${existing.guid}`);
    return existing.guid;
  }

  // Create new collection
  console.log(`\n📁 Creating collection: "${collectionName}"`);
  const created = await bunnyJson("POST", `/library/${LIBRARY_ID}/collections`, { name: collectionName });
  if (!created.data?.guid) throw new Error(`Collection create failed: ${JSON.stringify(created.data)}`);
  console.log(`   ✅ Collection ID: ${created.data.guid}`);
  return created.data.guid;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 2: Create Bunny video slot inside collection
// ─────────────────────────────────────────────────────────────────────────────
async function createVideoSlot(title, collectionId) {
  console.log(`\n🎬 Creating video slot: "${title}"`);
  const res = await bunnyJson("POST", `/library/${LIBRARY_ID}/videos`, {
    title,
    collectionId,
  });
  if (!res.data?.guid) throw new Error(`Video slot failed: ${JSON.stringify(res.data)}`);
  console.log(`   ✅ Video ID: ${res.data.guid}`);
  return res.data.guid;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 3: Upload video file to Bunny with progress
// ─────────────────────────────────────────────────────────────────────────────
function uploadVideoFile(videoId, filePath) {
  return new Promise((resolve, reject) => {
    const buf   = fs.readFileSync(filePath);
    const total = buf.length;
    console.log(`\n📤 Uploading ${(total / 1024 / 1024).toFixed(1)} MB...`);

    const req = https.request({
      hostname: "video.bunnycdn.com",
      path:     `/library/${LIBRARY_ID}/videos/${videoId}`,
      method:   "PUT",
      headers:  { AccessKey: API_KEY, "Content-Type": "video/mp4", "Content-Length": total },
    }, (res) => {
      let d = "";
      res.on("data", c => d += c);
      res.on("end", () => resolve(res.statusCode));
    });
    req.on("error", reject);

    const chunk = 512 * 1024;
    let offset  = 0;
    function write() {
      while (offset < total) {
        const slice = buf.slice(offset, offset + chunk);
        offset += slice.length;
        process.stdout.write(`\r   Progress: ${((offset/total)*100).toFixed(1)}%  (${(offset/1024/1024).toFixed(1)} / ${(total/1024/1024).toFixed(1)} MB)`);
        if (!req.write(slice)) { req.once("drain", write); return; }
      }
      req.end();
    }
    write();
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 4: DB — Find or create Course
// ─────────────────────────────────────────────────────────────────────────────
async function findOrCreateCourse(category, title) {
  let course = await prisma.course.findFirst({ where: { title, category } });
  if (!course) {
    console.log(`\n💾 Creating Course in DB: "${title}"`);
    course = await prisma.course.create({
      data: { title, description: `${title} — ${category}`, outcomes: [], price: 0, category, isPublished: false },
    });
    console.log(`   ✅ Course ID: ${course.id}`);
  } else {
    console.log(`\n💾 DB Course found: "${title}" (${course.id})`);
  }
  return course;
}

// ─────────────────────────────────────────────────────────────────────────────
// STEP 5: DB — Find or create Module (Part N)
// ─────────────────────────────────────────────────────────────────────────────
async function findOrCreateModule(courseId, partNum) {
  const title = `Part ${partNum}`;
  let mod = await prisma.module.findFirst({ where: { courseId, title } });
  if (!mod) {
    console.log(`\n💾 Creating Module: "${title}"`);
    mod = await prisma.module.create({ data: { title, order: parseInt(partNum), courseId } });
    console.log(`   ✅ Module ID: ${mod.id}`);
  } else {
    console.log(`\n💾 DB Module found: "${title}" (${mod.id})`);
  }
  return mod;
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────────────────────────────
(async () => {
  const a = parseArgs();
  const required = ["userId", "category", "course", "part", "video", "title"];
  const missing  = required.filter(k => !a[k]);

  if (missing.length) {
    console.error(`\n❌ Missing: --${missing.join(", --")}`);
    console.log(`\nExample:\n  node upload_structured.mjs \\`);
    console.log(`    --userId    user123 \\`);
    console.log(`    --category  Finance \\`);
    console.log(`    --course    "Rich Dad Poor Dad" \\`);
    console.log(`    --part      1 \\`);
    console.log(`    --video     "D:\\data\\video.mp4" \\`);
    console.log(`    --title     "Assets vs Liabilities" \\`);
    console.log(`    --duration  600 \\`);
    console.log(`    --free      false`);
    process.exit(1);
  }

  if (!fs.existsSync(a.video)) {
    console.error(`\n❌ Video file not found: ${a.video}`);
    process.exit(1);
  }

  try {
    console.log("\n╔═══════════════════════════════════════════════╗");
    console.log("║  Seekho Business — Bunny Structured Upload  ║");
    console.log("╚═══════════════════════════════════════════════╝");
    console.log(`\n👤 User     : ${a.userId}`);
    console.log(`📁 Structure: ${a.userId} → ${a.category} → ${a.course} → Part-${a.part}`);
    console.log(`🎬 Video    : ${a.title}`);

    // ── Bunny Collection (folder) ─────────────────────────────────────────────
    // Structure: userId/category/course/Part-N
    const collectionName = `${a.userId}/${a.category}/${a.course}/Part-${a.part}`;
    const collectionId   = await getOrCreateCollection(collectionName);

    // ── Bunny Video Slot inside collection ────────────────────────────────────
    const bunnyVideoId = await createVideoSlot(a.title, collectionId);

    // ── Upload file ───────────────────────────────────────────────────────────
    const status = await uploadVideoFile(bunnyVideoId, a.video);
    console.log("");
    if (status !== 200) throw new Error(`Upload failed [${status}]`);
    console.log(`   ✅ Upload complete!`);

    // ── Bunny URLs ────────────────────────────────────────────────────────────
    const embedUrl     = `https://iframe.mediadelivery.net/embed/${LIBRARY_ID}/${bunnyVideoId}`;
    const streamUrl    = `https://${CDN_HOST}/${bunnyVideoId}/playlist.m3u8`;
    const thumbnailUrl = `https://${CDN_HOST}/${bunnyVideoId}/thumbnail.jpg`;

    // ── DB: Course ────────────────────────────────────────────────────────────
    const course = await findOrCreateCourse(a.category, a.course);

    // ── DB: Module ────────────────────────────────────────────────────────────
    const mod = await findOrCreateModule(course.id, a.part);

    // ── DB: Video ─────────────────────────────────────────────────────────────
    const videoCount = await prisma.video.count({ where: { moduleId: mod.id } });
    const video = await prisma.video.create({
      data: {
        title:         a.title,
        videoUrl:      embedUrl,
        duration:      a.duration ? parseInt(a.duration) : null,
        order:         videoCount + 1,
        isFreePreview: a.free === "true",
        moduleId:      mod.id,
      },
    });
    console.log(`\n💾 DB Video ID: ${video.id}`);

    // ── Set course thumbnail (first video only) ───────────────────────────────
    if (!course.thumbnail) {
      await prisma.course.update({ where: { id: course.id }, data: { thumbnail: thumbnailUrl } });
      console.log(`🖼️  Course thumbnail → Bunny auto-thumb`);
    }

    // ── Summary ───────────────────────────────────────────────────────────────
    console.log("\n╔═══════════════════════════════════════════════╗");
    console.log("║   ✅ All Done!                               ║");
    console.log("╚═══════════════════════════════════════════════╝");
    console.log(`\n📂 Bunny Folder:`);
    console.log(`   ${a.userId}/`);
    console.log(`     ${a.category}/`);
    console.log(`       ${a.course}/`);
    console.log(`         Part-${a.part}/`);
    console.log(`           🎬 ${a.title}`);
    console.log(`           🖼️  thumbnail.jpg (auto after encoding)`);
    console.log(`\n📺 Embed URL  : ${embedUrl}`);
    console.log(`🔗 Stream URL : ${streamUrl}`);
    console.log(`🖼️  Thumbnail  : ${thumbnailUrl}`);
    console.log(`🌐 Watch URL  : http://localhost:3000/watch/${video.id}`);
    console.log(`\n⏳ Bunny will encode the video in 2-5 min.`);

  } catch (e) {
    console.error("\n❌ Error:", e.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
})();
