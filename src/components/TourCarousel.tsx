"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";
import { useT } from "@/context/LangContext";

// Lazy-load the lightbox so its JS (~60 KB) is never fetched on page load.
// It only loads when the user clicks a photo to open it.
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

interface TourCarouselProps {
  images: string[];
  title: string;
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

  // Lightbox slides: give the optimizer the full 2400px width so it serves
  // the highest-quality version when the image fills the whole screen.
  // `height` is a hint only — the lightbox uses object-contain so aspect
  // ratio is always preserved regardless of screen dimensions.
  const slides = images.map((src) => ({
    src,
    width: 2400,
    height: 1800, // 4:3 ratio — adjust if your photos are a different ratio
  }));

  return (
    <>
      {/* Carousel thumbnail */}
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
          // Sidebar is 420px wide on desktop, full-width on mobile/tablet.
          // The optimizer picks 400w on mobile and 800w on desktop (2x retina
          // of 420px) from deviceSizes [400, 800, 1200, 2400].
          sizes="(max-width: 1024px) 100vw, 420px"
          priority={current === 0}
          // quality=85 is the Next.js default and is fine for the thumbnail.
          // The lightbox overrides this with quality=90 for its full-size render.
        />

        {/* Zoom hint icon */}
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

      {/* Lightbox — only rendered (and its JS only fetched) when open=true */}
      {lightboxOpen && (
        <Lightbox
          open={lightboxOpen}
          close={() => setLightboxOpen(false)}
          slides={slides}
          index={current}
          on={{ view: ({ index }) => setCurrent(index) }}
          render={{
            slide: ({ slide }) => (
              <div className="relative w-full h-full">
                <Image
                  src={slide.src}
                  alt={title}
                  fill
                  className="object-contain"
                  // 100vw tells the optimizer this image fills the full screen,
                  // so it picks 2400w from deviceSizes — the sharpest version.
                  sizes="100vw"
                  // quality=90 for the lightbox: slightly higher than the default
                  // 85 because the image is the entire focus of attention here.
                  quality={90}
                  // priority here because the lightbox is user-initiated —
                  // when it opens, this image should load as fast as possible.
                  priority
                />
              </div>
            ),
          }}
          styles={{
            container: { backgroundColor: "rgba(0,0,0,0.95)" },
          }}
        />
      )}
    </>
  );
}
