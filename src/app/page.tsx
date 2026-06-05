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

        {/* Wave edge — white shape that laps over the dark CTA section below */}
        <div className="section-wave-edge" aria-hidden="true">
          <svg
            viewBox="0 0 1440 88"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,88 L0,52 C180,18 360,72 540,44 C720,16 900,68 1080,38 C1260,8 1380,56 1440,42 L1440,88 Z"
              fill="#fafafa"
            />
          </svg>
        </div>
      </section>

      {/* ── CTA Band ── */}
      <section className="relative py-24 lg:py-32 overflow-hidden -mt-14">

        {/* Aerial beach — horizontal gradient: deep ocean left → shallow teal → shoreline → sand right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, #071219 0%, #0B1F2A 12%, #0C4A56 30%, #1A5F69 46%, #2E8A8A 54%, #C4A97A 64%, #D4AF7A 74%, #BF9B60 88%, #A8845A 100%)",
          }}
          aria-hidden="true"
        />

        {/* Shoreline — diagonal band where water meets sand */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <svg
            viewBox="0 0 1440 600"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full"
          >
            <defs>
              <linearGradient id="shorelineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1A5F69" stopOpacity="0" />
                <stop offset="40%" stopColor="#4D9AA4" stopOpacity="0.18" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.06" />
                <stop offset="60%" stopColor="#EACA8D" stopOpacity="0.14" />
                <stop offset="100%" stopColor="#EACA8D" stopOpacity="0" />
              </linearGradient>
              {/* Foam edge — thin bright line at the break */}
              <linearGradient id="foamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="30%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="48%" stopColor="#ffffff" stopOpacity="0.22" />
                <stop offset="52%" stopColor="#ffffff" stopOpacity="0.30" />
                <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Shoreline diagonal band */}
            <polygon
              points="520,0 720,0 920,600 720,600"
              fill="url(#shorelineGrad)"
            />
            {/* Foam line — thin diagonal stripe at the water's edge */}
            <polygon
              points="600,0 640,0 840,600 800,600"
              fill="url(#foamGrad)"
            />
          </svg>
        </div>

        {/* Sand grain texture — right half only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(234,202,141,0.07) 1px, transparent 0)`,
            backgroundSize: "28px 28px",
            maskImage: "linear-gradient(to right, transparent 40%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.6) 100%)",
            WebkitMaskImage: "linear-gradient(to right, transparent 40%, rgba(0,0,0,0.6) 65%, rgba(0,0,0,0.6) 100%)",
          }}
          aria-hidden="true"
        />

        {/* Water depth shimmer — left half only */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 60% 80% at 15% 50%, rgba(26,95,105,0.25) 0%, transparent 100%)",
            maskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, transparent 70%)",
            WebkitMaskImage: "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0.4) 50%, transparent 70%)",
          }}
          aria-hidden="true"
        />

        <Container size="md" className="relative z-10">
          <div className="text-center space-y-7">
            <span className="section-badge">
              {lang === "en" ? "Ready to explore?" : "¿Listo para explorar?"}
            </span>

            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-white leading-none text-balance"
              style={{ textShadow: "0 2px 24px rgba(7,18,25,0.55)" }}
            >
              {lang === "en"
                ? "Your Perfect Mazatlán Experience Awaits"
                : "Tu Experiencia Perfecta en Mazatlán te Espera"}
            </h2>

            <div
              className="h-px max-w-32 mx-auto"
              style={{
                background:
                  "linear-gradient(to right, transparent, #EACA8D 30%, #1A5F69 70%, transparent)",
              }}
            />

            <p className="text-white/70 text-lg max-w-lg mx-auto leading-relaxed"
              style={{ textShadow: "0 1px 12px rgba(7,18,25,0.5)" }}
            >
              {lang === "en"
                ? "Contact us on WhatsApp and we'll help you plan every detail of your trip."
                : "Contáctanos por WhatsApp y te ayudamos a planear cada detalle de tu viaje."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              {/* Primary — solid gold, high contrast against deep water background */}
              <Link href="/tours" className="btn-gold">
                <span>
                  {lang === "en" ? "Explore Tours" : "Explorar Tours"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* WhatsApp — white ghost, readable across both water and sand sides */}
              <Link
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
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

            <div className="flex flex-wrap items-center justify-center gap-8 pt-4">
              {(
                [
                  { label: lang === "en" ? "Verified Operators" : "Operadores Verificados", symbol: "✦" },
                  { label: lang === "en" ? "Instant Response" : "Respuesta Inmediata", symbol: "✦" },
                  { label: lang === "en" ? "Best Price" : "Mejor Precio", symbol: "✦" },
                ] as const
              ).map(({ label, symbol }) => (
                <div
                  key={label}
                  className="flex items-center gap-2 text-white/55 text-xs font-bold uppercase tracking-widest"
                  style={{ textShadow: "0 1px 8px rgba(7,18,25,0.6)" }}
                >
                  <span className="text-gold/60 text-[10px]">{symbol}</span>
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
