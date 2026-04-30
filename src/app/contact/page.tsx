import Image from "next/image";
import { MapPin, Phone, Mail, Clock, MessageCircle, Instagram, Facebook } from "lucide-react";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contáctanos para reservar tu experiencia turística en Mazatlán. Atención por WhatsApp, correo y redes sociales.",
};

export default async function ContactPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact_phone"),
      lines: ["+52 669 000 0000"],
      href: "tel:+526690000000",
      color: "text-teal",
      bg: "bg-teal/10",
    },
    {
      icon: Mail,
      title: t("contact_email"),
      lines: ["contacto@costafrancatours.com"],
      href: "mailto:contacto@costafrancatours.com",
      color: "text-gold",
      bg: "bg-gold/10",
    },
    {
      icon: MapPin,
      title: t("contact_location"),
      lines: ["Mazatlán, Sinaloa, México"],
      href: null,
      color: "text-navy",
      bg: "bg-navy/8",
    },
    {
      icon: Clock,
      title: t("contact_hours"),
      lines: [lang === "en" ? "Monday to Sunday" : "Lunes a Domingo", "8:00 AM – 10:00 PM"],
      href: null,
      color: "text-ink-muted",
      bg: "bg-pearl-warm",
    },
  ];

  const socials = [
    { label: "WhatsApp", icon: MessageCircle, href: `https://wa.me/${waNumber}`, color: "#25D366" },
    { label: "Instagram", icon: Instagram, href: "https://instagram.com/costafrancatours", color: "#C9A96E" },
    { label: "Facebook",  icon: Facebook,  href: "https://facebook.com/costafrancatours", color: "#A8C8D8" },
  ];

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">
      {/* Header band */}
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
        <Container className="relative z-10">
          <span className="section-badge mb-4 inline-flex" style={{ color: "#E8D5AD", borderColor: "rgba(232,213,173,0.25)", background: "rgba(201,169,110,0.08)" }}>
            ✦ {lang === "en" ? "Get in Touch" : "Escríbenos"}
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

            {/* Left: info cards + socials */}
            <div className="space-y-6">
              <p className="text-ink-muted text-lg leading-relaxed">{t("contact_subtitle")}</p>

              <div className="grid sm:grid-cols-2 gap-4">
                {contactInfo.map((item, i) => (
                  <div
                    key={i}
                    className="bg-white p-5 rounded-2xl border border-pearl-warm shadow-sm hover:border-gold/25 transition-colors"
                  >
                    <div className={`w-10 h-10 ${item.bg} rounded-xl flex items-center justify-center mb-3`}>
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </div>
                    <h3 className="font-display text-navy mb-1 text-base">{item.title}</h3>
                    {item.href ? (
                      <a href={item.href} className="text-ink-muted text-sm hover:text-gold transition-colors leading-relaxed">
                        {item.lines[0]}
                      </a>
                    ) : (
                      item.lines.map((line, j) => (
                        <p key={j} className="text-ink-muted text-sm leading-relaxed">{line}</p>
                      ))
                    )}
                  </div>
                ))}
              </div>

              {/* Socials */}
              <div className="bg-navy-section rounded-2xl p-7 text-center">
                <h3 className="font-display text-xl text-white mb-5">{t("contact_follow")}</h3>
                <div className="flex justify-center gap-4">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.label}
                      className="w-12 h-12 bg-white/10 hover:bg-white/18 rounded-full flex items-center justify-center transition-all hover:scale-110"
                      style={{ color: s.color }}
                    >
                      <s.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: photo */}
            <div className="relative h-[460px] lg:h-[560px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/contact/contact-hero.webp"
                alt={t("contact_photo_alt")}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/65 via-transparent to-transparent" />
              <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
                <p className="font-display text-2xl">{t("contact_city")}</p>
                <p className="text-white/70 text-sm">{t("contact_city_sub")}</p>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
