import FadeUp from "@/components/ui/FadeUp";
import { IMAGE_SIZES } from "@/lib/cloudinary";
import OptimizedImage from "@/components/shared/OptimizedImage";

export default function SinergiSection({ data }) {
  const fallbackNetworks = [
    { name: "PT Maharani Globalindo", logoUrl: "/logo-scs.svg" },
    { name: "PT Konstruksi Nusantara", logoUrl: "/logo-scs.svg" },
    { name: "CV Bangun Persada", logoUrl: "/logo-scs.svg" },
    { name: "PT Sinar Mandiri", logoUrl: "/logo-scs.svg" },
  ];

  const networks = data?.length > 0 ? data : fallbackNetworks;

  return (
    <section className="w-full flex flex-col items-center justify-center pt-6 pb-16 md:py-24 px-6 bg-[#F1F1F1]">
      <div className="max-w-[1152px] w-full flex flex-col items-center gap-10 md:gap-14">
        <FadeUp delay={0.1} className="text-center flex flex-col gap-3">
          <h2 className="text-[#1E1E1E] text-2xl md:text-4xl font-extrabold font-['Plus_Jakarta_Sans']">
            Sinergi Perusahaan
          </h2>
          <p className="text-neutral-500 text-sm md:text-base font-normal max-w-2xl mx-auto">
            Jaringan kemitraan strategis kami untuk memberikan layanan
            konstruksi terintegrasi dan komprehensif.
          </p>
        </FadeUp>

        <div className="flex flex-wrap justify-center gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-14 w-full mt-4">
          {networks.map((item, idx) => {
            const displayName = item.name || item.title || "Mitra Perusahaan";
            const logo = item.logoUrl || item.image || "/logo-scs.svg";
            const hasLink = !!item.linkUrl;
            const WrapperComponent = hasLink ? "a" : "div";

            return (
              <FadeUp
                key={idx}
                delay={0.2 + Math.min(idx * 0.1, 0.8)}
                className="flex flex-col items-center text-center w-[140px] md:w-[180px]"
              >
                {/* 
                  KUNCI PERBAIKAN: Jika ada link, seluruh kartu (gambar dan teks) 
                  dibungkus SATU tag anchor luar. Tidak boleh ada tag anchor bersarang.
                */}
                <WrapperComponent
                  href={item.linkUrl || undefined}
                  target={hasLink ? "_blank" : undefined}
                  rel={hasLink ? "noopener noreferrer" : undefined}
                  className={`group flex flex-col items-center gap-3 md:gap-4 ${
                    hasLink ? "cursor-pointer" : ""
                  }`}
                  aria-label={
                    hasLink ? `Kunjungi situs web ${displayName}` : undefined
                  }
                >
                  <div
                    className={`relative w-20 h-20 md:w-32 md:h-32 bg-white rounded-full flex items-center justify-center overflow-hidden shrink-0 border border-neutral-200 shadow-sm p-3 md:p-4 ${
                      hasLink
                        ? "group-hover:scale-105 group-hover:shadow-md transition-all duration-300"
                        : ""
                    }`}
                  >
                    <OptimizedImage
                      src={logo}
                      alt={displayName}
                      fill
                      cldOptions={IMAGE_SIZES.avatar}
                      className="object-contain"
                    />
                  </div>

                  <h3
                    className={`text-black text-[15px] md:text-xl font-extrabold font-['Plus_Jakarta_Sans'] leading-tight transition-colors ${
                      hasLink ? "group-hover:text-[#004282]" : ""
                    }`}
                  >
                    {displayName}
                  </h3>

                  {item.desc && (
                    <p className="text-black text-xs md:text-sm font-normal font-['Plus_Jakarta_Sans'] hidden md:block">
                      {item.desc}
                    </p>
                  )}
                </WrapperComponent>
              </FadeUp>
            );
          })}
        </div>
      </div>
    </section>
  );
}
