"use client";
import FadeUp from "@/components/ui/FadeUp";
import Link from "next/link";

export default function ContactCTA() {
  return (
    // Penambahan pb-32 (padding-bottom ekstra) agar berjarak jauh dari Footer
    <section className="w-full bg-zinc-100 pt-16 pb-32 flex justify-center px-6">
      <FadeUp delay={0.1} className="w-full max-w-[1152px]">
        
        <div className="w-full h-96 bg-blue-900 rounded-3xl relative overflow-hidden flex flex-col items-center justify-center shadow-xl border border-white/10">
          
          <div className="absolute inset-0 bg-[url('https://placehold.co/1152x384')] bg-cover bg-center opacity-40 mix-blend-overlay"></div>
          <div className="absolute inset-0 bg-sky-800/90"></div>

          <div className="relative z-10 flex flex-col items-center gap-6 px-6">
            <h2 className="text-white text-4xl font-extrabold font-['Plus_Jakarta_Sans'] text-center leading-snug">
              Siap Mewujudkan Visi Konstruksi Anda
            </h2>
            <p className="text-white text-base font-normal font-['Plus_Jakarta_Sans'] text-center max-w-[693px] leading-relaxed">
              Apakah Anda memiliki proyek masa depan yang membutuhkan presisi dan kualitas? Hubungi kantor kami hari ini untuk solusi konstruksi yang inovatif dan terpercaya.
            </p>
            
            <Link 
              href="/hubungi-kami"
              className="w-72 h-12 mt-4 rounded-lg flex items-center justify-center text-sky-950 text-[20px] font-bold font-['Plus_Jakarta_Sans'] bg-[linear-gradient(33deg,#d4d4d8_7%,#ffffff_29%,#d6d3d1_82%)] hover:scale-105 transition-transform shadow-md"
            >
              Hubungi Kami
            </Link>
          </div>

        </div>
        
      </FadeUp>
    </section>
  );
}