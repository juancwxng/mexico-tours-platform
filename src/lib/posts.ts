export interface PostImage {
  src: string; // path under /public
  alt: string; // i18n-aware — always in post language
  altEn?: string; // English alt
  width: number; // intrinsic px
  height: number; // intrinsic px
  caption?: string;
  captionEn?: string;
  afterParagraph: number; // 0 = after 1st paragraph, 1 = after 2nd, etc.
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
  date: string; // ISO 8601: "2026-01-27"
  lastModified?: string; // ISO 8601 — used in sitemap & Article schema
  author: string;
  readingTimeMin: number; // used in schema + UI

  // ── Social images ──────────────────────────────────────────────────────────
  ogImage: string; // 1200×630 — Facebook / LinkedIn / Twitter card
  pinterestImage: string; // 1000×1500 — Pinterest 2:3
  twitterImage?: string; // 1200×675 — optional Twitter-specific crop
  instagramImage?: string; // 1080×1080 — optional square for IG / Threads

  // ── In-body images ────────────────────────────────────────────────────────
  // Mixed orientations: landscape (e.g. 1200×800), portrait (e.g. 800×1200).
  // Rendered inline in the article body between paragraphs.
  images?: PostImage[];

  // ── Taxonomy ──────────────────────────────────────────────────────────────
  tags?: string[];
  tagsEn?: string[];
  category?: string;
  categoryEn?: string;
}

// ─── Data ────────────────────────────────────────────────────────────────────

export const posts: BlogPost[] = [
  {
    id: "1",
    slug: "olas-altas-mazatlan",
    title: "Descubre Olas Altas: El Corazón Histórico y Vibrante del Malecón",
    titleEn:
      "Discover Olas Altas: The Historic and Vibrant Heart of the Mazatlán Malecon",
    excerpt:
      "Descubre por qué Olas Altas es una parada obligatoria en el Malecón de Mazatlán. Conoce su playa, su historia, sus atardeceres y los mejores lugares para comer.",
    excerptEn:
      "Discover why Olas Altas is a must-visit spot on the Mazatlán Malecon. Explore its famous beach, rich history, breathtaking sunsets, and top oceanfront restaurants.",
    date: "2026-06-18",
    lastModified: "2026-06-18",
    author: "Juan C. Wong",
    readingTimeMin: 4,
    category: "Guías de Viaje",
    categoryEn: "Travel Guides",
    tags: [
      "Mazatlán",
      "Olas Altas",
      "Centro Histórico",
      "Malecón",
      "atardeceres",
    ],
    tagsEn: ["Mazatlan", "Water Front", "Sunsets", "Historic Center"],

    // Social Images
    ogImage: "/images/blog/olas-altas/op-olas-altas.webp",
    pinterestImage: "/images/blog/olas-altas/pinterest-olas-altas.webp",
    twitterImage: "/images/blog/olas-altas/xcard-olas-altas.webp",
    instagramImage: "/images/blog/olas-altas/instagram-olas-altas.webp",

    // In-body Images
    images: [
      {
        src: "/images/blog/olas-altas/olas-altas-manana.webp",
        alt: "Vista matutina de la playa de Olas Altas y el Cerro de la Nevería en Mazatlán",
        altEn: "Morning view of Olas Altas beach and Icebox Hill in Mazatlán",
        width: 1200,
        height: 800,
        caption:
          "Las mañanas revelan la tranquilidad de la playa y la emblemática arquitectura del Cerro de la Nevería.",
        captionEn:
          "Mornings reveal the calm beach and the iconic architecture of Icebox Hill in the background.",
        afterParagraph: 3,
      },
      {
        src: "/images/blog/olas-altas/olas-altas-atardecer.webp",
        alt: "Atardecer espectacular con olas en el malecón de Olas Altas",
        altEn: "Spectacular sunset with waves at the Olas Altas malecon",
        width: 1200,
        height: 800,
        caption:
          "Los atardeceres aquí son un espectáculo natural que reúne a locales y visitantes cada día.",
        captionEn:
          "Sunsets here are a natural spectacle that brings locals and visitors together daily.",
        afterParagraph: 5,
      },
      {
        src: "/images/blog/olas-altas/olas-altas-pin.webp",
        alt: "Vista vertical del oleaje rompiendo en las rocas frente al antiguo Colegio Pacífico",
        altEn:
          "Vertical view of waves crashing on the rocks in front of the old Colegio Pacífico",
        width: 800,
        height: 1200,
        caption:
          "La fuerza del Pacífico choca contra las rocas frente al emblemático edificio del antiguo Colegio Pacífico.",
        captionEn:
          "The force of the Pacific crashes against the rocks in front of the iconic old Colegio Pacífico building.",
        afterParagraph: 8,
      },
    ],

    content: [
      "Visitar la Perla del Pacífico y no recorrer Olas Altas es, casi literalmente, un pecado turístico. Esta emblemática sección del Malecón de Mazatlán es donde convergen la historia, la belleza natural y la vibrante vida social del puerto.",
      "Conectando de manera fluida con el pintoresco Paseo Claussen, Olas Altas goza de una ubicación privilegiada justo a las puertas del Centro Histórico. Para que te des una idea de su excelente conectividad, se encuentra a tan solo cuatro cuadras de la animada Plazuela Machado y a ocho de la majestuosa Catedral de Mazatlán.",
      "Caminar por esta zona durante la mañana y hacerlo por la tarde son experiencias totalmente diferentes, pero igualmente cautivadoras.",
      "Si decides dar un paseo matutino, te recibirá el resplandor de un mar azul profundo. Desde el malecón, podrás admirar la colorida arquitectura de las impresionantes mansiones que adornan el Cerro de la Nevería.",
      "Además, las mañanas son el momento perfecto para bajar a la arena, refrescarte y nadar en una de las playas más populares y con más historia desde la fundación de la ciudad.",
      "A medida que el sol comienza a bajar, la zona se transforma. Este es, sin duda, uno de los mejores puntos para apreciar el inigualable atardecer de Mazatlán. No hay nada como disfrutar de la fresca brisa del mar y escuchar cómo las olas revientan con fuerza contra las rocas mientras degustas una bebida bien fría.",
      "Olas Altas es mucho más que un paisaje; es el corazón social del puerto. Es el lugar predilecto de los mazatlecos de todas las edades para socializar, caminar y compartir tiempo con amigos y familiares. Gracias a su encanto, también es una zona muy frecuentada por la comunidad de extranjeros residentes.",
      "Si buscas practicar tu inglés u otros idiomas, el ambiente relajado del malecón lo convierte en el escenario ideal para hacer networking casual, conocer gente de todo el mundo y crear conexiones genuinas.",
      "Tu visita no estaría completa sin explorar la oferta culinaria y arquitectónica de la zona. Olas Altas aloja una excelente selección de restaurantes y cafés con vista al mar, ideales para un desayuno relajado o una cena romántica.",
      "Aquí también se erigen icónicos edificios que son verdaderas joyas históricas del puerto, destacando el Hotel Belmar, el Hotel Freeman y el histórico Colegio Pacífico. Estas propiedades datan casi desde la constitución de la ciudad como destino turístico y visitarlas es viajar en el tiempo a la época dorada de Mazatlán.",
    ],
    contentEn: [
      "Visiting the Pearl of the Pacific without strolling through Olas Altas is practically a tourist sin. This iconic section of the Mazatlán Malecon is where rich history, natural beauty, and the port's vibrant social life seamlessly converge.",
      "Flowing directly into the scenic Paseo Claussen, Olas Altas boasts a prime oceanfront location right at the gates of the Historic Center (Centro Histórico). To give you an idea of its excellent connectivity, it sits just four blocks away from the lively Plazuela Machado and eight blocks from the majestic Mazatlán Cathedral.",
      "Walking through this area in the morning versus the afternoon offers two entirely different, yet equally captivating, experiences.",
      "If you opt for a morning stroll, you'll be greeted by the sparkling deep blue sea. From the boardwalk, you can admire the colorful architecture of the stunning mansions perched on Icebox Hill (Cerro de la Nevería).",
      "Furthermore, mornings are the perfect time to step down onto the sand, cool off, and swim in one of the most popular and historically significant beaches since the city's foundation.",
      "As the sun begins to set, the area completely transforms. This is undoubtedly one of the best spots to witness an unparalleled Mazatlán sunset. There is nothing quite like enjoying the cool ocean breeze and listening to the crashing waves against the rocks while sipping on an ice-cold drink.",
      "Olas Altas is much more than a beautiful landscape; it is the social heart of the port. It's the favorite gathering place for locals of all ages to socialize, walk, and spend quality time with friends and family. Thanks to its charm, it is also a highly frequented hub for the resident expat community.",
      "If you're looking to practice your Spanish or mingle with other travelers, the relaxed atmosphere of the boardwalk makes it the ideal setting for casual networking, meeting people from all over the world, and building genuine connections.",
      "Your visit wouldn't be complete without exploring the culinary and architectural offerings of the area. Olas Altas hosts an excellent selection of oceanfront restaurants and cafes, perfect for a laid-back breakfast or a romantic sunset dinner.",
      "Here, you will also find iconic buildings that stand as true historical jewels of the port, most notably the Hotel Belmar, the Hotel Freeman, and the historic Colegio Pacífico. These properties date back to the early days of the city's establishment as a tourist destination, and visiting them is like traveling back in time to the golden age of Mazatlán.",
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
