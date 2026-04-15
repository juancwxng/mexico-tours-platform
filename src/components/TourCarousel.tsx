"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/context/LangContext";

interface TourCarouselProps {
  images: string[];
  title: string;
}

export default function TourCarousel({ images, title }: TourCarouselProps) {
  const t = useT();
  const [current, setCurrent] = useState(0);

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
    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
      <Image
        src={images[current]}
        alt={`${title} — ${current + 1} / ${images.length}`}
        fill
        className="object-cover transition-opacity duration-300"
        sizes="(max-width: 1024px) 100vw, 420px"
        priority={current === 0}
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            aria-label="Imagen anterior"
            className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronLeft className="w-5 h-5 text-central-blue" />
          </button>
          <button
            onClick={next}
            aria-label="Siguiente imagen"
            className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/80 hover:bg-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
          >
            <ChevronRight className="w-5 h-5 text-central-blue" />
          </button>

          <div className="absolute bottom-3 inset-x-0 flex justify-center gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                aria-label={`Imagen ${i + 1}`}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "bg-white w-4" : "bg-white/50 hover:bg-white/80 w-2"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
