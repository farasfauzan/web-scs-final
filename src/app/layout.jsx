import { Plus_Jakarta_Sans, Montserrat } from "next/font/google";
import "./globals.css";

// Definisi font Google
const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const FAVICON_URL = "/logo-scs.svg";

export const metadata = {
  // 1. SOLUSI WARNING METADATA
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || "https://sinarcerahsempurna.com",
  ),
  title: {
    default: "PT Sinar Cerah Sempurna | Perusahaan Konstruksi & Infrastruktur",
    template: "%s | PT Sinar Cerah Sempurna",
  },
  description:
    "Perusahaan konstruksi dan infrastruktur terpercaya di Indonesia dengan komitmen tinggi pada kualitas, integritas, dan inovasi.",
  icons: {
    icon: [{ url: FAVICON_URL, type: "image/svg+xml" }],
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#004282",
};

export default function RootLayout({ children }) {
  return (
    // 2. SOLUSI WARNING SCROLL BEHAVIOR
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${montserrat.variable}`}
      data-scroll-behavior="smooth"
    >
      <body>{children}</body>
    </html>
  );
}
