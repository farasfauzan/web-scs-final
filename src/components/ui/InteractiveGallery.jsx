"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CldImg from "@/components/shared/CldImg";

export default function InteractiveGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [direction, setDirection] = useState(0);
  const touchStartX = useRef(null);

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const goTo = (idx) => {
    if (idx === selectedIndex) return;
    setDirection(idx > selectedIndex ? 1 : -1);
    setSelectedIndex(idx);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setDirection(1);
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
    setDirection(-1);
    setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowRight" && images.length > 1) handleNext();
      if (e.key === "ArrowLeft" && images.length > 1) handlePrev();
    };

    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedIndex, images]);

  // Dukungan geser (swipe) pada lightbox
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e) => {
    if (touchStartX.current === null || images.length <= 1) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      if (delta < 0) handleNext();
      else handlePrev();
    }
    touchStartX.current = null;
  };

  if (!images || images.length === 0) return null;

  const currentImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      {/* 1. Grid Galeri (Thumbnail) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedIndex(idx)}
            className="group relative aspect-square w-full overflow-hidden rounded-xl cursor-pointer bg-neutral-200 transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <CldImg
              src={img.url}
              alt={img.caption || `Galeri foto ${idx + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
              <svg
                className="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 3h.01"
                />
              </svg>
            </div>
          </div>
        ))}
      </div>

      {/* 2. Lightbox Modal */}
      <AnimatePresence>
        {currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-6"
            role="dialog"
            aria-modal="true"
            onClick={closeModal}
          >
            {/* Area Gambar & Navigasi */}
            <div
              className="relative w-full max-w-6xl flex-1 min-h-0 flex items-center justify-center overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {images.length > 1 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg"
                  aria-label="Foto Sebelumnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>
              )}

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={selectedIndex}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60, scale: 0.98 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: direction * -60, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <CldImg
                    src={currentImage.url}
                    alt={currentImage.caption || "Gambar galeri"}
                    className="w-full h-full object-contain select-none"
                    draggable={false}
                  />
                </motion.div>
              </AnimatePresence>

              {images.length > 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all hover:scale-105 active:scale-95 shadow-lg"
                  aria-label="Foto Selanjutnya"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              )}
            </div>

            {/* Area Footer (Caption & Close) */}
            <div
              className="flex flex-col items-center justify-center shrink-0 w-full pt-6 pb-2"
              onClick={(e) => e.stopPropagation()}
            >
              {currentImage.caption && (
                <p className="text-white text-[15px] md:text-lg font-medium text-center max-w-3xl px-4 mb-4 drop-shadow-md">
                  {currentImage.caption}
                </p>
              )}

              <div className="flex flex-col items-center gap-3">
                {/* Indikator Titik */}
                {images.length > 1 && (
                  <div className="flex items-center gap-1.5">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => goTo(idx)}
                        aria-label={`Lihat foto ${idx + 1}`}
                        aria-current={selectedIndex === idx ? "true" : undefined}
                        className={`rounded-full transition-all duration-300 ${
                          selectedIndex === idx
                            ? "w-6 h-2 bg-white"
                            : "w-2 h-2 bg-white/40 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Indikator Angka */}
                {images.length > 1 && (
                  <span className="text-white/60 text-[13px] font-semibold tracking-widest">
                    {selectedIndex + 1} / {images.length}
                  </span>
                )}

                {/* Tombol Close (Silang) */}
                <button
                  onClick={closeModal}
                  className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shrink-0"
                  aria-label="Tutup galeri"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
