"use client";

import { useEffect, useRef } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;
      video.play().catch(() => {});
    }
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      preload="auto"
      className="absolute inset-0 h-full w-full object-cover bg-no-repeat bg-cover bg-center bg-[url('/videos/hero-mobile-poster.webp')] sm:bg-[url('/videos/hero-poster.webp')]"
    >
      {/* Desktop Sources */}
      <source
        media="(min-width: 640px)"
        src="/videos/hero.webm"
        type="video/webm"
      />
      <source
        media="(min-width: 640px)"
        src="/videos/hero.mp4"
        type="video/mp4"
      />

      {/* Mobile Sources */}
      <source
        media="(max-width: 639px)"
        src="/videos/hero-mobile.webm"
        type="video/webm"
      />
      <source
        media="(max-width: 639px)"
        src="/videos/hero-mobile.mp4"
        type="video/mp4"
      />
    </video>
  );
}
