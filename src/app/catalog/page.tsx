import Link from "next/link";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Catálogo de Experiencias",
  description:
    "Descubre todas las categorías de tours en Mazatlán: paseos marítimos, aventura, cultural y vuelos aéreos.",
};

export default async function CatalogPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const categories = [
    { titleKey: "catalog_maritime" as const, slug: "paseo",    available: true },
    { titleKey: "catalog_adventure" as const, slug: "aventura", available: true },
    { titleKey: "catalog_cultural" as const,  slug: "cultural", available: false },
    { titleKey: "catalog_aerial" as const,    slug: "aereo",    available: false },
  ];

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 lg:pb-24">
      <Container>
        <div className="text-center mb-12 space-y-3">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-central-blue uppercase">
            {t("catalog_title")}
          </h1>
          <div className="w-24 h-1.5 bg-central-yellow mx-auto rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t("catalog_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) =>
            cat.available ? (
              <Link
                key={cat.slug}
                href={`/tours?category=${cat.slug}`}
                className="group relative h-64 rounded-3xl overflow-hidden bg-central-blue flex items-end p-6 hover:shadow-xl transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-central-blue/90 to-central-blue/60 group-hover:from-central-blue group-hover:to-central-blue/80 transition-all" />
                <h2 className="font-display text-2xl font-bold text-white z-10 group-hover:text-central-yellow transition-colors">
                  {t(cat.titleKey)}
                </h2>
              </Link>
            ) : (
              <div
                key={cat.slug}
                className="relative h-64 rounded-3xl overflow-hidden bg-gray-200 flex items-end p-6 opacity-60 cursor-not-allowed"
              >
                <div className="z-10 space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/30 px-2 py-0.5 rounded-full text-white">
                    {t("catalog_coming")}
                  </span>
                  <h2 className="font-display text-2xl font-bold text-white">
                    {t(cat.titleKey)}
                  </h2>
                </div>
              </div>
            )
          )}
        </div>
      </Container>
    </main>
  );
}
