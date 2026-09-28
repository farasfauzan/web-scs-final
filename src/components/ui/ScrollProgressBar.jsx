"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Bilah progres tipis di bagian paling atas halaman yang mengikuti posisi scroll.
 */
export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#FFD700] to-[#FFC107] origin-left z-[80] pointer-events-none"
      aria-hidden="true"
    />
  );
}
