import type { MetadataRoute } from "next";
import { tours } from "@/lib/tours";
import { posts } from "@/lib/posts";
import { withLang, SUPPORTED_LANGS } from "@/lib/i18n";

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    return "https://costafrancatours.com";
  }
  return url ?? "http://localhost:3000";
}

// Static paths — one entry per language.
const STATIC_PATHS = [
  { path: "/",          changeFrequency: "weekly"  as const, priority: 1.0 },
  { path: "/tours",     changeFrequency: "weekly"  as const, priority: 0.9 },
  { path: "/catalog",   changeFrequency: "weekly"  as const, priority: 0.8 },
  { path: "/blog",      changeFrequency: "daily"   as const, priority: 0.8 },
  { path: "/contact",   changeFrequency: "monthly" as const, priority: 0.5 },
  { path: "/privacidad",changeFrequency: "yearly"  as const, priority: 0.2 },
  { path: "/terminos",  changeFrequency: "yearly"  as const, priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = STATIC_PATHS.flatMap(({ path, changeFrequency, priority }) =>
    SUPPORTED_LANGS.map((lang) => ({
      url: `${baseUrl}${withLang(lang, path)}`,
      lastModified: now,
      changeFrequency,
      priority,
    }))
  );

  const tourRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    tours.map((t) => ({
      url: `${baseUrl}${withLang(lang, `/tours/${t.slug}`)}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  const blogRoutes: MetadataRoute.Sitemap = SUPPORTED_LANGS.flatMap((lang) =>
    posts.map((p) => ({
      url: `${baseUrl}${withLang(lang, `/blog/${p.slug}`)}`,
      lastModified: new Date(p.lastModified ?? p.date),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }))
  );

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
