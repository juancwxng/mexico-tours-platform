/**
 * Costa Franca Tours — Enhanced Tour JSON-LD Schemas
 * ====================================================
 * These replace the current `Product` schema on each tour detail page with
 * the more semantically precise `TouristTrip` + `Offer` type that Google's
 * Travel vertical and AI overviews understand natively.
 *
 * HOW TO USE
 * ----------
 * 1. Copy the helper function `buildTourJsonLd()` into `src/lib/utils.ts`
 *    (or a new `src/lib/schema.ts`).
 * 2. In `src/app/tours/[slug]/page.tsx`, replace the current `jsonLd` block
 *    with a call to `buildTourJsonLd(tour, baseUrl)`.
 * 3. The static examples below are reference/documentation only — they show
 *    exactly what each tour's structured data should look like at runtime.
 *
 * WHY TouristTrip INSTEAD OF Product?
 * -------------------------------------
 * Google's documentation explicitly lists `TouristTrip` for things-to-do
 * rich results and AI-overview citations for travel queries. The `Product`
 * schema still works for price display but misses the activity-specific
 * signals (location, touristType, itinerary) that GEO (Generative Engine
 * Optimisation) parsers weight heavily.
 */

// ─── Drop-in TypeScript helper for src/lib/schema.ts ────────────────────────

/*
import type { Tour } from "@/lib/tours";

export function buildTourJsonLd(tour: Tour, baseUrl: string) {
  const images =
    tour.imageCount > 0
      ? Array.from(
          { length: tour.imageCount },
          (_, i) => `${baseUrl}/images/tours/${tour.slug}/${i + 1}.webp`
        )
      : [];

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    url: `${baseUrl}/tours/${tour.slug}`,
    ...(images.length > 0 && { image: images }),
    touristType: ["Families", "Couples", "Adventure Travelers"],
    itinerary: {
      "@type": "ItemList",
      itemListElement: tour.includes.map((step, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: step,
      })),
    },
    provider: {
      "@type": "TravelAgency",
      name: "Costa Franca Tours SAS",
      url: baseUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mazatlán",
        addressRegion: "Sinaloa",
        addressCountry: "MX",
      },
    },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/tours/${tour.slug}`,
      priceCurrency: "MXN",
      price: tour.price,
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      availability: "https://schema.org/InStock",
      availableDeliveryMethod: "https://schema.org/OnSitePickup",
    },
  };
}
*/

// ─── Static reference schemas (one per tour) ─────────────────────────────────

export const TOUR_SCHEMAS = {

  "Isla-Piedra": {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Paseo Isla de la Piedra",
    "description": "Catamaran cruise to Stone Island with 3-hour open bar, oceanfront lunch, optional horseback riding and banana boat. Round-trip hotel transport included. ~5 hours.",
    "url": "https://costafrancatours.com/tours/Isla-Piedra",
    "image": [
      "https://costafrancatours.com/images/tours/Isla-Piedra/1.webp",
      "https://costafrancatours.com/images/tours/Isla-Piedra/2.webp",
      "https://costafrancatours.com/images/tours/Isla-Piedra/3.webp"
    ],
    "touristType": ["Families", "Couples", "Groups"],
    "duration": "PT5H",
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Hotel pickup in Zona Dorada, Malecón, or Cerritos" },
        { "@type": "ListItem", "position": 2, "name": "1-hour catamaran cruise past Devil's Cave, White Rocks, and sea lions (winter)" },
        { "@type": "ListItem", "position": 3, "name": "3-hour beach stay on Stone Island with open bar" },
        { "@type": "ListItem", "position": 4, "name": "Lunch: fish, chicken, mixed grill, or hamburger" },
        { "@type": "ListItem", "position": 5, "name": "Optional: banana boat ride and horseback riding (All-Inclusive package)" }
      ]
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Costa Franca Tours SAS",
      "url": "https://costafrancatours.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mazatlán",
        "addressRegion": "Sinaloa",
        "addressCountry": "MX"
      }
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Adulto - Paquete Regular (11+)",
        "url": "https://costafrancatours.com/tours/Isla-Piedra",
        "priceCurrency": "MXN",
        "price": 550,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Adulto - Todo Incluido (11+)",
        "url": "https://costafrancatours.com/tours/Isla-Piedra",
        "priceCurrency": "MXN",
        "price": 680,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock"
      }
    ]
  },

  "Isla-Venados": {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Paseo Isla de Venados en Trimarán",
    "description": "5-hour trimaran cruise to Deer Island nature reserve with snorkeling, kayaking, banana boat, 5-hour open bar, and lunch. Departs daily 9:30 AM.",
    "url": "https://costafrancatours.com/tours/Isla-Venados",
    "image": [
      "https://costafrancatours.com/images/tours/Isla-Venados/1.webp",
      "https://costafrancatours.com/images/tours/Isla-Venados/2.webp"
    ],
    "touristType": ["Families", "Couples", "Adventure Travelers"],
    "duration": "PT5H",
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Hotel pickup in Zona Dorada or Cerritos" },
        { "@type": "ListItem", "position": 2, "name": "1.5-hour scenic trimaran cruise across Mazatlán bay" },
        { "@type": "ListItem", "position": 3, "name": "3.5-hour stay at Isla de Venados nature reserve" },
        { "@type": "ListItem", "position": 4, "name": "Snorkeling, kayaking, and banana boat ride" },
        { "@type": "ListItem", "position": 5, "name": "Lunch with fresh fruit + 5-hour international open bar" }
      ]
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Costa Franca Tours SAS",
      "url": "https://costafrancatours.com"
    },
    "offers": {
      "@type": "Offer",
      "name": "Adulto (11+)",
      "url": "https://costafrancatours.com/tours/Isla-Venados",
      "priceCurrency": "MXN",
      "price": 1520,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock"
    }
  },

  "Cuatrimotos-Veranos": {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Aventura en Cuatrimotos por Veranos",
    "description": "~4-hour ATV adventure through Sinaloa countryside: off-road trails, suspension bridge, authentic ranch lunch, and artisanal tequila distillery tour with tasting.",
    "url": "https://costafrancatours.com/tours/Cuatrimotos-Veranos",
    "image": [
      "https://costafrancatours.com/images/tours/Cuatrimotos-Veranos/1.webp",
      "https://costafrancatours.com/images/tours/Cuatrimotos-Veranos/2.webp"
    ],
    "touristType": ["Adventure Travelers", "Couples", "Groups"],
    "duration": "PT4H",
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Hotel pickup in Zona Dorada, Malecón, or Cerritos" },
        { "@type": "ListItem", "position": 2, "name": "2-hour guided ATV ride through off-road trails and suspension bridge" },
        { "@type": "ListItem", "position": 3, "name": "Authentic ranch lunch: machaca burritos, flambéed cheese, guacamole, tortillas" },
        { "@type": "ListItem", "position": 4, "name": "Artisanal tequila distillery tour and tasting" }
      ]
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Costa Franca Tours SAS",
      "url": "https://costafrancatours.com"
    },
    "offers": {
      "@type": "Offer",
      "name": "Adulto (11+)",
      "url": "https://costafrancatours.com/tours/Cuatrimotos-Veranos",
      "priceCurrency": "MXN",
      "price": 2400,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock"
    }
  },

  "Catamaran-Sensation": {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Sensation Catamaran: Fiesta con Banda Sinaloense",
    "description": "3-hour luxury sunset catamaran cruise with live Sinaloense brass band, premium open bar, and taco bar. Runs Wed, Fri, Sat, Sun 4:00–7:00 PM.",
    "url": "https://costafrancatours.com/tours/Catamaran-Sensation",
    "image": [
      "https://costafrancatours.com/images/tours/Catamaran-Sensation/1.webp",
      "https://costafrancatours.com/images/tours/Catamaran-Sensation/2.webp"
    ],
    "touristType": ["Couples", "Groups", "Party Travelers"],
    "duration": "PT3H",
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "3-hour bay cruise on luxury 2-story catamaran" },
        { "@type": "ListItem", "position": 2, "name": "Live Sinaloense brass band and party shots" },
        { "@type": "ListItem", "position": 3, "name": "Premium international open bar (tequila, vodka, rum, whiskey, beer)" },
        { "@type": "ListItem", "position": 4, "name": "Taco bar: cochinita pibil, ranchero shrimp, fish" },
        { "@type": "ListItem", "position": 5, "name": "Spectacular Mazatlán sunset views from the upper deck" }
      ]
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Costa Franca Tours SAS",
      "url": "https://costafrancatours.com"
    },
    "offers": {
      "@type": "Offer",
      "name": "Adulto (12+)",
      "url": "https://costafrancatours.com/tours/Catamaran-Sensation",
      "priceCurrency": "MXN",
      "price": 1000,
      "priceValidUntil": "2027-12-31",
      "availability": "https://schema.org/InStock"
    }
  },

  "Speed-Boats": {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    "name": "Aventura en Speed Boat",
    "description": "2-hour self-drive speedboat adventure across Mazatlán bay, past the iconic Tres Islas with expert guide narration. Sea lion sightings in winter season.",
    "url": "https://costafrancatours.com/tours/Speed-Boats",
    "image": [
      "https://costafrancatours.com/images/tours/Speed-Boats/1.webp",
      "https://costafrancatours.com/images/tours/Speed-Boats/2.webp"
    ],
    "touristType": ["Adventure Travelers", "Couples"],
    "duration": "PT2H",
    "itinerary": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Self-drive speedboat experience on Mazatlán bay" },
        { "@type": "ListItem", "position": 2, "name": "High-speed panoramic cruise past the Tres Islas" },
        { "@type": "ListItem", "position": 3, "name": "Expert guide narration on island history" },
        { "@type": "ListItem", "position": 4, "name": "Sea lion sightings in natural habitat (winter season)" }
      ]
    },
    "provider": {
      "@type": "TravelAgency",
      "name": "Costa Franca Tours SAS",
      "url": "https://costafrancatours.com"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Individual (1 persona)",
        "url": "https://costafrancatours.com/tours/Speed-Boats",
        "priceCurrency": "MXN",
        "price": 2800,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Doble (2 personas)",
        "url": "https://costafrancatours.com/tours/Speed-Boats",
        "priceCurrency": "MXN",
        "price": 3800,
        "priceValidUntil": "2027-12-31",
        "availability": "https://schema.org/InStock"
      }
    ]
  }
};
