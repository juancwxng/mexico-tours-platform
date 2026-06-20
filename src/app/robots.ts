import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    return "https://costafrancatours.com";
  }
  return url ?? "http://localhost:3000";
}

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/es/",     // internal rewrite prefix, canonical URLs are unprefixed
          "/api/",
          "/_next/",
          "/admin/",
        ],
      },
      { userAgent: "GPTBot",             allow: "/" },
      { userAgent: "ChatGPT-User",       allow: "/" },
      { userAgent: "OAI-SearchBot",      allow: "/" },
      { userAgent: "ClaudeBot",          allow: "/" },
      { userAgent: "Claude-Web",         allow: "/" },
      { userAgent: "anthropic-ai",       allow: "/" },
      { userAgent: "Google-Extended",    allow: "/" },
      { userAgent: "Googlebot",          allow: "/" },
      { userAgent: "PerplexityBot",      allow: "/" },
      { userAgent: "Applebot",           allow: "/" },
      { userAgent: "Applebot-Extended",  allow: "/" },
      { userAgent: "meta-externalagent", allow: "/" },
      { userAgent: "Amazonbot",          allow: "/" },
      { userAgent: "cohere-ai",          allow: "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
