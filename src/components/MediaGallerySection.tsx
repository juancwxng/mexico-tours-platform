"use client";

import { useRef, useCallback } from "react";
import MediaGallery from "@/components/MediaGallery";
import type { MediaClip } from "@/lib/tours";
import type { Lang } from "@/lib/i18n";

interface MediaGallerySectionProps {
  clips: MediaClip[];
  lang: Lang;
  tourTitle: string;
  sectionLabel: string;
  nudgeLabel: string;
  unmuteLabel: string;
  muteLabel: string;
}

export default function MediaGallerySection({
  clips,
  lang,
  tourTitle,
  sectionLabel,
  nudgeLabel,
  unmuteLabel,
  muteLabel,
}: MediaGallerySectionProps) {
  const bookingFormRef = useRef<HTMLDivElement | null>(null);

  const handleNudge = useCallback(() => {
    if (window.innerWidth >= 1024) {
      // Desktop: scroll the sidebar booking form into view
      const sidebar = document.getElementById("sidebar-booking-form");
      sidebar?.scrollIntoView({ behavior: "smooth", block: "center" });
    } else {
      // Mobile: programmatically click the sticky "Reservar" button to open the drawer
      const drawerBtn = document.querySelector<HTMLButtonElement>("[data-booking-drawer-trigger]");
      drawerBtn?.click();
    }
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl text-navy">{sectionLabel}</h2>
      <MediaGallery
        clips={clips}
        lang={lang}
        tourTitle={tourTitle}
        onBookingNudge={handleNudge}
        nudgeLabel={nudgeLabel}
        unmuteLabel={unmuteLabel}
        muteLabel={muteLabel}
      />
      <div ref={bookingFormRef} />
    </div>
  );
}
