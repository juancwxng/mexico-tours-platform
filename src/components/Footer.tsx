import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { MessageCircle, Instagram, Facebook } from "lucide-react";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
    </svg>
  );
}

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";

  const socialLinks = [
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
  ];

  const footerLinks = {
    tours: [
      { label: t("footer_all_tours"), href: "/tours" },
      { label: t("footer_catalog"), href: "/catalog" },
    ],
    company: [
      { label: t("footer_blog"), href: "/blog" },
      { label: t("footer_contact"), href: "/contact" },
    ],
  };

  return (
    <footer className="bg-navy-section text-white">
      {/* Wave-gradient divider top */}
      <div
        className="h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, #EACA8D 30%, #1A5F69 70%, transparent)",
        }}
      />

      <Container>
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image
                  src="/logo/Icon_CostaFrancaTours.svg"
                  alt="Costa Franca Tours"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="font-display text-white text-lg tracking-wide group-hover:text-gold transition-colors">
                Costa Franca Tours
              </span>
            </Link>
            <p className="text-white/65 text-sm leading-relaxed max-w-xs">
              {t("footer_tagline")}
            </p>
            {/* Socials */}
            <div className="flex gap-3 pt-1">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/55 hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              {socialLinks.map(({ label, icon: Icon, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  style={{ "--hover-color": color } as React.CSSProperties}
                  className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/55 transition-colors hover:border-[var(--hover-color)]/50 hover:text-[var(--hover-color)]"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Tours */}
          <div className="space-y-4">
            <h3 className="font-display text-white/70 text-sm tracking-widest uppercase">
              {t("footer_tours")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tours.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-display text-white/70 text-sm tracking-widest uppercase">
              {t("footer_company")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/60 text-sm hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-white/70 text-sm tracking-widest uppercase">
              {t("footer_contact")}
            </h3>
            <a
              id="footer-whatsapp-btn"
              href={`https://wa.me/${waNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="whatsapp-btn-style whatsapp-shake bg-[#25D366] text-white font-bold text-sm px-6 py-2.5 hover:opacity-90 transition-opacity"
            >
              <span>{t("footer_whatsapp")}</span>
              <Image
                src="/icons/whatsapp.svg"
                alt=""
                width={16}
                height={16}
                className="flex-shrink-0 brightness-0 invert"
              />
            </a>
            <p className="text-white/55 text-xs leading-relaxed">
              Mazatlán, Sinaloa, México
              <br />
              Lun–Dom · 8:00–22:00
            </p>
          </div>
        </div>
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/45">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Costa Franca Tours SAS.{" "}
            {t("footer_rights")}
          </p>
          <div className="flex gap-5">
            <Link
              href="/privacidad"
              className="hover:text-gold transition-colors"
            >
              {t("footer_privacy")}
            </Link>
            <Link
              href="/terminos"
              className="hover:text-gold transition-colors"
            >
              {t("footer_terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
