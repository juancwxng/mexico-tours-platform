import Link from "next/link";
import { cookies } from "next/headers";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { Waves, Star } from "lucide-react";

export default async function HeroVideo() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="/images/hero-poster.webp"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* Multi-layer gradient for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(26,58,80,0.22) 0%,
              rgba(26,58,80,0.04) 35%,
              rgba(26,58,80,0.08) 60%,
              rgba(26,58,80,0.68) 100%
            )
          `,
        }}
      />

      {/* Subtle vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, rgba(26,58,80,0.35) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-20 lg:pb-28 text-white text-center px-6">
        {/* Pre-heading badge */}
        <div className="flex items-center gap-2 mb-4 animate-fade-up">
          <div className="h-px w-12 bg-gold/60" />
          <span className="text-[0.68rem] font-sans font-bold tracking-[0.22em] uppercase text-gold/90">
            Mazatlán · Sinaloa · México
          </span>
          <div className="h-px w-12 bg-gold/60" />
        </div>

        <h1
          className="font-display text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-none mb-5 drop-shadow-xl animate-fade-up delay-100"
          style={{ textShadow: "0 2px 40px rgba(26,58,80,0.4)" }}
        >
          {t("home_hero_title")}
        </h1>

        <p className="text-lg md:text-xl font-sans font-light text-white/85 max-w-xl mb-9 leading-relaxed drop-shadow animate-fade-up delay-200">
          {t("home_hero_subtitle")}
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up delay-300">
          <Link href="/tours" className="btn-gold text-sm">
            {t("home_hero_cta")}
          </Link>
          <Link
            href="/contact"
            className="btn-ghost text-sm"
            style={{ borderColor: "rgba(255,255,255,0.4)", color: "white" }}
          >
            {lang === "en" ? "Contact Us" : "Contáctanos"}
          </Link>
        </div>

        {/* Trust signals strip */}
        <div className="flex items-center gap-5 mt-10 animate-fade-up delay-400">
          {[
            {
              icon: Star,
              label: lang === "en" ? "Top-rated" : "Mejor valorado",
            },
            {
              icon: Waves,
              label: lang === "en" ? "Pacific Coast" : "Costa Pacífico",
            },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-1.5 text-white/70 text-xs font-sans font-bold tracking-wide"
            >
              <Icon className="w-3.5 h-3.5 text-gold/80" />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator z-10" aria-hidden="true">
        <div className="w-6 h-9 rounded-full border-2 border-white/40 flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-white/60 rounded-full"
            style={{ animation: "scrollBounce 2.2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
