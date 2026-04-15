import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarCheck } from "lucide-react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { tours, getTourImages, getTourBySlug } from "@/lib/tours";
import TourCarousel from "@/components/TourCarousel";
import BookingForm from "@/components/BookingForm";
import BookingDrawer from "@/components/BookingDrawer";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { safeJsonLd } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

/** priceValidUntil: always end-of-next-year so structured data never goes stale. */
function getPriceValidUntil(): string {
  return `${new Date().getFullYear() + 1}-12-31`;
}

export async function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tour = getTourBySlug(slug);
  if (!tour) return { title: "Tour no encontrado" };

  const ogImage =
    tour.imageCount > 0
      ? `${baseUrl}/images/tours/${tour.slug}/1.webp`
      : `${baseUrl}/images/placeholder.webp`;

  return {
    title: `${tour.title} en Mazatlán | Desde $${tour.price} MXN`,
    description: `Reserva el ${tour.title}. Duración: ${tour.duration}. La mejor experiencia turística en Mazatlán con Costa Franca Tours.`,
    alternates: { canonical: `${baseUrl}/tours/${tour.slug}` },
    openGraph: {
      title: tour.title,
      description: tour.description,
      type: "website",
      url: `${baseUrl}/tours/${tour.slug}`,
      images: [{ url: ogImage, width: 1200, height: 630, alt: tour.title }],
      locale: "es_MX",
      alternateLocale: ["en_US"],
    },
  };
}

export default async function TourDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, cookieStore] = await Promise.all([params, cookies()]);

  const tour = getTourBySlug(slug);
  if (!tour) notFound();

  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  // Localised content — fall back to Spanish if English not yet provided
  const title       = lang === "en" ? (tour.titleEn       ?? tour.title)       : tour.title;
  const description = lang === "en" ? (tour.descriptionEn ?? tour.description) : tour.description;
  const includes    = lang === "en" ? (tour.includesEn    ?? tour.includes)    : tour.includes;

  const images = getTourImages(tour.slug, tour.imageCount);

  // safeJsonLd escapes <, > and & so the inline <script> cannot be broken out of
  const jsonLd = safeJsonLd({
    "@context": "https://schema.org",
    "@type": "Product",
    name: tour.title,
    ...(images.length > 0 && { image: images }),
    description: tour.description,
    sku: tour.id,
    brand: { "@type": "Brand", name: "Costa Franca Tours SAS" },
    offers: {
      "@type": "Offer",
      url: `${baseUrl}/tours/${tour.slug}`,
      priceCurrency: "MXN",
      price: tour.price,
      priceValidUntil: getPriceValidUntil(),
      availability: "https://schema.org/InStock",
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-32 lg:pb-16">
        <Container>
          {/* Back link */}
          <div className="mb-6 lg:mb-8">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 text-central-blue/70 hover:text-central-yellow transition-colors font-bold uppercase tracking-widest text-xs"
            >
              <ArrowLeft className="w-4 h-4" /> {t("tour_back")}
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-12 xl:gap-16 items-start">

            {/* ── Content column ── */}
            <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-central-blue uppercase leading-none">
                  {title}
                </h1>
                <div className="flex flex-wrap gap-3 text-sm font-bold text-central-blue/80">
                  <div className="flex items-center gap-2 bg-central-blue/5 px-3 py-1.5 rounded-full">
                    <Clock className="w-4 h-4 text-central-yellow" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-2 bg-central-blue/5 px-3 py-1.5 rounded-full">
                    <CalendarCheck className="w-4 h-4 text-central-yellow" />
                    {tour.schedule}
                  </div>
                </div>
                <div className="w-24 h-1.5 bg-central-yellow rounded-full" />
              </div>

              <div className="prose prose-lg text-central-blue max-w-none leading-relaxed">
                <p>{description}</p>
              </div>

              {includes.length > 0 && (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 lg:p-8">
                  <h2 className="font-display text-2xl text-central-blue mb-6 font-bold uppercase">
                    {t("tour_includes")}
                  </h2>
                  <ul className="space-y-3">
                    {includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-central-blue font-medium">
                        <div className="w-2 h-2 rounded-full bg-central-yellow mt-2 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {tour.priceList.length > 0 && (
                <div className="bg-central-blue rounded-3xl p-6 lg:p-8 text-white">
                  <h2 className="font-display text-2xl mb-6 font-bold uppercase border-b border-white/20 pb-4">
                    {t("tour_prices")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tour.priceList.map((item, i) => (
                      <div key={i} className="bg-white/10 p-5 rounded-2xl border border-white/10">
                        <h3 className="font-bold text-blue-100 text-sm uppercase tracking-wider mb-1">
                          {item.label}
                        </h3>
                        <p className="font-display text-3xl text-central-yellow font-bold">
                          {item.price > 0
                            ? `$${item.price.toLocaleString("es-MX")}`
                            : t("tour_cotizar")}
                          {item.price > 0 && (
                            <span className="text-xs text-white/60 font-sans ml-1">
                              {t("tour_mxn")}
                            </span>
                          )}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Sidebar column ── */}
            <div className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl overflow-hidden aspect-[4/3]">
                <TourCarousel images={images} title={title} />
              </div>
              <div className="hidden lg:block">
                <BookingForm tourTitle={tour.title} tourPrice={tour.price} />
              </div>
            </div>

          </div>
        </Container>

        {/* Mobile booking drawer */}
        <BookingDrawer tourTitle={tour.title} tourPrice={tour.price} />
      </main>
    </>
  );
}
