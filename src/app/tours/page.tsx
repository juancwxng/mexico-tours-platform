import { Anchor, Search } from "lucide-react";
import { cookies } from "next/headers";
import TourCard from "@/components/TourCard";
import Container from "@/components/Container";
import { tours, filterTours } from "@/lib/tours";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Tours",
  description:
    "Explora nuestra selección completa de tours en Mazatlán y destinos costeros: paseos marítimos, aventura, cultural y más.",
};

const CATEGORY_SLUGS = ["paseo", "aventura", "cultural", "aereo"] as const;

interface Props {
  searchParams: Promise<{ q?: string; category?: string }>;
}

export default async function ToursPage({ searchParams }: Props) {
  const [cookieStore, params] = await Promise.all([cookies(), searchParams]);

  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const rawQ        = typeof params.q        === "string" ? params.q        : undefined;
  const rawCategory = typeof params.category === "string" ? params.category : undefined;

  const activeCategory =
    rawCategory && (CATEGORY_SLUGS as readonly string[]).includes(rawCategory)
      ? rawCategory
      : undefined;

  const filtered = filterTours(activeCategory, rawQ);

  const categoryLabels: Record<string, string> = {
    paseo:    t("catalog_maritime"),
    aventura: t("catalog_adventure"),
    cultural: t("catalog_cultural"),
    aereo:    t("catalog_aerial"),
  };

  const categoryIcons: Record<string, string> = {
    paseo:    "⛵",
    aventura: "🏄",
    cultural: "🏛️",
    aereo:    "🪂",
  };

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">

      {/* ── Page header band ── */}
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
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

          {/* ── Filter tabs + count ── */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex flex-wrap gap-2">
              <a
                href="/tours"
                className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 ${
                  !activeCategory
                    ? "bg-navy text-white border-navy shadow-md"
                    : "bg-white text-navy border-gold/25 hover:border-gold hover:text-gold"
                }`}
              >
                {t("tours_all")}
              </a>
              {CATEGORY_SLUGS.map((slug) => (
                <a
                  key={slug}
                  href={`/tours?category=${slug}${rawQ ? `&q=${encodeURIComponent(rawQ)}` : ""}`}
                  className={`px-5 py-2 rounded-full text-sm font-bold border transition-all duration-200 flex items-center gap-1.5 ${
                    activeCategory === slug
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

          {/* Active search indicator */}
          {rawQ && (
            <div className="mb-6 flex items-center gap-3 text-sm text-ink-muted bg-pearl-warm rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-gold flex-shrink-0" />
              <span>
                {t("tours_search_label")}{" "}
                <strong className="text-navy">{rawQ.slice(0, 100)}</strong>
              </span>
              <a
                href={activeCategory ? `/tours?category=${activeCategory}` : "/tours"}
                className="ml-auto text-gold font-bold hover:underline text-xs uppercase tracking-wide"
              >
                {t("tours_clear")}
              </a>
            </div>
          )}

          {/* Tour grid */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
              {filtered.map((tour) => (
                <TourCard key={tour.id} tour={tour} />
              ))}
            </div>
          ) : (
            <div className="text-center py-28 space-y-5">
              <div className="text-5xl">🌊</div>
              <p className="text-ink-muted text-lg">{t("tours_no_results")}</p>
              <a href="/tours" className="btn-ghost inline-flex">
                {t("tours_clear")}
              </a>
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}
