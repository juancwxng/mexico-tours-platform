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
    absolute: "Costa Franca Tours — Tours en Mazatlán y destinos costeros de México",
  },
  description:
    "Descubre los mejores tours en Mazatlán: paseos en lancha, aventura y cultura. Reserva por WhatsApp con los operadores más confiables de la Perla del Pacífico.",
};

export default async function Home() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const featuredTours = tours.slice(0, 8);

  return (
    <main className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative w-full h-[100svh] min-h-[600px] max-h-[900px] overflow-hidden">
        <HeroVideo />
      </section>

      {/* ── Featured tours ── */}
      <section className="py-16 lg:py-24">
        <Container>
          <div className="text-center mb-10 lg:mb-14 space-y-3">
            <h2 className="font-display text-4xl md:text-5xl uppercase font-bold text-central-blue">
              {t("home_featured")}
            </h2>
            <div className="w-24 h-1.5 bg-central-yellow mx-auto rounded-full" />
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              {t("home_featured_sub")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 md:gap-8 2xl:gap-10">
            {featuredTours.map((tour, index) => (
              <TourCard key={tour.id} tour={tour} priority={index < 3} />
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <Link
              href="/tours"
              className="inline-flex items-center gap-2 font-bold text-central-blue border-b-2 border-central-yellow hover:text-central-yellow transition-colors pb-1"
            >
              {t("home_see_all")} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Container>
      </section>
    </main>
  );
}
