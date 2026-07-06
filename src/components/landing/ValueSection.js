export default function ValueSection() {
  const values = [
    { title: "Visi dan Kolaborasi", desc: "Dengan tekad, Idealisme, Antusiasme, Pengalaman, Kerja Keras dan Tim yang Solid, sehingga dapat maju berkembang dan dipercaya oleh pelanggan." },
    { title: "Keahlian dan Praktik Berkelanjutan", desc: "Kami berkomitmen untuk memberikan hasil yang luar biasa dalam jangka waktu yang singkat dan menghemat biaya, dengan menggunakan metode dan praktik yang berkelanjutan." },
    { title: "Nilai dan Fokus Pada Masa Depan", desc: "Dengan integritas, transparansi, dan pemahaman yang dalam tentang lingkungan bangunan, kami berkomitmen untuk membangun masa depan bersama Anda." }
  ];

  return (
    <div className="w-full max-w-[1440px] mx-auto px-6 md:px-36 space-y-16 pt-[98px] pb-12">
      <div className="text-center max-w-[693px] mx-auto space-y-4">
        <h2 className="text-black text-4xl font-extrabold font-['Plus_Jakarta_Sans'] leading-10">Membangun Kualitas <br/>Merajut Masa Depan</h2>
        <p className="text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
          Dengan Visi, Misi, semangat, dan pandangan jauh ke depan, kami menghadirkan bangunan transformatif yang tahan uji waktu. Setiap proyek mencerminkan komitmen kami terhadap kualitas, inovasi, dan nilai jangka panjang.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {values.map((item, index) => (
          <div key={index} className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm flex items-start gap-4 hover:shadow-md transition duration-300">
            <div className="w-8 h-8 bg-neutral-500 rounded-full flex-shrink-0" />
            <div className="space-y-2">
              <h3 className="text-black text-xl font-extrabold font-['Plus_Jakarta_Sans'] leading-6">{item.title}</h3>
              <p className="text-neutral-600 text-sm md:text-base font-normal font-['Plus_Jakarta_Sans'] leading-relaxed">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}