import FadeUp from "@/components/ui/FadeUp";

export default function HeroSection() {
  return (
    // UBAH DI SINI: Ganti h-full menjadi min-h-screen dan beri sedikit padding atas/bawah
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center rounded-bl-[64px] rounded-br-[64px] overflow-hidden bg-sky-900 py-24">
      
      {/* Background Image & Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center mix-blend-overlay opacity-50"
        style={{ backgroundImage: `url('https://placehold.co/1444x796')` }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_49%_63%,_var(--tw-gradient-stops))] from-sky-800/90 to-sky-900/90" />
      
      {/* Container Konten di Tengah */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full flex flex-col items-start gap-6">
        <FadeUp delay={0.1}>
          <span className="text-white text-xl md:text-2xl font-semibold font-['Montserrat'] tracking-wide uppercase">
            PT SINAR CERAH SEMPURNA
          </span>
        </FadeUp>
        
        <FadeUp delay={0.2}>
          <h1 className="max-w-4xl leading-tight">
            <span className="text-yellow-400 text-5xl md:text-6xl font-bold font-['Times_New_Roman'] italic">Integrity</span>
            <span className="text-white text-5xl md:text-6xl font-normal font-['Times_New_Roman']"> isn&apos;t just a policy—it&apos;s the standard we build by. Your </span>
            <span className="text-yellow-400 text-5xl md:text-6xl font-bold font-['Times_New_Roman'] italic">trust</span>
            <span className="text-white text-5xl md:text-6xl font-normal font-['Times_New_Roman']"> is our greatest structure.</span>
          </h1>
        </FadeUp>
        
        <FadeUp delay={0.3}>
          <p className="text-white text-base md:text-lg font-medium font-['Plus_Jakarta_Sans'] leading-relaxed max-w-2xl mt-2">
            PT Sinar Cerah Sempurna adalah perusahaan konstruksi dan infrastruktur yang berpengalaman dalam pembangunan gedung, jalan, jembatan, dan berbagai proyek infrastruktur lainnya di Indonesia.
          </p>
        </FadeUp>
      </div>
    </section>
  );
}