"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { Menu, Search, X } from "lucide-react";
import { Sheet, SheetContent, SheetClose, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import { useLang } from "@/context/LangContext";
import type { DictKey } from "@/lib/i18n";

type NavLink = { name: DictKey; href: string };

const navLinks: NavLink[] = [
  { name: "nav_home",    href: "/" },
  { name: "nav_tours",   href: "/tours" },
  { name: "nav_catalog", href: "/catalog" },
  { name: "nav_blog",    href: "/blog" },
  { name: "nav_contact", href: "/contact" },
];

export default function Navbar() {
  const router   = useRouter();
  const pathname = usePathname();
  const { t, lang, toggleLang } = useLang();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [isScrolled, setIsScrolled]     = useState(false);
  const [mounted, setMounted]           = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const q = searchQuery.trim();
    if (!q) return;
    router.push(`/tours?q=${encodeURIComponent(q)}`);
    setSearchQuery("");
    setIsSearchOpen(false);
  };

  // Transparent on hero pages (home), glass everywhere else
  const isHero = pathname === "/";
  const transparent = isHero && !isScrolled;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 sm:h-[4.5rem] lg:h-20 transition-all duration-500 ${
        transparent ? "" : "navbar-scrolled"
      }`}
    >
      <Container as="nav" className="h-full flex items-center justify-between gap-3">

        {/* ── Mobile hamburger ── */}
        <div className="flex items-center lg:hidden flex-shrink-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={`w-11 h-11 -ml-2 transition-colors ${
                  transparent ? "text-white hover:bg-white/10" : "text-navy hover:bg-gold/10"
                }`}
                aria-label={t("nav_menu_open")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(80vw,320px)] bg-pearl border-r-0 shadow-2xl">
              {/* Gold accent bar */}
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-gold via-teal to-gold" />
              <div className="pl-4">
                <SheetTitle className="font-display text-navy text-2xl mb-8 mt-2">
                  Costa Franca
                </SheetTitle>
                <nav className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        href={link.href}
                        className={`py-3 px-4 text-lg font-display text-navy hover:text-gold hover:bg-gold/5 rounded-xl transition-all duration-200 ${
                          pathname === link.href ? "text-gold bg-gold/5" : ""
                        }`}
                      >
                        {t(link.name)}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <div className="mt-8 pt-6 border-t border-pearl-warm">
                  <button
                    type="button"
                    onClick={toggleLang}
                    className="flex items-center gap-2 text-sm font-bold text-navy/60 hover:text-navy transition-colors min-h-[44px] px-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold rounded-lg"
                    aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
                  >
                    <span className={lang === "es" ? "text-navy" : "text-navy/35"}>ES</span>
                    <span className="text-navy/20">|</span>
                    <span className={lang === "en" ? "text-navy" : "text-navy/35"}>EN</span>
                  </button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* ── Logo ── */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/branding/logo.svg"
                alt="Costa Franca Tours"
                fill
                className="object-contain"
                priority
              />
            </div>
            <span
              className={`hidden lg:block font-display text-base xl:text-lg tracking-wide transition-colors duration-300 ${
                transparent ? "text-white/90" : "text-navy"
              }`}
            >
              Costa Franca Tours
            </span>
          </Link>
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`relative text-sm xl:text-[0.9rem] font-display tracking-wide whitespace-nowrap transition-colors duration-300 group ${
                transparent ? "text-white/85 hover:text-white" : "text-navy/80 hover:text-navy"
              } ${pathname === link.href ? (transparent ? "text-white" : "text-gold") : ""}`}
            >
              {t(link.name)}
              {/* Animated underline */}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-gold transition-all duration-300 ${
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* ── Right controls ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative w-48 xl:w-60">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav_search")}
              maxLength={100}
              className={`w-full h-9 rounded-full border pl-4 pr-10 text-sm focus:outline-none transition-all duration-300 ${
                transparent
                  ? "bg-white/15 border-white/25 text-white placeholder:text-white/50 focus:bg-white/25 focus:border-white/50"
                  : "bg-pearl-warm border-gold/20 text-navy placeholder:text-ink-muted/50 focus:border-gold"
              }`}
            />
            <button
              type="submit"
              aria-label={t("nav_search_open")}
              className={`absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center transition-colors ${
                transparent ? "text-white/70 hover:text-white" : "text-navy/60 hover:text-gold"
              }`}
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Language toggle desktop */}
          {mounted && (
            <button
              type="button"
              onClick={toggleLang}
              className={`hidden lg:flex items-center gap-1 text-xs font-bold border rounded-full px-3 py-2 min-h-[36px] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold ${
                transparent
                  ? "border-white/25 text-white/80 hover:border-white hover:text-white"
                  : "border-gold/30 text-navy/70 hover:border-gold hover:text-gold"
              }`}
              aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
            >
              <span className={lang === "es" ? "opacity-100" : "opacity-35"}>ES</span>
              <span className="opacity-20 mx-0.5">|</span>
              <span className={lang === "en" ? "opacity-100" : "opacity-35"}>EN</span>
            </button>
          )}

          {/* Mobile search */}
          <div className={`lg:hidden relative flex items-center transition-all duration-300 ${isSearchOpen ? "w-full" : "w-auto"}`}>
            {isSearchOpen ? (
              <form onSubmit={handleSearch} className="flex items-center w-full gap-1 animate-in fade-in slide-in-from-right-4 duration-200">
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("nav_search")}
                  maxLength={100}
                  autoFocus
                  className="h-9 w-full rounded-full border border-gold/25 bg-pearl-warm px-4 text-sm text-navy placeholder:text-ink-muted/50 focus:outline-none focus:border-gold"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(""); }}
                  className="w-9 h-9 flex-shrink-0 text-red-400 hover:text-red-500 rounded-full"
                >
                  <X className="w-4 h-4" />
                </Button>
              </form>
            ) : (
              <button
                type="button"
                onClick={() => setIsSearchOpen(true)}
                aria-label={t("nav_search_open")}
                className={`w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
                  transparent ? "text-white/80 hover:text-white" : "text-navy/70 hover:text-gold"
                }`}
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
