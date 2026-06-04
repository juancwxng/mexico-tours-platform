import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import HeroVideo from "@/components/HeroVideo";
import TourCard from "@/components/TourCard";
import Container from "@/components/Container";
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
      <section className="py-20 lg:py-28 bg-transparent">
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
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Wave gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(145deg, #0E1E2E 0%, #0B1724 40%, #0C1F28 70%, #0B1724 100%)",
          }}
        />

        {/* Shore — Water (Teal, Left): deep navy far left → bright teal at shoreline */}
        <div
          className="absolute -left-[5%] top-0 w-[58%] h-full cta-blob-left pointer-events-none"
          aria-hidden="true"
        />

        {/* Shore — Sand (Gold, Right): wet sand where water meets → warm gold far right */}
        <div
          className="absolute -right-[5%] top-0 w-[55%] h-full cta-blob-right pointer-events-none"
          aria-hidden="true"
        />

        {/* Subtle dot texture */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #EACA8D 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Wave SVG decorative element */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 opacity-10"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 1440 128"
            fill="none"
            preserveAspectRatio="none"
            className="w-full h-full"
          >
            <path
              d="M0,64 C240,0 480,128 720,64 C960,0 1200,128 1440,64 L1440,128 L0,128 Z"
              fill="url(#waveGrad)"
            />
            <defs>
              <linearGradient id="waveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#EACA8D" />
                <stop offset="100%" stopColor="#1A5F69" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <Container size="md" className="relative z-10">
          <div className="text-center space-y-7">
            <span className="section-badge">
              {lang === "en" ? "Ready to explore?" : "¿Listo para explorar?"}
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-none text-balance">
              {lang === "en"
                ? "Your Perfect Mazatlán Experience Awaits"
                : "Tu Experiencia Perfecta en Mazatlán te Espera"}
            </h2>

            {/* Gradient rule */}
            <div
              className="h-px max-w-32 mx-auto"
              style={{
                background:
                  "linear-gradient(to right, transparent, #EACA8D 30%, #1A5F69 70%, transparent)",
              }}
            />

            <p className="text-white/60 text-lg max-w-lg mx-auto leading-relaxed">
              {lang === "en"
                ? "Contact us on WhatsApp and we'll help you plan every detail of your trip."
                : "Contáctanos por WhatsApp y te ayudamos a planear cada detalle de tu viaje."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              {/* Wave CTA — logo-aligned gold-to-teal gradient */}
              <Link href="/tours" className="btn-wave">
                <span>
                  {lang === "en" ? "Explore Tours" : "Explorar Tours"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* WhatsApp secondary CTA */}
              <Link
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-teal-ghost"
              >
                <img
                  src="/icons/whatsapp.svg"
                  alt=""
                  width={16}
                  height={16}
                  aria-hidden="true"
                  className="opacity-80"
                />
                <span>WhatsApp</span>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4">
              {[
                {
                  label:
                    lang === "en"
                      ? "Verified Operators"
                      : "Operadores Verificados",
                  icon: "",
                },
                {
                  label:
                    lang === "en" ? "Instant Response" : "Respuesta Inmediata",
                  icon: "",
                },
                {
                  label: lang === "en" ? "Best Price" : "Mejor Precio",
                  icon: "",
                },
              ].map(({ label, icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-white/60 text-xs font-bold uppercase tracking-wider"
                >
                  <img
                    src={icon}
                    alt=""
                    width={13}
                    height={13}
                    aria-hidden="true"
                    className="opacity-50"
                  />
                  {label}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </main>
  );
}
