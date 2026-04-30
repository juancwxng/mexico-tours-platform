import type { Metadata } from "next";
import { Marcellus, Lato } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppPill from "@/components/WhatsAppPill";
import PageTransition from "@/components/PageTransition";
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
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";

  return (
    <html lang={lang} className="scroll-smooth">
      <head>
        <link rel="alternate" hrefLang="es-MX" href={baseUrl} />
        <link rel="alternate" hrefLang="en-US" href={baseUrl} />
        <link rel="alternate" hrefLang="x-default" href={baseUrl} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: safeJsonLd(orgJsonLd) }}
        />
      </head>
      <body
        className={`${marcellus.variable} ${lato.variable} font-sans antialiased flex flex-col min-h-dvh bg-pearl text-ink`}
        suppressHydrationWarning
      >
        <LangProvider initialLang={lang}>
          {/* Custom cursor (client) */}
          <CustomCursor />
          {/* Page-transition fade (client) */}
          <PageTransition />
          <Navbar />
          <div className="flex-1 flex flex-col">{children}</div>
          <Footer />
          {/* Floating WhatsApp */}
          <WhatsAppPill number={waNumber} />
        </LangProvider>
      </body>
    </html>
  );
}
