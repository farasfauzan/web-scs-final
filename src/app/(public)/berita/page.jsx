import Pagination from "@/components/shared/Pagination";

export const metadata = {
  title: "Berita & Pembaruan",
  description: "Berita terkini seputar proyek dan pencapaian PT Sinar Cerah Sempurna.",
};

export default async function BeritaPage({ searchParams }) {
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const news = Array(6).fill(null).map((_, i) => ({
    id: i,
    title: "Peresmian Kantor Baru PT Sinar Cerah Sempurna",
    desc: "Peresmian kantor baru ini tidak hanya menandai bertambahnya fasilitas operasional perusahaan, tetapi juga...",
    image: "[https://placehold.co/379x213](https://placehold.co/379x213)"
  }));

  const totalPages = 3;

  return (
    <div className="w-full bg-zinc-100 min-h-screen pb-20">
      <div className="w-full h-[50vh] bg-sky-950 relative flex items-center justify-center rounded-bl-[64px] rounded-br-[64px] overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url('[https://placehold.co/1440x500](https://placehold.co/1440x500)')` }} />
        <div className="relative z-10 text-center max-w-3xl px-6 flex flex-col gap-4">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold font-sans">Kilas Balik & Berita Terkini</h1>
          <p className="text-zinc-200 text-base md:text-lg font-sans">
            Simak perjalanan dan perkembangan terbaru dari proyek-proyek strategis kami.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-[-24px] relative z-20 flex flex-col gap-12">
        {/* Search Bar Berita */}
        <div className="bg-white rounded-full shadow-lg p-2 flex mx-auto w-full max-w-2xl relative">
            <input 
              type="text" 
              placeholder="Cari Berita..." 
              className="bg-transparent rounded-full pl-6 pr-12 py-3 w-full text-base font-sans focus:outline-none"
            />
            <button className="absolute right-3 top-2.5 w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center text-sky-950 hover:bg-yellow-500 transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
        </div>

        {/* Grid Berita */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {news.map((item) => (
            <div key={item.id} className="bg-white rounded-2xl border border-neutral-300 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all">
              <div className="w-full h-52 bg-neutral-200 relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${item.image}')` }} />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <h3 className="text-stone-900 text-xl font-semibold font-sans leading-snug">{item.title}</h3>
                <p className="text-stone-600 text-sm font-normal font-sans line-clamp-3">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <Pagination totalPages={totalPages} basePath="/berita" />
      </div>
    </div>
  );
}