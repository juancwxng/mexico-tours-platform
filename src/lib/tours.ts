/**
 * src/lib/tours.ts
 *
 * Data layer for tours.
 *
 * Currently backed by a static array — swap this for a CMS/DB call
 * when content is ready without touching any page components.
 */

export interface PriceItem {
  label: string;
  price: number; // 0 = "Cotizar"
}

export interface Tour {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;        // English title (optional until translated)
  category: "paseo" | "aventura" | "cultural" | "aereo";
  price: number;           // lowest price in the priceList, in MXN
  description: string;
  descriptionEn?: string;  // English description (optional)
  imageCount: number;
  includes: string[];
  includesEn?: string[];
  duration: string;
  schedule: string;
  priceList: PriceItem[];
}

// ─── Data ────────────────────────────────────────────────────────────────────
// Replace placeholder entries with real tour data before going live.

export const tours: Tour[] = [
  {
    id: "1",
    slug: "example-tour",
    title: "Nombre del Tour",
    titleEn: "Tour Name",
    category: "paseo",
    price: 500,
    description: "Descripción del tour. Reemplazar con contenido real.",
    descriptionEn: "Tour description. Replace with real content.",
    imageCount: 0,
    includes: ["Elemento uno", "Elemento dos"],
    includesEn: ["Item one", "Item two"],
    duration: "3 Horas",
    schedule: "Lun–Dom: 9:00 AM",
    priceList: [
      { label: "Adulto", price: 500 },
      { label: "Niño",   price: 300 },
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Returns an array of image paths for a tour.
 * Returns [] when imageCount === 0 so TourCarousel owns its empty-state UI.
 */
export function getTourImages(slug: string, count: number): string[] {
  if (count === 0) return [];
  return Array.from({ length: count }, (_, i) => `/images/tours/${slug}/${i + 1}.webp`);
}

export function getTourBySlug(slug: string): Tour | undefined {
  return tours.find((t) => t.slug === slug);
}

/**
 * Filter + search tours.
 *
 * @param category  category slug or "all" / undefined
 * @param query     free-text search (matches title, description)
 * @returns filtered subset of tours
 *
 * Security note: `query` comes from URL search params and is compared against
 * static data only — never injected into the DOM as raw HTML. Safe.
 */
export function filterTours(
  category?: string | null,
  query?: string | null
): Tour[] {
  let result = tours;

  if (category && category !== "all") {
    result = result.filter((t) => t.category === category);
  }

  if (query) {
    // Normalize and sanitize: strip control chars, collapse whitespace, lowercase
    const q = query
      .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
      .trim()
      .toLowerCase()
      .slice(0, 100); // cap length to prevent DoS on large inputs
    if (q.length > 0) {
      result = result.filter(
        (t) =>
          t.title.toLowerCase().includes(q) ||
          (t.titleEn ?? "").toLowerCase().includes(q) ||
          t.description.toLowerCase().includes(q) ||
          (t.descriptionEn ?? "").toLowerCase().includes(q)
      );
    }
  }

  return result;
}

/** All unique categories present in the tours array. */
export function getCategories(): Tour["category"][] {
  return Array.from(new Set(tours.map((t) => t.category)));
}
