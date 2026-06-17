export interface PostImage {
  src: string;          // path under /public
  alt: string;          // i18n-aware — always in post language
  altEn?: string;       // English alt
  width: number;        // intrinsic px
  height: number;       // intrinsic px
  caption?: string;
  captionEn?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  titleEn?: string;
  excerpt: string;
  excerptEn?: string;
  content: string[];
  contentEn?: string[];
  date: string;            // ISO 8601: "2026-01-27"
  lastModified?: string;   // ISO 8601 — used in sitemap & Article schema
  author: string;
  readingTimeMin: number;  // used in schema + UI

  // ── Social images ──────────────────────────────────────────────────────────
  ogImage: string;         // 1200×630 — Facebook / LinkedIn / Twitter card
  pinterestImage: string;  // 1000×1500 — Pinterest 2:3
  twitterImage?: string;   // 1200×675 — optional Twitter-specific crop
  instagramImage?: string; // 1080×1080 — optional square for IG / Threads

  // ── In-body images ────────────────────────────────────────────────────────
  // Mixed orientations: landscape (e.g. 1200×800), portrait (e.g. 800×1200).
  // Rendered inline in the article body between paragraphs.
  images?: PostImage[];

  // ── Taxonomy ──────────────────────────────────────────────────────────────
  tags?: string[];
  category?: string;
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
    lastModified: "2026-06-17",
    author: "Costa Franca Tours",
    readingTimeMin: 5,
    category: "Guías de Viaje",
    tags: ["Mazatlán", "guía de viaje", "playas", "tours", "Pacífico"],

    // Social images
    ogImage: "/images/blog/guia-mazatlan-og.jpg",             // 1200×630
    pinterestImage: "/images/blog/guia-mazatlan-pin.jpg",     // 1000×1500
    twitterImage: "/images/blog/guia-mazatlan-twitter.jpg",   // 1200×675
    instagramImage: "/images/blog/guia-mazatlan-square.jpg",  // 1080×1080

    // In-body images: landscape + portrait mix
    images: [
      {
        src: "/images/blog/guia-mazatlan-playas.jpg",    // 1200×800 landscape
        alt: "Vista panorámica de las playas de Mazatlán al atardecer",
        altEn: "Panoramic view of Mazatlán beaches at sunset",
        width: 1200,
        height: 800,
        caption: "Más de 21 km de playas bañadas por el Pacífico",
        captionEn: "Over 21 km of beaches bathed by the Pacific",
      },
      {
        src: "/images/blog/guia-mazatlan-centro.jpg",    // 800×1200 portrait
        alt: "Callejones históricos del Centro de Mazatlán con arquitectura porfiriana",
        altEn: "Historic alleyways of Mazatlán's Downtown with Porfirian architecture",
        width: 800,
        height: 1200,
        caption: "El Centro Histórico: patrimonio vivo de la ciudad",
        captionEn: "The Historic Downtown: the city's living heritage",
      },
      {
        src: "/images/blog/guia-mazatlan-isla-venados.jpg", // 1200×800 landscape
        alt: "Lancha llegando a Isla Venados con aguas turquesa",
        altEn: "Boat arriving at Deer Island with turquoise waters",
        width: 1200,
        height: 800,
        caption: "Isla Venados, un paraíso a 20 minutos del malecón",
        captionEn: "Deer Island, a paradise 20 minutes from the malecón",
      },
      {
        src: "/images/blog/guia-mazatlan-carnaval.jpg",   // 800×1200 portrait
        alt: "Desfile de Carnaval de Mazatlán con trajes de colores",
        altEn: "Mazatlán Carnival parade with colorful costumes",
        width: 800,
        height: 1200,
        caption: "El Carnaval de Mazatlán: uno de los más grandes del mundo",
        captionEn: "Mazatlán's Carnival: one of the largest in the world",
      },
    ],

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
 * Format ISO 8601 date. Appends T12:00:00 to prevent UTC-offset off-by-one.
 */
export function formatDate(isoDate: string, lang: "es" | "en" = "es"): string {
  return new Date(`${isoDate}T12:00:00`).toLocaleDateString(
    lang === "en" ? "en-US" : "es-MX",
    { year: "numeric", month: "long", day: "numeric" },
  );
}
