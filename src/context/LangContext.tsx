"use client";

/**
 * Provides the active language + a navigation function to all client
 * components. `initialLang` comes from the server, resolved from the
 * [lang] URL segment (see src/middleware.ts). Switching language navigates
 * to the equivalent URL in the other language rather than mutating state,
 * so the language is always reflected in — and driven by — the URL.
 */

import {
  createContext,
  useContext,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import {
  type Lang,
  type DictKey,
  type Dict,
  DEFAULT_LANG,
  SUPPORTED_LANGS,
  getT,
  withLang,
  stripLangPrefix,
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
  const pathname = usePathname();
  const lang = initialLang;

  const setLang = useCallback(
    (newLang: Lang) => {
      if (!SUPPORTED_LANGS.includes(newLang)) return;
      router.push(withLang(newLang, stripLangPrefix(pathname)));
    },
    [router, pathname],
  );

  const toggleLang = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  // getT(lang) returns a new function reference on every render — wrap it in
  // useMemo so consumers only re-render when lang actually changes.
  const t = useMemo(() => getT(lang), [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

// ─── Hooks ───────────────────────────────────────────────────────────────────

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
