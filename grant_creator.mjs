import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const EMAIL = "nietlab123@gmail.com";

(async () => {
  const user = await prisma.user.update({
    where: { email: EMAIL },
    data:  { role: "CREATOR" },
    select: { id: true, email: true, role: true, name: true },
  });

  console.log("✅ Creator access granted!");
  console.log("   Name  :", user.name || "(no name)");
  console.log("   Email :", user.email);
  console.log("   Role  :", user.role);
  console.log("\n🎉 User can now access /creator dashboard.");

  await prisma.$disconnect();
})().catch((e) => {
  console.error("❌ Error:", e.message);
  process.exit(1);
});
