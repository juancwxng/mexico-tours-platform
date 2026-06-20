import type { Metadata } from "next";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import WhatsAppPill from "@/components/WhatsAppPill";
import { LangProvider } from "@/context/LangContext";
import { parseLang, getT, SUPPORTED_LANGS, withLang } from "@/lib/i18n";
import { hreflangAlternates } from "@/lib/seo";
import { safeJsonLd } from "@/lib/utils";

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://www.costafrancatours.com"
    : "http://localhost:3000");

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
  const baseUrl = getSiteUrl();
  const isEn = lang === "en";

  const title = isEn
    ? "Costa Franca Tours | Best Mazatlán Tours & Boat Excursions"
    : "Costa Franca Tours | Los Mejores Tours y Paseos en Mazatlán";
  const description = isEn
    ? "Discover the Pearl of the Pacific with Costa Franca Tours. Book top things to do in Mazatlan: Stone Island tours, Deer Island boat trips, and safe excursions."
    : "Descubre la Perla del Pacífico con Costa Franca Tours. Reserva las mejores cosas que hacer en Mazatlán: tours a la Isla de la Piedra, Isla de Venados y paseos en lancha.";
  const keywords = isEn
    ? ["things to do in Mazatlan", "Mazatlan tours", "Stone Island tour", "Deer Island tour Mazatlan", "Mazatlan boat tours", "Mazatlan excursions", "Costa Franca Tours"]
    : ["tours Mazatlán", "que hacer en Mazatlán", "paseo isla venados", "isla de la piedra", "paseos en lancha Mazatlán", "turismo Mazatlán", "Costa Franca Tours"];

  return {
    title: { default: title, template: "%s | Costa Franca Tours" },
    description,
    keywords,
    openGraph: {
      title,
      description,
      url: `${baseUrl}${withLang(lang, "/")}`,
      siteName: "Costa Franca Tours",
      images: [{ url: "/images/OP.jpg", width: 1200, height: 630, alt: isEn ? "Costa Franca Tours in Mazatlan" : "Costa Franca Tours en Mazatlán" }],
      locale: isEn ? "en_US" : "es_MX",
      alternateLocale: isEn ? ["es_MX"] : ["en_US"],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: `${baseUrl}${withLang(lang, "/")}`,
      ...hreflangAlternates(baseUrl, "/"),
    },
    robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = parseLang(raw);
  const isEn = lang === "en";
  const baseUrl = getSiteUrl();

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Costa Franca Tours",
    url: baseUrl,
    logo: `${baseUrl}/logo/Logo_CostaFrancaTours.svg`,
    description: isEn
      ? "Top-rated travel and tour agency in Mazatlan, Mexico. Specialists in local sightseeing, Stone Island excursions, Deer Island boat eco-tours, and high-quality visitor experiences."
      : "Agencia de viajes y excursiones líder en Mazatlán, Sinaloa. Especialistas en tours locales, paseos a la Isla de la Piedra, Isla de Venados y experiencias turísticas de alta calidad.",
    address: { "@type": "PostalAddress", addressLocality: "Mazatlán", addressRegion: "Sinaloa", addressCountry: "MX" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526691525822"}`,
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0B1724" />
        <link rel="preload" href="/videos/hero-mobile-poster.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/videos/hero-poster.webp" as="image" fetchPriority="high" />
        <link rel="preload" href="/fonts/Marcellus-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/Lato-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJsonLd(orgJsonLd) }} />
      </head>
      <body className="antialiased flex flex-col min-h-dvh bg-background text-foreground" suppressHydrationWarning>
        <LangProvider initialLang={lang}>
          <PageTransition />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer lang={lang} />
          <WhatsAppPill />
        </LangProvider>
      </body>
    </html>
  );
}
