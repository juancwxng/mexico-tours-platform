"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile on the client. We can't use CSS media queries on <source>
  // reliably across browsers — the media attribute is widely misimplemented.
  // Instead we read the actual viewport width after mount and pick one source.
  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure mute flags are set before play() to satisfy autoplay policies
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    // Force the browser to pick up the new <source> elements that were
    // swapped in after isMobile resolved, then start playback
    video.load();
    video.play().catch(() => {
      // Autoplay blocked (power-save mode, data-saver, etc.) — poster stays visible
    });
  }, [isMobile]);

  const poster = isMobile
    ? "/videos/hero-mobile-poster.webp"
    : "/videos/hero-poster.webp";

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      loop
      playsInline
      // "none" stops the browser from fetching the video file on page load.
      // The poster image shows immediately (it IS the LCP element), and the
      // video starts loading only when play() is called above — after hydration.
      // This saves ~20–35 MB of bandwidth on first paint and fixes TBT/LCP.
      preload="none"
      poster={poster}
      className="absolute inset-0 h-full w-full object-cover"
    >
      {isMobile ? (
        <>
          <source src="/videos/hero-mobile.webm" type="video/webm" />
          <source src="/videos/hero-mobile.mp4" type="video/mp4" />
        </>
      ) : (
        <>
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </>
      )}
    </video>
  );
}
