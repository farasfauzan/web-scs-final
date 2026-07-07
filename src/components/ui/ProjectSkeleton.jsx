export default function ProjectSkeleton() {
  return (
    <div className="bg-white rounded-[20px] overflow-hidden flex flex-col shadow-sm w-full border border-neutral-100 animate-pulse">
      {/* Skeleton Gambar */}
      <div className="w-full h-[220px] bg-neutral-200"></div>
      
      {/* Skeleton Konten */}
      <div className="p-6 flex flex-col h-full">
        {/* Kategori */}
        <div className="w-24 h-4 bg-neutral-200 rounded mb-5"></div>
        
        {/* Judul (Dibuat 2 baris agar realistis) */}
        <div className="w-full h-6 bg-neutral-200 rounded mb-2"></div>
        <div className="w-3/4 h-6 bg-neutral-200 rounded mb-8"></div>
        
        {/* Footer: Lokasi & Klien */}
        <div className="flex flex-col gap-3 mt-auto">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-200 rounded-full shrink-0"></div>
            <div className="w-1/2 h-3 bg-neutral-200 rounded"></div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-neutral-200 rounded-full shrink-0"></div>
            <div className="w-2/3 h-3 bg-neutral-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  );
}