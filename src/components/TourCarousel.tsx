"use client";

import { useState, useMemo, useEffect, useRef, useCallback } from "react";
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
  imageAlts?: string[];
}

export default function TourCarousel({
  images,
  title,
  imageAlts,
}: TourCarouselProps) {
  const t = useT();
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [loaded, setLoaded] = useState<Record<number, boolean>>({});
  const prevRef = useRef(current);

  const safeTitle = title || t("tour_image_fallback") || "Tour";

  const getAlt = useCallback(
    (i: number) =>
      imageAlts?.[i]?.trim() || `${safeTitle} — ${i + 1} / ${images.length}`,
    [imageAlts, safeTitle, images.length],
  );

  const slides = useMemo(
    () =>
      images.map((src, i) => ({
        src,
        alt: getAlt(i),
        width: 2160,
        height: 1620,
      })),
    [images, getAlt],
  );

  useEffect(() => {
    if (images.length < 2) return;
    const indices = [
      (current + 1) % images.length,
      (current - 1 + images.length) % images.length,
    ];
    const links: HTMLLinkElement[] = [];
    indices.forEach((i) => {
      if (loaded[i]) return;
      const link = document.createElement("link");
      link.rel = "preload";
      link.as = "image";
      link.href = images[i];
      link.fetchPriority = "low";
      document.head.appendChild(link);
      links.push(link);
    });
    return () => links.forEach((l) => l.remove());
  }, [current, images, loaded]);

  useEffect(() => {
    prevRef.current = current;
  }, [current]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-[4/3] bg-gray-100 rounded-2xl flex items-center justify-center">
        <span className="text-gray-400 text-sm">{t("tour_no_images")}</span>
      </div>
    );
  }

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
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
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === current ? getAlt(i) : ""}
            fill
            className="object-cover transition-opacity duration-300"
            style={{
              opacity: i === current ? 1 : 0,
              zIndex: i === current ? 1 : 0,
            }}
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 420px"
            priority={i === 0}
            onLoad={() => setLoaded((prev) => ({ ...prev, [i]: true }))}
          />
        ))}

        <div
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
          style={{ zIndex: 2 }}
        >
          <ZoomIn className="w-4 h-4 text-white" />
        </div>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label={t("tour_prev") || "Imagen anterior"}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors shadow-md focus-visible:ring-2 focus-visible:ring-navy outline-none"
              style={{ zIndex: 2 }}
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
              style={{ zIndex: 2 }}
            >
              <ChevronRight className="w-5 h-5 text-navy" />
            </button>

            <div
              className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5"
              style={{ zIndex: 2 }}
            >
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
        styles={{
          container: { backgroundColor: "rgba(0,0,0,0.95)" },
        }}
      />
    </>
  );
}
