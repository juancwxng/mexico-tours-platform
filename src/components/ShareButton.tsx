"use client";

import { Share2 } from "lucide-react";
import { useState } from "react";
import { useT } from "@/context/LangContext";

interface ShareButtonProps {
  url: string;
  title: string;
}

export default function ShareButton({ url, title }: ShareButtonProps) {
  const t = useT();
  const [copied, setCopied] = useState(false);
  const [failed, setFailed] = useState(false);

  const handleShare = async () => {
    setFailed(false);

    // Basic URL validation — only allow https:// URLs to avoid open-redirect via navigator.share
    if (!url.startsWith("https://")) {
      console.error("[ShareButton] Blocked share of non-https URL:", url);
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      }
    } catch (err) {
      // AbortError: user dismissed the share sheet — not a real error
      if (err instanceof Error && err.name === "AbortError") return;
      console.error("[ShareButton] share/clipboard failed:", err);
      setFailed(true);
      setTimeout(() => setFailed(false), 3000);
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 h-11 px-5 rounded-xl font-bold text-sm border border-gray-200 text-navy hover:border-navy transition-colors"
      aria-live="polite"
    >
      <Share2 className="w-4 h-4" aria-hidden="true" />
      {failed
        ? t("blog_share_failed")
        : copied
        ? t("blog_share_copied")
        : t("blog_share")}
    </button>
  );
}
