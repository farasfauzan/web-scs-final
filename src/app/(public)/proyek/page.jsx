"use client";
import { useState, useEffect } from "react";
import ProjectCard from "@/components/shared/ProjectCard";
import HeroTitle from "@/components/shared/HeroTitle";
import BoldText from "@/components/shared/BoldText";

const FALLBACK = Array(12).fill(null).map((_, i) => ({
  id: i,
  title: "Renovasi Eks Kantor menjadi Gedung Paviliun",
  category: "Rumah Sakit",
  location: "RSUD Aji Muhammad Parikesit",
  client: "Pemerintah Kabupaten Kutai Kartanegara",
  imageUrl: "/hero-bg.svg" 
}));

export default function ProyekPage() {
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [projects, setProjects] = useState(FALLBACK);
  const [hero, setHero] = useState({ title: "**Visi** Kami dalam **Karya**", desc: "Dedikasi kami tertuang dalam setiap detail proyek." });
  const categories = ["Semua", "Rumah Sakit", "Gedung Pendidikan", "Pusat Perbelanjaan", "Lainnya"];

  useEffect(() => {
    fetch("/api/hero?page=projects")
      .then((res) => res.json())
      .then((data) => {
        if (data.heroes?.length > 0) {
          setHero({ title: data.heroes[0].title, desc: data.heroes[0].description });
        }
      })
      .catch(() => {});
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        if (data.projects?.length > 0) setProjects(data.projects);
      })
      .catch(() => {});
  }, []);

  const filteredProjects = activeFilter === "Semua" ? projects : projects.filter(p => p.category === activeFilter);

  return (
    <main className="w-full bg-[#F1F1F1] min-h-screen pb-24">
      
      {/* HERO SECTION - Menggunakan h-screen agar sama persis dengan Landing Page */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center rounded-b-[64px] overflow-hidden bg-[#004282]">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.svg" alt="Background Proyek" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#004282]/85"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col items-center gap-5">
          <HeroTitle
            text={hero.title}
            className="text-white text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight"
          />
          <BoldText text={hero.desc} className="text-white/90 text-[17px] font-normal font-['Plus_Jakarta_Sans'] leading-relaxed max-w-[693px]" as="p" />
        </div>
      </section>

      {/* FILTER & KONTEN */}
      <section className="relative z-20 -mt-8 flex justify-center px-6">
        <div className="w-full max-w-[1152px] flex flex-col lg:flex-row justify-between items-center gap-6">
          <div className="flex items-center p-1.5 bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-x-auto w-full lg:w-auto">
            {categories.map((cat, idx) => (
              <button 
                key={idx}
                onClick={() => setActiveFilter(cat)}
                className={`px-6 py-2.5 rounded-full text-[14px] font-semibold font-['Plus_Jakarta_Sans'] transition-all duration-300 whitespace-nowrap ${
                  activeFilter === cat 
                    ? "bg-[#5a67d8] text-white shadow-sm" 
                    : "bg-transparent text-neutral-500 hover:text-[#004282]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center bg-white rounded-full pl-6 pr-1.5 py-1.5 shadow-[0_8px_30px_rgb(0,0,0,0.08)] w-full lg:w-[320px] shrink-0">
            <input type="text" placeholder="Cari..." className="flex-grow bg-transparent border-none outline-none text-neutral-600 font-['Plus_Jakarta_Sans'] text-[15px]" />
            <button className="w-10 h-10 rounded-full bg-[#5a67d8] flex items-center justify-center hover:scale-105 transition-transform shrink-0">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
          </div>
        </div>
      </section>

      <section className="w-full flex justify-center pt-16 px-6">
        <div className="max-w-[1152px] w-full flex flex-col gap-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((proj) => <ProjectCard key={proj.id} project={proj} />)}
          </div>
        </div>
      </section>

    </main>
  );
}