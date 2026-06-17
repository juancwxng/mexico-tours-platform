"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Volume2, VolumeX, Play, ChevronRight } from "lucide-react";
import type { MediaClip } from "@/lib/tours";
import type { Lang } from "@/lib/i18n";

interface MediaGalleryProps {
  clips: MediaClip[];
  lang: Lang;
  tourTitle: string;
  onBookingNudge?: () => void;
  nudgeLabel: string;
  unmuteLabel: string;
  muteLabel: string;
}

// ─── VideoCard ────────────────────────────────────────────────────────────────

interface VideoCardProps {
  clip: MediaClip;
  alt: string;
  globalMuted: boolean;
  onPlayStart: (el: HTMLVideoElement) => void;
  onUnmuteRequest: () => void;
  onMuteRequest: () => void;
  unmuteLabel: string;
  muteLabel: string;
}

function VideoCard({
  clip,
  alt,
  globalMuted,
  onPlayStart,
  onUnmuteRequest,
  onMuteRequest,
  unmuteLabel,
  muteLabel,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  // IntersectionObserver: play at 0.5 threshold to avoid snap-transition flicker
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => {});
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handlePlay = useCallback(() => {
    const el = videoRef.current;
    if (!el) return;
    setIsPlaying(true);
    if (!hasStarted) {
      setHasStarted(true);
      onPlayStart(el);
    }
  }, [hasStarted, onPlayStart]);

  const handlePause = useCallback(() => setIsPlaying(false), []);

  return (
    <div className="relative w-[75vw] max-w-[220px] sm:w-[220px] flex-shrink-0 rounded-2xl overflow-hidden bg-navy-mid snap-center">
      {/* 9:16 aspect ratio */}
      <div className="aspect-[9/16]">
        {clip.poster && !hasStarted && (
          <div className="absolute inset-0 z-10">
            <Image
              src={clip.poster}
              alt={alt}
              fill
              className="object-cover"
              sizes="220px"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/20">
              <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Play className="w-5 h-5 text-white fill-white ml-0.5" />
              </div>
            </div>
          </div>
        )}

        {/* Skeleton while poster loads */}
        {!clip.poster && !hasStarted && (
          <div className="absolute inset-0 bg-navy-mid animate-pulse z-10 pointer-events-none" />
        )}

        <video
          ref={videoRef}
          src={clip.src}
          poster={clip.poster}
          muted
          playsInline
          loop
          preload="none"
          onPlay={handlePlay}
          onPause={handlePause}
          className="w-full h-full object-cover"
          aria-label={alt}
        />

        {/* Caption overlay */}
        <div className="absolute bottom-0 inset-x-0 z-20 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3">
          <p className="text-white text-xs font-medium leading-snug line-clamp-2">{alt}</p>
        </div>

        {/* Unmute/mute — bottom center, only after first play, only on video */}
        {hasStarted && (
          <button
            type="button"
            onClick={globalMuted ? onUnmuteRequest : onMuteRequest}
            aria-label={globalMuted ? unmuteLabel : muteLabel}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-30
                       flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       bg-black/50 backdrop-blur-sm text-white text-xs font-bold
                       transition-opacity opacity-80 hover:opacity-100
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {globalMuted ? (
              <VolumeX className="w-3.5 h-3.5" />
            ) : (
              <Volume2 className="w-3.5 h-3.5" />
            )}
            {globalMuted ? unmuteLabel : muteLabel}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── ImageCard ────────────────────────────────────────────────────────────────

function ImageCard({ clip, alt }: { clip: MediaClip; alt: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="relative w-[75vw] max-w-[220px] sm:w-[220px] flex-shrink-0 rounded-2xl overflow-hidden bg-navy-mid snap-center">
      {/* 4:5 aspect ratio */}
      <div className="aspect-[4/5]">
        {!loaded && (
          <div className="absolute inset-0 bg-navy-mid animate-pulse" />
        )}
        <Image
          src={clip.src}
          alt={alt}
          fill
          className="object-cover"
          sizes="220px"
          loading="lazy"
          onLoad={() => setLoaded(true)}
        />
        {/* Caption overlay */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3">
          <p className="text-white text-xs font-medium leading-snug line-clamp-2">{alt}</p>
        </div>
      </div>
    </div>
  );
}

// ─── MediaGallery ─────────────────────────────────────────────────────────────

export default function MediaGallery({
  clips,
  lang,
  tourTitle,
  onBookingNudge,
  nudgeLabel,
  unmuteLabel,
  muteLabel,
}: MediaGalleryProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [muted, setMuted] = useState(true);
  const [showNudge, setShowNudge] = useState(false);
  const nudgeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);

  // Sync muted state to all video elements when it changes
  useEffect(() => {
    const el = activeVideoRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  const handlePlayStart = useCallback((el: HTMLVideoElement) => {
    activeVideoRef.current = el;
    // Show booking nudge 3s after first video play
    nudgeTimerRef.current = setTimeout(() => setShowNudge(true), 3000);
  }, []);

  useEffect(() => {
    return () => {
      if (nudgeTimerRef.current) clearTimeout(nudgeTimerRef.current);
    };
  }, []);

  // Track active index via scroll position for the dot counter
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const cardWidth = container.scrollWidth / clips.length;
      const idx = Math.round(container.scrollLeft / cardWidth);
      setActiveIndex(Math.min(Math.max(idx, 0), clips.length - 1));
    };

    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => container.removeEventListener("scroll", handleScroll);
  }, [clips.length]);

  // Desktop grid: render static grid above lg, scroll-snap row below
  return (
    <div className="relative">
      {/* Mobile / tablet: horizontal scroll-snap row */}
      <div className="lg:hidden">
        <div
          ref={scrollRef}
          className="flex gap-3 overflow-x-auto scroll-smooth snap-x snap-mandatory
                     pb-4 -mx-4 px-4
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {clips.map((clip, i) => {
            const alt = (lang === "en" ? clip.altEn ?? clip.alt : clip.alt);
            return clip.type === "video" ? (
              <VideoCard
                key={i}
                clip={clip}
                alt={alt}
                globalMuted={muted}
                onPlayStart={handlePlayStart}
                onUnmuteRequest={() => setMuted(false)}
                onMuteRequest={() => setMuted(true)}
                unmuteLabel={unmuteLabel}
                muteLabel={muteLabel}
              />
            ) : (
              <ImageCard key={i} clip={clip} alt={alt} />
            );
          })}
          {/* Peek spacer so the last card never feels cut off */}
          <div className="w-4 flex-shrink-0" aria-hidden="true" />
        </div>

        {/* Dot counter */}
        {clips.length > 1 && (
          <div className="flex items-center justify-center gap-1.5 mt-1" aria-hidden="true">
            {clips.map((_, i) => (
              <span
                key={i}
                className={`rounded-full transition-all duration-200 ${
                  i === activeIndex
                    ? "w-4 h-1.5 bg-navy"
                    : "w-1.5 h-1.5 bg-navy/25"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: 3 or 4 column static grid, hover-to-play */}
      <div className="hidden lg:grid gap-4"
        style={{ gridTemplateColumns: `repeat(${Math.min(clips.length, 4)}, 1fr)` }}
      >
        {clips.map((clip, i) => {
          const alt = (lang === "en" ? clip.altEn ?? clip.alt : clip.alt);
          return (
            <DesktopCard
              key={i}
              clip={clip}
              alt={alt}
              muted={muted}
              onUnmuteRequest={() => setMuted(false)}
              onMuteRequest={() => setMuted(true)}
              onPlayStart={handlePlayStart}
              nudgeLabel={nudgeLabel}
              unmuteLabel={unmuteLabel}
              muteLabel={muteLabel}
            />
          );
        })}
      </div>

      {/* Booking nudge pill — fades in after 3s of video play */}
      {showNudge && onBookingNudge && (
        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 z-20 animate-fade-in">
          <button
            type="button"
            onClick={() => {
              setShowNudge(false);
              onBookingNudge();
            }}
            className="flex items-center gap-2 bg-navy text-white text-sm font-bold
                       px-5 py-2.5 rounded-full shadow-lg
                       hover:bg-navy/90 transition-colors whitespace-nowrap
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
          >
            {nudgeLabel}
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
}

// ─── DesktopCard — hover-to-play, no IntersectionObserver ────────────────────

interface DesktopCardProps {
  clip: MediaClip;
  alt: string;
  muted: boolean;
  onPlayStart: (el: HTMLVideoElement) => void;
  onUnmuteRequest: () => void;
  onMuteRequest: () => void;
  nudgeLabel: string;
  unmuteLabel: string;
  muteLabel: string;
}

function DesktopCard({
  clip,
  alt,
  muted,
  onPlayStart,
  onUnmuteRequest,
  onMuteRequest,
  unmuteLabel,
  muteLabel,
}: DesktopCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleMouseEnter = useCallback(() => {
    if (clip.type !== "video") return;
    videoRef.current?.play().catch(() => {});
  }, [clip.type]);

  const handleMouseLeave = useCallback(() => {
    if (clip.type !== "video") return;
    videoRef.current?.pause();
  }, [clip.type]);

  const handlePlay = useCallback(() => {
    if (!hasStarted) {
      setHasStarted(true);
      if (videoRef.current) onPlayStart(videoRef.current);
    }
  }, [hasStarted, onPlayStart]);

  // Keep muted in sync
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    el.muted = muted;
  }, [muted]);

  const aspectClass = clip.type === "video" ? "aspect-[9/16]" : "aspect-[4/5]";

  return (
    <div
      className="relative rounded-2xl overflow-hidden bg-navy-mid group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className={aspectClass}>
        {clip.type === "image" ? (
          <>
            {!loaded && <div className="absolute inset-0 bg-navy-mid animate-pulse" />}
            <Image
              src={clip.src}
              alt={alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 1280px) 25vw, 280px"
              loading="lazy"
              onLoad={() => setLoaded(true)}
            />
          </>
        ) : (
          <>
            {clip.poster && !hasStarted && (
              <div className="absolute inset-0 z-10 transition-opacity duration-300 group-hover:opacity-0">
                <Image
                  src={clip.poster}
                  alt={alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1280px) 25vw, 280px"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                  </div>
                </div>
              </div>
            )}
            <video
              ref={videoRef}
              src={clip.src}
              poster={clip.poster}
              muted
              playsInline
              loop
              preload="none"
              onPlay={handlePlay}
              className="w-full h-full object-cover"
              aria-label={alt}
            />
          </>
        )}

        {/* Caption */}
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-3 pt-8 pb-3">
          <p className="text-white text-xs font-medium leading-snug line-clamp-2">{alt}</p>
        </div>

        {/* Unmute/mute — bottom center, only after video starts */}
        {clip.type === "video" && hasStarted && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              muted ? onUnmuteRequest() : onMuteRequest();
            }}
            aria-label={muted ? unmuteLabel : muteLabel}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20
                       flex items-center gap-1.5 px-3 py-1.5 rounded-full
                       bg-black/50 backdrop-blur-sm text-white text-xs font-bold
                       opacity-0 group-hover:opacity-100 transition-opacity
                       focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {muted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            {muted ? unmuteLabel : muteLabel}
          </button>
        )}
      </div>
    </div>
  );
}
