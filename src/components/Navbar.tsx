"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetClose,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { useLang } from "@/context/LangContext";
import { withLang, stripLangPrefix } from "@/lib/i18n";
import type { DictKey } from "@/lib/i18n";

type NavLink = { name: DictKey; href: string };

const navLinks: NavLink[] = [
  { name: "nav_home", href: "/" },
  { name: "nav_tours", href: "/tours" },
  { name: "nav_catalog", href: "/catalog" },
  { name: "nav_blog", href: "/blog" },
  { name: "nav_contact", href: "/contact" },
];

export default function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { t, lang } = useLang();
  const basePath = stripLangPrefix(pathname);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsSearchOpen(false);
        setSearchQuery("");
      }
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(withLang(lang, `/tours?q=${encodeURIComponent(q)}`));
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  const isHero = basePath === "/";
  const transparent = isHero && !isScrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 sm:h-[4.5rem] lg:h-20 overflow-hidden transition-all duration-500 ${
        transparent ? "" : "navbar-scrolled"
      }`}
    >
      <Container
        as="nav"
        className="h-full flex items-center justify-between gap-3 overflow-hidden"
      >
        {/* ── Mobile hamburger ── */}
        <div className="flex items-center lg:hidden flex-shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="w-11 h-11 -ml-2 text-white hover:bg-white/10 transition-colors"
                aria-label={t("nav_menu_open")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="left"
              className="w-[min(80vw,320px)] bg-navy border-r border-white/10 shadow-2xl"
            >
              <div className="pl-4">
                {/* Corrected Brand Name */}
                <SheetTitle className="font-display text-white text-2xl mb-8 mt-2">
                  Costa Franca Tours
                </SheetTitle>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={withLang(lang, link.href)}
                        className={`py-3 px-4 text-lg font-display text-white/80 hover:text-gold hover:bg-white/5 rounded-xl transition-all duration-200 ${
                          basePath === link.href ? "text-gold bg-white/5" : ""
                        }`}
                      >
                        {t(link.name)}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-white/10">
                  {/* Mobile language switcher — real links, crawlable */}
                  <div className="flex items-center gap-2 text-sm font-bold min-h-[44px] px-1">
                    <Link
                      href={withLang("es", basePath)}
                      aria-current={lang === "es" ? "page" : undefined}
                      className={
                        lang === "es"
                          ? "text-gold"
                          : "text-white/50 hover:text-white transition-colors"
                      }
                    >
                      ES
                    </Link>
                    <span className="text-white/35">|</span>
                    <Link
                      href={withLang("en", basePath)}
                      aria-current={lang === "en" ? "page" : undefined}
                      className={
                        lang === "en"
                          ? "text-gold"
                          : "text-white/50 hover:text-white transition-colors"
                      }
                    >
                      EN
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* ── Logo ── */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <Link
            href={withLang(lang, "/")}
            className="flex items-center gap-2 lg:gap-3 flex-shrink-0 lg:-ml-6"
          >
            <div className="relative w-40 sm:w-48 lg:w-[200px] aspect-[2280/697] transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo/Logo_CostaFrancaTours.svg"
                alt="Costa Franca Tours"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={withLang(lang, link.href)}
              className={`relative text-sm xl:text-[0.9rem] font-display tracking-wide whitespace-nowrap transition-colors duration-300 group ${
                basePath === link.href
                  ? "text-gold"
                  : "text-white/75 hover:text-gold"
              }`}
            >
              {t(link.name)}
            </Link>
          ))}
        </nav>

        {/* ── Right controls ── */}
        <div
          className={`flex items-center gap-3 lg:flex-shrink-0 ${isSearchOpen ? "flex-1 min-w-0" : "flex-shrink-0"}`}
        >
          {/* Desktop search */}
          <form
            onSubmit={handleSearch}
            className="hidden lg:flex items-center relative w-48 xl:w-60"
          >
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav_search")}
              maxLength={100}
              className="w-full h-9 rounded-full border pl-4 pr-10 text-sm focus:outline-none transition-all duration-300 bg-white/8 border-white/15 text-white placeholder:text-white/35 focus:bg-white/12 focus:border-gold/50"
            />
            <button
              type="submit"
              aria-label={t("nav_search_open")}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center text-white/50 hover:text-gold transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Desktop language switcher — real links, crawlable */}
          <div className="hidden lg:flex items-center gap-1 text-xs font-bold border rounded-full px-3 py-2 min-h-[36px] border-white/20">
            <Link
              href={withLang("es", basePath)}
              aria-current={lang === "es" ? "page" : undefined}
              className={
                lang === "es"
                  ? "opacity-100 text-gold"
                  : "opacity-50 text-white hover:opacity-80 transition-opacity"
              }
            >
              ES
            </Link>
            <span className="opacity-35 mx-0.5">|</span>
            <Link
              href={withLang("en", basePath)}
              aria-current={lang === "en" ? "page" : undefined}
              className={
                lang === "en"
                  ? "opacity-100 text-gold"
                  : "opacity-50 text-white hover:opacity-80 transition-opacity"
              }
            >
              EN
            </Link>
          </div>

          {/* Mobile search */}
          <div
            className={`lg:hidden relative flex items-center min-w-0 transition-all duration-300 ${isSearchOpen ? "flex-1 max-w-[calc(100vw-7rem)]" : "w-auto"}`}
          >
            {isSearchOpen ? (
              <form
                onSubmit={handleSearch}
                className="flex items-center w-full min-w-0 gap-1 animate-in fade-in slide-in-from-right-4 duration-200"
              >
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("nav_search")}
                  maxLength={100}
                  autoFocus
                  className="h-9 w-full min-w-0 rounded-full border border-gold/25 bg-white/8 px-4 text-sm text-white placeholder:text-white/35 focus:outline-none focus:border-gold/50"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setIsSearchOpen(false);
                    setSearchQuery("");
                  }}
                  className="w-7 h-7 flex-shrink-0 text-white/50 hover:text-gold transition-colors rounded-full"
                >
                  <X className="w-3.5 h-3.5" />
                </Button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label={t("nav_search_open")}
                className="w-11 h-11 flex items-center justify-center rounded-full text-white/70 hover:text-gold transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}
