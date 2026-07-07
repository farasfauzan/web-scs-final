import FadeUp from "@/components/ui/FadeUp";

export default function VisiMisiSection() {
  const values = [
    { title: "Visi dan Kolaborasi", desc: "Dengan tekad, Idealisme, Antusiasme, Pengalaman, Kerja Keras dan Tim yang Solid, sehingga dapat maju berkembang dan dipercaya oleh pelanggan." },
    { title: "Keahlian dan Praktik Berkelanjutan", desc: "Kami berkomitmen untuk memberikan hasil yang luar biasa dalam jangka waktu yang singkat dan menghemat biaya, dengan menggunakan metode dan praktik yang berkelanjutan." },
    { title: "Nilai dan Fokus Pada Masa Depan", desc: "Dengan integritas, transparansi, dan pemahaman yang dalam tentang lingkungan bangunan, kami berkomitmen untuk membangun masa depan bersama Anda." }
  ];

  return (
    <section className="w-full bg-zinc-100 py-24 px-6 flex flex-col items-center">
      <div className="max-w-6xl mx-auto w-full flex flex-col gap-16 items-center">
        
        <FadeUp delay={0.1} className="max-w-3xl text-center flex flex-col gap-4">
          <h2 className="text-black text-4xl font-extrabold font-['Plus_Jakarta_Sans'] leading-10">
            Membangun Kualitas <br/>Merajut Masa Depan
          </h2>
          <p className="text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
            Dengan Visi, Misi, semangat, dan pandangan jauh ke depan, kami menghadirkan bangunan transformatif yang tahan uji waktu. Setiap proyek mencerminkan komitmen kami terhadap kualitas, inovasi, dan nilai jangka panjang.
          </p>
        </FadeUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {values.map((item, idx) => (
            <FadeUp key={idx} delay={0.2 + (idx * 0.1)}>
              <div className="bg-white rounded-2xl p-8 border border-neutral-300 flex flex-col gap-4 h-full">
                <div className="w-10 h-10 border-2 border-neutral-500 rounded-lg flex items-center justify-center"></div>
                <h3 className="text-stone-900 text-xl font-extrabold font-['Plus_Jakarta_Sans'] leading-6">
                  {item.title}
                </h3>
                <p className="text-black text-base font-normal font-['Plus_Jakarta_Sans'] leading-6">
                  {item.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}