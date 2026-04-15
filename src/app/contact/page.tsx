import Image from "next/image";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
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

  const contactInfo = [
    {
      icon: Phone,
      title: t("contact_phone"),
      // TODO: Replace with real phone number before going live
      lines: ["+52 669 000 0000"],
      href: "tel:+526690000000",
    },
    {
      icon: Mail,
      title: t("contact_email"),
      // TODO: Replace with real email before going live
      lines: ["contacto@costafrancatours.com"],
      href: "mailto:contacto@costafrancatours.com",
    },
    {
      icon: MapPin,
      title: t("contact_location"),
      lines: ["Mazatlán, Sinaloa, México"],
      href: null,
    },
    {
      icon: Clock,
      title: t("contact_hours"),
      lines: [
        lang === "en" ? "Monday to Sunday" : "Lunes a Domingo",
        "8:00 AM – 10:00 PM",
      ],
      href: null,
    },
  ];

  const socials = [
    { label: "WhatsApp", abbr: "WA", href: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000"}` },
    { label: "Instagram", abbr: "IG", href: "https://instagram.com/costafrancatours" },
    { label: "Facebook",  abbr: "FB", href: "https://facebook.com/costafrancatours" },
  ];

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 lg:pb-24">
      <Container size="md">
        <div className="text-center mb-12 space-y-3">
          <h1 className="font-display text-4xl md:text-5xl text-central-blue uppercase font-bold">
            {t("contact_title")}
          </h1>
          <div className="w-24 h-1.5 bg-central-yellow mx-auto rounded-full" />
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            {t("contact_subtitle")}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {contactInfo.map((item, i) => (
                <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                  <div className="w-10 h-10 bg-central-blue/10 rounded-full flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-central-blue" />
                  </div>
                  <h3 className="font-display text-central-blue font-bold mb-1">{item.title}</h3>
                  {item.href ? (
                    <a href={item.href} className="text-gray-600 text-sm hover:text-central-yellow transition-colors">
                      {item.lines[0]}
                    </a>
                  ) : (
                    item.lines.map((line, j) => (
                      <p key={j} className="text-gray-600 text-sm">{line}</p>
                    ))
                  )}
                </div>
              ))}
            </div>

            <div className="bg-central-blue rounded-3xl p-8 text-center">
              <h3 className="font-display text-2xl text-white mb-6 uppercase">
                {t("contact_follow")}
              </h3>
              <div className="flex justify-center gap-4">
                {socials.map((s) => (
                  <a
                    key={s.abbr}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="w-11 h-11 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform text-central-blue font-bold text-xs"
                  >
                    {s.abbr}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Photo panel */}
          <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src="/images/contact/contact-hero.webp"
              alt={t("contact_photo_alt")}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-central-blue/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 text-white space-y-1">
              <p className="font-display text-2xl uppercase font-bold">{t("contact_city")}</p>
              <p className="text-white/80">{t("contact_city_sub")}</p>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
