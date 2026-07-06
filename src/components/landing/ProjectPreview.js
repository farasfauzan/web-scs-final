'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function ProjectPreview() {
  const [activeTab, setActiveTab] = useState("Semua");
  const categories = ["Semua", "Rumah Sakit", "Gedung Pendidikan", "Pusat Perbelanjaan", "Lainnya"];
  
  // Data kosong siap disambung ke Admin Backend
  const emptyProjects = [1, 2, 3];

  return (
    // pt-[120px] adalah kunci utama agar judul TIDAK TERTUTUP Navbar saat di-snap
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 pt-[120px] pb-16 space-y-10">
      
      <div className="text-center max-w-[693px] mx-auto space-y-4">
        <h2 className="text-black text-4xl font-extrabold font-['Plus_Jakarta_Sans'] leading-10">
          Visi Kami dalam Karya
        </h2>
        <p className="text-neutral-700 text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
          Dedikasi kami tertuang dalam setiap detail proyek. Kami menggabungkan inovasi konstruksi dengan standar kualitas tertinggi untuk menghadirkan bangunan yang bukan sekadar fungsional, namun inspiratif.
        </p>
      </div>

      {/* Filter Tabs Interaktif */}
      <div className="flex flex-wrap justify-center gap-4 bg-white p-2 rounded-full border max-w-max mx-auto shadow-sm">
        {categories.map((cat, i) => {
          if (cat === "Lainnya") {
            return (
              <Link key={i} href="/proyek" className="px-6 py-2.5 rounded-full text-base font-medium font-['Montserrat'] text-neutral-500 hover:bg-slate-50 transition">
                {cat}
              </Link>
            );
          }
          return (
            <button 
              key={i} 
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2.5 rounded-full text-base font-medium font-['Montserrat'] transition ${activeTab === cat ? 'bg-blue-900 text-white shadow' : 'text-neutral-500 hover:bg-slate-50'}`}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Grid Kartu Proyek (Kosongan dari Admin) */}
      <div className="grid md:grid-cols-3 gap-8">
        {emptyProjects.map((item) => (
          <div key={item} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm flex flex-col hover:shadow-md transition">
            <div className="h-52 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
              [Gambar dari Admin]
            </div>
            <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
              <div>
                <span className="text-blue-900 text-base font-semibold font-['Plus_Jakarta_Sans'] block">Kategori Proyek</span>
                <h3 className="text-stone-900 text-xl font-semibold font-['Plus_Jakarta_Sans'] mt-1">
                  Nama Proyek (Menunggu Data Admin)
                </h3>
              </div>
              
              <div className="pt-3 border-t border-neutral-100 space-y-2 text-neutral-500 text-xs font-medium font-['Plus_Jakarta_Sans']">
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.243-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>Lokasi Proyek</span>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="w-4 h-4 text-blue-900 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                  <span>Nama Klien / Instansi</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right">
        <Link href="/proyek" className="inline-flex items-center gap-2 text-sky-800 text-sm font-extrabold font-['Plus_Jakarta_Sans'] group">
          Lihat Semua <span className="group-hover:translate-x-1 transition">&rarr;</span>
        </Link>
      </div>

    </div>
  );
}