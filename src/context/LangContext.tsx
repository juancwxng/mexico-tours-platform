"use client";

/**
 * src/context/LangContext.tsx
 *
 * Provides the active language + a toggle function to all client components.
 * The provider is mounted in src/app/layout.tsx and receives `initialLang`
 * from the server (read from the LANG_COOKIE via cookies()).
 *
 * Changing the language:
 *  1. Updates the cookie (persists across reloads).
 *  2. Calls router.refresh() so Server Components re-render with the new lang.
 */

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import {
  type Lang,
  type DictKey,
  type Dict,
  DEFAULT_LANG,
  LANG_COOKIE,
  SUPPORTED_LANGS,
  getT,
} from "@/lib/i18n";

// ─── Context shape ────────────────────────────────────────────────────────────

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: DictKey, vars?: Record<string, string | number>) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

// ─── Provider ────────────────────────────────────────────────────────────────

export function LangProvider({
  children,
  initialLang,
}: {
  children: ReactNode;
  initialLang: Lang;
}) {
  const router = useRouter();
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback(
    (newLang: Lang) => {
      if (!SUPPORTED_LANGS.includes(newLang)) return;
      setLangState(newLang);
      // Write a 1-year cookie so the preference persists
      document.cookie = `${LANG_COOKIE}=${newLang}; path=/; max-age=31536000; SameSite=Lax`;
      // Re-run Server Components so RSC-rendered copy updates
      router.refresh();
    },
    [router]
  );

  const toggleLang = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  const t = useCallback(getT(lang), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useLang(): LangContextValue {
  const ctx = useContext(LangContext);
  if (!ctx) {
    throw new Error("useLang() must be called inside <LangProvider>");
  }
  return ctx;
}

/** Convenience alias — returns only the translation function. */
export function useT(): LangContextValue["t"] {
  return useLang().t;
}

export type { Lang, DictKey, Dict };
export { DEFAULT_LANG };
