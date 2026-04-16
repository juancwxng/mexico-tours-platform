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
 * - wa.me and api.whatsapp.com are allowed in connect-src for the booking flow.
 * - If you add Google Analytics / GTM, add accounts.google.com to connect-src
 *   and https://www.googletagmanager.com to script-src.
 */

const securityHeaders = [
  // Prevent clickjacking
  { key: "X-Frame-Options",          value: "SAMEORIGIN" },
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options",   value: "nosniff" },
  // Control referrer information
  { key: "Referrer-Policy",          value: "strict-origin-when-cross-origin" },
  // Disable FLoC / restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=()",
  },
  // HSTS — also enforce at Cloudflare / Hetzner level
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Scripts: self + Next.js inline bootstrap (unsafe-inline needed for _next chunks)
      "script-src 'self' 'unsafe-inline'",
      // Styles: self + Tailwind inline styles
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      // Fonts
      "font-src 'self' https://fonts.gstatic.com",
      // Images: self + data URIs (Next.js image placeholders)
      "img-src 'self' data: blob:",
      // Media: self (local video/audio assets)
      "media-src 'self'",
      // Connections: self + WhatsApp for booking redirects
      "connect-src 'self' https://wa.me https://api.whatsapp.com",
      // Frames: none (we don't embed iframes currently)
      "frame-src 'none'",
      // Objects: none
      "object-src 'none'",
      // Base URI: self (prevents base-tag injection)
      "base-uri 'self'",
      // Form actions: self + WhatsApp
      "form-action 'self' https://wa.me",
      // Upgrade insecure requests in production
      ...(process.env.NODE_ENV === "production" ? ["upgrade-insecure-requests"] : []),
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // ── Images ──────────────────────────────────────────────────────────────────
  images: {
    formats: ["image/avif", "image/webp"],
    // Add external domains here only if/when you use a remote image CDN.
    remotePatterns: [],
    // Reduce memory footprint on Hetzner VPS
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days
  },

  // ── Security headers (Hetzner / Node.js runtime) ────────────────────────────
  // For Cloudflare Pages, these are overridden by public/_headers.
  async headers() {
    return [
      {
        // Apply to all routes
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        // Allow cross-origin OG image fetching by social crawlers
        source: "/api/og/(.*)",
        headers: [{ key: "Access-Control-Allow-Origin", value: "*" }],
      },
    ];
  },

  // ── Redirects ────────────────────────────────────────────────────────────────
  async redirects() {
    return [
      // Legacy URL cleanup (add as needed)
      // { source: "/tours-old", destination: "/tours", permanent: true },
    ];
  },

  // ── Compiler ─────────────────────────────────────────────────────────────────
  // Remove console.log in production builds
  compiler: {
    removeConsole: process.env.NODE_ENV === "production"
      ? { exclude: ["error", "warn"] }
      : false,
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
