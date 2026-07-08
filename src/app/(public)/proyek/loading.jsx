import CardSkeleton from "@/components/ui/CardSkeleton";

export default function LoadingProyek() {
  return (
    <main className="w-full bg-[#F1F1F1] min-h-screen pb-24">
      
      {/* Skeleton Hero Section (Lengkungan bawah) */}
      <section className="relative w-full h-[600px] flex flex-col items-center justify-center rounded-b-[64px] overflow-hidden bg-[#004282] animate-pulse">
        <div className="relative z-10 max-w-4xl px-6 flex flex-col items-center text-center gap-6 mt-16 w-full">
          {/* Judul Hero Skeleton */}
          <div className="w-2/3 h-14 bg-white/20 rounded-2xl"></div>
          {/* Deskripsi Hero Skeleton (2 baris) */}
          <div className="w-full max-w-[693px] h-6 bg-white/20 rounded-md mt-4"></div>
          <div className="w-3/4 max-w-[500px] h-6 bg-white/20 rounded-md"></div>
        </div>
      </section>

      {/* Skeleton Grid Proyek (3 Kolom) */}
      <section className="w-full flex justify-center pt-24 px-6">
        <div className="max-w-[1152px] w-full grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Memanggil komponen CardSkeleton sebanyak 6 kali */}
          {Array(6).fill(0).map((_, idx) => (
            <CardSkeleton key={idx} />
          ))}
        </div>
      </section>

    </main>
  );
}