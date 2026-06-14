import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  MessageCircle,
  Instagram,
  Facebook,
  ArrowRight,
  PhoneCall,
} from "lucide-react";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { hreflangAlternates } from "@/lib/seo";
import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

/*
 * Dynamic bilingual metadata generation
 */
export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const isEn = lang ? lang.startsWith("en") : false;

  const pageUrl = `${baseUrl}/contact`;

  return {
    title: isEn ? "Contact Us" : "Contacto",
    description: isEn
      ? "Contact us to book your tourist experience in Mazatlan. Customer service via WhatsApp, phone calls, email, and social media."
      : "Contáctanos para reservar tu experiencia turística en Mazatlán. Atención por WhatsApp, llamadas, correo y redes sociales.",
    alternates: {
      canonical: pageUrl,
      ...hreflangAlternates(pageUrl),
    },
  };
}

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const isEn = lang ? lang.startsWith("en") : false;
  const t = getT(lang);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526691525822";

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">
      {/* Header band
        Clean design with custom alignment and desaturated background gradients
      */}
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
        <Container className="relative z-10">
          <span
            className="section-badge mb-4 inline-flex"
            style={{
              color: "#E8D5AD",
              borderColor: "rgba(232,213,173,0.25)",
              background: "rgba(201,169,110,0.08)",
            }}
          >
            {isEn ? "Get in Touch" : "Escríbenos"}
          </span>
          <h1 className="font-display text-5xl md:text-6xl text-white mt-3 leading-none">
            {t("contact_title")}
          </h1>
          <hr className="divider-gold max-w-16 opacity-60 mt-4" />
        </Container>
      </div>

      <div className="pb-20 lg:pb-28 pt-12">
        <Container size="lg">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left side: Sales conversion core and secondary contact channels */}
            <div className="space-y-8">
              <p className="text-navy/60 text-lg leading-relaxed">
                {t("contact_subtitle")}
              </p>

              {/* 1. Dual Primary CTAs (Split CTA Pattern) */}
              <div className="grid sm:grid-cols-2 gap-4">
                {/* WhatsApp Premium Interactive Card */}
                <a
                  href={`https://wa.me/${waNumber}?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%2C%20por%20favor.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block rounded-2xl p-6 bg-[#25D366] text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(37,211,102,0.35)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  <h3 className="font-display text-xl text-white font-bold mb-1">
                    {isEn ? "Chat via WhatsApp" : "Chatea por WhatsApp"}
                  </h3>
                  <p className="text-white/85 text-xs sm:text-sm leading-snug font-medium">
                    {isEn
                      ? "Fast response for tour configurations and quotes."
                      : "Respuesta rápida para armar tu paquete y cotizar."}
                  </p>
                </a>

                {/* Direct Phone Call Premium Interactive Card */}
                <a
                  href={`tel:6691525822`}
                  className="group relative block rounded-2xl p-6 bg-teal text-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_24px_rgba(26,95,105,0.35)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center">
                      <PhoneCall className="w-6 h-6 text-white" />
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/70 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>

                  <h3 className="font-display text-xl text-white font-bold mb-1">
                    {isEn ? "Call an Expert" : "Llama a un Experto"}
                  </h3>
                  <p className="text-white/85 text-xs sm:text-sm leading-snug font-medium">
                    {isEn
                      ? "Direct cellular line for immediate offline support."
                      : "Línea celular directa para atención personalizada."}
                  </p>
                </a>
              </div>

              {/* 2. Secondary Information Grid */}
              <div className="grid sm:grid-cols-3 gap-4">
                {/* Email Interactive Card - Entire card acts as hit area */}
                <a
                  href="mailto:contacto@costafrancatours.com"
                  className="group block bg-white p-5 rounded-2xl border border-navy/10 shadow-sm hover:border-gold/40 hover:shadow-md transition-all duration-200 text-left"
                >
                  <div className="w-9 h-9 bg-gold/10 rounded-xl flex items-center justify-center mb-3 transition-colors group-hover:bg-gold/20">
                    <Mail className="w-4.5 h-4.5 text-gold-dark" />
                  </div>
                  <h4 className="font-display text-navy font-bold text-sm mb-1">
                    {isEn ? "Send an Email" : "Envíanos un Correo"}
                  </h4>
                  <p className="text-navy/60 text-xs truncate">
                    contacto@costafrancatours.com
                  </p>
                </a>

                {/* Location Informative Card */}
                <div className="bg-white p-5 rounded-2xl border border-navy/10 shadow-sm text-left">
                  <div className="w-9 h-9 bg-navy/5 rounded-xl flex items-center justify-center mb-3">
                    <MapPin className="w-4.5 h-4.5 text-navy" />
                  </div>
                  <h4 className="font-display text-navy font-bold text-sm mb-1">
                    {t("contact_location")}
                  </h4>
                  <p className="text-navy/60 text-xs leading-relaxed">
                    Mazatlán, Sinaloa, México
                  </p>
                </div>

                {/* Operating Hours Informative Card */}
                <div className="bg-white p-5 rounded-2xl border border-navy/10 shadow-sm text-left">
                  <div className="w-9 h-9 bg-[#f4f1ec] rounded-xl flex items-center justify-center mb-3">
                    <Clock className="w-4.5 h-4.5 text-navy/60" />
                  </div>
                  <h4 className="font-display text-navy font-bold text-sm mb-1">
                    {t("contact_hours")}
                  </h4>
                  <p className="text-navy/60 text-xs leading-tight">
                    {isEn ? "Mon to Sun" : "Lun a Dom"}
                    <span className="block font-medium mt-0.5">
                      8:00 AM – 10:00 PM
                    </span>
                  </p>
                </div>
              </div>

              {/* 3. Social Media Box */}
              <div className="bg-navy-section rounded-2xl p-6 text-center">
                <h3 className="font-display text-lg text-white mb-4 font-medium">
                  {t("contact_follow")}
                </h3>
                <div className="flex justify-center gap-4">
                  {[
                    {
                      label: "WhatsApp",
                      icon: MessageCircle,
                      href: `https://wa.me/${waNumber}`,
                      color: "#25D366",
                    },
                    {
                      label: "Instagram",
                      icon: Instagram,
                      href: "https://www.instagram.com/centraltoursmazatlan",
                      color: "#C9A96E",
                    },
                    {
                      label: "Facebook",
                      icon: Facebook,
                      href: "https://www.facebook.com/PaseosMazatlanIslaPiedraVenadosCatamaranBanda",
                      color: "#A8C8D8",
                    },
                    {
                      label: "TikTok",
                      icon: TikTokIcon,
                      href: "https://www.tiktok.com/@centraltoursmazatlan",
                      color: "#ffffff",
                    },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-11 h-11 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                      style={{ color: s.color }}
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative h-[480px] lg:h-[580px] rounded-2xl overflow-hidden shadow-xl border border-navy/5">
              <Image
                src="/images/contact-hero.webp"
                alt="Costa Franca Tours guide briefing a group of tourists before boarding an excursion van"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              {/* Soft vertical gradient to ensure high contrast against bottom metadata label overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
                <p className="font-display text-3xl font-medium tracking-wide">
                  {t("contact_city")}
                </p>
                <p className="text-white/75 text-sm font-medium tracking-wide">
                  {t("contact_city_sub")}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
