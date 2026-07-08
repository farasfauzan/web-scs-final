export default function CardSkeleton() {
  return (
    <div className="bg-white rounded-[24px] overflow-hidden flex flex-col shadow-sm border border-neutral-200 h-full animate-pulse w-full">
      
      {/* Skeleton Gambar */}
      <div className="w-full h-52 bg-neutral-200 shrink-0"></div>
      
      {/* Skeleton Teks & Konten */}
      <div className="p-8 flex flex-col gap-4 flex-grow">
        {/* Kategori */}
        <div className="w-24 h-5 bg-neutral-200 rounded-md"></div>
        
        {/* Judul (2 baris) */}
        <div className="flex flex-col gap-2 mt-2">
          <div className="w-full h-6 bg-neutral-200 rounded-md"></div>
          <div className="w-3/4 h-6 bg-neutral-200 rounded-md"></div>
        </div>
        
        {/* Lokasi & Klien (Di bawah) */}
        <div className="flex flex-col gap-3 mt-auto pt-6">
          <div className="w-1/2 h-4 bg-neutral-200 rounded-md"></div>
          <div className="w-2/3 h-4 bg-neutral-200 rounded-md"></div>
        </div>
      </div>

    </div>
  );
}