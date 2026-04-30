import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { MessageCircle, Instagram, Facebook } from "lucide-react";

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);
  const waNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000";

  const footerLinks = {
    tours: [
      { label: t("footer_all_tours"), href: "/tours" },
      { label: t("footer_catalog"),   href: "/catalog" },
    ],
    company: [
      { label: t("footer_blog"),    href: "/blog" },
      { label: t("footer_contact"), href: "/contact" },
    ],
  };

  return (
    <footer className="bg-navy-section text-white">
      {/* Gold divider top */}
      <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <Container>
        <div className="py-14 lg:py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-5">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <div className="relative w-10 h-10">
                <Image src="/branding/logo.svg" alt="Costa Franca Tours" fill className="object-contain" />
              </div>
              <span className="font-display text-white text-lg tracking-wide">
                Costa Franca Tours
              </span>
            </Link>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              {t("footer_tagline")}
            </p>
            {/* Socials */}
            <div className="flex gap-3 pt-1">
              <a
                href={`https://wa.me/${waNumber}`}
                target="_blank" rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-[#25D366] hover:border-[#25D366]/50 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com/costafrancatours"
                target="_blank" rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-gold hover:border-gold/50 transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com/costafrancatours"
                target="_blank" rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-white/50 hover:text-teal-light hover:border-teal-light/50 transition-colors"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Tours */}
          <div className="space-y-4">
            <h3 className="font-display text-white/80 text-sm tracking-widest uppercase">
              {t("footer_tours")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.tours.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-sm hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="font-display text-white/80 text-sm tracking-widest uppercase">
              {t("footer_company")}
            </h3>
            <ul className="space-y-2.5">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/45 text-sm hover:text-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-display text-white/80 text-sm tracking-widest uppercase">
              {t("footer_contact")}
            </h3>
            <a
              href={`https://wa.me/${waNumber}`}
              target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-4 py-2.5 rounded-full hover:opacity-90 transition-opacity"
            >
              <MessageCircle className="w-4 h-4" />
              {t("footer_whatsapp")}
            </a>
            <p className="text-white/40 text-xs leading-relaxed">
              Mazatlán, Sinaloa, México<br />
              Lun–Dom · 8:00–22:00
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-xs text-white/30">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Costa Franca Tours SAS. {t("footer_rights")}
          </p>
          <div className="flex gap-5">
            <Link href="/privacidad" className="hover:text-gold transition-colors">
              {t("footer_privacy")}
            </Link>
            <Link href="/terminos" className="hover:text-gold transition-colors">
              {t("footer_terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
