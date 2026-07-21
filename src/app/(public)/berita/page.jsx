import { prisma } from "@/lib/prisma";
import BeritaClientView from "@/components/views/berita/BeritaClientView";

export const revalidate = 1800; // Cache 30 Menit

// INJEKSI METADATA
export const metadata = {
  title: "Berita & Inovasi",
  description:
    "Kabar terbaru, perkembangan proyek, dan inovasi terkini dari PT Sinar Cerah Sempurna.",
};

export default async function BeritaPage() {
  // Pengambilan data paralel (Mencegah request waterfall)
  const [heroes, news] = await Promise.all([
    prisma.hero.findMany({ where: { page: "news", isActive: true } }),
    prisma.news.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { publishedAt: "desc" },
    }),
  ]);

  return <BeritaClientView heroData={heroes[0] || null} initialNews={news} />;
}
