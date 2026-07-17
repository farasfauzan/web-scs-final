"use client";
import { useState, useEffect } from "react";
import CldImg from "@/components/shared/CldImg";

export default function InteractiveGallery({ images }) {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const closeModal = () => {
    setSelectedIndex(null);
  };

  const handleNext = (e) => {
    if (e) e.stopPropagation();
    setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handlePrev = (e) => {
    if (e) e.stopPropagation();
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
          </div>
        ))}
      </div>

      {/* 2. Lightbox Modal */}
      {currentImage && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Area Gambar & Navigasi */}
          <div className="relative w-full max-w-6xl flex-1 min-h-0 flex items-center justify-center overflow-hidden">
            {images.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
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

            <CldImg
              src={currentImage.url}
              alt={currentImage.caption || "Gambar galeri"}
              className="w-full h-full object-contain select-none"
            />

            {images.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/80 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-lg"
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
          <div className="flex flex-col items-center justify-center shrink-0 w-full pt-6 pb-2">
            {currentImage.caption && (
              <p className="text-white text-[15px] md:text-lg font-medium text-center max-w-3xl px-4 mb-5 drop-shadow-md">
                {currentImage.caption}
              </p>
            )}

            <div className="flex flex-col items-center gap-3">
              {/* Indikator Angka */}
              {images.length > 1 && (
                <span className="text-white/60 text-[13px] font-semibold tracking-widest">
                  {selectedIndex + 1} / {images.length}
                </span>
              )}

              {/* Tombol Close (Silang) - Ukuran Diperkecil */}
              <button
                onClick={closeModal}
                className="w-12 h-12 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shrink-0"
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
        </div>
      )}
    </>
  );
}
