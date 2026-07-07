import Pagination from "@/components/shared/Pagination";

export const metadata = {
  title: "Proyek Kami",
  description: "Portofolio proyek konstruksi dan infrastruktur PT Sinar Cerah Sempurna.",
};

export default async function ProyekPage({ searchParams }) {
  // Simulasi fetch data & delay untuk memicu skeleton loading
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  const categories = ["Semua", "Rumah Sakit", "Gedung Pendidikan", "Pusat Perbelanjaan", "Lainnya"];
  
  // Simulasi data dari API
  const projects = Array(6).fill(null).map((_, i) => ({
    id: i,
    title: "Renovasi Eks Kantor menjadi Gedung Paviliun",
    category: "Rumah Sakit",
    location: "RSUD Aji Muhammad Parikesit",
    client: "Pemerintah Kabupaten Kutai Kartanegara",
    image: "[https://placehold.co/379x213](https://placehold.co/379x213)"
  }));

  const totalPages = 5; // Didapat dari metadata API

  return (
    <div className="w-full bg-zinc-100 min-h-screen pb-20">
      {/* Header Halaman */}
      <div className="w-full h-[50vh] bg-sky-950 relative flex items-center justify-center rounded-bl-[64px] rounded-br-[64px] overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url('[https://placehold.co/1440x500](https://placehold.co/1440x500)')` }} />
        <div className="relative z-10 text-center max-w-3xl px-6 flex flex-col gap-4">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold font-sans">Visi Kami dalam Karya</h1>
          <p className="text-zinc-200 text-base md:text-lg font-sans">
            Dedikasi kami tertuang dalam setiap detail proyek. Kami menggabungkan inovasi konstruksi dengan standar kualitas tertinggi.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 mt-[-30px] relative z-20 flex flex-col gap-12">
        {/* Filter Kategori */}
        <div className="bg-white rounded-full shadow-lg p-2 flex overflow-x-auto mx-auto max-w-4xl scrollbar-hide">
          {categories.map((cat, idx) => (
            <button 
              key={idx}
              className={`whitespace-nowrap px-6 py-3 rounded-full text-sm font-bold font-sans transition-colors ${
                idx === 0 ? "bg-sky-900 text-white shadow-md" : "text-neutral-500 hover:bg-neutral-100"
              }`}
            >
              {cat}
            </button>
          ))}
          <div className="relative ml-auto hidden md:block">
            <input 
              type="text" 
              placeholder="Cari..." 
              className="bg-neutral-100 rounded-full pl-4 pr-10 py-2.5 text-sm font-sans focus:outline-none focus:ring-2 focus:ring-sky-900 w-48"
            />
            <svg className="w-5 h-5 text-neutral-400 absolute right-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Grid Proyek */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="bg-white rounded-2xl border border-neutral-300 overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all">
              <div className="w-full h-52 bg-neutral-200 relative">
                <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${project.image}')` }} />
              </div>
              <div className="p-6 flex flex-col gap-3">
                <span className="text-blue-900 text-sm font-semibold font-sans">{project.category}</span>
                <h3 className="text-stone-900 text-xl font-semibold font-sans leading-snug">{project.title}</h3>
                <div className="flex flex-col gap-1 text-neutral-500 text-xs font-semibold mt-2 font-sans">
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                    {project.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                    {project.client}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Komponen Pagination */}
        <Pagination totalPages={totalPages} basePath="/proyek" />
      </div>
    </div>
  );
}