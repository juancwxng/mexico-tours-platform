/**
 * Footer is a Server Component — it reads lang from cookies() server-side
 * so it renders correctly on first load without flash.
 */
import Link from "next/link";
import Image from "next/image";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";

export default async function Footer() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

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

  const socials = [
    { label: "Instagram", abbr: "IG", href: "https://instagram.com/costafrancatours" },
    { label: "Facebook",  abbr: "FB", href: "https://facebook.com/costafrancatours" },
    { label: "TikTok",    abbr: "TK", href: "https://tiktok.com/@costafrancatours" },
  ];

  return (
    <footer className="border-t border-gray-100 bg-white mt-auto">
      <Container>
        <div className="py-12 lg:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">

          {/* Brand column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link href="/" className="inline-flex items-center gap-2">
              <div className="relative w-10 h-10">
                <Image src="/branding/logo.svg" alt="Costa Franca Tours" fill className="object-contain" />
              </div>
              <span className="font-display text-central-blue font-bold text-lg uppercase">Costa Franca</span>
            </Link>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              {t("footer_tagline")}
            </p>
          </div>

          {/* Tours column */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-central-blue uppercase text-sm tracking-wider">
              {t("footer_tours")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.tours.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 text-sm hover:text-central-yellow transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div className="space-y-3">
            <h3 className="font-display font-bold text-central-blue uppercase text-sm tracking-wider">
              {t("footer_company")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-gray-500 text-sm hover:text-central-yellow transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact / socials column */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-central-blue uppercase text-sm tracking-wider">
              {t("footer_contact")}
            </h3>
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "526690000000"}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold text-sm px-4 py-2.5 rounded-xl hover:opacity-90 transition-opacity"
            >
              {t("footer_whatsapp")}
            </a>
            <div className="flex gap-3 pt-1">
              {socials.map((s) => (
                <a
                  key={s.abbr}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-11 h-11 border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-central-blue hover:border-central-blue transition-colors text-xs font-bold"
                >
                  {s.abbr}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-4 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-gray-400">
          <p suppressHydrationWarning>
            © {new Date().getFullYear()} Costa Franca Tours SAS. {t("footer_rights")}
          </p>
          <div className="flex gap-4">
            <Link href="/privacidad" className="hover:text-central-blue transition-colors">
              {t("footer_privacy")}
            </Link>
            <Link href="/terminos" className="hover:text-central-blue transition-colors">
              {t("footer_terms")}
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
