import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function generateSeoSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // Hapus karakter selain huruf, angka, spasi, dan dash
    .replace(/[\s_-]+/g, "-") // Ganti spasi/underscore dengan single dash
    .replace(/^-+|-+$/g, ""); // Hapus dash di awal atau akhir string
}

async function getUniqueSlug(baseSlug: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (await prisma.project.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

async function main() {
  const projects = await prisma.project.findMany({
    where: { slug: null },
  });

  if (projects.length === 0) {
    console.log("✅ Tidak ada proyek yang membutuhkan backfill slug.");
    return;
  }

  console.log(
    `Menemukan ${projects.length} proyek tanpa slug. Memulai sinkronisasi...`,
  );

  for (const project of projects) {
    const baseSlug = generateSeoSlug(project.title);
    const uniqueSlug = await getUniqueSlug(baseSlug);

    await prisma.project.update({
      where: { id: project.id },
      data: { slug: uniqueSlug },
    });

    console.log(
      `[UPDATED] ID: ${project.id} | "${project.title}" → "${uniqueSlug}"`,
    );
  }

  console.log("✅ Seluruh slug berhasil dibuat!");
}

main()
  .catch((e) => {
    console.error("❌ Terjadi kesalahan saat migrasi:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
