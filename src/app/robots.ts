import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    console.warn(
      "[robots.ts] NEXT_PUBLIC_SITE_URL is not set. " +
        "Set it in your Cloudflare Pages environment variables (e.g. https://costafrancatours.com)."
    );
    return "https://costafrancatours.com";
  }
  return url ?? "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  return {
    rules: [
      // ── Standard web crawlers ─────────────────────────────────────────────
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
        ],
      },

      // ── AI training & retrieval crawlers ─────────────────────────────────
      // Explicitly allowed so future blanket disallow rules don't block them.
      // Each crawler is listed separately for clarity and easy toggling.

      // OpenAI — ChatGPT browsing and training
      { userAgent: "GPTBot",            allow: "/" },
      { userAgent: "ChatGPT-User",      allow: "/" },
      { userAgent: "OAI-SearchBot",     allow: "/" },

      // Anthropic — Claude retrieval
      { userAgent: "ClaudeBot",         allow: "/" },
      { userAgent: "Claude-Web",        allow: "/" },
      { userAgent: "anthropic-ai",      allow: "/" },

      // Google — Gemini and AI Overviews
      { userAgent: "Google-Extended",   allow: "/" },
      { userAgent: "Googlebot",         allow: "/" },

      // Perplexity AI
      { userAgent: "PerplexityBot",     allow: "/" },

      // Apple — Siri and on-device intelligence
      { userAgent: "Applebot",          allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },

      // Meta — AI assistant retrieval
      { userAgent: "meta-externalagent", allow: "/" },

      // Amazon — Alexa and AI features
      { userAgent: "Amazonbot",         allow: "/" },

      // Cohere — enterprise AI retrieval
      { userAgent: "cohere-ai",         allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
