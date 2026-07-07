export const metadata = {
  title: "Tentang Kami",
};

export default function TentangKamiPage() {
  const values = [
    { icon: "M12 2L2 22h20L12 2z", title: "Integritas", desc: "Kami menjalankan bisnis dengan kejujuran, transparansi, dan tanggung jawab penuh." },
    { icon: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z", title: "Kualitas", desc: "Kami berkomitmen pada standar kualitas tertinggi dalam setiap proyek." },
    { icon: "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7z", title: "Inovasi", desc: "Mengeksplorasi teknologi dan metode baru untuk solusi efisien." },
    { icon: "M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z", title: "Kerja Sama Tim", desc: "Kolaborasi kuat antar tim adalah kunci keberhasilan setiap proyek." }
  ];

  return (
    <div className="w-full bg-zinc-100 min-h-screen pb-20">
      <div className="w-full h-[60vh] bg-sky-950 relative flex items-center justify-center rounded-bl-[64px] rounded-br-[64px] overflow-hidden pt-20">
        <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay" style={{ backgroundImage: `url('[https://placehold.co/1440x600](https://placehold.co/1440x600)')` }} />
        <div className="relative z-10 text-center max-w-4xl px-6 flex flex-col gap-6">
          <h1 className="text-white text-4xl md:text-5xl font-extrabold font-sans leading-tight">
            Membangun dengan Kepercayaan,<br/>Berkarya dengan Kualitas.
          </h1>
          <p className="text-zinc-200 text-base md:text-lg font-sans">
            Berpegang teguh pada motto &aposMemberi Kepuasan Kepada Relasi&apos, kami terus membangun kepercayaan dalam industri konstruksi melalui dedikasi tinggi.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 mt-16 flex flex-col gap-16">
        <div className="text-center flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold text-stone-900 font-sans">Tentang PT Sinar Cerah Sempurna</h2>
          <p className="text-stone-600 max-w-2xl mx-auto font-sans">
            Perusahaan konstruksi dan infrastruktur yang berpengalaman dalam pembangunan gedung, jalan, jembatan, dan berbagai proyek infrastruktur lainnya di Indonesia.
          </p>
        </div>

        <div className="bg-white rounded-3xl border border-neutral-200 p-8 md:p-12 shadow-sm text-center">
          <h3 className="text-2xl font-extrabold text-stone-900 mb-4 font-sans">Visi</h3>
          <p className="text-stone-600 mb-10 font-sans">Menjadi perusahaan konstruksi dan infrastruktur terdepan serta terpercaya di Indonesia.</p>
          
          <h3 className="text-2xl font-extrabold text-stone-900 mb-4 font-sans">Misi</h3>
          <ul className="text-stone-600 text-left list-disc list-inside flex flex-col gap-3 font-sans max-w-3xl mx-auto">
            <li>Memberikan layanan konstruksi berkualitas tinggi yang melampaui ekspektasi klien.</li>
            <li>Menerapkan praktik terbaik dalam pengelolaan kesehatan, keselamatan kerja, dan lingkungan.</li>
            <li>Mendorong inovasi melalui adopsi teknologi dan metodologi konstruksi mutakhir.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-3xl font-extrabold text-stone-900 font-sans text-center mb-10">Fondasi Utama Keunggulan Kami</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((val, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="w-12 h-12 shrink-0 border-2 border-neutral-300 rounded-xl flex items-center justify-center text-neutral-600">
                  <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d={val.icon}/></svg>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-stone-900 font-sans">{val.title}</h4>
                  <p className="text-sm text-stone-600 font-sans mt-1">{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}