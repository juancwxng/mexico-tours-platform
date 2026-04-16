// next.config.ts
import type { NextConfig } from "next";

/**
 * next.config.ts
 *
 * Security headers are defined here for non-Cloudflare deployments (Hetzner).
 * For Cloudflare Pages, the canonical source of truth is public/_headers —
 * both files should be kept in sync.
 *
 * CSP notes:
 * - 'unsafe-inline' in style-src is required by Tailwind CSS (inline styles).
 * - worker-src 'self' blob: is required for Next.js 15 App Router prefetch worker.
 * - wa.me and api.whatsapp.com are allowed in connect-src for the booking flow.
 * - wss:/ws: in connect-src allows webpack HMR and RSC streaming.
 * - If you add Google Analytics / GTM, add accounts.google.com to connect-src
 *   and https://www.googletagmanager.com to script-src.
 */

// Helper to generate CSP value with 'unsafe-eval' only in development
const generateCSP = (): string => {
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrc = isDev
    ? "'self' 'unsafe-inline' 'unsafe-eval'" // Add eval for Fast Refresh
    : "'self' 'unsafe-inline'";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    "img-src 'self' data: blob:",
    "media-src 'self'",
    "worker-src 'self' blob:",
    "connect-src 'self' https://wa.me https://api.whatsapp.com wss: ws:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me",
    ...(isDev ? [] : ["upgrade-insecure-requests"]),
  ].join("; ");
};

const securityHeaders = [
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: generateCSP(),
  },
];

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/api/og/(.*)",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },

  async redirects() {
    return [];
  },

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "warn"] }
        : false,
  },
};

export default nextConfig;

// Initialize OpenNext Cloudflare bindings only in development
if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) =>
    m.initOpenNextCloudflareForDev()
  );
}