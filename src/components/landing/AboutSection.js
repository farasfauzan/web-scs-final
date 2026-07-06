// src/components/landing/AboutSection.jsx
export default function AboutSection() {
  const coreValues = [
    { title: "Visi dan Kolaborasi", desc: "Dengan tekad, idealisme, antusiasme, pengalaman, kerja keras dan tim yang solid, sehingga dapat maju berkembang dan dipercaya oleh pelanggan." },
    { title: "Keahlian & Praktik Berkelanjutan", desc: "Kami berkomitmen untuk memberikan hasil yang luar biasa dalam jangka waktu yang singkat dan menghemat biaya, dengan menggunakan metode dan praktik yang berkelanjutan." },
    { title: "Nilai & Fokus Masa Depan", desc: "Dengan integritas, transparansi, dan pemahaman yang dalam tentang lingkungan bangunan, kami berkomitmen untuk membangun masa depan bersama Anda." }
  ];

  return (
    <section className="py-24 bg-[#F1F1F1] px-6">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Header Teks */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
            Membangun Kualitas Merajut Masa Depan
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-relaxed">
            Dengan Visi, Misi, semangat, dan pandangan jauh ke depan, kami menghadirkan bangunan transformatif yang tahan uji waktu. Setiap proyek mencerminkan komitmen kami terhadap kualitas, inovasi, dan nilai jangka panjang.
          </p>
        </div>

        {/* 3 Kotak Nilas Visi */}
        <div className="grid md:grid-cols-3 gap-6">
          {coreValues.map((val, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <h3 className="font-bold text-lg text-slate-900 mb-3">{val.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>

        {/* Carousel / Banner Foto Proyek Komersial (Simulasi Grid 7 Foto Horizontal) */}
        <div className="w-full overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300">
          <div className="flex gap-4 min-w-[1200px] h-64">
            {/* Iterasi contoh kotak foto carousel (bisa kamu isi sampai 7 gambar) */}
            {[1, 2, 3, 4, 5, 6, 7].map((num) => (
              <div key={num} className="w-80 h-full rounded-2xl bg-slate-300 overflow-hidden flex-shrink-0 group relative shadow-md">
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10"></div>
                <img src={`/proyek/carousel-${num}.jpg`} alt={`Proyek ${num}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" />
                <span className="absolute bottom-4 left-4 text-white font-bold text-sm z-20">Proyek Infrastruktur {num}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Counter Pencapaian Biru */}
        <div className="bg-[#002388] rounded-3xl p-8 text-white grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-[#004C99]/30 mix-blend-overlay"></div>
          <div><h3 className="text-4xl font-extrabold text-[#FFD700]">5+</h3><p className="text-sm text-slate-200 mt-1 font-medium">Proyek Selesai</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#FFD700]">50+</h3><p className="text-sm text-slate-200 mt-1 font-medium">Klien Puas</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#FFD700]">25+</h3><p className="text-sm text-slate-200 mt-1 font-medium">Tahun Pengalaman</p></div>
          <div><h3 className="text-4xl font-extrabold text-[#FFD700]">200+</h3><p className="text-sm text-slate-200 mt-1 font-medium">Tim Profesional</p></div>
        </div>
      </div>
    </section>
  );
}