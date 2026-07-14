"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BurgerMenu({ isOpen, onClose, settings = {} }) {
  const pathname = usePathname();

  const mainLinks = [
    { name: "Beranda", href: "/" },
    { name: "Tentang Kami", href: "/tentang-kami" },
    { name: "Proyek", href: "/proyek" },
    { name: "Berita", href: "/berita" },
    { name: "Hubungi Kami", href: "/hubungi-kami" },
  ];

  const utilityLinks = [
    {
      name: "YouTube",
      href:
        settings.youtube_url ||
        "https://www.youtube.com/@sinarcerahsempurna8137",
    },
    {
      name: "Portal Aplikasi",
      href: settings.portal_app_url || "/portal-aplikasi",
    },
    { name: "SOP", href: settings.sop_url || "/sop" },
    {
      name: "Anak Perusahaan",
      href: settings.anak_perusahaan_url || "/anak-perusahaan",
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-40 transition-all duration-500 ease-in-out ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className={`absolute top-0 right-0 w-64 md:w-80 h-full bg-white shadow-2xl transition-transform duration-500 ease-in-out flex flex-col overflow-y-auto ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex flex-col p-8 pt-24 gap-6">
          {/* KOREKSI: Tambahkan lg:hidden agar seksi ini hancur/hilang di layar desktop */}
          <div className="flex flex-col gap-4 lg:hidden">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Menu Utama
            </span>
            {mainLinks.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={onClose}
                  className={`text-lg font-bold font-['Plus_Jakarta_Sans'] transition-colors ${isActive ? "text-yellow-500" : "text-[#004282] hover:text-sky-600"}`}
                >
                  {link.name}
                </Link>
              );
            })}
            <div className="w-full h-px bg-neutral-100 my-2"></div>
          </div>

          {/* Menu Utilitas - Selalu muncul baik di mobile maupun desktop */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
              Tautan Eksternal
            </span>
            {utilityLinks.map((link, idx) => {
              const isExternal = link.href.startsWith("http");
              const LinkComponent = isExternal ? "a" : Link;
              return (
                <LinkComponent
                  key={idx}
                  href={link.href}
                  target={isExternal ? "_blank" : undefined}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={onClose}
                  className="text-base font-semibold font-['Plus_Jakarta_Sans'] text-neutral-600 hover:text-sky-600 transition-colors"
                >
                  {link.name}
                </LinkComponent>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
