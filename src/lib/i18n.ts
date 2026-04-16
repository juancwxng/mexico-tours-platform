/**
 * src/lib/i18n.ts
 *
 * Lightweight bilingual dictionary for Costa Franca Tours.
 * Supports: Spanish (es) — primary, English (en) — secondary.
 *
 * Usage:
 *   import { useT } from "@/lib/i18n";
 *   const t = useT();          // client-side
 *   const t = getT(lang);      // server-side / RSC
 *
 * To add a new key: add it to the `es` object first, then mirror in `en`.
 * The TypeScript type is inferred from `es`, so missing keys in `en` will
 * cause a build error.
 */

export type Lang = "es" | "en";
export const DEFAULT_LANG: Lang = "es";
export const SUPPORTED_LANGS: Lang[] = ["es", "en"];
export const LANG_COOKIE = "cft_lang";

// ─── Dictionary ──────────────────────────────────────────────────────────────

const dict = {
  es: {
    // ── Navbar ──
    nav_home:       "Inicio",
    nav_tours:      "Tours",
    nav_catalog:    "Catálogo",
    nav_blog:       "Blog",
    nav_contact:    "Contacto",
    nav_search:     "Buscar tours…",
    nav_menu_open:  "Abrir menú",
    nav_menu_title: "Menú",
    nav_search_open:"Abrir búsqueda",

    // ── Footer ──
    footer_tagline:   "Experiencias turísticas únicas en la Perla del Pacífico y destinos costeros de México.",
    footer_tours:     "Tours",
    footer_all_tours: "Ver todos los tours",
    footer_catalog:   "Catálogo",
    footer_company:   "Empresa",
    footer_blog:      "Blog",
    footer_contact:   "Contacto",
    footer_follow:    "Síguenos",
    footer_whatsapp:  "WhatsApp",
    footer_privacy:   "Aviso de Privacidad",
    footer_terms:     "Términos y Condiciones",
    footer_rights:    "Todos los derechos reservados.",

    // ── Homepage ──
    home_hero_title:    "Mazatlán",
    home_hero_subtitle: "Vive la Perla del Pacífico. Tours marítimos, aventura y cultura con los mejores operadores locales.",
    home_hero_cta:      "Explorar Tours",
    home_featured:      "Experiencias Destacadas",
    home_featured_sub:  "Seleccionamos los mejores tours locales para que tu visita a Mazatlán sea perfecta.",
    home_see_all:       "Ver todos los tours",

    // ── Tours listing ──
    tours_badge:        "Catálogo Oficial",
    tours_title:        "Explora Mazatlán",
    tours_subtitle:     "Más de {count} experiencias seleccionadas con los mejores operadores de la región.",
    tours_experiences:  "Experiencias",
    tours_all:          "Todos",
    tours_search_label: "Búsqueda:",
    tours_no_results:   "No se encontraron tours con esos criterios.",
    tours_clear:        "Limpiar filtros",

    // ── Tour detail ──
    tour_back:          "Volver al catálogo",
    tour_includes:      "¿Qué incluye?",
    tour_prices:        "Precios Oficiales",
    tour_since:         "Desde",
    tour_cotizar:       "Cotizar",
    tour_mxn:           "MXN",
    tour_no_images:     "Sin imágenes disponibles",

    // ── Booking ──
    booking_title:      "Reserva tu lugar",
    booking_from:       "Precio desde",
    booking_adults:     "Adultos",
    booking_adults_sub: "11+ años",
    booking_children:   "Niños",
    booking_children_sub:"4–10 años",
    booking_date:       "Fecha del paseo",
    booking_cta:        "Consultar disponibilidad",
    booking_wa_note:    "Serás redirigido a WhatsApp para confirmar con un asesor.",
    booking_no_date:    "Por favor selecciona una fecha.",
    booking_past_date:  "La fecha seleccionada ya pasó.",
    booking_wa_message: "Hola, me gustaría consultar disponibilidad para:\nTour: {tour}\nFecha: {date}\nAdultos: {adults}\nNiños: {children}\nBebés: {infants}\n¿Me pueden ayudar? ¡Gracias!",
    booking_open:       "Reservar",
    booking_close:      "Cerrar reserva",
    booking_per_person: "persona",
    booking_persons:    "personas",
    booking_infants:    "Bebés",
    booking_infants_sub:"0–3 años (gratis)",

    // ── Blog ──
    blog_title:         "Blog de Viajes",
    blog_subtitle:      "Guías, consejos e historias para disfrutar Mazatlán y los destinos costeros de México al máximo.",
    blog_read:          "Leer artículo",
    blog_back:          "Volver al Blog",
    blog_pin:           "Guardar en Pinterest",
    blog_share:         "Compartir",
    blog_share_copied:  "¡Enlace copiado!",
    blog_share_failed:  "No se pudo copiar",

    // ── Catalog ──
    catalog_title:      "Catálogo",
    catalog_subtitle:   "Elige la categoría de experiencia que más te emocione.",
    catalog_coming:     "Próximamente",
    catalog_maritime:   "Paseos Marítimos",
    catalog_adventure:  "Aventura",
    catalog_cultural:   "Cultural",
    catalog_aerial:     "Aéreo",

    // ── Contact ──
    contact_title:      "Contáctanos",
    contact_subtitle:   "Estamos listos para ayudarte a vivir la mejor experiencia en Mazatlán y destinos costeros de México.",
    contact_phone:      "Teléfono / WhatsApp",
    contact_email:      "Correo Electrónico",
    contact_location:   "Ubicación",
    contact_hours:      "Horario de Atención",
    contact_follow:     "Síguenos",
    contact_photo_alt:  "Atención al cliente Costa Franca Tours",
    contact_city:       "Mazatlán te espera",
    contact_city_sub:   "Tu aventura en la Perla del Pacífico comienza aquí.",

    // ── Privacy ──
    privacy_title:      "Aviso de Privacidad",

    // ── Terms ──
    terms_title:        "Términos y Condiciones",

    // ── 404 ──
    not_found_title:    "Página no encontrada",
    not_found_sub:      "La página que buscas no existe o fue movida. Regresa al inicio para seguir explorando.",
    not_found_back:     "Volver al inicio",

    // ── Misc ──
    map_alt:            "Mapa de ubicación",
    loading:            "Cargando…",
  },

  en: {
    // ── Navbar ──
    nav_home:       "Home",
    nav_tours:      "Tours",
    nav_catalog:    "Catalog",
    nav_blog:       "Blog",
    nav_contact:    "Contact",
    nav_search:     "Search tours…",
    nav_menu_open:  "Open menu",
    nav_menu_title: "Menu",
    nav_search_open:"Open search",

    // ── Footer ──
    footer_tagline:   "Unique tourism experiences on the Pearl of the Pacific and Mexico's coastal destinations.",
    footer_tours:     "Tours",
    footer_all_tours: "See all tours",
    footer_catalog:   "Catalog",
    footer_company:   "Company",
    footer_blog:      "Blog",
    footer_contact:   "Contact",
    footer_follow:    "Follow us",
    footer_whatsapp:  "WhatsApp",
    footer_privacy:   "Privacy Notice",
    footer_terms:     "Terms & Conditions",
    footer_rights:    "All rights reserved.",

    // ── Homepage ──
    home_hero_title:    "Mazatlán",
    home_hero_subtitle: "Experience the Pearl of the Pacific. Boat tours, adventure, and culture with the best local operators.",
    home_hero_cta:      "Explore Tours",
    home_featured:      "Featured Experiences",
    home_featured_sub:  "We handpick the best local tours so your visit to Mazatlán is unforgettable.",
    home_see_all:       "See all tours",

    // ── Tours listing ──
    tours_badge:        "Official Catalog",
    tours_title:        "Explore Mazatlán",
    tours_subtitle:     "Over {count} experiences selected with the best operators in the region.",
    tours_experiences:  "Experiences",
    tours_all:          "All",
    tours_search_label: "Search:",
    tours_no_results:   "No tours found matching your criteria.",
    tours_clear:        "Clear filters",

    // ── Tour detail ──
    tour_back:          "Back to catalog",
    tour_includes:      "What's included?",
    tour_prices:        "Official Pricing",
    tour_since:         "From",
    tour_cotizar:       "Quote",
    tour_mxn:           "MXN",
    tour_no_images:     "No images available",

    // ── Booking ──
    booking_title:      "Book your spot",
    booking_from:       "Price from",
    booking_adults:     "Adults",
    booking_adults_sub: "11+ years",
    booking_children:   "Children",
    booking_children_sub:"4–10 years",
    booking_date:       "Tour date",
    booking_cta:        "Check availability",
    booking_wa_note:    "You'll be redirected to WhatsApp to confirm with an advisor.",
    booking_no_date:    "Please select a date.",
    booking_past_date:  "The selected date has already passed.",
    booking_wa_message: "Hi, I'd like to check availability for:\nTour: {tour}\nDate: {date}\nAdults: {adults}\nChildren: {children}\nInfants: {infants}\nCan you help me? Thank you!",
    booking_open:       "Book Now",
    booking_close:      "Close booking",
    booking_per_person: "person",
    booking_persons:    "guests",
    booking_infants:    "Infants",
    booking_infants_sub:"0–3 years (free)",

    // ── Blog ──
    blog_title:         "Travel Blog",
    blog_subtitle:      "Guides, tips, and stories to make the most of Mazatlán and Mexico's coastal destinations.",
    blog_read:          "Read article",
    blog_back:          "Back to Blog",
    blog_pin:           "Save to Pinterest",
    blog_share:         "Share",
    blog_share_copied:  "Link copied!",
    blog_share_failed:  "Could not copy",

    // ── Catalog ──
    catalog_title:      "Catalog",
    catalog_subtitle:   "Choose the type of experience that excites you most.",
    catalog_coming:     "Coming soon",
    catalog_maritime:   "Boat Tours",
    catalog_adventure:  "Adventure",
    catalog_cultural:   "Cultural",
    catalog_aerial:     "Aerial",

    // ── Contact ──
    contact_title:      "Contact Us",
    contact_subtitle:   "We're ready to help you have the best experience in Mazatlán and Mexico's coastal destinations.",
    contact_phone:      "Phone / WhatsApp",
    contact_email:      "Email",
    contact_location:   "Location",
    contact_hours:      "Business Hours",
    contact_follow:     "Follow us",
    contact_photo_alt:  "Costa Franca Tours customer service",
    contact_city:       "Mazatlán awaits you",
    contact_city_sub:   "Your adventure on the Pearl of the Pacific starts here.",

    // ── Privacy ──
    privacy_title:      "Privacy Notice",

    // ── Terms ──
    terms_title:        "Terms & Conditions",

    // ── 404 ──
    not_found_title:    "Page not found",
    not_found_sub:      "The page you're looking for doesn't exist or was moved. Go back to the homepage to keep exploring.",
    not_found_back:     "Back to home",

    // ── Misc ──
    map_alt:            "Location map",
    loading:            "Loading…",
  },
} as const satisfies Record<Lang, Record<string, string>>;

export type DictKey = keyof typeof dict.es;
export type Dict = typeof dict.es;

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Server-side: get a translation function for a given lang. */
export function getT(lang: Lang): (key: DictKey, vars?: Record<string, string | number>) => string {
  const d = dict[lang] ?? dict[DEFAULT_LANG];
  return (key, vars) => {
    let str: string = d[key] ?? dict[DEFAULT_LANG][key] ?? key;
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        str = str.replace(`{${k}}`, String(v));
      }
    }
    return str;
  };
}

/** Parse a lang cookie/header value into a supported Lang (falls back to default). */
export function parseLang(raw: string | undefined | null): Lang {
  if (raw && (SUPPORTED_LANGS as string[]).includes(raw)) return raw as Lang;
  return DEFAULT_LANG;
}

export { dict };
