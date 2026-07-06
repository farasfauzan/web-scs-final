// src/app/(public)/layout.js
import Link from 'next/link';
import Image from 'next/image';
import ChatbotButton from '@/components/landing/ChatbotButton';

export default function PublicLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#F1F1F1]">
      
      {/* GLOBAL NAVBAR */}
      <nav className="fixed top-0 w-full bg-transparent backdrop-blur-sm z-50 h-[98px] flex items-center px-6 md:px-36 border-b border-white/10">
        <div className="max-w-[1440px] mx-auto w-full flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <Image src="/logo-scs.svg" alt="Logo" width={49} height={49} className="shadow-white" />
            <span className="text-white text-2xl font-extrabold font-['Plus_Jakarta_Sans'] [text-shadow:_0px_0px_7px_rgb(255_255_255_/_0.50)]">
              Sinar Cerah Sempurna
            </span>
          </Link>
          <div className="flex flex-col gap-1.5 cursor-pointer">
            <div className="w-10 h-1 bg-white rounded" />
            <div className="w-10 h-1 bg-white rounded" />
            <div className="w-10 h-1 bg-white rounded" />
          </div>
        </div>
      </nav>

      {/* VIEWPORT PAGE ROUTER */}
      <main className="flex-grow">{children}</main>

      {/* FLOAT CHATBOT WIDGET */}
      <ChatbotButton />

      {/* GLOBAL FOOTER (Eksak CSS Figma) */}
      <footer className="w-full bg-gradient-to-r from-sky-900 to-sky-800 text-white py-16 px-6 md:px-36 border-t border-white/10">
        <div className="max-w-[1440px] mx-auto grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Image src="/logo-scs.svg" alt="Logo" width={51} height={51} />
              <h4 className="text-white text-xl font-extrabold font-['Plus_Jakarta_Sans']">Sinar Cerah Sempurna</h4>
            </div>
            <p className="text-white text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">Perusahaan konstruksi dan infrastruktur terpercaya di Indonesia dengan komitmen tinggi pada kualitas dan inovasi.</p>
          </div>
          
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white text-xl font-extrabold font-['Plus_Jakarta_Sans'] leading-6">Tautan Cepat</h4>
            <div className="flex flex-col gap-2 text-zinc-200 text-base font-normal font-['Plus_Jakarta_Sans']">
              <Link href="/" className="hover:text-white">Beranda</Link>
              <Link href="/tentang-kami" className="hover:text-white">Tentang Kami</Link>
              <Link href="/proyek" className="hover:text-white">Proyek</Link>
              <Link href="/berita" className="hover:text-white">Berita</Link>
              <Link href="/hubungi-kami" className="hover:text-white">Kontak</Link>
            </div>
          </div>

          <div className="md:col-span-4 space-y-6">
            <div className="space-y-2">
              <h4 className="text-white text-xl font-extrabold font-['Plus_Jakarta_Sans'] leading-6">Lokasi</h4>
              <p className="text-white text-base font-normal font-['IBM_Plex_Sans'] leading-6">Jl. Karangrejo Barat No 09. RT. 02 RW. 02 (Kp. Pentul), Tinjomoyo, Semarang</p>
            </div>
            <div className="text-white/80 text-sm font-normal font-['IBM_Plex_Sans']">© 2026 PT. Sinar Cerah Sempurna. All rights reserved.</div>
          </div>
        </div>
      </footer>

    </div>
  );
}