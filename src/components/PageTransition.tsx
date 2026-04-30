"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export default function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathname   = usePathname();

  useEffect(() => {
    const el = overlayRef.current;
    if (!el) return;
    // Fade out overlay on route change
    el.style.transition = "opacity 0.4s ease";
    el.style.opacity = "1";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        el.style.opacity = "0";
      });
    });
  }, [pathname]);

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        inset: 0,
        background: "#FFFEFD",
        zIndex: 9990,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
