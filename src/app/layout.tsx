import type { Metadata } from "next";
import { Marcellus, Lato } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LangProvider } from "@/context/LangContext";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { safeJsonLd } from "@/lib/utils";

const marcellus = Marcellus({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-marcellus",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  variable: "--font-lato",
  display: "swap",
});

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    // During Cloudflare Pages build, env vars may not be injected yet.
    // Fall back to a safe placeholder — the actual URL is set at runtime.
    console.warn(
      "[layout.tsx] NEXT_PUBLIC_SITE_URL is not set. " +
        "Set it in your Cloudflare Pages environment variables (e.g. https://costafrancatours.com)."
    );
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
  description:
    "Los mejores tours en Mazatlán y destinos costeros de México. Paseos marítimos, aventura y cultura con operadores locales seleccionados.",
  keywords: [
    "tours Mazatlán",
    "paseos en lancha Mazatlán",
    "turismo Mazatlán",
    "tours México costeros",
    "Costa Franca Tours",
  ],
  openGraph: {
    siteName: "Costa Franca Tours",
    locale: "es_MX",
    alternateLocale: ["en_US"],
    type: "website",
  },
  twitter: { card: "summary_large_image" },
  // Tell search engines the canonical language alternates
  alternates: {
    canonical: baseUrl,
    languages: {
      "es-MX": baseUrl,
      "en-US": baseUrl, // same URL, lang served via cookie
      "x-default": baseUrl,
    },
  },
  // robots defaults — individual pages override as needed
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

// Organization JSON-LD — rendered once in <head>
const orgJsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  name: "Costa Franca Tours SAS",
  url: baseUrl,
  logo: `${baseUrl}/branding/logo.svg`,
  description:
    "Agencia de turismo con sede en Mazatlán, Sinaloa. Operador intermediario entre turistas y prestadores de servicios turísticos en destinos costeros de México.",
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
  // Read lang preference from cookie on the server so RSC renders correct lang
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        {/* hreflang alternates for bilingual SEO */}
        <link rel="alternate" hrefLang="es-MX" href={baseUrl} />
        <link rel="alternate" hrefLang="en-US" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        {/* Organization structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(orgJsonLd) }}
        />
      </head>
      <body
        className={`${marcellus.variable} ${lato.variable} font-sans antialiased flex flex-col min-h-dvh bg-central-bg text-central-blue`}
        suppressHydrationWarning
       >
        {/* LangProvider wraps everything so Navbar / Footer can call useLang() */}
        <LangProvider initialLang={lang}>
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
        </LangProvider>
      </body>
    </html>
  );
}
