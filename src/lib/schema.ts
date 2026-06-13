import type { Tour } from "@/lib/tours";

function toIsoDuration(duration: string): string {
  const match = duration.match(/(\d+)/);
  if (!match) return "PT0H";
  return `PT${match[1]}H`;
}

export function buildTourJsonLd(tour: Tour, baseUrl: string) {
  const tourUrl = `${baseUrl}/tours/${tour.slug}`;

  const images =
    tour.imageCount > 0
      ? Array.from(
          { length: tour.imageCount },
          (_, i) => `${baseUrl}/images/tours/${tour.slug}/${i + 1}.webp`,
        )
      : [];

  const offers =
    tour.priceList.length > 1
      ? tour.priceList.map((item) => ({
          "@type": "Offer",
          name: item.label,
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

  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.title,
    description: tour.description,
    url: tourUrl,
    ...(images.length > 0 && { image: images }),
    duration: toIsoDuration(tour.duration),
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
}
