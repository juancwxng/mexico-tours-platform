import type { MetadataRoute } from "next";

function getSiteUrl(): string {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  if (!url && process.env.NODE_ENV === "production") {
    throw new Error(
      "[robots.ts] NEXT_PUBLIC_SITE_URL is not set. " +
        "Set it in your deployment environment (e.g. https://costafrancatours.com)."
    );
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
        // Disallow internal/build paths and future API routes
        disallow: [
          "/api/",
          "/_next/",
          "/admin/",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
