import type { Tour } from "@/lib/tours";
import type { Lang } from "@/lib/i18n";

function toIsoDuration(duration: string): string {
  const match = duration.match(/(\d+)/);
  if (!match) return "PT0H";
  return `PT${match[1]}H`;
}

// ── touristType ───────────────────────────────────────────────────────────────

const TOURIST_TYPES: Record<Lang, string[]> = {
  es: ["Familias", "Parejas", "Viajeros de Aventura"],
  en: ["Families", "Couples", "Adventure Travelers"],
};

// ── FAQ builder ───────────────────────────────────────────────────────────────

function buildFaqJsonLd(tour: Tour, baseUrl: string, lang: Lang) {
  const isEn = lang === "en";

  const title       = isEn ? (tour.titleEn       ?? tour.title)       : tour.title;
  const duration    = isEn ? (tour.durationEn     ?? tour.duration)    : tour.duration;
  const schedule    = isEn ? (tour.scheduleEn     ?? tour.schedule)    : tour.schedule;
  const includes    = isEn ? (tour.includesEn     ?? tour.includes)    : tour.includes;
  const description = isEn ? (tour.descriptionEn  ?? tour.description) : tour.description;

  // Build a readable price answer from the priceList
  const priceAnswer = tour.priceList
    .filter((item) => item.price > 0)
    .map((item) => {
      const label = isEn ? (item.labelEn ?? item.label) : item.label;
      return `${label}: $${item.price.toLocaleString("es-MX")} MXN`;
    })
    .join(" · ");

  const freeEntry = tour.priceList.find((item) => item.price === 0);
  const freeLabel = freeEntry
    ? isEn
      ? (freeEntry.labelEn ?? freeEntry.label)
      : freeEntry.label
    : null;

  // Core FAQ entries derived from structured tour data
  const entries: { q: string; a: string }[] = [];

  if (isEn) {
    entries.push(
      {
        q: `What does the ${title} include?`,
        a: includes.join(". "),
      },
      {
        q: `How long is the ${title}?`,
        a: `The tour lasts approximately ${duration}.`,
      },
      {
        q: `What are the departure times for the ${title}?`,
        a: `Available schedule: ${schedule}.`,
      },
      {
        q: `How much does the ${title} cost?`,
        a: priceAnswer
          ? `${priceAnswer}.${freeLabel ? ` ${freeLabel}: free.` : ""}`
          : `Contact us for current pricing.`,
      },
      {
        q: `Where does the ${title} depart from?`,
        a: `Costa Franca Tours offers round-trip hotel pickup in the Golden Zone, Malecón, and Cerritos areas of Mazatlán. Contact us via WhatsApp to confirm your pickup point.`,
      },
      {
        q: `Is the ${title} safe for children?`,
        a: `${description.slice(0, 180).replace(/\*\*/g, "")}... Children's age and pricing restrictions may apply — check the price list above for details.`,
      },
    );
  } else {
    entries.push(
      {
        q: `¿Qué incluye el ${title}?`,
        a: includes.join(". "),
      },
      {
        q: `¿Cuánto dura el ${title}?`,
        a: `El tour tiene una duración aproximada de ${duration}.`,
      },
      {
        q: `¿Cuáles son los horarios de salida del ${title}?`,
        a: `Horarios disponibles: ${schedule}.`,
      },
      {
        q: `¿Cuánto cuesta el ${title}?`,
        a: priceAnswer
          ? `${priceAnswer}.${freeLabel ? ` ${freeLabel}: gratis.` : ""}`
          : `Contáctanos para conocer los precios actuales.`,
      },
      {
        q: `¿De dónde sale el ${title}?`,
        a: `Costa Franca Tours ofrece transporte de ida y vuelta desde hoteles en la Zona Dorada, el Malecón y Cerritos en Mazatlán. Contáctanos por WhatsApp para confirmar tu punto de recogida.`,
      },
      {
        q: `¿El ${title} es apto para niños?`,
        a: `${description.slice(0, 180).replace(/\*\*/g, "")}... Aplican restricciones de edad y precios especiales para niños — revisa la lista de precios para más detalles.`,
      },
    );
  }

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}

// ── Main export ───────────────────────────────────────────────────────────────

export function buildTourJsonLd(tour: Tour, baseUrl: string, lang: Lang = "es") {
  const tourUrl = `${baseUrl}/tours/${tour.slug}`;

  const images =
    tour.imageCount > 0
      ? Array.from(
          { length: tour.imageCount },
          (_, i) => `${baseUrl}/images/tours/${tour.slug}/${i + 1}.webp`,
        )
      : [];

  const isEn = lang === "en";

  const offers =
    tour.priceList.length > 1
      ? tour.priceList.map((item) => ({
          "@type": "Offer",
          name: isEn ? (item.labelEn ?? item.label) : item.label,
          url: tourUrl,
          priceCurrency: "MXN",
          price: item.price,
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          availability: "https://schema.org/InStock",
        }))
      : {
          "@type": "Offer",
          url: tourUrl,
          priceCurrency: "MXN",
          price: tour.price,
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          availability: "https://schema.org/InStock",
        };

  const touristTrip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: isEn ? (tour.titleEn ?? tour.title) : tour.title,
    description: isEn ? (tour.descriptionEn ?? tour.description) : tour.description,
    url: tourUrl,
    ...(images.length > 0 && { image: images }),
    duration: toIsoDuration(tour.duration),
    touristType: TOURIST_TYPES[lang],
    itinerary: {
      "@type": "ItemList",
      itemListElement: (isEn ? (tour.includesEn ?? tour.includes) : tour.includes).map(
        (step, i) => ({
          "@type": "ListItem",
          position: i + 1,
          name: step,
        }),
      ),
    },
    provider: {
      "@type": "TravelAgency",
      name: "Costa Franca Tours",
      url: baseUrl,
      logo: `${baseUrl}/logo/Logo_CostaFrancaTours.svg`,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mazatlán",
        addressRegion: "Sinaloa",
        addressCountry: "MX",
      },
    },
    offers,
  };

  const faqPage = buildFaqJsonLd(tour, baseUrl, lang);

  return { touristTrip, faqPage };
}
