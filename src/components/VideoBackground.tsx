"use client";

import { useEffect, useRef, useState } from "react";

export default function VideoBackground() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 640);
    setHydrated(true);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.load();
    video.play().catch(() => {});
  }, [isMobile]);

  const desktopPoster = "/videos/hero-poster.webp";
  const mobilePoster = "/videos/hero-mobile-poster.webp";

  return (
    <>
      <picture
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ${
          hydrated ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-hidden="true"
      >
        <source media="(min-width: 640px)" srcSet={desktopPoster} />
        <img
          src={mobilePoster}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          // fetchpriority not yet in React types
          // @ts-expect-error
          fetchpriority="high"
        />
      </picture>

      {/*
        Video is only rendered after hydration so its poster= attribute
        is always correct (isMobile is resolved by then).
        The video fades in over the poster image above once it starts playing.
      */}
      {hydrated && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          poster={isMobile ? mobilePoster : desktopPoster}
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
      )}
    </>
  );
}
