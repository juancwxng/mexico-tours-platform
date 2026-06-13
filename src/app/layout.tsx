import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { LangProvider } from "@/context/LangContext";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { cookies } from "next/headers";
import { safeJsonLd } from "@/lib/utils";
import WhatsAppPill from "@/components/WhatsAppPill";

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    return "https://costafrancatours.com";
  }
  return url ?? "http://localhost:3000";
}

const baseUrl = getSiteUrl();

/*
 * Detects the user's language and serves the optimized meta tags in englisha and spanish
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const isEn = lang ? lang.startsWith("en") : false;

  // Keyword enriched title
  const titleDefault = isEn
    ? "Costa Franca Tours | Best Mazatlán Tours & Boat Excursions"
    : "Costa Franca Tours | Los Mejores Tours y Paseos en Mazatlán";

  // Atractive descriptions
  const description = isEn
    ? "Discover the Pearl of the Pacific with Costa Franca Tours. Book top things to do in Mazatlan: Stone Island tours, Deer Island boat trips, and safe excursions."
    : "Descubre la Perla del Pacífico con Costa Franca Tours. Reserva las mejores cosas que hacer en Mazatlán: tours a la Isla de la Piedra, Isla de Venados y paseos en lancha.";

  // Semantic segmentation of key words per market
  const keywords = isEn
    ? [
        "things to do in Mazatlan",
        "Mazatlan tours",
        "Stone Island tour",
        "Deer Island tour Mazatlan",
        "Mazatlan boat tours",
        "Mazatlan airport transportation",
        "Mazatlan excursions",
        "Costa Franca Tours",
      ]
    : [
        "tours Mazatlán",
        "que hacer en Mazatlán",
        "paseo isla venados",
        "isla de la piedra",
        "transporte aeropuerto Mazatlán",
        "paseos en lancha Mazatlán",
        "turismo Mazatlán",
        "excursiones en Mazatlán",
        "Costa Franca Tours",
      ];

  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: titleDefault,
      template: "%s | Costa Franca Tours",
    },
    description,
    manifest: "/manifest.webmanifest",
    icons: {
      icon: [
        {
          url: "/icons/favicon/favicon-16x16.png",
          sizes: "16x16",
          type: "image/png",
        },
        {
          url: "/icons/favicon/favicon-32x32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/icons/favicon/icon-96x96.png",
          sizes: "96x96",
          type: "image/png",
        },
      ],
      shortcut: "/icons/favicon/favicon.ico",
      apple: [
        { url: "/icons/favicon/apple-touch-icon.png" },
        {
          url: "/icons/favicon/apple-touch-icon-152x152.png",
          sizes: "152x152",
        },
        {
          url: "/icons/favicon/apple-touch-icon-167x167.png",
          sizes: "167x167",
        },
      ],
    },
    keywords,
    openGraph: {
      title: titleDefault,
      description,
      url: baseUrl,
      siteName: "Costa Franca Tours",
      images: [
        {
          url: "/images/OP.jpg",
          width: 1200,
          height: 630,
          alt: isEn
            ? "Costa Franca Tours in Mazatlan"
            : "Costa Franca Tours en Mazatlán",
        },
      ],
      locale: isEn ? "en_US" : "es_MX",
      alternateLocale: isEn ? ["es_MX"] : ["en_US"],
      type: "website",
    },
    twitter: { card: "summary_large_image" },
    alternates: {
      canonical: baseUrl,
      languages: {
        "es-MX": baseUrl,
        "en-US": baseUrl,
        "x-default": baseUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true },
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const isEn = lang ? lang.startsWith("en") : false;

  /*
  Schema
   */
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: "Costa Franca Tours",
    url: baseUrl,
    logo: `${baseUrl}/logo/Logo_CostaFrancaTours.svg`,
    description: isEn
      ? "Top-rated travel and tour agency in Mazatlan, Mexico. Specialists in local sightseeing, Stone Island excursions, Deer Island boat eco-tours, and high-quality visitor experiences."
      : "Agencia de viajes y excursiones líder en Mazatlán, Sinaloa. Especialistas en tours locales, paseos a la Isla de la Piedra, Isla de Venados y experiencias turísticas de alta calidad.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mazatlán",
      addressRegion: "Sinaloa",
      addressCountry: "MX",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER
        ? `+${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER}`
        : "+526691525822",
      contactType: "customer service",
      availableLanguage: ["Spanish", "English"],
    },
  };

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <meta name="theme-color" content="#0B1724" />

        {/* Hero poster — mobile */}
        <link
          rel="preload"
          href="/videos/hero-mobile-poster.webp"
          as="image"
          // @ts-expect-error — fetchpriority is not yet in React's type defs
          fetchpriority="high"
        />
        {/* Hero poster — desktop */}
        <link
          rel="preload"
          href="/videos/hero-poster.webp"
          as="image"
          // @ts-expect-error — fetchpriority is not yet in React's type defs
          fetchpriority="high"
        />

        {/* Display font */}
        <link
          rel="preload"
          href="/fonts/Marcellus-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        {/* Body font */}
        <link
          rel="preload"
          href="/fonts/Lato-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />

        {/* ── hreflang alternates ──────────────────────────────────────── */}
        <link rel="alternate" hrefLang="es-MX" href={baseUrl} />
        <link rel="alternate" hrefLang="en-US" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />

        {/* ── Structured data ──────────────────────────────────────────── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(orgJsonLd) }}
        />
      </head>
      <body
        className="antialiased flex flex-col min-h-dvh bg-background text-foreground"
        suppressHydrationWarning
      >
        <LangProvider initialLang={lang}>
          <PageTransition />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          <WhatsAppPill />
        </LangProvider>
      </body>
    </html>
  );
}
