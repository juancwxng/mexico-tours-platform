import type { Metadata } from "next";
import "./globals.css";

const getSiteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://www.costafrancatours.com"
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icons/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icons/favicon/icon-96x96.png",    sizes: "96x96", type: "image/png" },
    ],
    shortcut: "/icons/favicon/favicon.ico",
    apple: [
      { url: "/icons/favicon/apple-touch-icon.png" },
      { url: "/icons/favicon/apple-touch-icon-152x152.png", sizes: "152x152" },
      { url: "/icons/favicon/apple-touch-icon-167x167.png", sizes: "167x167" },
    ],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
