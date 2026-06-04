"use client";

import Image from "next/image";
import Link from "next/link";
import { MapPin, ArrowRight, Clock, Calendar } from "lucide-react";
import { useState } from "react";
import type { Tour } from "@/lib/tours";
import { useT } from "@/context/LangContext";
import { useLang } from "@/context/LangContext";

interface TourCardProps {
  tour: Tour;
  priority?: boolean;
}

// PATCH 5: all category colors now use dark text on light tint for legibility on white cards
const CATEGORY_COLORS: Record<string, string> = {
  paseo:    "bg-teal/12 text-teal-dark",
  aventura: "bg-amber-100 text-amber-800",
  cultural: "bg-purple-100 text-purple-800",
  aereo:    "bg-sky-100 text-sky-800",
};
const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  paseo:    { es: "Paseo",    en: "Maritime" },
  aventura: { es: "Aventura", en: "Adventure" },
  cultural: { es: "Cultural", en: "Cultural" },
  aereo:    { es: "Aéreo",    en: "Aerial" },
};

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
      className="object-cover transition-transform duration-700 group-hover:scale-105"
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      priority={priority}
      onError={() => setImgSrc("/images/placeholder.webp")}
    />
  );
}

export default function TourCard({ tour, priority = false }: TourCardProps) {
  const t = useT();
  const { lang } = useLang();

  const title = lang === "en" ? (tour.titleEn ?? tour.title) : tour.title;
  const description =
    lang === "en" ? (tour.descriptionEn ?? tour.description) : tour.description;
  const schedule =
    lang === "en" ? (tour.scheduleEn ?? tour.schedule) : tour.schedule;

  const initialSrc =
    tour.imageCount > 0
      ? `/images/tours/${tour.slug}/1.webp`
      : "/images/placeholder.webp";

  const catLabel = CATEGORY_LABELS[tour.category]?.[lang] ?? tour.category;
  const catColor = CATEGORY_COLORS[tour.category] ?? "bg-gold/10 text-navy";

  return (
    <Link
      href={`/tours/${tour.slug}`}
      className="group flex flex-col h-full rounded-2xl overflow-hidden card-lift bg-white border border-black/8"
      style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.25)" }}
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden flex-shrink-0 bg-navy-mid">
        <ImageWithFallback src={initialSrc} alt={title} priority={priority} />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent" />

        {/* Category pill — PATCH 5: uses .teal-pill base + per-category override */}
        <div className={`absolute top-3 left-3 teal-pill ${catColor}`}>
          {catLabel}
        </div>

        {/* Price badge */}
        {tour.price > 0 && (
          <div className="absolute top-3 right-3 price-badge px-3 py-1.5 text-center leading-none">
            <span className="block text-[0.6rem] uppercase tracking-wider opacity-60 mb-0.5">
              {t("tour_since")}
            </span>
            <span className="text-sm font-display text-gold">
              ${tour.price.toLocaleString("es-MX")}
            </span>
          </div>
        )}
        {tour.price === 0 && (
          <div className="absolute top-3 right-3 price-badge px-3 py-1.5">
            <span className="text-sm font-display text-gold">
              {t("tour_cotizar")}
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-2.5 bg-white">
        {/* Location + duration — PATCH 4: navy/70 (~5.1:1 on white) replaces navy-light/60 (~3.1:1) */}
        <div className="flex items-center justify-between text-xs font-bold text-navy/70 uppercase tracking-wide">
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-teal" />
            Mazatlán
          </span>
          {tour.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-teal" />
              {tour.duration}
            </span>
          )}
        </div>

        {/* Schedule — PATCH 4 */}
        {tour.schedule && (
          <div className="flex items-center gap-1 text-xs text-navy/70">
            <Calendar className="w-3 h-3 text-teal" /> {schedule}
          </div>
        )}

        {/* Title */}
        <h3 className="font-display text-[1.15rem] leading-snug text-navy group-hover:text-teal transition-colors duration-300">
          {title}
        </h3>

        {/* Description — PATCH 4: navy/75 (~5.5:1 on white) replaces navy-light/80 (~4.2:1) */}
        <p className="text-navy/75 text-sm line-clamp-2 leading-relaxed flex-1">
          {description}
        </p>

        {/* CTA row */}
        <div className="pt-4 mt-auto border-t border-navy/10 flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-navy font-bold text-[0.72rem] uppercase tracking-wider group-hover:text-teal transition-colors duration-300">
            {lang === "en" ? "View details" : "Ver detalles"}
            <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>
          {/* Teal dot accent */}
          <div className="w-2 h-2 rounded-full bg-teal/30 group-hover:bg-teal transition-colors duration-300" />
        </div>
      </div>
    </Link>
  );
}
