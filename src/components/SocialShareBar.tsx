"use client";

import { useState } from "react";
import { Link2, Share2, Check } from "lucide-react";
import { useT } from "@/context/LangContext";

// ── Platform SVG icons ─────────────────────────────────────────────────────

function PinterestIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function ThreadsIcon() {
  return (
    <svg viewBox="0 0 192 192" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M141.537 88.988a66.667 66.667 0 0 0-2.518-1.143c-1.482-27.307-16.403-42.94-41.457-43.1h-.34c-14.986 0-27.449 6.396-35.12 18.036l13.779 9.452c5.73-8.695 14.724-10.548 21.348-10.548h.229c8.249.053 14.474 2.452 18.503 7.129 2.932 3.405 4.893 8.111 5.864 14.05-7.314-1.243-15.224-1.626-23.68-1.14-23.82 1.371-39.134 15.264-38.105 34.568.522 9.792 5.4 18.216 13.735 23.719 7.047 4.652 16.124 6.927 25.557 6.412 12.458-.683 22.231-5.436 29.049-14.127 5.178-6.6 8.452-15.153 9.899-25.93 5.937 3.583 10.337 8.298 12.767 13.966 4.132 9.635 4.373 25.468-8.546 38.376-11.319 11.308-24.925 16.2-45.488 16.351-22.809-.169-40.06-7.484-51.275-21.741C35.236 139.966 29.808 120.682 29.605 96c.203-24.682 5.63-43.966 16.133-57.317C56.954 24.425 74.204 17.11 97.013 16.94c22.975.17 40.526 7.52 52.171 21.847 5.71 7.026 10.015 15.86 12.853 26.162l16.147-4.308c-3.44-12.68-8.853-23.606-16.219-32.668C147.036 9.607 125.202.195 97.07 0h-.113C68.882.195 47.292 9.642 32.788 28.08 19.882 44.485 13.224 67.315 13.001 96c.223 28.685 6.88 51.515 19.787 67.92 14.504 18.438 36.094 27.885 64.172 28.08h.113c24.962-.173 42.554-6.708 57.048-21.189 18.963-18.945 18.392-42.692 12.142-57.27-4.484-10.454-13.033-18.945-24.727-24.553Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

// ── Types ──────────────────────────────────────────────────────────────────

interface SocialShareBarProps {
  url: string;           // canonical URL of the article
  title: string;
  description: string;
  pinterestImage: string; // absolute URL for Pinterest media param
  instagramImage?: string; // shown as a tip if provided
}

interface ShareBtn {
  id: string;
  label: string;
  icon: React.ReactNode;
  href?: string;
  action?: "copy" | "native";
  color: string;         // Tailwind hover border color
  textColor: string;     // Tailwind hover text color
}

// ── Component ──────────────────────────────────────────────────────────────

export default function SocialShareBar({
  url,
  title,
  description,
  pinterestImage,
  instagramImage,
}: SocialShareBarProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const [nativeShared, setNativeShared] = useState(false);

  const enc = encodeURIComponent;

  const buttons: ShareBtn[] = [
    {
      id: "pinterest",
      label: "Pinterest",
      icon: <PinterestIcon />,
      href: `https://pinterest.com/pin/create/button/?url=${enc(url)}&media=${enc(pinterestImage)}&description=${enc(description)}`,
      color: "hover:border-red-500",
      textColor: "hover:text-red-500",
    },
    {
      id: "twitter",
      label: "X / Twitter",
      icon: <XIcon />,
      href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
      color: "hover:border-navy",
      textColor: "hover:text-navy",
    },
    {
      id: "facebook",
      label: "Facebook",
      icon: <FacebookIcon />,
      href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
      color: "hover:border-blue-600",
      textColor: "hover:text-blue-600",
    },
    {
      id: "threads",
      label: "Threads",
      icon: <ThreadsIcon />,
      // Threads web intent — opens app if installed, web fallback otherwise
      href: `https://www.threads.net/intent/post?text=${enc(`${title} ${url}`)}`,
      color: "hover:border-navy",
      textColor: "hover:text-navy",
    },
    // Instagram: no direct web share API — we open the app via deep-link on mobile
    ...(instagramImage
      ? [
          {
            id: "instagram",
            label: "Instagram",
            icon: <InstagramIcon />,
            // Deep-link opens IG on mobile; on desktop shows a tip via copy
            href: `instagram://library?AssetPath=${enc(instagramImage)}`,
            color: "hover:border-pink-500",
            textColor: "hover:text-pink-500",
          } as ShareBtn,
        ]
      : []),
    {
      id: "copy",
      label: copied ? t("blog_share_copied") : t("blog_copy_link"),
      icon: copied ? <Check className="w-4 h-4" /> : <Link2 className="w-4 h-4" />,
      action: "copy",
      color: "hover:border-teal",
      textColor: "hover:text-teal",
    },
    {
      id: "native",
      label: nativeShared ? t("blog_share_copied") : t("blog_share"),
      icon: nativeShared ? <Check className="w-4 h-4" /> : <Share2 className="w-4 h-4" />,
      action: "native",
      color: "hover:border-gold-dark",
      textColor: "hover:text-gold-dark",
    },
  ];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      /* silent */
    }
  };

  const handleNative = async () => {
    if (!url.startsWith("https://")) return;
    try {
      if (navigator.share) {
        await navigator.share({ title, url, text: description });
        setNativeShared(true);
        setTimeout(() => setNativeShared(false), 2500);
      } else {
        handleCopy();
      }
    } catch (e) {
      if (e instanceof Error && e.name === "AbortError") return;
    }
  };

  return (
    <div className="mt-10 pt-8 border-t border-gray-100">
      <p className="text-xs font-bold uppercase tracking-widest text-navy/40 mb-4">
        {t("blog_share_label")}
      </p>
      <div className="flex flex-wrap gap-2">
        {buttons.map((btn) => {
          const cls = [
            "inline-flex items-center gap-2 h-10 px-4 rounded-xl",
            "font-bold text-xs border border-gray-200 text-navy/70",
            "transition-colors duration-200",
            btn.color,
            btn.textColor,
          ].join(" ");

          if (btn.action === "copy") {
            return (
              <button key={btn.id} onClick={handleCopy} className={cls} aria-live="polite">
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          }

          if (btn.action === "native") {
            return (
              <button key={btn.id} onClick={handleNative} className={cls} aria-live="polite">
                {btn.icon}
                <span>{btn.label}</span>
              </button>
            );
          }

          return (
            <a
              key={btn.id}
              href={btn.href}
              target="_blank"
              rel="noopener noreferrer"
              className={cls}
              aria-label={`${t("blog_share_on")} ${btn.label}`}
            >
              {btn.icon}
              <span>{btn.label}</span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
