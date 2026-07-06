// src/components/landing/FooterSection.jsx
import Link from 'next/link';

export default function FooterSection() {
  return (
    <footer id="kontak" className="bg-gradient-to-br from-[#002388] to-[#013E7B] text-white pt-20 pb-8 px-6 scroll-mt-20">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Banner CTA Hubungi Kami */}
        <div className="bg-white/10 backdrop-blur-md rounded-3xl p-12 text-center max-w-4xl mx-auto space-y-6 border border-white/20">
          <h2 className="text-3xl font-black">Siap Mewujudkan Visi Konstruksi Anda?</h2>
          <p className="text-slate-200 text-sm md:text-base max-w-xl mx-auto">
            Apakah Anda memiliki proyek masa depan yang membutuhkan presisi dan kualitas? Hubungi kantor kami hari ini untuk solusi inovatif.
          </p>
          <Link 
            href="https://wa.me/62812XXXXXXXX" 
            target="_blank"
            className="inline-block bg-white text-[#002388] hover:bg-[#FFD700] hover:text-slate-950 px-8 py-3.5 rounded-xl font-bold text-lg shadow-lg transition-all"
          >
            Hubungi Kami via WhatsApp
          </Link>
        </div>

        {/* Susunan Grid Link & Lokasi dari Teks Figma */}
        <div className="grid md:grid-cols-12 gap-8 border-t border-white/10 pt-12 text-sm">
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-extrabold text-lg">PT Sinar Cerah Sempurna</h4>
            <p className="text-slate-300 leading-relaxed max-w-sm">
              Perusahaan konstruksi dan infrastruktur terpercaya di Indonesia dengan komitmen tinggi pada kualitas dan inovasi.
            </p>
          </div>
          
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-extrabold text-slate-100">Tautan Cepat</h4>
            <div className="flex flex-col gap-2 text-slate-300">
              <Link href="/" className="hover:text-white">Beranda</Link>
              <Link href="/tentang" className="hover:text-white">Tentang Kami</Link>
              <Link href="/proyek" className="hover:text-white">Proyek</Link>
              <Link href="/berita" className="hover:text-white">Berita</Link>
            </div>
          </div>

          <div className="md:col-span-4 space-y-3">
            <h4 className="font-extrabold text-slate-100">Lokasi Kantor Utama</h4>
            <p className="text-slate-300 leading-relaxed">
              Jl. Karangrejo Barat No 09. RT. 02 RW. 02 (Kp. Pentul), Tinjomoyo, Semarang, Jawa Tengah, Indonesia.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-slate-400 border-t border-white/5 pt-6">
          &copy; 2026 PT. Sinar Cerah Sempurna. All rights reserved.
        </div>
      </div>
    </footer>
  );
}