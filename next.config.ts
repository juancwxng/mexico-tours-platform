import type { NextConfig } from "next";

const R2_PUBLIC_HOSTNAME = process.env.NEXT_PUBLIC_R2_HOSTNAME ?? "";

const generateCSP = (): string => {
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrc = isDev ? "'self' 'unsafe-inline' 'unsafe-eval'" : "'self' 'unsafe-inline'";
  const r2Origin = R2_PUBLIC_HOSTNAME ? `https://${R2_PUBLIC_HOSTNAME}` : "";

  return [
    "default-src 'self'",
    `script-src ${scriptSrc}`,
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com",
    `img-src 'self' data: blob:${r2Origin ? ` ${r2Origin}` : ""}`,
    `media-src 'self'${r2Origin ? ` ${r2Origin}` : ""}`,
    "worker-src 'self' blob:",
    "connect-src 'self' https://wa.me https://api.whatsapp.com wss: ws:",
    "frame-src 'none'",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me",
    ...(process.env.FORCE_HTTPS === "true" ? ["upgrade-insecure-requests"] : []),
  ].join("; ");
};

const securityHeaders = [
  { key: "X-Frame-Options",            value: "SAMEORIGIN" },
  { key: "X-Content-Type-Options",     value: "nosniff" },
  { key: "Referrer-Policy",            value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy",         value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Strict-Transport-Security",  value: "max-age=63072000; includeSubDomains; preload" },
  { key: "Content-Security-Policy",    value: generateCSP() },
];

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [400, 840, 1200, 2400],
    imageSizes: [],
    minimumCacheTTL: 60 * 60 * 24 * 7,
    remotePatterns: R2_PUBLIC_HOSTNAME
      ? [{ protocol: "https", hostname: R2_PUBLIC_HOSTNAME, pathname: "/**" }]
      : [],
  },

  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/images/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          { key: "X-Frame-Options",             value: "ALLOWALL" },
          { key: "Cache-Control",               value: "public, max-age=86400, stale-while-revalidate=604800" },
        ],
      },
      { source: "/api/og/(.*)", headers: [{ key: "Access-Control-Allow-Origin", value: "*" }] },
    ];
  },

  // Legacy slug redirects moved to src/middleware.ts so they run before the locale rewrite.

  compiler: {
    removeConsole:
      process.env.NODE_ENV === "production" ? { exclude: ["error", "warn"] } : false,
  },
};

export default nextConfig;

if (process.env.NODE_ENV === "development") {
  import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev());
}
