import { notFound } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  CalendarCheck,
  CheckCircle2,
  Star,
  ShieldCheck,
  MessageCircle,
  CalendarX2,
  MapPin,
  ListOrdered,
} from "lucide-react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { tours, getTourImages, getTourBySlug } from "@/lib/tours";
import TourCarousel from "@/components/TourCarousel";
import BookingForm from "@/components/BookingForm";
import BookingDrawer from "@/components/BookingDrawer";
import Container from "@/components/Container";
import TourCard from "@/components/TourCard";
import ShareButton from "@/components/ShareButton";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { safeJsonLd } from "@/lib/utils";
import { buildTourJsonLd } from "@/lib/schema";
import { hreflangAlternates } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

// Category pill labels — mirrors TourCard.tsx
const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  paseo: { es: "Paseos Marítimos", en: "Boat Tours" },
  aventura: { es: "Aventura", en: "Adventure" },
  cultural: { es: "Cultural", en: "Cultural" },
  aereo: { es: "Aéreo", en: "Aerial" },
};

// Minimal markdown → HTML: bold, line breaks
function parseMarkdown(text: string): string {
  return text
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\n/g, "<br />");
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

  const pageUrl = `${baseUrl}/tours/${tour.slug}`;

  const ogImage =
    tour.imageCount > 0
      ? `${baseUrl}/images/tours/${tour.slug}/1.webp`
      : `${baseUrl}/images/placeholder.webp`;

  return {
    title: `${tour.title} en Mazatlán | Desde $${tour.price} MXN`,
    description: `Reserva el ${tour.title}. Duración: ${tour.duration}. La mejor experiencia turística en Mazatlán con Costa Franca Tours.`,
    alternates: {
      canonical: pageUrl,
      ...hreflangAlternates(pageUrl),
    },
    openGraph: {
      title: tour.title,
      description: tour.description,
      type: "website",
      url: pageUrl,
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

  const title = lang === "en" ? (tour.titleEn ?? tour.title) : tour.title;
  const imageAlts =
    lang === "en" ? (tour.imageAltsEn ?? tour.imageAlts) : tour.imageAlts;
  const description =
    lang === "en" ? (tour.descriptionEn ?? tour.description) : tour.description;
  const includes =
    lang === "en" ? (tour.includesEn ?? tour.includes) : tour.includes;
  const schedule =
    lang === "en" ? (tour.scheduleEn ?? tour.schedule) : tour.schedule;
  const duration =
    lang === "en" ? (tour.durationEn ?? tour.duration) : tour.duration;
  const itinerary =
    lang === "en" ? (tour.itineraryEn ?? tour.itinerary) : tour.itinerary;

  const images = getTourImages(tour.slug, tour.imageCount);
  const { touristTrip, faqPage } = buildTourJsonLd(tour, baseUrl, lang);

  const pageUrl = `${baseUrl}/tours/${tour.slug}`;

  // Related tours: same category, exclude current, max 3
  const relatedTours = tours
    .filter((t) => t.category === tour.category && t.slug !== tour.slug && t.showInTours !== false)
    .slice(0, 3);

  const categoryLabel = CATEGORY_LABELS[tour.category]?.[lang] ?? tour.category;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(touristTrip) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(faqPage) }}
      />
      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-32 lg:pb-20">
        {/* ── Breadcrumb — item 12: Tours / [Category] / Tour name ── */}
        <div className="bg-[#f4f1ec] border-b border-gold/12 py-3">
          <Container>
            <div className="flex items-center gap-2 text-xs text-navy/60 font-bold uppercase tracking-wider">
              <Link
                href="/tours"
                className="inline-flex items-center gap-1.5 hover:text-gold transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                {t("nav_tours")}
              </Link>
              <span className="text-gold/40">/</span>
              <Link
                href={`/tours?category=${tour.category}`}
                className="hover:text-gold transition-colors"
              >
                {categoryLabel}
              </Link>
              <span className="text-gold/40">/</span>
              <span className="text-navy truncate">{title}</span>
            </div>
          </Container>
        </div>

        <Container className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] xl:grid-cols-[1fr_420px] gap-8 lg:gap-14 xl:gap-16 items-start">
            {/* ── Left column ── */}
            <div className="space-y-8 lg:space-y-10 order-2 lg:order-1">
              <div className="space-y-4">
                {/* Item 9: Category pill */}
                <div className="inline-flex">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold border border-gold/30 bg-gold/8 text-navy uppercase tracking-wider">
                    {categoryLabel}
                  </span>
                </div>

                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-none">
                    {title}
                  </h1>
                  {/* Item 8: Share button near H1 */}
                  <div className="flex-shrink-0 pt-1">
                    <ShareButton url={pageUrl} title={title} />
                  </div>
                </div>

                {/* Item 1: Star rating + review count (placeholder-ready) */}
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-0.5" aria-label="4.9 de 5 estrellas">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 text-gold fill-gold"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-navy">4.9</span>
                  <span className="text-sm text-navy/50">
                    · 127 {t("tour_rating_count")}
                  </span>
                </div>

                <hr className="divider-gold max-w-16" />

                {/* Duration + schedule pills */}
                <div className="flex flex-wrap gap-2.5">
                  <div className="flex items-center gap-2 bg-[#f4f1ec] border border-gold/20 px-4 py-2 rounded-full text-sm font-bold text-navy">
                    <Clock className="w-3.5 h-3.5 text-gold" />
                    {duration}
                  </div>
                  <div className="flex items-center gap-2 bg-[#f4f1ec] border border-gold/20 px-4 py-2 rounded-full text-sm font-bold text-navy">
                    <CalendarCheck className="w-3.5 h-3.5 text-teal" />
                    {schedule}
                  </div>
                </div>

                {/* Item 10: Departure / meeting point info row */}
                <div className="flex items-center gap-2 text-sm text-navy/65 font-medium">
                  <MapPin className="w-4 h-4 text-teal flex-shrink-0" />
                  <span>{t("tour_departure")}</span>
                </div>
              </div>

              {/* Item 5: Description with markdown parsed */}
              <div
                className="prose prose-lg text-navy max-w-none leading-relaxed"
                dangerouslySetInnerHTML={{ __html: parseMarkdown(description) }}
              />

              {/* Item 7: Itinerary timeline (optional) */}
              {itinerary && itinerary.length > 0 && (
                <div className="bg-[#f4f1ec] rounded-2xl border border-gold/15 p-6 lg:p-8">
                  <h2 className="font-display text-2xl text-navy mb-6 flex items-center gap-2">
                    <ListOrdered className="w-5 h-5 text-gold" />
                    {t("tour_itinerary")}
                  </h2>
                  <ol className="space-y-4">
                    {itinerary.map((step, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <span className="flex-shrink-0 w-7 h-7 rounded-full bg-navy text-white text-xs font-bold flex items-center justify-center mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-navy leading-relaxed pt-0.5">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              )}

              {includes.length > 0 && (
                <div className="bg-white rounded-2xl border border-navy/10 p-6 lg:p-8 shadow-sm">
                  <h2 className="font-display text-2xl text-navy mb-6">
                    {t("tour_includes")}
                  </h2>
                  <ul className="space-y-3">
                    {includes.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-navy">
                        <CheckCircle2 className="w-5 h-5 text-teal flex-shrink-0 mt-0.5" />
                        <span
                          className="leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: parseMarkdown(item) }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Item 11: Price cards with "Más popular" badge */}
              {tour.priceList.length > 0 && (
                <div className="bg-navy-section rounded-2xl p-6 lg:p-8 text-white">
                  <h2 className="font-display text-2xl text-white mb-6 pb-4 border-b border-white/12">
                    {t("tour_prices")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {tour.priceList.map((item, i) => (
                      <div
                        key={i}
                        className="relative bg-white/8 p-5 rounded-xl border border-white/10 hover:border-gold/30 transition-colors"
                      >
                        {/* Popular badge */}
                        {item.isPopular && (
                          <span className="absolute -top-2.5 left-4 bg-gold text-navy text-[0.6rem] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full">
                            {t("tour_popular_badge")}
                          </span>
                        )}
                        <h3 className="font-bold text-white/60 text-xs uppercase tracking-wider mb-2">
                          {lang === "en"
                            ? (item.labelEn ?? item.label)
                            : item.label}
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

              {/* Item 2: Related tours cross-sell */}
              {relatedTours.length > 0 && (
                <div>
                  <h2 className="font-display text-2xl text-navy mb-6">
                    {t("tour_related")}
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {relatedTours.map((related) => (
                      <TourCard key={related.id} tour={related} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ── Right column (sticky sidebar) ── */}
            {/* Item 6: Subtle left border + tint on the sticky column */}
            <div className="space-y-6 order-1 lg:order-2 lg:sticky lg:top-24 lg:self-start lg:border-l lg:border-gold/10 lg:pl-8">
              <TourCarousel
                images={images}
                title={title}
                imageAlts={imageAlts}
              />
              <div className="hidden lg:block">
                <BookingForm
                  tourTitle={tour.title}
                  tourPrice={tour.price}
                  priceList={tour.priceList}
                />
              </div>

              {/* Item 1: Trust badges below booking form CTA */}
              <div className="hidden lg:flex flex-col gap-2.5">
                <TrustBadge icon={<ShieldCheck className="w-4 h-4 text-teal" />} label={t("tour_trust_verified")} />
                <TrustBadge icon={<MessageCircle className="w-4 h-4 text-teal" />} label={t("tour_trust_whatsapp")} />
                <TrustBadge icon={<CalendarX2 className="w-4 h-4 text-teal" />} label={t("tour_trust_cancel")} />
              </div>
            </div>
          </div>
        </Container>

        <BookingDrawer
          tourTitle={tour.title}
          tourPrice={tour.price}
          priceList={tour.priceList}
        />
      </main>
    </>
  );
}

// ── Trust badge helper ──────────────────────────────────────────────────────

function TrustBadge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5 text-sm text-navy/70 font-medium bg-[#f4f1ec] rounded-xl px-4 py-2.5 border border-gold/10">
      {icon}
      <span>{label}</span>
    </div>
  );
}
