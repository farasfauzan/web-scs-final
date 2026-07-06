import Link from 'next/link';

export default function NewsPreview() {
  const emptyNews = [1, 2, 3];

  return (
    // pt-[120px] menjamin judul turun ke area aman yang dapat dilihat dengan jelas
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 pt-[120px] pb-16 space-y-10">
      
      <div className="text-center max-w-[693px] mx-auto space-y-4">
        <h2 className="text-black text-4xl font-extrabold font-['Plus_Jakarta_Sans'] leading-10">
          Kilas Balik & Berita Terkini
        </h2>
        <p className="text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
          Simak perjalanan dan perkembangan terbaru dari proyek-proyek strategis kami. Informasi seputar kemajuan, kolaborasi, dan dedikasi kami dalam menghadirkan solusi konstruksi berkualitas di Indonesia.
        </p>
      </div>

      {/* Grid Kartu Berita (Kosongan dari Admin) */}
      <div className="grid md:grid-cols-3 gap-8">
        {emptyNews.map((item) => (
          <div key={item} className="bg-white rounded-2xl overflow-hidden border border-neutral-200 shadow-sm flex flex-col hover:shadow-md transition">
            <div className="h-52 w-full bg-gray-200 flex items-center justify-center text-gray-400 text-sm font-medium">
              [Gambar Berita dari Admin]
            </div>
            <div className="p-6 space-y-3 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-stone-900 text-xl font-semibold font-['Plus_Jakarta_Sans']">
                  Judul Berita (Menunggu Data Admin)
                </h3>
                <p className="text-stone-600 text-sm font-normal font-['Plus_Jakarta_Sans'] line-clamp-2 mt-2">
                  Cuplikan isi berita akan dimuat secara otomatis dari database di sini...
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right">
        <Link href="/berita" className="inline-flex items-center gap-2 text-sky-800 text-sm font-extrabold font-['Plus_Jakarta_Sans'] group">
          Lihat Semua <span className="group-hover:translate-x-1 transition">&rarr;</span>
        </Link>
      </div>

    </div>
  );
}