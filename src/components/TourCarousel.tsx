"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useT } from "@/context/LangContext";
import "yet-another-react-lightbox/styles.css";

const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

interface TourCarouselProps {
  images: string[];
  title: string;
}
function nextImageUrl(src: string, width: number): string {
  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=90`;
}

export default function TourCarousel({ images, title }: TourCarouselProps) {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400 text-sm">{t("tour_no_images")}</span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  // Each slide uses srcSet so YARL's native renderer picks the right size.
  // We provide 1200w and 2400w — the browser picks 2400w on retina screens
  // and 1200w on standard displays. YARL handles object-contain and all
  // the layout — no custom render.slide needed.
  const slides = images.map((src) => ({
    src: nextImageUrl(src, 1200),
    width: 1200,
    height: 900,
    srcSet: [
      { src: nextImageUrl(src, 1200), width: 1200, height: 900 },
      { src: nextImageUrl(src, 2400), width: 2400, height: 1800 },
    ],
  }));

  return (
    <>
      {/* Carousel thumbnail — uses Next.js <Image> for the card, which IS
          optimized correctly since it has a known container size */}
      <div
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in"
        onClick={() => setLightboxOpen(true)}
      >
        <Image
          key={current}
          src={images[current]}
          alt={`${title} — ${current + 1} / ${images.length}`}
          fill
          className="object-cover transition-opacity duration-300"
          sizes="(max-width: 1024px) 100vw, 420px"
          priority={current === 0}
        />

        {/* Zoom hint */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Imagen anterior"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Siguiente imagen"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>

            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  aria-label={`Imagen ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    i === current
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/80 w-2"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={slides}
        index={current}
        on={{ view: ({ index }) => setCurrent(index) }}
        carousel={{ imageProps: { sizes: "100vw" } }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />
    </>
  );
}
