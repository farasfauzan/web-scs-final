"use client";
import FadeUp from "@/components/ui/FadeUp";

export default function StatsCarouselSection() {
  const stats = [
    { value: "5+", label: "Proyek Selesai" },
    { value: "50+", label: "Klien Puas" },
    { value: "25+", label: "Tahun Pengalaman" },
    { value: "200+", label: "Tim Profesional" }
  ];

  // 6 Foto yang akan bergeser berulang
  const carouselImages = [
    "https://placehold.co/410x234",
    "https://placehold.co/422x238",
    "https://placehold.co/383x280",
    "https://placehold.co/435x245",
    "https://placehold.co/410x234",
    "https://placehold.co/422x238"
  ];

  return (
    <section className="w-full bg-zinc-100 py-16 flex flex-col items-center overflow-hidden">
      
      {/* CSS untuk Animasi Marquee (Berjalan Otomatis) */}
      <style>{`
        @keyframes infinite-scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 90s linear infinite;
          width: max-content;
        }
      `}</style>

      {/* 1. Carousel Gambar */}
      <FadeUp delay={0.1} className="w-full overflow-hidden mb-12 flex">
        {/* Render 2 kali (didalam array) agar loop mulus tanpa jeda */}
        <div className="animate-infinite-scroll flex gap-6 px-3 hover:[animation-play-state:paused] cursor-pointer">
          {[...carouselImages, ...carouselImages].map((img, idx) => (
            <div key={idx} className="w-96 h-60 bg-white rounded-xl overflow-hidden shrink-0 border border-neutral-200 shadow-sm">
              <img src={img} alt={`Proyek ${idx}`} className="w-full h-full object-cover" />
            </div>
          ))}
        </div>
      </FadeUp>

      {/* 2. Kotak Statistik Biru (Persis Figma) */}
      <FadeUp delay={0.3} className="w-full max-w-[1152px] px-6">
        <div className="w-full h-48 bg-blue-900 rounded-3xl relative overflow-hidden flex items-center justify-center shadow-xl">
          {/* Overlay Figma */}
          <div className="absolute inset-0 bg-sky-800/90"></div>

          <div className="relative z-10 w-full flex justify-center items-center gap-10 md:gap-20">
            {stats.map((stat, idx) => (
              <div key={idx} className="flex flex-col items-center text-center gap-3">
                <span className="text-white text-4xl font-extrabold font-['Plus_Jakarta_Sans']">{stat.value}</span>
                <span className="text-white text-2xl font-semibold font-['Plus_Jakarta_Sans']">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

    </section>
  );
}