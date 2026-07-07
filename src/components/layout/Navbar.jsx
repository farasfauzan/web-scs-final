"use client";

import { useState } from "react";
import Link from "next/link";
import BurgerMenu from "./BurgerMenu";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      {/* Navbar Container */}
      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent transition-all duration-300">
        
        {/* w-full dan px-6 md:px-12 membuat elemen benar-benar mepet ujung layar */}
        <div className="w-full px-6 md:px-12 h-24 flex items-center justify-between">
          
          {/* KIRI: Logo & Nama Perusahaan */}
          <Link href="/" className="flex items-center gap-3 group relative z-[60]">
            <svg className="w-10 h-10 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 4.18L18.82 19H5.18L12 6.18z"/>
              <circle cx="12" cy="13" r="2" />
            </svg>
            <span className="text-white text-2xl font-extrabold font-['Plus_Jakarta_Sans'] tracking-wide drop-shadow-md">
              Sinar Cerah Sempurna
            </span>
          </Link>

          {/* KANAN: Tombol Hubungi & Ikon Burger */}
          <div className="flex items-center gap-6 relative">
            
            {/* Tombol Hubungi Kami: Akan memudar & mengecil saat isMenuOpen = true */}
            <div className={`transition-all duration-300 origin-right ${isMenuOpen ? 'opacity-0 scale-90 pointer-events-none translate-x-4' : 'opacity-100 scale-100 translate-x-0'}`}>
              <Link 
                href="/hubungi-kami" 
                className="hidden sm:inline-block bg-white text-sky-950 font-bold font-['Plus_Jakarta_Sans'] px-6 py-3 rounded-lg hover:bg-zinc-100 transition-colors shadow-md"
              >
                Hubungi Kami
              </Link>
            </div>

            {/* Ikon Burger Animasi Silang (Z-index 60 agar selalu di atas menu overlay) */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="w-8 h-6 relative focus:outline-none z-[60] ml-auto group"
              aria-label="Toggle Menu"
            >
              {/* Garis Atas */}
              <span className={`absolute left-0 w-full h-1 bg-white rounded transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'top-2.5 rotate-45' : 'top-0 group-hover:top-0.5'
              }`}></span>
              
              {/* Garis Tengah (Menghilang saat ditekan) */}
              <span className={`absolute left-0 top-2.5 w-full h-1 bg-white rounded transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
              }`}></span>
              
              {/* Garis Bawah */}
              <span className={`absolute left-0 w-full h-1 bg-white rounded transition-all duration-300 ease-in-out ${
                isMenuOpen ? 'top-2.5 -rotate-45' : 'top-5 group-hover:top-4.5'
              }`}></span>
            </button>

          </div>
        </div>
      </nav>

      {/* Komponen Menu Overlay */}
      <BurgerMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}