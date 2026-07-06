'use client';
import Image from 'next/image';

export default function CarouselSection() {
  // Masukkan gambar-gambar yang kamu punya
  const images = ["/images/pekerja.png", "/images/crane.png", "/images/pekerja.png", "/images/crane.png"];
  
  // Gandakan array agar animasinya bisa berputar tanpa putus (Infinite Loop)
  const duplicatedImages = [...images, ...images];

  return (
    <div className="w-full bg-white py-16 overflow-hidden">
      {/* CSS untuk Animasi Looping Berjalan */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          /* Ubah 25s menjadi lebih kecil jika ingin gerakannya lebih cepat */
          animation: scroll 25s linear infinite; 
        }
        /* Berhenti saat kursor diarahkan ke gambar */
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Kontainer ditarik full-width tanpa padding agar menyentuh ujung layar */}
      <div className="flex gap-6 w-max animate-scroll px-3">
        {duplicatedImages.map((src, idx) => (
          <div key={idx} className="w-[320px] md:w-[400px] h-[220px] md:h-[280px] flex-shrink-0 bg-zinc-200 rounded-2xl overflow-hidden relative shadow-sm hover:shadow-md transition">
            <Image 
              src={src} 
              alt={`Galeri Proyek ${idx+1}`} 
              fill 
              className="object-cover" 
              onError={(e) => e.currentTarget.style.display = 'none'} 
            />
          </div>
        ))}
      </div>
    </div>
  );
}