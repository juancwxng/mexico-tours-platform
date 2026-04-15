/**
 * src/lib/posts.ts
 *
 * Data layer for blog posts.
 * Add real posts here or replace with a CMS fetch when ready.
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string[];      // array of paragraphs (Spanish)
  contentEn?: string[];   // array of paragraphs (English)
  date: string;           // ISO 8601: "2026-01-27"
  author: string;
  ogImage: string;        // 1200×630 px — Facebook / Twitter / LinkedIn
  pinterestImage: string; // 1000×1500 px — Pinterest 2:3
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const posts: BlogPost[] = [
  {
    id: "1",
    slug: "guia-mazatlan-2026",
    title: "Guía Completa para Visitar Mazatlán en 2026",
    titleEn: "Complete Guide to Visiting Mazatlán in 2026",
    excerpt:
      "Todo lo que necesitas saber para planear tu viaje a la Perla del Pacífico: cuándo ir, qué hacer y los mejores tours.",
    excerptEn:
      "Everything you need to know to plan your trip to the Pearl of the Pacific: when to go, what to do, and the best tours.",
    date: "2026-01-27",
    author: "Costa Franca Tours",
    ogImage: "/images/blog/guia-mazatlan-og.jpg",
    pinterestImage: "/images/blog/guia-mazatlan-pin.jpg",
    content: [
      "Mazatlán, conocida como la Perla del Pacífico, es uno de los destinos costeros más vibrantes de México. Con más de 21 kilómetros de playas, un malecón histórico y una gastronomía de mariscos sin igual, la ciudad ofrece experiencias para todos los viajeros.",
      "La mejor época para visitar es de noviembre a mayo, cuando el clima es seco, las temperaturas rondan los 25–30 °C y el mar está en calma. El Carnaval de Mazatlán, celebrado en febrero o marzo, es uno de los más grandes del mundo y atrae a cientos de miles de visitantes.",
      "Para quienes buscan aventura en el mar, los paseos en lancha hacia las Islas Lobos y Venados son imperdibles. También existe la posibilidad de hacer pesca deportiva, snorkel y kayak en aguas cristalinas del Pacífico.",
      "El Centro Histórico de Mazatlán es Patrimonio de la Humanidad en proceso de nominación y destaca por su arquitectura porfiriana, el Teatro Ángela Peralta y los coloridos callejones de la zona de Olas Altas.",
      "Costa Franca Tours trabaja directamente con los mejores operadores locales para garantizarte la mejor experiencia, los precios más competitivos y la seguridad que mereces en cada aventura.",
    ],
    contentEn: [
      "Mazatlán, known as the Pearl of the Pacific, is one of Mexico's most vibrant coastal destinations. With over 21 kilometers of beaches, a historic malecón, and unparalleled seafood gastronomy, the city has something for every traveler.",
      "The best time to visit is from November to May, when the weather is dry, temperatures hover around 25–30 °C, and the sea is calm. Mazatlán's Carnival, held in February or March, is one of the largest in the world and draws hundreds of thousands of visitors.",
      "For those seeking adventure at sea, boat tours to Lobos and Venados Islands are unmissable. Sportfishing, snorkeling, and kayaking in the crystal-clear Pacific waters are also popular options.",
      "Mazatlán's Historic Downtown is in the process of UNESCO World Heritage nomination and is celebrated for its Porfirian architecture, the Ángela Peralta Theater, and the colorful alleyways of the Olas Altas area.",
      "Costa Franca Tours works directly with the best local operators to guarantee you the finest experience, the most competitive prices, and the safety you deserve on every adventure.",
    ],
  },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────

export function getPostBySlug(slug: string): BlogPost | undefined {
  return posts.find((p) => p.slug === slug);
}

/**
 * Format an ISO 8601 date string ("2026-01-27") into a human-readable string.
 *
 * We append "T12:00:00" so parsing is done in local time rather than UTC
 * midnight, preventing off-by-one-day errors in UTC-negative timezones like
 * America/Mazatlan (UTC-7).
 */
export function formatDate(isoDate: string, lang: "es" | "en" = "es"): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-MX",
    { year: "numeric", month: "long", day: "numeric" }
  );
}
