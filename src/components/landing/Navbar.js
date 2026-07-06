// src/components/landing/Navbar.jsx
'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 shadow-sm h-[98px] flex items-center">
      <div className="max-w-[1440px] mx-auto w-full px-12 md:px-36 flex items-center justify-between">
        {/* Kiri: Logo + Teks sesuai branding Figma */}
        <Link href="/" className="flex items-center gap-3">
          <Image 
            src="/logo-scs.svg" 
            alt="Sinar Cerah Sempurna" 
            width={51} 
            height={51} 
            className="w-[51px] h-[51px] object-contain"
          />
          <span className="font-extrabold text-[20px] text-[#002388] tracking-tight font-sans">
            Sinar Cerah Sempurna
          </span>
        </Link>

        {/* Kanan: Group Aksi Tombol + Burger */}
        <div className="flex items-center gap-6">
          {/* Tombol Hubungi Kami di sebelah burger */}
          <Link 
            href="/hubungi-kami" 
            className="bg-gradient-to-r from-[#004C99] to-[#002388] hover:from-[#002388] hover:to-[#013E7B] text-white px-6 py-3 rounded-xl text-sm font-bold tracking-wide shadow-md transition duration-300"
          >
            Hubungi Kami
          </Link>
          
          {/* Burger Menu Kosong */}
          <button className="p-2 hover:bg-slate-100 rounded-lg transition" aria-label="Menu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-8 h-8 text-[#002388]">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6h16.5" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
}