/**
 * HeroVideo is a Server Component.
 * It reads the lang cookie so the headline renders in the correct language
 * on first load (no client-side flash).
 */
import Link from "next/link";
import { cookies } from "next/headers";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";

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

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-end h-full pb-16 lg:pb-24 text-white text-center px-4">
        <h1 className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold uppercase leading-none mb-4 drop-shadow-lg">
          {t("home_hero_title")}
        </h1>
        <p className="text-xl md:text-2xl font-medium text-white/90 max-w-2xl mb-8 drop-shadow leading-snug">
          {t("home_hero_subtitle")}
        </p>
        <Link
          href="/tours"
          className="inline-flex items-center gap-2 bg-central-yellow text-central-blue font-display font-bold uppercase tracking-wider px-8 py-4 rounded-2xl text-base hover:bg-white transition-colors shadow-xl"
        >
          {t("home_hero_cta")}
        </Link>
      </div>
    </div>
  );
}
