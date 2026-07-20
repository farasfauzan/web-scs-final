import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import "dotenv/config";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

async function main() {
  const projects = await prisma.project.findMany({
    where: { slug: null },
  });

  console.log(`Found ${projects.length} projects without slugs`);

  for (const project of projects) {
    let slug = generateSlug(project.title);

    // Ensure uniqueness by appending a number if needed
    let counter = 1;
    let baseSlug = slug;
    while (await prisma.project.findUnique({ where: { slug } })) {
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    await prisma.project.update({
      where: { id: project.id },
      data: { slug },
    });

    console.log(`✅ ID:${project.id} "${project.title}" → slug: "${slug}"`);
  }

  console.log("✅ All slugs backfilled successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
