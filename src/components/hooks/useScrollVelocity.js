import { useScroll, useTransform } from "framer-motion";

export function useScrollVelocity(containerRef) {
  const { scrollYProgress } = useScroll({
    target: containerRef,
    // Pantau scroll dari ujung atas container hingga ujung bawah
    offset: ["start start", "end end"]
  });

  // Membagi 6 section menjadi 5 fase transisi (setiap fase berdurasi 16.6% atau 1/6 scroll)
  // Hanya menggunakan Scale (mengecil ke 0.95), HAPUS logika Opacity agar tidak tembus pandang
  return {
    section1: { scale: useTransform(scrollYProgress, [0, 0.166], [1, 0.95]) },
    section2: { scale: useTransform(scrollYProgress, [0.166, 0.333], [1, 0.95]) },
    section3: { scale: useTransform(scrollYProgress, [0.333, 0.500], [1, 0.95]) },
    section4: { scale: useTransform(scrollYProgress, [0.500, 0.666], [1, 0.95]) },
    section5: { scale: useTransform(scrollYProgress, [0.666, 0.833], [1, 0.95]) },
  };
}