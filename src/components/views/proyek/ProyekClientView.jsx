"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import FadeUp from "@/components/ui/FadeUp";
import ProjectCard from "@/components/shared/ProjectCard";
import Pagination from "@/components/shared/Pagination";
import ProjectSkeleton from "@/components/ui/ProjectSkeleton";
import HeroTitle from "@/components/shared/HeroTitle";
import BoldText from "@/components/shared/BoldText";
import { IMAGE_SIZES } from "@/lib/cloudinary";
import OptimizedImage from "@/components/shared/OptimizedImage";

// 1. Komponen Hero (Bebas dari useSearchParams agar render seketika tanpa skeleton)
function ProyekHero({ heroData }) {
  return (
    <section className="relative w-full h-[50vh] min-h-[400px] flex flex-col items-center justify-center rounded-b-[64px] overflow-hidden bg-[#004282]">
      <div className="absolute inset-0 z-0">
        <OptimizedImage
          src={heroData?.imageUrl || "/carousel3.svg"}
          alt=""
          fill
          priority
          cldOptions={IMAGE_SIZES.hero}
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#004282]/85"></div>
      </div>
      <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-[clamp(0.75rem,2vh,1.25rem)] mt-10">
        <HeroTitle
          text={heroData?.title || "**Visi** Kami dalam **Karya**"}
          className="text-white text-[clamp(2.25rem,4vw,3.5rem)] font-extrabold leading-tight"
        />
        <BoldText
          text={
            heroData?.description ||
            "Dedikasi kami tertuang dalam setiap detail proyek."
          }
          className="text-white/90 text-[clamp(0.9rem,1.5vw,1.1rem)] font-normal leading-relaxed max-w-[693px]"
          as="p"
        />
      </div>
    </section>
  );
}

// 2. Komponen Interaktif (Filter, Search, Grid, Pagination)
function ProyekInteractive({ initialProjects }) {
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const [activeFilter, setActiveFilter] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const categories = [
    "Semua",
    "Rumah Sakit",
    "Gedung Pendidikan",
    "Pusat Perbelanjaan",
    "Lainnya",
  ];

  const filteredProjects = initialProjects.filter((proj) => {
    const matchCategory =
      activeFilter === "Semua" || proj.category === activeFilter;
    const lowerCaseQuery = searchQuery.toLowerCase();

    return (
      matchCategory &&
      ((proj.title?.toLowerCase() || "").includes(lowerCaseQuery) ||
        (proj.location?.toLowerCase() || "").includes(lowerCaseQuery) ||
        (proj.client?.toLowerCase() || "").includes(lowerCaseQuery))
    );
  });

  const ITEMS_PER_PAGE = 9;
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentProjects = filteredProjects.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / ITEMS_PER_PAGE),
  );

  const handleFilterChange = (cat) => {
    if (cat === activeFilter) return;
    setIsLoading(true);
    setActiveFilter(cat);
    setTimeout(() => setIsLoading(false), 300);
  };

  return (
    <>
      <section
        id="daftar-konten"
        className="relative z-20 -mt-[26px] flex justify-center px-6"
      >
        <FadeUp
          delay={0.2}
          className="w-full max-w-7xl flex flex-col lg:flex-row justify-between items-center gap-6"
        >
          <div
            className="flex items-center p-1.5 bg-white rounded-full shadow-md overflow-x-auto w-full lg:w-auto scrollbar-hide"
            role="tablist"
            aria-label="Kategori Proyek"
          >
            {categories.map((cat, idx) => (
              <button
                key={idx}
                role="tab"
                aria-selected={activeFilter === cat}
                onClick={() => handleFilterChange(cat)}
                className={`px-6 py-2.5 rounded-full text-[14px] font-semibold transition-all duration-300 whitespace-nowrap cursor-pointer ${
                  activeFilter === cat
                    ? "bg-[#6B7AE5] text-white shadow-sm"
                    : "bg-transparent text-neutral-500 hover:text-[#004282]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center bg-white rounded-full pl-6 pr-1.5 py-1.5 shadow-md w-full lg:w-[320px] shrink-0">
            <input
              type="text"
              placeholder="Cari proyek, lokasi, klien..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-grow bg-transparent border-none outline-none text-neutral-600 text-[15px]"
            />
            <div className="w-10 h-10 rounded-full bg-[#004282] flex items-center justify-center shrink-0">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>
        </FadeUp>
      </section>

      <section className="w-full flex justify-center pt-[clamp(3rem,5vh,4rem)] px-6">
        <FadeUp
          delay={0.3}
          className="max-w-7xl w-full flex flex-col gap-[clamp(2rem,5vh,3rem)]"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              Array(6)
                .fill(0)
                .map((_, idx) => <ProjectSkeleton key={`skeleton-${idx}`} />)
            ) : currentProjects.length > 0 ? (
              currentProjects.map((proj) => (
                <ProjectCard key={proj.id} project={proj} />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center text-neutral-500 py-16 font-semibold">
                Pencarian untuk &quot;{searchQuery}&quot; tidak ditemukan.
              </div>
            )}
          </div>
          {!isLoading && filteredProjects.length > ITEMS_PER_PAGE && (
            <Pagination
              totalPages={totalPages}
              basePath="/proyek"
              scrollId="daftar-konten"
            />
          )}
        </FadeUp>
      </section>
    </>
  );
}

// Pembungkus Ekspor dengan Suspense yang tepat sasaran
export default function ProyekClientView({ heroData, initialProjects }) {
  return (
    <main className="w-full bg-[#F1F1F1] min-h-screen pb-24">
      <ProyekHero heroData={heroData} />

      {/* Suspense HANYA memblokir area daftar konten, Hero tetap tayang sempurna */}
      <Suspense
        fallback={
          <section className="w-full flex justify-center pt-[clamp(3rem,5vh,4rem)] px-6">
            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill(0)
                .map((_, idx) => (
                  <ProjectSkeleton key={`skel-init-${idx}`} />
                ))}
            </div>
          </section>
        }
      >
        <ProyekInteractive initialProjects={initialProjects} />
      </Suspense>
    </main>
  );
}
