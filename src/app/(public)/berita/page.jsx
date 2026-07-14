import { prisma } from "@/lib/prisma";
import BeritaClientView from "@/components/views/berita/BeritaClientView";

export const revalidate = 1800;

export default async function BeritaPage() {
  const [heroes, news] = await Promise.all([
    prisma.hero.findMany({ where: { page: "news", isActive: true } }),
    prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return <BeritaClientView heroData={heroes[0] || null} initialNews={news} />;
}
