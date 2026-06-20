import Link from "next/link";
import { getT, withLang, type Lang } from "@/lib/i18n";
import VideoBackground from "./VideoBackground";
import { Mail } from "lucide-react";

export default function HeroVideo({ lang }: { lang: Lang }) {
  const t = getT(lang);

  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Background video */}
      <VideoBackground />

      {/* Multi-layer gradient for cinematic depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(
              to bottom,
              rgba(11,23,36,0.28) 0%,
              rgba(11,23,36,0.05) 35%,
              rgba(11,23,36,0.12) 60%,
              rgba(11,23,36,0.72) 100%
            )
          `,
        }}
      />

      {/* Subtle vignette edges */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 50%, rgba(11,23,36,0.4) 100%)`,
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
          style={{ textShadow: "0 2px 40px rgba(11,23,36,0.5)" }}
        >
          {t("home_hero_title")}
        </h1>

        {/* PATCH 8: text-hero-shadow added for contrast on bright video frames */}
        <p className="text-lg md:text-xl font-sans font-light text-white/80 max-w-xl mb-9 leading-relaxed text-hero-shadow animate-fade-up delay-200">
          {t("home_hero_subtitle")}
        </p>

        {/* CTA row */}
        <div className="flex flex-col sm:flex-row items-center gap-4 animate-fade-up delay-300">
          <Link href={withLang(lang, "/tours")} className="btn-gold text-sm">
            {t("home_hero_cta")}
          </Link>
          <Link
            href={withLang(lang, "/contact")}
            className="btn-ghost text-sm backdrop-blur-md bg-white/5 hover:bg-white/10 hover:border-gold/80 transition-all duration-300 group"
          >
            <Mail className="w-4 h-4 opacity-80 group-hover:opacity-100 transition-opacity" />
            <span>{lang === "en" ? "Contact Us" : "Contáctanos"}</span>
          </Link>
        </div>

        {/* Trust signals strip */}
        <div className="flex items-center gap-6 mt-10 animate-fade-up delay-400">
          {[
            {
              icon: "/icons/wave.svg",
              label: lang === "en" ? "Top-rated" : "Mejor valorado",
            },
            {
              icon: "/icons/boat.svg",
              label: lang === "en" ? "Pacific Coast" : "Costa Pacífico",
            },
          ].map(({ icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 text-white/65 text-xs font-sans font-bold tracking-wide"
            >
              <img
                src={icon}
                alt=""
                width={14}
                height={14}
                aria-hidden="true"
                className="opacity-70 brightness-0 invert"
              />
              {label}
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="scroll-indicator z-10" aria-hidden="true">
        <div className="w-6 h-9 rounded-full border-2 border-white/35 flex items-start justify-center pt-1.5">
          <div
            className="w-1 h-2 bg-white/55 rounded-full"
            style={{ animation: "scrollBounce 2.2s ease-in-out infinite" }}
          />
        </div>
      </div>
    </div>
  );
}
