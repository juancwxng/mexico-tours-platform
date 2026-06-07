"use client";

import { useState, useMemo } from "react";
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
  title?: string;
}

export default function TourCarousel({ images, title }: TourCarouselProps) {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  // Memoize slides array to prevent recreation on every render
  const slides = useMemo(() => images.map((src) => ({ src })), [images]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400 text-sm">{t("tour_no_images")}</span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  // Safe fallback for alt text if title is missing
  const safeTitle = title || t("tour_image_fallback") || "Tour";

  return (
    <>
      {/* miniature carousel */}
      <div
        role="button"
        tabIndex={0}
        aria-label={t("tour_open_lightbox") || "Abrir galería"}
        className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group cursor-zoom-in outline-none focus-visible:ring-2 focus-visible:ring-navy"
        onClick={() => setLightboxOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setLightboxOpen(true);
          }
        }}
      >
        <Image
          key={current}
          src={images[current]}
          alt={`${safeTitle} — ${current + 1} / ${images.length}`}
          fill
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 420px"
          priority={current === 0}
        />

        {/* zoom icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <ZoomIn className="w-4 h-4 text-white" />
        </div>

        {images.length > 1 && (
          <>
            {/* Hidden preload: next image */}
            <Image
              key={`preload-next-${(current + 1) % images.length}`}
              src={images[(current + 1) % images.length]}
              alt=""
              fill
              className="object-cover opacity-0 pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 420px"
              loading="eager"
            />
            {/* Hidden preload: previous image */}
            <Image
              key={`preload-prev-${(current - 1 + images.length) % images.length}`}
              src={images[(current - 1 + images.length) % images.length]}
              alt=""
              fill
              className="object-cover opacity-0 pointer-events-none"
              sizes="(max-width: 1024px) 100vw, 420px"
              loading="eager"
            />

            {/* Controls */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t("tour_prev") || "Imagen anterior"}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-navy outline-none"
            >
              <ChevronLeft className="w-5 h-5 text-navy" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label={t("tour_next") || "Siguiente imagen"}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-navy outline-none"
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrent(i);
                  }}
                  aria-label={`${t("tour_image") || "Imagen"} ${i + 1}`}
                  className={`h-2 rounded-full transition-all outline-none focus-visible:ring-2 focus-visible:ring-navy ${
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
        render={{
          slide: ({ slide }) => (
            <div
              key={slide.src}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={slide.src}
                alt={safeTitle}
                fill
                className="object-contain"
                sizes="100vw"
              />
            </div>
          ),
        }}
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />
    </>
  );
}
