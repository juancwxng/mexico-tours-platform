"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Clock } from "lucide-react";
import { useState } from "react";
import type { Tour } from "@/lib/tours";
import { useT } from "@/context/LangContext";
import { useLang } from "@/context/LangContext";

interface TourCardProps {
  tour: Tour;
  priority?: boolean;
}

const CATEGORY_COLORS: Record<string, string> = {
  paseo:    "bg-teal/10 text-teal-dark",
  aventura: "bg-orange-100 text-orange-700",
  cultural: "bg-purple-100 text-purple-700",
  aereo:    "bg-sky-100 text-sky-700",
};
const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  paseo:    { es: "Paseo", en: "Maritime" },
  aventura: { es: "Aventura", en: "Adventure" },
  cultural: { es: "Cultural", en: "Cultural" },
  aereo:    { es: "Aéreo", en: "Aerial" },
};

function ImageWithFallback({ src, alt, priority }: { src: string; alt: string; priority: boolean }) {
  const [imgSrc, setImgSrc] = useState(src);
  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="object-cover transition-transform duration-700 group-hover:scale-107"
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

  const catLabel = CATEGORY_LABELS[tour.category]?.[lang] ?? tour.category;
  const catColor = CATEGORY_COLORS[tour.category] ?? "bg-gold/10 text-gold-dark";

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-pearl-warm card-lift"
      style={{ boxShadow: "0 2px 20px rgba(26,58,80,0.07)" }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0 bg-pearl-warm">
        <ImageWithFallback src={initialSrc} alt={title} priority={priority} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/40 via-transparent to-transparent" />

        {/* Category pill */}
        <div className={`absolute top-3 left-3 teal-pill ${catColor}`}>
          {catLabel}
        </div>

        {/* Price badge */}
        {tour.price > 0 && (
          <div className="absolute top-3 right-3 price-badge px-3 py-1.5 text-center leading-none">
            <span className="block text-[0.6rem] uppercase tracking-wider opacity-70 mb-0.5">
              {t("tour_since")}
            </span>
            <span className="text-sm font-display">
              ${tour.price.toLocaleString("es-MX")}
            </span>
          </div>
        )}
        {tour.price === 0 && (
          <div className="absolute top-3 right-3 price-badge px-3 py-1.5">
            <span className="text-sm font-display">{t("tour_cotizar")}</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-2.5">
        {/* Location + duration */}
        <div className="flex items-center justify-between text-xs font-bold text-ink-muted uppercase tracking-wide">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-gold" />
            Mazatlán
          </span>
          {tour.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal" />
              {tour.duration}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-display text-[1.1rem] leading-snug text-navy group-hover:text-gold transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-ink-muted text-sm line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* CTA row */}
        <div className="pt-3 mt-auto border-t border-pearl-warm flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-navy font-bold text-[0.72rem] uppercase tracking-wider group-hover:text-gold transition-colors duration-300">
            {lang === "en" ? "View details" : "Ver detalles"}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {/* Dot accent */}
          <div className="w-2 h-2 rounded-full bg-gold/30 group-hover:bg-gold transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
