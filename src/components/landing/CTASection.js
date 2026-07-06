import Image from 'next/image';

export default function CounterSection() {
  const stats = [
    { num: "5+", label: "Proyek Selesai" },
    { num: "50+", label: "Klien Puas" },
    { num: "25+", label: "Tahun Pengalaman" },
    { num: "200+", label: "Tim Profesional" }
  ];

  return (
    <div className="w-full bg-white px-6 md:px-36 pb-20">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Kontainer dengan Background Gambar */}
        <div className="w-full rounded-3xl p-10 md:p-14 grid grid-cols-2 md:grid-cols-4 gap-8 text-center shadow-lg relative overflow-hidden">
          
          {/* Latar Belakang Gambar Hero */}
          <Image src="/hero-bg.svg" alt="Background Counter" fill className="object-cover object-center z-0" />
          
          {/* Overlay Biru agar teks tetap kontras */}
          <div className="absolute inset-0 bg-[#003380]/85 mix-blend-multiply z-10" />
          <div className="absolute inset-0 bg-blue-900/70 z-10" />

          {/* Konten Teks (z-20 agar berada di atas gambar) */}
          {stats.map((stat, i) => (
            <div key={i} className="space-y-3 relative z-20">
              <div className="text-white text-4xl md:text-5xl font-extrabold font-['Plus_Jakarta_Sans']">{stat.num}</div>
              <div className="text-white text-lg md:text-xl font-semibold font-['Plus_Jakarta_Sans']">{stat.label}</div>
            </div>
          ))}
          
        </div>
        
      </div>
    </div>
  );
}