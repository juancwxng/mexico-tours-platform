import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, CalendarCheck, CheckCircle2 } from "lucide-react";
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

  const title       = lang === "en" ? (tour.titleEn       ?? tour.title)       : tour.title;
  const description = lang === "en" ? (tour.descriptionEn ?? tour.description) : tour.description;
  const includes    = lang === "en" ? (tour.includesEn    ?? tour.includes)    : tour.includes;

  const images = getTourImages(tour.slug, tour.imageCount);

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
      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-32 lg:pb-20">

        {/* Breadcrumb + back */}
        <div className="bg-pearl-warm border-b border-gold/12 py-3">
          <Container>
            <div className="flex items-center gap-2 text-xs text-ink-muted font-bold uppercase tracking-wider">
              <Link href="/tours" className="inline-flex items-center gap-1.5 hover:text-gold transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" />
                {t("tour_back")}
              </Link>
              <span className="text-gold/40">/</span>
              <span className="text-navy truncate">{title}</span>
            </div>
          </Container>
        </div>

        <Container className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-14 xl:gap-16 items-start">

            {/* ── Content column ── */}
            <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
              <div className="space-y-5">
                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-none">
                  {title}
                </h1>
                <hr className="divider-gold max-w-16" />
                <div className="flex flex-wrap gap-2.5">
                  <div className="flex items-center gap-2 bg-pearl-warm border border-gold/20 px-4 py-2 rounded-full text-sm font-bold text-navy">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {tour.duration}
                  </div>
                  <div className="flex items-center gap-2 bg-pearl-warm border border-gold/20 px-4 py-2 rounded-full text-sm font-bold text-navy">
                    <CalendarCheck className="w-3.5 h-3.5 text-teal" />
                    {tour.schedule}
                  </div>
                </div>
              </div>

              <div className="prose prose-lg text-ink max-w-none leading-relaxed">
                <p>{description}</p>
              </div>

              {/* Includes */}
              {includes.length > 0 && (
                <div className="bg-white rounded-2xl border border-pearl-warm p-6 lg:p-8 shadow-sm">
                  <h2 className="font-display text-2xl text-navy mb-6">
                    {t("tour_includes")}
                  </h2>
                  <ul className="space-y-3">
                    {includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-ink">
                        <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Price list */}
              {tour.priceList.length > 0 && (
                <div className="bg-navy-section rounded-2xl p-6 lg:p-8 text-white">
                  <h2 className="font-display text-2xl text-white mb-6 pb-4 border-b border-white/12">
                    {t("tour_prices")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tour.priceList.map((item, i) => (
                      <div key={i} className="bg-white/8 p-5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors">
                        <h3 className="font-bold text-white/60 text-xs uppercase tracking-wider mb-2">
                          {item.label}
                        </h3>
                        <p className="font-display text-3xl text-gold leading-none">
                          {item.price > 0
                            ? `$${item.price.toLocaleString("es-MX")}`
                            : t("tour_cotizar")}
                          {item.price > 0 && (
                            <span className="text-xs text-white/45 font-sans ml-1.5">
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

            {/* ── Sidebar ── */}
            <div className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-2xl overflow-hidden aspect-[4/3] bg-pearl-warm">
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
