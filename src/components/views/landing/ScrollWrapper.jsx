import HeroSection from "./1-HeroSection";
import VisiMisiSection from "./2-VisiMisiSection";
import StatsCarouselSection from "./3-StatsCarouselSection";
import ProjectPreview from "./4-ProjectPreview";
import NewsPreview from "./5-NewsPreview";
import SinergiSection from "./6-SinergiSection";
import ContactCTA from "./7-ContactCTA";

export default function ScrollWrapper({
  heroData,
  statsData,
  projectsData,
  newsData,
  partnersData,
}) {
  return (
    <div className="w-full flex flex-col bg-[#F1F1F1]">
      <HeroSection data={heroData} />
      <VisiMisiSection />
      <StatsCarouselSection data={statsData} />
      <ProjectPreview data={projectsData} />
      <NewsPreview data={newsData} />
      <SinergiSection data={partnersData} />
      <ContactCTA />
    </div>
  );
}
