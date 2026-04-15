"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight } from "lucide-react";
import { useState } from "react";
import type { Tour } from "@/lib/tours";
import { useT } from "@/context/LangContext";
import { useLang } from "@/context/LangContext";

interface TourCardProps {
  tour: Tour;
  priority?: boolean;
}

function ImageWithFallback({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover group-hover:scale-105 transition-transform duration-700"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      onError={() => setImgSrc("/images/placeholder.webp")}
    />
  );
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const t = useT();
  const { lang } = useLang();

  const title       = lang === "en" ? (tour.titleEn       ?? tour.title)       : tour.title;
  const description = lang === "en" ? (tour.descriptionEn ?? tour.description) : tour.description;

  const initialSrc =
    tour.imageCount > 0
      ? `/images/tours/${tour.slug}/1.webp`
      : "/images/placeholder.webp";

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col h-full bg-white rounded-3xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden hover:-translate-y-1"
    >
      <div className="relative h-64 overflow-hidden flex-shrink-0">
        <ImageWithFallback src={initialSrc} alt={title} priority={priority} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute bottom-4 right-4 bg-central-yellow text-central-blue font-bold px-3 py-1.5 rounded-xl text-sm shadow-lg font-display flex flex-col items-center leading-none">
          <span className="text-[10px] uppercase tracking-wider opacity-70 mb-0.5">
            {t("tour_since")}
          </span>
          <span>
            {tour.price > 0
              ? `$${tour.price.toLocaleString("es-MX")}`
              : t("tour_cotizar")}
          </span>
        </div>
      </div>

      <div className="p-6 flex-1 flex flex-col space-y-3">
        <div className="flex items-center gap-1.5 text-central-blue/50 text-xs font-bold uppercase tracking-wide">
          <MapPin className="w-3.5 h-3.5 text-central-yellow" />
          Mazatlán
        </div>
        <h3 className="font-display text-xl font-bold text-central-blue group-hover:text-central-yellow transition-colors leading-tight">
          {title}
        </h3>
        <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>
        <div className="pt-3 border-t border-gray-100">
          <span className="inline-flex items-center gap-1.5 text-central-blue font-bold text-xs uppercase tracking-wider group-hover:gap-2.5 transition-all">
            {lang === "en" ? "View details" : "Ver detalles"}{" "}
            <ArrowRight className="w-3.5 h-3.5 text-central-yellow" />
          </span>
        </div>
      </div>
    </Link>
  );
}
