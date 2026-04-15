import { Anchor } from "lucide-react";
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

  // Sanitize query params — they come from the URL and must not be trusted
  const rawQ        = typeof params.q        === "string" ? params.q        : undefined;
  const rawCategory = typeof params.category === "string" ? params.category : undefined;

  // Only allow known category slugs (prevents injecting arbitrary strings into DOM)
  const activeCategory =
    rawCategory && (CATEGORY_SLUGS as readonly string[]).includes(rawCategory)
      ? rawCategory
      : undefined;

  // filterTours handles its own sanitization of the query string
  const filtered = filterTours(activeCategory, rawQ);

  const categoryLabels: Record<string, string> = {
    paseo:    t("catalog_maritime"),
    aventura: t("catalog_adventure"),
    cultural: t("catalog_cultural"),
    aereo:    t("catalog_aerial"),
  };

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 lg:pb-24">
      <Container>
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10 lg:mb-14 pb-6 border-b border-gray-100">
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2 text-central-yellow font-bold uppercase tracking-widest text-sm">
              <Anchor className="w-5 h-5" />
              <span>{t("tours_badge")}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-central-blue uppercase leading-none">
              {t("tours_title")}
            </h1>
            <p className="text-gray-500 text-lg">
              {t("tours_subtitle", { count: tours.length })}
            </p>
          </div>
          <div className="hidden md:block text-right flex-shrink-0">
            <p className="text-central-blue font-bold text-xl">{filtered.length}</p>
            <p className="text-gray-400 text-sm uppercase tracking-wider">{t("tours_experiences")}</p>
          </div>
        </div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          <a
            href="/tours"
            className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
              !activeCategory
                ? "bg-central-blue text-white border-central-blue"
                : "bg-white text-central-blue border-gray-200 hover:border-central-blue"
            }`}
          >
            {t("tours_all")}
          </a>
          {CATEGORY_SLUGS.map((slug) => (
            <a
              key={slug}
              href={`/tours?category=${slug}`}
              className={`px-4 py-2 rounded-full text-sm font-bold border transition-colors ${
                activeCategory === slug
                  ? "bg-central-blue text-white border-central-blue"
                  : "bg-white text-central-blue border-gray-200 hover:border-central-blue"
              }`}
            >
              {categoryLabels[slug]}
            </a>
          ))}
        </div>

        {/* Active search indicator */}
        {rawQ && (
          <div className="mb-6 flex items-center gap-3 text-sm text-gray-500">
            <span>
              {t("tours_search_label")}{" "}
              {/* Display sanitized version — rawQ is never set as innerHTML */}
              <strong className="text-central-blue">
                {rawQ.slice(0, 100)}
              </strong>
            </span>
            <a
              href={activeCategory ? `/tours?category=${activeCategory}` : "/tours"}
              className="text-central-yellow font-bold hover:underline"
            >
              {t("tours_clear")}
            </a>
          </div>
        )}

        {/* Results grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filtered.map((tour) => (
              <TourCard key={tour.id} tour={tour} />
            ))}
          </div>
        ) : (
          <div className="text-center py-24 space-y-4">
            <p className="text-gray-400 text-lg">{t("tours_no_results")}</p>
            <a
              href="/tours"
              className="inline-flex items-center gap-2 font-bold text-central-blue border-b-2 border-central-yellow hover:text-central-yellow transition-colors pb-1"
            >
              {t("tours_clear")}
            </a>
          </div>
        )}
      </Container>
    </main>
  );
}
