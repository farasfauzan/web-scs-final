import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-sky-950 via-sky-900 to-sky-850 text-white py-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
        
        {/* Kolom Kiri: Branding Perusahaan */}
        <div className="md:col-span-5 flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-yellow-400 fill-current" viewBox="0 0 24 24">
              <path d="M12 2L2 22h20L12 2zm0 4.18L18.82 19H5.18L12 6.18z"/>
            </svg>
            <span className="text-xl font-extrabold font-sans">Sinar Cerah Sempurna</span>
          </div>
          <p className="text-zinc-200 text-base font-normal font-sans leading-relaxed max-w-sm">
            Perusahaan konstruksi dan infrastruktur terpercaya di Indonesia dengan komitmen tinggi pada kualitas dan inovasi.
          </p>
          {/* Container Placeholder Media Sosial (Tanpa Emotikon) */}
          <div className="flex gap-4 items-center">
            <div className="w-8 h-8 bg-neutral-200/20 rounded-lg hover:bg-neutral-200/40 transition-colors cursor-pointer"></div>
            <div className="w-8 h-8 bg-neutral-200/20 rounded-lg hover:bg-neutral-200/40 transition-colors cursor-pointer"></div>
            <div className="w-8 h-8 bg-neutral-200/20 rounded-lg hover:bg-neutral-200/40 transition-colors cursor-pointer"></div>
          </div>
        </div>

        {/* Kolom Tengah: Tautan Cepat */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <h4 className="text-xl font-extrabold font-sans leading-none text-white border-b border-white/10 pb-2">Tautan Cepat</h4>
          <div className="flex flex-col gap-2 font-sans text-zinc-200">
            <Link href="/" className="hover:text-yellow-400 transition-colors">Beranda</Link>
            <Link href="/tentang-kami" className="hover:text-yellow-400 transition-colors">Tentang Kami</Link>
            <Link href="/proyek" className="hover:text-yellow-400 transition-colors">Proyek</Link>
            <Link href="/berita" className="hover:text-yellow-400 transition-colors">Berita</Link>
            <Link href="/hubungi-kami" className="hover:text-yellow-400 transition-colors">Kontak</Link>
          </div>
        </div>

        {/* Kolom Kanan: Informasi Lokasi & Hak Cipta */}
        <div className="md:col-span-4 flex flex-col justify-between h-full gap-8">
          <div className="flex flex-col gap-4">
            <h4 className="text-xl font-extrabold font-sans leading-none text-white border-b border-white/10 pb-2">Lokasi</h4>
            <p className="text-zinc-200 text-base font-normal font-ibm leading-relaxed">
              Jl. Karangrejo Barat No 09. RT. 02 RW. 02 (Kp. Pentul), Tinjomoyo, Semarang
            </p>
          </div>
          <p className="text-zinc-300 text-sm font-ibm">
            &copy; 2026 PT. Sinar Cerah Sempurna. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}