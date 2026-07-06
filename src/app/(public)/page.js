import HeroSection from '@/components/landing/HeroSection';
import ValueSection from '@/components/landing/ValueSection';
import CarouselSection from '@/components/landing/CarouselSection';
import CounterSection from '@/components/landing/CounterSection';
import ProjectPreview from '@/components/landing/ProjectPreview';
import NewsPreview from '@/components/landing/NewsPreview';
import CTASection from '@/components/landing/CTASection';

export default function LandingPage() {
  return (
    // Wadah utama aktifkan snap-y dan snap-mandatory
    <div className="w-full flex flex-col bg-[#F1F1F1] snap-y snap-mandatory">
      
      {/* SEKAT 1: HERO (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 flex flex-col justify-center">
        <HeroSection />
      </div>
      
      {/* SEKAT 2: VALUE & VISI (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 bg-white flex flex-col justify-center">
        <ValueSection />
      </div>

      {/* SEKAT 3: CAROUSEL GALERI (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 bg-white flex flex-col justify-center">
        <CarouselSection />
      </div>

      {/* SEKAT 4: COUNTER STATISTIK (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 bg-white flex flex-col justify-center">
        <CounterSection />
      </div>

      {/* SEKAT 5: CUPLIKAN PROYEK (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 bg-[#F1F1F1] flex flex-col justify-center">
        <ProjectPreview />
      </div>

      {/* SEKAT 6: CUPLIKAN BERITA (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 bg-white flex flex-col justify-center">
        <NewsPreview />
      </div>

      {/* SEKAT 7: CTA BANNER & FOOTER (Snap Start) */}
      <div className="w-full min-h-screen snap-start snap-always shrink-0 bg-[#F1F1F1] flex flex-col justify-between">
        <div className="flex-grow flex items-center justify-center">
          <CTASection />
        </div>
        {/* Footer dari layout akan otomatis menyambung dengan natural di bawah sini */}
      </div>

    </div>
  );
}