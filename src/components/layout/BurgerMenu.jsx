"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";

export default function BurgerMenu({ isOpen, onClose }) {
  const menuLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Proyek", href: "/proyek" },
    { name: "Berita", href: "/berita" },
  ];

  const externalLinks = [
    { name: "Youtube SCS", href: "https://youtube.com" },
    { name: "Portal SCS", href: "#" },
    { name: "SOP SCS", href: "#" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay Transparan (Klik luar untuk menutup menu) */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm"
          />

          {/* Jendela Menu Melayang */}
          <motion.div 
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // Posisi top-24 memastikan letaknya berada tepat di bawah Navbar
            className="fixed top-24 right-6 md:right-12 z-50 bg-zinc-100 rounded-3xl p-6 w-72 shadow-2xl border border-neutral-200 flex flex-col gap-4"
          >
            {/* Header Menu (Tanda silang sudah dihapus dari sini) */}
            <div className="flex items-center gap-3 text-sky-950 mb-2">
              <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
              <span className="text-xl font-bold font-sans">Menu</span>
            </div>

            {/* Bagian Halaman Utama */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold text-sky-900 block mb-3">Halaman</span>
              <div className="flex flex-col gap-3">
                {menuLinks.map((link, idx) => (
                  <Link 
                    key={idx} 
                    href={link.href}
                    onClick={onClose}
                    className="text-lg font-bold text-sky-950 hover:text-sky-700 transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Bagian Tautan Eksternal */}
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <span className="text-xs font-bold text-sky-900 block mb-3">Lainnya</span>
              <div className="flex flex-col gap-3">
                {externalLinks.map((link, idx) => (
                  <a 
                    key={idx} 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="text-lg font-bold text-sky-950 hover:text-sky-700 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Tombol Alternatif di Dalam Menu (Muncul di layar kecil/mobile) */}
            <Link 
              href="/hubungi-kami"
              onClick={onClose}
              className="w-full bg-sky-950 text-white font-bold text-center py-3 rounded-xl hover:bg-sky-900 transition-colors mt-2"
            >
              Hubungi Kami
            </Link>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}