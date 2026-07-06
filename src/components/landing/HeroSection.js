import Image from 'next/image';

export default function HeroSection() {
  return (
    <div className="w-full min-h-[90vh] flex items-center relative overflow-hidden rounded-b-[64px] px-8 md:px-36 pt-32 pb-20">
      <div 
        className="absolute inset-0 z-10 rounded-b-[64px]"
        style={{ background: 'radial-gradient(53.99% 143.4% at 48.63% 62.59%, rgba(0, 76, 153, 0.9) 0%, rgba(0, 65, 130, 0.9) 100%)' }}
      />
      <div className="absolute inset-0 w-full h-full z-0 rounded-b-[64px]">
        <Image src="/hero-bg.svg" alt="SCS Background" fill priority className="object-cover object-center" />
      </div>

      <div className="max-w-[1440px] mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-12 items-center relative z-20">
        <div className="md:col-span-7 space-y-6 text-left">
          <div className="text-white text-xl md:text-2xl font-semibold font-['Montserrat'] tracking-wide">
            PT SINAR CERAH SEMPURNA
          </div>
          <h1 className="text-white text-3xl md:text-[56px] lg:text-[64px] font-normal font-['Times_New_Roman'] leading-tight md:leading-[74px] tracking-tight">
            <span className="text-yellow-400 font-bold">Integrity</span> isn&apos;t just a policy—it’s the standard we build by. Your <span className="text-yellow-400 font-bold">trust</span> is our greatest structure.
          </h1>
          <p className="text-white text-sm md:text-base font-medium font-['Plus_Jakarta_Sans'] leading-relaxed max-w-[582px]">
            PT Sinar Cerah Sempurna adalah perusahaan konstruksi dan infrastruktur yang berpengalaman dalam pembangunan gedung, jalan, jembatan, dan berbagai proyek infrastruktur lainnya di Indonesia.
          </p>
        </div>

        <div className="md:col-span-5 hidden md:flex justify-end gap-6 h-[340px] relative">
          <div className="w-[190px] lg:w-[203px] h-[280px] lg:h-[301px] bg-zinc-300 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 transform -translate-y-6 relative">
            <Image src="/images/pekerja.png" alt="Pekerja" fill className="object-cover" />
          </div>
          <div className="w-[190px] lg:w-[203px] h-[280px] lg:h-[301px] bg-zinc-300 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 transform translate-y-6 relative">
            <Image src="/images/crane.png" alt="Crane Proyek" fill className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}