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

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Costa Franca Tours",
    template: "%s | Costa Franca Tours",
  },
  description: "Los mejores Tours y Paseos en Mazatlán",
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
      { url: "/icons/favicon/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/icons/favicon/apple-touch-icon-167x167.png", sizes: "167x167" },
    ],
  },
  keywords: [
    "tours Mazatlán",
    "paseo isla venados",
    "isla de la piedra",
    "transporte aeropuerto Mazatlán",
    "paseos en lancha Mazatlán",
    "turismo Mazatlán",
    "tours México costeros",
    "Costa Franca Tours",
  ],
  openGraph: {
    title: "Costa Franca Tours",
    description: "Los mejores Tours y Paseos en Mazatlán",
    url: baseUrl,
    siteName: "Costa Franca Tours",
    images: [
      {
        url: "/images/OP.jpg",
        width: 1200,
        height: 630,
        alt: "Costa Franca Tours en Mazatlán",
      },
    ],
    locale: "es_MX",
    alternateLocale: ["en_US"],
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

const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Costa Franca Tours SAS",
  url: baseUrl,
  logo: `${baseUrl}/branding/logo.svg`,
  description:
    "Agencia de turismo con sede en Mazatlán, Sinaloa. Operador intermediario entre turistas y prestadores de servicios turísticos en Mazatlán, Sinaloa, México.",
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
      : "+526690000000",
    contactType: "customer service",
    availableLanguage: ["Spanish", "English"],
  },
  sameAs: [
    "https://instagram.com/costafrancatours",
    "https://facebook.com/costafrancatours",
    "https://tiktok.com/@costafrancatours",
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);

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
