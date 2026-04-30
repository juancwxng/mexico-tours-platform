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

const CATEGORY_EMOJIS: Record<string, string> = {
  paseo:    "⛵",
  aventura: "🏄",
  cultural: "🏛️",
  aereo:    "🪂",
};

export default async function CatalogPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const categories = [
    { titleKey: "catalog_maritime" as const,  slug: "paseo",    available: true,  desc: { es: "Explora las aguas del Pacífico", en: "Explore Pacific waters" } },
    { titleKey: "catalog_adventure" as const, slug: "aventura", available: true,  desc: { es: "Adrenalina y naturaleza", en: "Adrenaline and nature" } },
    { titleKey: "catalog_cultural" as const,  slug: "cultural", available: false, desc: { es: "Historia y tradición", en: "History and tradition" } },
    { titleKey: "catalog_aerial" as const,    slug: "aereo",    available: false, desc: { es: "Vista desde las alturas", en: "Views from above" } },
  ];

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">
      {/* Header */}
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
        <Container className="relative z-10 text-center">
          <span className="section-badge mb-4 inline-flex" style={{ color: "#E8D5AD", borderColor: "rgba(232,213,173,0.25)", background: "rgba(201,169,110,0.08)" }}>
            ✦ {lang === "en" ? "All Categories" : "Todas las Categorías"}
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-none mt-3">
            {t("catalog_title")}
          </h1>
          <hr className="divider-gold max-w-16 opacity-60 mx-auto mt-4" />
        </Container>
      </div>

      <div className="py-16 lg:py-24">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat) =>
              cat.available ? (
                <Link
                  key={cat.slug}
                  href={`/tours?category=${cat.slug}`}
                  className="group relative h-64 rounded-2xl overflow-hidden bg-navy flex flex-col items-center justify-center p-6 hover:shadow-2xl transition-all duration-300 text-center card-lift"
                  style={{ background: "linear-gradient(145deg, #1A3A50, #0F2538)" }}
                >
                  <div className="text-5xl mb-3 transition-transform duration-300 group-hover:scale-110">
                    {CATEGORY_EMOJIS[cat.slug]}
                  </div>
                  <h2 className="font-display text-2xl text-white group-hover:text-gold transition-colors duration-300">
                    {t(cat.titleKey)}
                  </h2>
                  <p className="text-white/45 text-xs mt-1.5 font-bold tracking-wide">
                    {cat.desc[lang]}
                  </p>
                  {/* Gold line reveal */}
                  <div className="absolute bottom-0 left-0 h-0.5 bg-gold w-0 group-hover:w-full transition-all duration-500" />
                </Link>
              ) : (
                <div
                  key={cat.slug}
                  className="relative h-64 rounded-2xl overflow-hidden flex flex-col items-center justify-center p-6 text-center cursor-not-allowed"
                  style={{ background: "linear-gradient(145deg, #CBD5DB, #B8C5CC)", opacity: 0.65 }}
                >
                  <div className="text-5xl mb-3 opacity-60">{CATEGORY_EMOJIS[cat.slug]}</div>
                  <span className="text-[0.65rem] font-bold uppercase tracking-wider bg-white/25 px-3 py-1 rounded-full text-white mb-2">
                    {t("catalog_coming")}
                  </span>
                  <h2 className="font-display text-2xl text-white">
                    {t(cat.titleKey)}
                  </h2>
                </div>
              )
            )}
          </div>
        </Container>
      </div>
    </main>
  );
}
