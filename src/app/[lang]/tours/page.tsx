import { Anchor, Search } from "lucide-react";
import type { Metadata } from "next";
import TourCard from "@/components/TourCard";
import Container from "@/components/Container";
import { tours, filterTours } from "@/lib/tours";
import { parseLang, getT, withLang, SUPPORTED_LANGS } from "@/lib/i18n";
import { hreflangAlternates } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const CATEGORY_SLUGS = ["paseo", "aventura", "cultural", "aereo"] as const;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = parseLang(raw);
  const isEn = lang === "en";

  return {
    title: isEn ? "Mazatlan Tours Catalog" : "Catálogo de Tours",
    description: isEn
      ? "Browse our full selection of Mazatlan tours: boat trips, adventure, cultural, and more."
      : "Explora nuestra selección completa de tours en Mazatlán: paseos marítimos, aventura, cultural y más.",
    alternates: {
      canonical: `${baseUrl}${withLang(lang, "/tours")}`,
      ...hreflangAlternates(baseUrl, "/tours"),
    },
  };
}

interface Props {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ToursPage({ params, searchParams }: Props) {
  const [{ lang: raw }, sp] = await Promise.all([params, searchParams]);
  const lang = parseLang(raw);
  const t = getT(lang);

  const rawQ = typeof sp.q === "string" ? sp.q : undefined;
  const rawCategory =
    typeof sp.category === "string" &&
    (CATEGORY_SLUGS as readonly string[]).includes(sp.category)
      ? sp.category
      : undefined;

  const filtered = filterTours(rawCategory, rawQ);

  const categoryLabels: Record<string, string> = {
    paseo:    t("catalog_maritime"),
    aventura: t("catalog_adventure"),
    cultural: t("catalog_cultural"),
    aereo:    t("catalog_aerial"),
  };
  const categoryIcons: Record<string, string> = {
    paseo: "⛵", aventura: "🏄", cultural: "🏛️", aereo: "🪂",
  };

  const toursBase = withLang(lang, "/tours");

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`, backgroundSize: "36px 36px" }}
        />
        <Container className="relative z-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="section-badge" style={{ color: "#E8D5AD", borderColor: "rgba(232,213,173,0.25)", background: "rgba(201,169,110,0.08)" }}>
                <Anchor className="w-3 h-3" />
                {t("tours_badge")}
              </span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl text-white leading-none mb-4">
              {t("tours_title")}
            </h1>
            <hr className="divider-gold max-w-16 opacity-60 mb-4" />
            <p className="text-white/55 text-lg leading-relaxed">
              {t("tours_subtitle", { count: tours.length })}
            </p>
          </div>
        </Container>
      </div>

      <div className="pb-20 lg:pb-28 pt-10 lg:pt-12">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <a
                href={toursBase}
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                  !rawCategory
                    ? "bg-navy text-white border-navy shadow-md"
                    : "bg-white text-navy border-gold/25 hover:border-gold hover:text-gold"
                }`}
              >
                {t("tours_all")}
              </a>
              {CATEGORY_SLUGS.map((slug) => (
                <a
                  key={slug}
                  href={`${toursBase}?category=${slug}${rawQ ? `&q=${encodeURIComponent(rawQ)}` : ""}`}
                  className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 flex items-center gap-1.5 ${
                    rawCategory === slug
                      ? "bg-navy text-white border-navy shadow-md"
                      : "bg-white text-navy border-gold/25 hover:border-gold hover:text-gold"
                  }`}
                >
                  <span>{categoryIcons[slug]}</span>
                  {categoryLabels[slug]}
                </a>
              ))}
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-display text-2xl text-gold">{filtered.length}</p>
              <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">{t("tours_experiences")}</p>
            </div>
          </div>

          {rawQ && (
            <div className="mb-6 flex items-center gap-3 text-sm text-ink-muted bg-pearl-warm rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-gold flex-shrink-0" />
              <span>
                {t("tours_search_label")}{" "}
                <strong className="text-navy">{rawQ.slice(0, 100)}</strong>
              </span>
              <a
                href={rawCategory ? `${toursBase}?category=${rawCategory}` : toursBase}
                className="ml-auto text-gold font-bold hover:underline text-xs uppercase tracking-wide"
              >
                {t("tours_clear")}
              </a>
            </div>
          )}

          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-28 space-y-5">
              <div className="text-5xl">🌊</div>
              <p className="text-navy/50 text-lg">{t("tours_no_results")}</p>
              <a
                href={toursBase}
                className="inline-flex items-center gap-2 font-display uppercase tracking-widest text-sm px-8 py-3.5 rounded-full border border-gold/40 text-navy hover:border-gold hover:text-gold transition-all duration-200"
              >
                {t("tours_clear")}
              </a>
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}
