import Pagination from "@/components/shared/Pagination";
import NewsList from "@/components/views/berita/NewsList";

export const metadata = {
  title: "Berita & Pembaruan | PT Sinar Cerah Sempurna",
};

export default async function BeritaPage({ searchParams }) {
  const news = Array(9).fill(null).map((_, i) => ({
    id: i,
    title: "Peresmian Kantor Baru PT Sinar Cerah Sempurna",
    desc: "Peresmian kantor baru ini tidak hanya menandai bertambahnya fasilitas operasional perusahaan, tetapi juga...",
    image: "/hero-bg.svg" 
  }));

  return (
    <main className="w-full bg-[#F1F1F1] min-h-screen pb-24">
      
      {/* HERO SECTION - Menggunakan h-screen agar sama persis dengan Landing Page */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center rounded-b-[64px] overflow-hidden bg-[#004282]">
        <div className="absolute inset-0 z-0">
          <img src="/hero-bg.svg" alt="Background Berita" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#004282]/85"></div>
        </div>

        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col gap-5">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight">
            Kilas Balik & Berita Terkini
          </h1>
          <p className="text-white/90 text-[17px] font-normal font-['Plus_Jakarta_Sans'] leading-relaxed max-w-[800px] mx-auto">
            Simak perjalanan dan perkembangan terbaru dari proyek-proyek strategis kami. Informasi seputar kemajuan, kolaborasi, dan dedikasi kami dalam menghadirkan solusi konstruksi berkualitas di Indonesia.
          </p>
        </div>
      </section>

      {/* KONTEN UTAMA */}
      <section className="relative z-20 -mt-8 px-6">
        <div className="bg-white rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] p-2 mx-auto w-full max-w-[800px] border border-neutral-100">
            <input 
              type="text" 
              placeholder="Cari Berita..." 
              className="bg-transparent pl-6 pr-6 py-2.5 w-full text-base font-['Plus_Jakarta_Sans'] text-neutral-600 focus:outline-none placeholder:text-neutral-400"
            />
        </div>
      </section>

      <section className="w-full pt-16 px-6">
         <div className="max-w-[1152px] mx-auto flex flex-col gap-8">
            <NewsList newsData={news} />
            <Pagination totalPages={3} basePath="/berita" />
         </div>
      </section>

    </main>
  );
}