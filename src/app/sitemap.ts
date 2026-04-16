import type { MetadataRoute } from "next";
import { tours } from "@/lib/tours";
import { posts } from "@/lib/posts";

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    console.warn(
      "[sitemap.ts] NEXT_PUBLIC_SITE_URL is not set. " +
        "Set it in your Cloudflare Pages environment variables (e.g. https://costafrancatours.com)."
    );
    return "https://costafrancatours.com";
  }
  return url ?? "http://localhost:3000";
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = getSiteUrl();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl,                      lastModified: new Date(), changeFrequency: "weekly",  priority: 1.0 },
    { url: `${baseUrl}/tours`,           lastModified: new Date(), changeFrequency: "weekly",  priority: 0.9 },
    { url: `${baseUrl}/catalog`,         lastModified: new Date(), changeFrequency: "weekly",  priority: 0.8 },
    { url: `${baseUrl}/blog`,            lastModified: new Date(), changeFrequency: "daily",   priority: 0.8 },
    { url: `${baseUrl}/contact`,         lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    // Legal pages: indexed but low priority
    { url: `${baseUrl}/privacidad`,      lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
    { url: `${baseUrl}/terminos`,        lastModified: new Date(), changeFrequency: "yearly",  priority: 0.2 },
  ];

  const tourRoutes: MetadataRoute.Sitemap = tours.map((t) => ({
    url: `${baseUrl}/tours/${t.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  const blogRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${baseUrl}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
