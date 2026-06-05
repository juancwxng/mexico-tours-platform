import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import HeroVideo from "@/components/HeroVideo";
import TourCard from "@/components/TourCard";
import Container from "@/components/Container";
import RevealSection from "@/components/RevealSection";
import { tours } from "@/lib/tours";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute:
      "Costa Franca Tours — Tours en Mazatlán y destinos costeros de México",
  },
  description:
    "Descubre los mejores tours en Mazatlán: paseos en lancha, aventura y cultura. Reserva por WhatsApp con los operadores más confiables de la Perla del Pacífico.",
};

export default async function Home() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const featuredTours = tours.slice(0, 8);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";

  return (
    <main className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative w-full h-[100svh] min-h-[640px] max-h-[960px] overflow-hidden">
        <HeroVideo />
      </section>

      {/* ── Featured Tours ── */}
      <section className="relative pt-20 lg:pt-28 pb-24 lg:pb-32 bg-transparent overflow-visible">
        <Container>
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <div className="flex justify-center">
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-teal px-4 py-1.5 border border-teal/20 rounded-full bg-teal/5">
                {lang === "en"
                  ? "Featured Experiences"
                  : "Experiencias Destacadas"}
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
            <Link href="/tours" className="btn-gold">
              {t("home_see_all")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>

      {/* ── CTA Band ── */}
      <RevealSection className="-mt-14">
        <section className="relative py-24 lg:py-32 bg-surface-warm overflow-hidden">
          <Container size="md" className="relative z-10">
            <div className="text-center space-y-7">
              {/* Badge */}
              <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] uppercase text-teal px-4 py-1.5 border border-teal/20 rounded-full bg-teal/5">
                {lang === "en" ? "Ready to explore?" : "¿Listo para explorar?"}
              </span>

              {/* Heading */}
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-none text-balance">
                {lang === "en"
                  ? "Your Perfect Mazatlán Experience Awaits"
                  : "Tu Experiencia Perfecta en Mazatlán te Espera"}
              </h2>

              {/* Golden Separator */}
              <div
                className="h-px max-w-24 mx-auto"
                style={{
                  background:
                    "linear-gradient(to right, transparent, #EACA8D 30%, #1A5F69 70%, transparent)",
                }}
              />

              {/* Subtitle */}
              <p className="text-navy/70 text-lg max-w-lg mx-auto leading-relaxed font-medium">
                {lang === "en"
                  ? "Contact us on WhatsApp and we'll help you plan every detail of your trip."
                  : "Contáctanos por WhatsApp y te ayudamos a planear cada detalle de tu viaje."}
              </p>

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row gap-5 justify-center pt-4">
                {/* Golden Button */}
                <Link
                  href="/tours"
                  className="relative inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide text-sm px-9 py-3.5 bg-gradient-to-br from-[#eaca8d] to-[#b89b60] text-navy font-bold rounded-full overflow-hidden group transition-all hover:-translate-y-1 shadow-[0_4px_20px_rgba(234,202,141,0.4)] hover:shadow-[0_8px_30px_rgba(234,202,141,0.6)]"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {lang === "en" ? "Explore Tours" : "Explorar Tours"}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                  {/* Shine hover effect */}
                  <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent group-hover:animate-[shimmer_1.5s_infinite] z-0" />
                </Link>

                {/* WhatsApp Button */}
                <Link
                  href={`https://wa.me/${waNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 font-display uppercase tracking-wide text-sm px-9 py-3.5 bg-[#25D366] text-white font-bold rounded-full transition-all hover:-translate-y-1 shadow-[0_4px_20px_rgba(37,211,102,0.3)] hover:shadow-[0_8px_30px_rgba(37,211,102,0.5)] animate-whatsapp-attention"
                >
                  <img
                    src="/icons/whatsapp.svg"
                    alt=""
                    width={18}
                    height={18}
                    aria-hidden="true"
                    className="brightness-0 invert"
                  />
                  <span className="relative top-[1px]">WhatsApp</span>
                </Link>
              </div>

              {/* Trust Signals */}
              <div className="flex flex-wrap items-center justify-center gap-8 pt-6">
                {(
                  [
                    {
                      label:
                        lang === "en"
                          ? "Verified Operators"
                          : "Operadores Verificados",
                      symbol: "✦",
                    },
                    {
                      label:
                        lang === "en"
                          ? "Instant Response"
                          : "Respuesta Inmediata",
                      symbol: "✦",
                    },
                    {
                      label: lang === "en" ? "Best Price" : "Mejor Precio",
                      symbol: "✦",
                    },
                  ] as const
                ).map(({ label, symbol }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 text-navy/60 text-xs font-bold uppercase tracking-widest"
                  >
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
