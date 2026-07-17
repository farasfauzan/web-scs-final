"use client";
import { useState, useEffect } from "react";
import CldImg from "@/components/shared/CldImg";

export default function InteractiveGallery({ images }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [origin, setOrigin] = useState("center center");

  const closeModal = () => {
    setSelectedImage(null);
    setZoomLevel(1);
    setOrigin("center center");
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeModal();
    };

    if (selectedImage) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [selectedImage]);

  const handleWheelZoom = (e) => {
    if (e.deltaY < 0) {
      setZoomLevel((prev) => Math.min(prev + 0.3, 3));
    } else {
      setZoomLevel((prev) => {
        const newZoom = Math.max(prev - 0.3, 1);
        if (newZoom === 1) setOrigin("center center"); // Reset origin saat kembali normal
        return newZoom;
      });
    }
  };

  const handleMouseMove = (e) => {
    if (zoomLevel > 1) {
      // Kalkulasi posisi kursor relatif terhadap area gambar
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setOrigin(`${x}% ${y}%`);
    }
  };

  const toggleZoom = (e) => {
    if (zoomLevel === 1) {
      // Zoom ke titik yang tepat diklik oleh kursor
      const { left, top, width, height } =
        e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - left) / width) * 100;
      const y = ((e.clientY - top) / height) * 100;
      setOrigin(`${x}% ${y}%`);
      setZoomLevel(2.5);
    } else {
      setZoomLevel(1);
      setOrigin("center center");
    }
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 w-full">
        {images.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedImage(img)}
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

      {selectedImage && (
        <div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-6"
          role="dialog"
          aria-modal="true"
        >
          {/* Wadah Deteksi Kursor */}
          <div
            className="relative w-full max-w-5xl flex-1 min-h-0 flex items-center justify-center overflow-hidden"
            onWheel={handleWheelZoom}
            onMouseMove={handleMouseMove}
            onClick={toggleZoom}
          >
            {/* Pembungkus Animasi Skala */}
            <div
              className={`relative w-full h-full transition-transform duration-200 ease-out ${
                zoomLevel > 1 ? "cursor-zoom-out" : "cursor-zoom-in"
              }`}
              style={{
                transform: `scale(${zoomLevel})`,
                transformOrigin: origin,
              }}
            >
              <CldImg
                src={selectedImage.url}
                alt={selectedImage.caption || "Gambar diperbesar"}
                className="w-full h-full object-contain pointer-events-none"
              />
            </div>
          </div>

          <div className="flex flex-col items-center justify-center shrink-0 w-full pt-6 pb-2">
            {selectedImage.caption && (
              <p className="text-white text-[15px] md:text-lg font-medium text-center max-w-3xl px-4 mb-5 drop-shadow-md">
                {selectedImage.caption}
              </p>
            )}

            <button
              onClick={closeModal}
              className="w-14 h-14 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 hover:scale-110 shrink-0"
              aria-label="Tutup galeri"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
      )}
    </>
  );
}
