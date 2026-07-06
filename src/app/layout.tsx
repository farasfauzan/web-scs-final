import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import "./globals.css";

// Konfigurasi Font Plus Jakarta Sans
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Konfigurasi Font Montserrat
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

// Konfigurasi Metadata Web
export const metadata: Metadata = {
  title: "PT Sinar Cerah Sempurna",
  description: "Perusahaan konstruksi dan infrastruktur terpercaya di Indonesia dengan komitmen tinggi pada kualitas dan inovasi.",
};

// WAJIB ADA: Default export komponen layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${montserrat.variable}`}>
      <body className="antialiased font-sans bg-[#F1F1F1] text-slate-900">
        {children}
      </body>
    </html>
  );
}