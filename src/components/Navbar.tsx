"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
  const { t, lang, toggleLang } = useLang();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery]   = useState("");
  const [isScrolled, setIsScrolled]     = useState(false);

  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20);
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

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 h-16 sm:h-[4.5rem] lg:h-20 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100"
          : "bg-transparent"
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
                className="w-11 h-11 -ml-2 text-central-blue"
                aria-label={t("nav_menu_open")}
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(80vw,320px)] bg-white border-r-4 border-r-central-yellow">
              <SheetTitle className="font-display text-central-blue text-2xl uppercase mb-8">
                {t("nav_menu_title")}
              </SheetTitle>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <SheetClose asChild key={link.name}>
                    <Link
                      href={link.href}
                      className="py-3 px-4 text-lg font-bold text-central-blue hover:text-central-yellow hover:bg-central-yellow/5 rounded-xl transition-colors font-display tracking-wide"
                    >
                      {t(link.name)}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              {/* Language toggle inside mobile menu */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-2 text-sm font-bold text-central-blue/60 hover:text-central-blue transition-colors"
                  aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
                >
                  <span className={lang === "es" ? "text-central-blue" : "text-central-blue/40"}>ES</span>
                  <span className="text-central-blue/30">|</span>
                  <span className={lang === "en" ? "text-central-blue" : "text-central-blue/40"}>EN</span>
                </button>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* ── Logo ── */}
        <div className="flex items-center gap-2 lg:gap-3 flex-shrink-0">
          <Link href="/" className="flex items-center gap-2 lg:gap-3 group">
            <div className="relative w-9 h-9 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform group-hover:scale-105">
              <Image
                src="/branding/logo.svg"
                alt="Costa Franca Tours"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="hidden lg:block relative h-8 w-24 xl:h-10 xl:w-28">
              <Image
                src="/branding/text.svg"
                alt="Costa Franca Tours"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>
        </div>

        {/* ── Desktop nav ── */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8 2xl:gap-10 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm xl:text-base font-bold text-central-blue hover:text-central-yellow transition-colors font-display tracking-wide whitespace-nowrap"
            >
              {t(link.name)}
            </Link>
          ))}
        </nav>

        {/* ── Search + Language toggle (desktop) ── */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Desktop search */}
          <form onSubmit={handleSearch} className="hidden lg:flex items-center relative w-52 xl:w-64">
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t("nav_search")}
              maxLength={100}
              className="w-full h-10 rounded-full border-2 border-central-blue/20 bg-gray-50 pl-4 pr-10 text-sm text-central-blue placeholder:text-central-blue/40 focus:outline-none focus:border-central-yellow transition-all"
            />
            <button
              type="submit"
              aria-label={t("nav_search_open")}
              className="absolute right-1 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-central-blue hover:text-central-yellow transition-colors"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>

          {/* Desktop language toggle */}
          <button
            onClick={toggleLang}
            className="hidden lg:flex items-center gap-1.5 text-xs font-bold border border-central-blue/20 rounded-full px-3 py-1.5 text-central-blue hover:border-central-yellow hover:text-central-yellow transition-colors"
            aria-label={lang === "es" ? "Switch to English" : "Cambiar a Español"}
          >
            <span className={lang === "es" ? "opacity-100" : "opacity-40"}>ES</span>
            <span className="opacity-20">|</span>
            <span className={lang === "en" ? "opacity-100" : "opacity-40"}>EN</span>
          </button>

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
                  className="h-10 w-full rounded-full border-2 border-central-blue/20 bg-gray-50 px-4 text-sm text-central-blue placeholder:text-central-blue/40 focus:outline-none focus:border-central-yellow"
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
                className="w-11 h-11 flex items-center justify-center text-central-blue hover:text-central-yellow transition-colors rounded-full"
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
