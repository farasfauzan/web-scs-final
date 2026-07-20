import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FadeUp from "@/components/ui/FadeUp";
import CldImg from "@/components/shared/CldImg";
import InteractiveGallery from "@/components/ui/InteractiveGallery";
import ShareButtons from "@/components/shared/ShareButtons";
import Breadcrumbs from "@/components/shared/Breadcrumbs";
import BeforeAfterSlider from "@/components/shared/BeforeAfterSlider";

// 1. GENERATE METADATA (SEO)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  let project = await prisma.project.findUnique({ where: { slug } });

  if (!project && !isNaN(Number(slug))) {
    project = await prisma.project.findUnique({ where: { id: Number(slug) } });
  }

  if (!project) return { title: "Proyek Tidak Ditemukan" };

  return {
    title: `${project.title} | Portofolio PT Sinar Cerah Sempurna`,
    description:
      project.description?.slice(0, 150) ||
      `Detail proyek ${project.title} oleh PT Sinar Cerah Sempurna.`,
    openGraph: {
      images: [project.imageUrl || "/carousel3.svg"],
    },
  };
}

// 2. SERVER COMPONENT UTAMA
export default async function DetailProyekPage({ params }) {
  const { slug } = await params;

  let project = await prisma.project.findUnique({ where: { slug } });
  if (!project && !isNaN(Number(slug))) {
    project = await prisma.project.findUnique({ where: { id: Number(slug) } });
  }

  if (!project) notFound();

  const relatedProjects = await prisma.project.findMany({
    where: {
      category: project.category,
      isActive: true,
      NOT: { id: project.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
  });

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

  const publishDate = project.createdAt
    ? new Date(project.createdAt).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "9 Juli 2026";

  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL || "https://sinarcerahsempurna.com";
  const formattedGallery = project.galleryImages || [];

  const rawUrl = project.mapsUrl?.trim();
  const locationName = project.location?.trim();
  const isEmbed =
    rawUrl &&
    (rawUrl.includes("/embed/") || rawUrl.includes("google.com/maps/embed"));
  const queryLocation = isEmbed
    ? null
    : locationName || (rawUrl && !rawUrl.startsWith("http") ? rawUrl : null);
  const embedSrc = isEmbed
    ? rawUrl
    : queryLocation
      ? `https://maps.google.com/maps?q=${encodeURIComponent(queryLocation)}&output=embed`
      : null;
  const targetMapsUrl =
    rawUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(locationName || "Indonesia")}`;

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
              { label: "Proyek", href: "/proyek" },
              { label: project.title },
            ]}
          />
          <FadeUp delay={0.1}>
            <Link
              href="/proyek"
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
              Kembali ke Proyek
            </Link>
          </FadeUp>
        </nav>

        <FadeUp
          delay={0.2}
          className="w-full bg-white rounded-[24px] md:rounded-[48px] px-5 md:px-8 pt-4 pb-6 lg:pt-5 lg:pb-8 flex flex-col gap-4 md:gap-6 shadow-sm border border-neutral-100"
        >
          <header className="w-full flex flex-col gap-2.5 md:gap-3">
            <p className="text-neutral-500 text-[11px] md:text-[13px] font-bold font-['Plus_Jakarta_Sans'] tracking-widest uppercase">
              Diterbitkan pada •{" "}
              <time dateTime={new Date(project.createdAt).toISOString()}>
                {publishDate}
              </time>
            </p>
            <figure className="w-full h-[220px] sm:h-[300px] md:h-[350px] lg:h-[400px] rounded-xl md:rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden relative m-0">
              <CldImg
                src={project.imageUrl || "/carousel3.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </figure>
          </header>

          <h1 className="w-full text-left text-black text-2xl md:text-3xl lg:text-4xl font-bold font-['Plus_Jakarta_Sans'] leading-snug">
            {formatYellowText(project.title)}
          </h1>

          <hr className="border-neutral-100 w-full" />

          <section className="w-full grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-6 md:gap-10 items-start">
            <div className="flex flex-col gap-4 md:gap-5">
              <h2 className="text-black text-base md:text-xl font-bold font-['Plus_Jakarta_Sans'] mb-1">
                Detail Proyek
              </h2>
              <dl className="flex flex-col gap-3 md:gap-4 m-0">
                <div>
                  <dt className="text-black text-[14px] md:text-[15px] font-bold font-['Plus_Jakarta_Sans']">
                    Kategori
                  </dt>
                  <dd className="text-neutral-700 text-[13px] md:text-[15px] font-normal font-['Plus_Jakarta_Sans'] mt-0.5 m-0">
                    {project.category || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-black text-[14px] md:text-[15px] font-bold font-['Plus_Jakarta_Sans']">
                    Lokasi
                  </dt>
                  <dd className="text-neutral-700 text-[13px] md:text-[15px] font-normal font-['Plus_Jakarta_Sans'] mt-0.5 m-0">
                    {project.location || "-"}
                  </dd>
                </div>
                <div>
                  <dt className="text-black text-[14px] md:text-[15px] font-bold font-['Plus_Jakarta_Sans']">
                    Klien
                  </dt>
                  <dd className="text-neutral-700 text-[13px] md:text-[15px] font-normal font-['Plus_Jakarta_Sans'] mt-0.5 m-0">
                    {project.client || "-"}
                  </dd>
                </div>
                {project.description && (
                  <div className="mt-1 md:mt-2">
                    <dt className="text-black text-[14px] md:text-[15px] font-bold font-['Plus_Jakarta_Sans']">
                      Deskripsi
                    </dt>
                    <dd className="text-neutral-700 text-[13px] md:text-[15px] font-normal font-['Plus_Jakarta_Sans'] text-left leading-relaxed whitespace-pre-line mt-1.5 m-0">
                      {project.description}
                    </dd>
                  </div>
                )}
              </dl>
            </div>

            <div className="w-full aspect-video md:aspect-auto md:h-[260px] rounded-xl md:rounded-2xl overflow-hidden relative bg-zinc-200 shadow-inner border border-neutral-100">
              {!embedSrc ? (
                <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-100 gap-3 p-6 text-center">
                  <span className="text-[12px] md:text-[13px] text-neutral-500 font-medium font-['Plus_Jakarta_Sans']">
                    Data peta tidak akurat/tidak tersedia
                  </span>
                </div>
              ) : (
                <>
                  <a
                    href={targetMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute top-3 left-3 z-10 bg-white/95 backdrop-blur-sm text-[#1a73e8] hover:text-[#174ea6] text-xs font-semibold font-['Plus_Jakarta_Sans'] px-3 py-1.5 rounded-md shadow-md border border-neutral-200/80 hover:bg-white transition-all flex items-center gap-1.5 group/btn"
                    aria-label="Buka navigasi di Google Maps"
                  >
                    <span>Buka di Maps</span>
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                  <iframe
                    src={embedSrc}
                    title={`Peta Lokasi ${project.title}`}
                    className="w-full h-full border-0 absolute inset-0"
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </>
              )}
            </div>
          </section>

          <hr className="border-neutral-100 w-full mt-4" />

          <footer className="w-full flex flex-col items-start gap-2">
            <span className="text-black text-[11px] md:text-xs font-semibold font-['Plus_Jakarta_Sans'] tracking-wide uppercase">
              Bagikan Proyek ini:
            </span>
            <ShareButtons
              title={project.title}
              url={`${appUrl}/proyek/${project.slug || project.id}`}
              description={project.description?.slice(0, 100) || ""}
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
          {formattedGallery.length > 0 ? (
            <InteractiveGallery
              images={formattedGallery.map((url) => ({ url, caption: "" }))}
            />
          ) : (
            <div className="w-full py-12 md:py-16 flex flex-col items-center justify-center bg-zinc-50 rounded-2xl border-2 border-dashed border-neutral-200">
              <img
                src="/no-picture.svg"
                alt="Ilustrasi kosong"
                className="w-12 h-12 mb-3 opacity-40 object-contain"
              />
              <p className="text-neutral-500 text-sm font-medium font-['Plus_Jakarta_Sans']">
                Belum ada foto galeri yang ditambahkan.
              </p>
            </div>
          )}
        </FadeUp>

        {formattedGallery.length >= 2 && (
          <FadeUp
            delay={0.35}
            className="w-full bg-white rounded-[24px] md:rounded-[48px] px-5 md:px-8 py-6 lg:py-8 flex flex-col gap-4 md:gap-8 shadow-sm border border-neutral-100"
          >
            <header className="w-full text-left">
              <h2 className="text-black text-xl md:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
                Sebelum & Sesudah
              </h2>
              <p className="text-neutral-500 text-sm font-['Plus_Jakarta_Sans'] mt-1">
                Geser untuk melihat perbandingan
              </p>
            </header>
            <BeforeAfterSlider
              beforeSrc={formattedGallery[0]}
              afterSrc={formattedGallery[1]}
              beforeAlt="Kondisi Awal"
              afterAlt="Kondisi Selesai"
            />
          </FadeUp>
        )}

        {relatedProjects.length > 0 && (
          <aside className="mt-6 md:mt-8 w-full bg-white rounded-[24px] md:rounded-[48px] px-5 md:px-8 py-6 lg:py-8 flex flex-col gap-5 md:gap-8 shadow-sm border border-neutral-100">
            <h2 className="text-black text-xl md:text-3xl font-extrabold font-['Plus_Jakarta_Sans']">
              Proyek Serupa
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.id}
                  href={`/proyek/${proj.slug || proj.id}`}
                  className="group bg-white rounded-xl border border-neutral-200 shadow-sm hover:shadow-md hover:border-[#004282]/30 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden"
                >
                  <div className="aspect-video w-full overflow-hidden bg-zinc-100">
                    <CldImg
                      src={proj.imageUrl || "/carousel3.svg"}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-neutral-800 font-['Plus_Jakarta_Sans'] line-clamp-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-neutral-500 font-['Plus_Jakarta_Sans'] mt-1">
                      {proj.category || "Infrastruktur"}
                    </p>
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
