import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import HeroVideo from "@/components/HeroVideo";
import TourCard from "@/components/TourCard";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import { tours } from "@/lib/tours";
import { parseLang, getT, withLang, SUPPORTED_LANGS } from "@/lib/i18n";
import { hreflangAlternates } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

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
    title: {
      absolute: isEn
        ? "Costa Franca Tours — Best Tours & Excursions in Mazatlán"
        : "Costa Franca Tours — La mejor selección de Tours en Mazatlán",
    },
    description: isEn
      ? "Discover the best tours in Mazatlán: Deer Island, Stone Island, Catamaran with Banda, and more. Book with Costa Franca Tours."
      : "Descubre los mejores tours en Mazatlán: Paseo Isla Venados, Paseo Isla de la Piedra, Catamarán con Banda y más.",
    alternates: {
      canonical: `${baseUrl}${withLang(lang, "/")}`,
      ...hreflangAlternates(baseUrl, "/"),
    },
  };
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = parseLang(raw);
  const t = getT(lang);
  const featuredTours = tours.slice(0, 8);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526691525822";

  return (
    <main className="flex flex-col">
      <section className="relative w-full h-[100svh] min-h-[640px] max-h-[960px] overflow-hidden">
        <HeroVideo lang={lang} />
      </section>

      <section className="relative pt-20 lg:pt-28 pb-24 lg:pb-32 bg-transparent overflow-visible">
        <Container>
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-teal px-4 py-1.5 border border-teal/20 rounded-full bg-teal/5">
                {lang === "en" ? "Featured Experiences" : "Experiencias Destacadas"}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-none text-balance">
              {t("home_featured")}
            </h2>
            <hr className="divider-gold max-w-24 mx-auto" />
            <p className="text-navy/65 max-w-xl mx-auto text-lg leading-relaxed font-medium">
              {t("home_featured_sub")}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {featuredTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index < 3} />
            ))}
          </div>
          <div className="mt-14 flex justify-center">
            <Link href={withLang(lang, "/tours")} className="btn-gold">
              {t("home_see_all")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      <RevealSection className="-mt-14">
        <section className="relative py-24 lg:py-32 bg-surface-warm overflow-hidden">
          <Container size="md" className="relative z-10">
            <div className="text-center space-y-7">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-teal px-4 py-1.5 border border-teal/20 rounded-full bg-teal/5">
                {lang === "en" ? "Ready to explore?" : "¿Listo para explorar?"}
              </span>
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-none text-balance">
                {lang === "en"
                  ? "Your Perfect Mazatlán Experience Awaits"
                  : "Tu Experiencia Perfecta en Mazatlán te Espera"}
              </h2>
              <div
                className="h-px max-w-24 mx-auto"
                style={{ background: "linear-gradient(to right, transparent, #EACA8D 30%, #1A5F69 70%, transparent)" }}
              />
              <p className="text-navy/70 text-lg max-w-lg mx-auto leading-relaxed font-medium">
                {lang === "en"
                  ? "Contact us on WhatsApp and we'll help you plan every detail of your trip."
                  : "Contáctanos por WhatsApp y te ayudamos a planear cada detalle de tu viaje."}
              </p>
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                <Link
                  href={withLang(lang, "/tours")}
                  className="relative inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide text-sm px-9 py-3.5 bg-gradient-to-br from-[#eaca8d] to-[#b89b60] text-navy font-bold rounded-full overflow-hidden group transition-all hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,202,141,0.4)] hover:shadow-[0_8px_30px_rgba(234,202,141,0.6)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {lang === "en" ? "Explore Tours" : "Explorar Tours"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
                </Link>
                <Link
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide text-sm px-9 py-3.5 bg-[#25D366] text-white font-bold rounded-full transition-all hover:-translate-y-1 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] animate-whatsapp-attention"
                >
                  <img src="/icons/whatsapp.svg" alt="" width={18} height={18} aria-hidden="true" className="brightness-0 invert" />
                  <span className="relative top-[1px]">WhatsApp</span>
                </Link>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
                {(
                  [
                    { label: lang === "en" ? "Verified Operators" : "Operadores Verificados", symbol: "✦" },
                    { label: lang === "en" ? "Instant Response"   : "Respuesta Inmediata",    symbol: "✦" },
                    { label: lang === "en" ? "Best Price"         : "Mejor Precio",            symbol: "✦" },
                  ] as const
                ).map(({ label, symbol }) => (
                  <div key={label} className="flex items-center gap-2 text-navy/60 text-xs font-bold uppercase tracking-widest">
                    <span className="text-gold text-[10px]">{symbol}</span>
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>
      </RevealSection>
    </main>
  );
}
