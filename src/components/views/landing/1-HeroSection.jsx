"use client";

import { useState, useEffect } from "react";
import FadeUp from "@/components/ui/FadeUp";
import HeroTitle from "@/components/shared/HeroTitle";
import BoldText from "@/components/shared/BoldText";
import CldImg from "@/components/shared/CldImg";

const FALLBACK = {
  subtitle: "",
  title:
    "**Integrity** isn't just a policy—it's the standard we build by. Your **trust** is our greatest structure.",
  description:
    "PT Sinar Cerah Sempurna adalah perusahaan konstruksi dan infrastruktur yang berpengalaman dalam pembangunan gedung, jalan, jembatan, dan berbagai proyek infrastruktur lainnya di Indonesia.",
  imageUrl: "/hero-bg.svg",
};

export default function HeroSection({ data }) {
  const hero = data || FALLBACK;
  const [showArrow, setShowArrow] = useState(true);
  const [activeImage, setActiveImage] = useState(null); // 'left' | 'right' | null

  // Memantau scroll hanya untuk menghilangkan panah (Parallax dihapus)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowArrow(false);
      } else {
        setShowArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToNext = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <section className="relative w-full min-h-[100svh] py-[clamp(4rem,10vh,8rem)] bg-[#004282] overflow-hidden flex items-center rounded-b-[64px]">
      {/* Animasi Kustom CSS untuk efek melayang */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .anim-float-1 { animation: floatUpDown 6s ease-in-out infinite; }
        .anim-float-2 { animation: floatUpDown 7s ease-in-out infinite 1s; }
      `,
        }}
      />

      {/* Layer Transparan Penjaga Klik Luar untuk mengecilkan foto */}
      {activeImage && (
        <div
          className="fixed inset-0 z-40 cursor-pointer"
          onClick={() => setActiveImage(null)}
          aria-hidden="true"
        />
      )}

      <div className="absolute inset-0 z-0">
        <CldImg
          src={hero.imageUrl}
          alt="Background"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-[#004282]/85"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
        <div className="flex flex-col gap-6 md:gap-4">
          <FadeUp delay={0.1}>
            <BoldText
              text={hero.subtitle || FALLBACK.subtitle}
              className="text-white text-xs md:text-sm font-semibold tracking-widest uppercase"
              as="span"
            />
          </FadeUp>

          <FadeUp delay={0.2}>
            <HeroTitle
              text={hero.title || FALLBACK.title}
              className="text-white text-[2rem] leading-[1.3] md:text-[clamp(2.25rem,4vw,3.5rem)] md:leading-[1.15] font-serif tracking-tight"
            />
          </FadeUp>

          <FadeUp delay={0.3}>
            <BoldText
              text={hero.description || FALLBACK.description}
              className="text-white text-[13px] md:text-[15px] font-normal font-['Plus_Jakarta_Sans'] leading-relaxed opacity-90 max-w-lg mt-6 md:mt-8"
              as="p"
            />
          </FadeUp>
        </div>

        {/* Area Foto Kanan */}
        <FadeUp
          delay={0.4}
          className="hidden md:block w-full h-[450px] relative"
        >
          {/* FOTO KIRI (85 Derajat -> Dimiringkan -5deg) */}
          <div
            className={`absolute transition-all duration-700 ease-out origin-center cursor-pointer ${
              activeImage === "left"
                ? "left-[50%] top-[50%] -translate-x-1/2 -translate-y-1/2 z-50" // Membesar di tengah kontainer kanan
                : activeImage === "right"
                  ? "opacity-0 scale-90 pointer-events-none left-0 top-[10%] translate-x-0 translate-y-0" // Menghilang saat sebelahnya aktif
                  : "left-0 top-[10%] translate-x-0 translate-y-0 hover:scale-105 hover:z-30" // Normal (Idle)
            }`}
            onClick={() =>
              setActiveImage(activeImage === "left" ? null : "left")
            }
          >
            {/* Animasi melayang di-nonaktifkan saat di-klik agar diam sempurna */}
            <div className={activeImage === "left" ? "" : "anim-float-1"}>
              {/* Ukuran diset secara spesifik agar selalu Portrait */}
              <div
                className={`rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[3px] border-white/20 transition-all duration-700 ease-out ${
                  activeImage === "left"
                    ? "w-[320px] h-[460px] rotate-0"
                    : "w-[230px] h-[340px] -rotate-[5deg]"
                }`}
              >
                <CldImg
                  src={hero.heroImage2 || "/foto-hero1.svg"}
                  alt="Konstruksi 1"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* FOTO KANAN (100 Derajat -> Dimiringkan +10deg) */}
          <div
            className={`absolute transition-all duration-700 ease-out origin-center cursor-pointer ${
              activeImage === "right"
                ? "right-[50%] top-[50%] translate-x-1/2 -translate-y-1/2 z-50" // Membesar di tengah
                : activeImage === "left"
                  ? "opacity-0 scale-90 pointer-events-none right-0 top-[15%] translate-x-0 translate-y-0"
                  : "right-0 top-[15%] translate-x-0 translate-y-0 hover:scale-105 hover:z-30"
            }`}
            onClick={() =>
              setActiveImage(activeImage === "right" ? null : "right")
            }
          >
            <div className={activeImage === "right" ? "" : "anim-float-2"}>
              <div
                className={`rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.3)] border-[3px] border-white/20 transition-all duration-700 ease-out ${
                  activeImage === "right"
                    ? "w-[320px] h-[460px] rotate-0"
                    : "w-[230px] h-[340px] rotate-[10deg]"
                }`}
              >
                <CldImg
                  src={hero.heroImage3 || "/foto-hero2.svg"}
                  alt="Konstruksi 2"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </FadeUp>
      </div>

      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 transition-opacity duration-500 ${
          showArrow ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToNext}
          aria-label="Scroll ke konten berikutnya"
          className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center shadow-[0_4px_15px_rgba(0,0,0,0.1)] hover:bg-white/30 transition-colors animate-bounce cursor-pointer"
        >
          <svg
            className="w-5 h-5 md:w-6 md:h-6 text-white opacity-90"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2.5"
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}
