/*
 * Returns the correct hreflang alternates block for a given page URL
 */
export function hreflangAlternates(pageUrl: string) {
  return {
    languages: {
      "es-MX": pageUrl,
      "en-US": pageUrl,
      "x-default": pageUrl,
    },
  };
}
