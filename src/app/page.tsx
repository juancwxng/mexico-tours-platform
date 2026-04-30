import Link from "next/link";
import { ArrowRight, Shield, Award, Headphones, MapPin } from "lucide-react";
import { cookies } from "next/headers";
import HeroVideo from "@/components/HeroVideo";
import TourCard from "@/components/TourCard";
import Container from "@/components/Container";
import { tours } from "@/lib/tours";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Costa Franca Tours — Tours en Mazatlán y destinos costeros de México",
  },
  description:
    "Descubre los mejores tours en Mazatlán: paseos en lancha, aventura y cultura. Reserva por WhatsApp con los operadores más confiables de la Perla del Pacífico.",
};

const TRUST_ITEMS = [
  "✦ Tours Verificados",
  "★ Operadores Locales",
  "✦ Reserva Segura",
  "★ Atención 24/7",
  "✦ Mejor Precio",
  "★ Guías Certificados",
  "✦ Tours Verificados",
  "★ Operadores Locales",
  "✦ Reserva Segura",
  "★ Atención 24/7",
  "✦ Mejor Precio",
  "★ Guías Certificados",
];

const STATS = [
  { value: "50+", label: { es: "Tours Disponibles", en: "Tours Available" } },
  { value: "5★",  label: { es: "Calificación Promedio", en: "Average Rating" } },
  { value: "3k+", label: { es: "Viajeros Felices", en: "Happy Travelers" } },
  { value: "10+", label: { es: "Años de Experiencia", en: "Years of Experience" } },
];

const FEATURES = [
  {
    icon: Shield,
    title: { es: "Operadores Verificados", en: "Verified Operators" },
    desc: { es: "Trabajamos únicamente con prestadores de servicios seleccionados y verificados.", en: "We work only with carefully selected, verified service providers." },
  },
  {
    icon: Award,
    title: { es: "Experiencias Premium", en: "Premium Experiences" },
    desc: { es: "Cada tour está curado para ofrecerte la mejor experiencia en Mazatlán.", en: "Every tour is curated to give you the best Mazatlán experience." },
  },
  {
    icon: Headphones,
    title: { es: "Soporte Inmediato", en: "Instant Support" },
    desc: { es: "Nuestro equipo está disponible por WhatsApp para atenderte en todo momento.", en: "Our team is available on WhatsApp to assist you at any time." },
  },
  {
    icon: MapPin,
    title: { es: "Locales de Confianza", en: "Trusted Locals" },
    desc: { es: "Somos de Mazatlán. Conocemos cada rincón y te guiamos con autenticidad.", en: "We're from Mazatlán. We know every corner and guide you with authenticity." },
  },
];

export default async function Home() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const featuredTours = tours.slice(0, 8);

  return (
    <main className="flex flex-col">

      {/* ── Hero ── */}
      <section className="relative w-full h-[100svh] min-h-[640px] max-h-[960px] overflow-hidden">
        <HeroVideo />
      </section>

      {/* ── Trust marquee strip ── */}
      <div className="bg-navy py-3 overflow-hidden border-y border-gold/20">
        <div className="marquee-track">
          {TRUST_ITEMS.map((item, i) => (
            <span
              key={i}
              className="inline-block px-8 text-[0.7rem] font-sans font-bold tracking-[0.18em] uppercase text-gold/80 whitespace-nowrap"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* ── Stats band ── */}
      <section className="bg-pearl-warm py-14 lg:py-16 border-b border-gold/12">
        <Container>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STATS.map((s) => (
              <div key={s.value} className="text-center space-y-1">
                <div className="stat-number">{s.value}</div>
                <p className="text-ink-muted text-xs font-bold uppercase tracking-wider">
                  {s.label[lang]}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── Featured Tours ── */}
      <section className="py-20 lg:py-28">
        <Container>
          <div className="text-center mb-12 lg:mb-16 space-y-4">
            <div className="flex justify-center">
              <span className="section-badge">
                ✦ {lang === "en" ? "Featured Experiences" : "Experiencias Destacadas"}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-navy leading-none text-balance">
              {t("home_featured")}
            </h2>
            <hr className="divider-gold max-w-24 mx-auto" />
            <p className="text-ink-muted max-w-xl mx-auto text-lg leading-relaxed">
              {t("home_featured_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 lg:gap-8">
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

      {/* ── Why Costa Franca ── */}
      <section className="bg-navy-section py-20 lg:py-28 text-white relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
        <Container className="relative z-10">
          <div className="text-center mb-14 space-y-4">
            <span className="section-badge" style={{ color: "#E8D5AD", borderColor: "rgba(232,213,173,0.25)", background: "rgba(201,169,110,0.08)" }}>
              ✦ {lang === "en" ? "Why Choose Us" : "Por qué elegirnos"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-white leading-none">
              {lang === "en" ? "A Different Standard" : "Un Estándar Diferente"}
            </h2>
            <hr className="divider-gold max-w-20 mx-auto opacity-60" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title.es}
                className="group p-6 rounded-2xl border border-white/8 hover:border-gold/30 transition-all duration-300 hover:bg-white/5 text-center space-y-3"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/15 flex items-center justify-center mx-auto group-hover:bg-gold/25 transition-colors duration-300">
                  <Icon className="w-6 h-6 text-gold" />
                </div>
                <h3 className="font-display text-white text-lg">{title[lang]}</h3>
                <p className="text-white/55 text-sm leading-relaxed">{desc[lang]}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── CTA Band ── */}
      <section className="py-20 lg:py-24 bg-pearl-warm">
        <Container size="md">
          <div className="text-center space-y-6">
            <span className="section-badge">
              ✦ {lang === "en" ? "Ready to explore?" : "¿Listo para explorar?"}
            </span>
            <h2 className="font-display text-4xl md:text-5xl text-navy leading-none text-balance">
              {lang === "en"
                ? "Your Perfect Mazatlán Experience Awaits"
                : "Tu Experiencia Perfecta en Mazatlán te Espera"}
            </h2>
            <p className="text-ink-muted text-lg max-w-lg mx-auto leading-relaxed">
              {lang === "en"
                ? "Contact us on WhatsApp and we'll help you plan every detail of your trip."
                : "Contáctanos por WhatsApp y te ayudamos a planear cada detalle de tu viaje."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Link href="/tours" className="btn-gold">
                {lang === "en" ? "Explore Tours" : "Explorar Tours"}
              </Link>
              <Link
                href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000"}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost"
              >
                {lang === "en" ? "Chat on WhatsApp" : "WhatsApp"}
              </Link>
            </div>
          </div>
        </Container>
      </section>

    </main>
  );
}
