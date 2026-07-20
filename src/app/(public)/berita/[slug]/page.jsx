import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FadeUp from "@/components/ui/FadeUp";
import CldImg from "@/components/shared/CldImg";
import InteractiveGallery from "@/components/ui/InteractiveGallery";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import ShareButtons from "@/components/shared/ShareButtons";

// 1. GENERATE METADATA (SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params; // Wajib di-await pada Next.js 15+
  const news = await prisma.news.findUnique({ where: { slug } });

  if (!news) return { title: "Berita Tidak Ditemukan" };

  return {
    title: `${news.title} | PT Sinar Cerah Sempurna`,
    description: news.excerpt || news.content.slice(0, 150),
    openGraph: {
      images: [news.imageUrl || "/carousel1.svg"],
    },
  };
}

// 2. SERVER COMPONENT UTAMA
export default async function DetailBeritaPage({ params }) {
  const { slug } = await params; // Wajib di-await

  // Fetch Paralel
  const [news, relatedNews] = await Promise.all([
    prisma.news.findUnique({ where: { slug } }),
    prisma.news.findMany({
      where: { status: "PUBLISHED", NOT: { slug } },
      orderBy: { publishedAt: "desc" },
      take: 3,
    }),
  ]);

  if (!news) notFound();

  // Helper Functions
  const formatYellowText = (text) => {
    if (!text) return null;
    return text.split(/(\*\*.*?\*\*)/g).map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="text-[#FFD700] font-inherit">
            {part.replace(/\*\*/g, "")}
          </strong>
        );
      }
      return <span key={index}>{part}</span>;
    });
  };

  const publishDate =
    news.publishedAt || news.createdAt
      ? new Date(news.publishedAt || news.createdAt).toLocaleDateString(
          "id-ID",
          {
            day: "numeric",
            month: "long",
            year: "numeric",
          },
        )
      : "9 Juli 2026";

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://sinarcerahsempurna.com";

  return (
    <main className="w-full bg-zinc-100 min-h-screen pt-[76px] lg:pt-[88px] pb-20 md:pb-24 px-4 lg:px-8 flex flex-col items-center">
      <article className="w-full max-w-[1144px] flex flex-col gap-3">
        <nav
          aria-label="Breadcrumb"
          className="w-full flex flex-col gap-1.5 md:gap-2 px-1 md:px-2"
        >
          <Breadcrumbs
            items={[
              { label: "Beranda", href: "/" },
              { label: "Berita", href: "/berita" },
              { label: news.title },
            ]}
          />
          <FadeUp delay={0.1}>
            <Link
              href="/berita"
              className="flex items-center gap-2 text-blue-900 text-[13px] md:text-[14px] font-semibold font-['Plus_Jakarta_Sans'] hover:opacity-80 transition-opacity w-fit"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Kembali ke Berita
            </Link>
          </FadeUp>
        </nav>

        <FadeUp
          delay={0.2}
          className="w-full bg-white rounded-[24px] md:rounded-[48px] px-5 md:px-8 pt-4 pb-6 lg:pt-5 lg:pb-8 flex flex-col gap-4 md:gap-6 shadow-sm border border-neutral-100"
        >
          <header className="w-full flex flex-col gap-2.5 md:gap-3">
            <p className="text-neutral-500 text-[11px] md:text-[13px] font-bold font-['Plus_Jakarta_Sans'] tracking-widest uppercase">
              Berita Terkini •{" "}
              <time dateTime={new Date(news.createdAt).toISOString()}>
                {publishDate}
              </time>
            </p>
            <figure className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden relative m-0">
              <CldImg
                src={news.imageUrl || "/carousel1.svg"}
                alt={news.title}
                className="w-full h-full object-cover"
              />
            </figure>
          </header>

          <h1 className="w-full text-left text-black text-2xl md:text-3xl lg:text-4xl font-bold font-['Plus_Jakarta_Sans'] leading-snug">
            {formatYellowText(news.title)}
          </h1>

          <hr className="border-neutral-100 w-full" />

          <section className="w-full text-neutral-800 text-[14px] md:text-[15px] font-normal font-['Plus_Jakarta_Sans'] leading-[1.8] whitespace-pre-line text-left">
            {formatYellowText(news.content)}
          </section>

          <footer className="w-full flex flex-col items-start gap-2 mt-4 pt-4 border-t border-neutral-100">
            <span className="text-black text-[11px] md:text-xs font-semibold font-['Plus_Jakarta_Sans'] tracking-wide uppercase">
              Bagikan Artikel ini:
            </span>
            <ShareButtons
              title={news.title}
              url={`${appUrl}/berita/${news.slug}`}
              description={news.excerpt || ""}
            />
          </footer>
        </FadeUp>

        <FadeUp
          delay={0.3}
          className="w-full bg-white rounded-[24px] md:rounded-[48px] px-5 md:px-8 py-6 lg:py-8 flex flex-col gap-5 md:gap-8 shadow-sm border border-neutral-100"
        >
          <h2 className="text-black text-xl md:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
            Galeri
          </h2>
          {news.galleryImages && news.galleryImages.length > 0 ? (
            <InteractiveGallery images={news.galleryImages} />
          ) : (
            <div className="w-full py-12 md:py-16 flex flex-col items-center justify-center bg-zinc-50 rounded-2xl border-2 border-dashed border-neutral-200">
              <img
                src="/no-picture.svg"
                alt="Ilustrasi kosong"
                className="w-12 h-12 mb-3 opacity-40 object-contain"
              />
              <p className="text-neutral-500 text-sm font-medium font-['Plus_Jakarta_Sans']">
                Belum ada foto dokumentasi untuk berita ini.
              </p>
            </div>
          )}
        </FadeUp>

        {relatedNews.length > 0 && (
          <aside className="mt-6 md:mt-8 w-full bg-white rounded-[24px] md:rounded-[48px] px-5 md:px-8 py-6 lg:py-8 flex flex-col gap-5 md:gap-8 shadow-sm border border-neutral-100">
            <h2 className="text-black text-xl md:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Berita Lainnya
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedNews.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#004282]/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-video w-full overflow-hidden bg-zinc-100">
                    <CldImg
                      src={item.imageUrl || "/carousel1.svg"}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-800 font-['Plus_Jakarta_Sans'] line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        )}
      </article>
    </main>
  );
}
