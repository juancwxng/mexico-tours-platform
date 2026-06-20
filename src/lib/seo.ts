import { withLang } from "@/lib/i18n";

/*
 * Returns the hreflang alternates block for a given page, pointing each
 * language at its real, distinct URL (es: unprefixed, en: /en-prefixed).
 */
export function hreflangAlternates(baseUrl: string, path: string = "/") {
  return {
    languages: {
      "es-MX": `${baseUrl}${withLang("es", path)}`,
      "en-US": `${baseUrl}${withLang("en", path)}`,
      "x-default": `${baseUrl}${withLang("es", path)}`,
    },
  };
}
