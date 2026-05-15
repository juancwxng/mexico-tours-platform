"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function WhatsAppPill({
  number = "526690000000",
}: {
  number?: string;
}) {
  const [isDocked, setIsDocked] = useState(false);
  const pathname = usePathname();

  const isTourDetail = pathname.startsWith("/tours/") && pathname !== "/tours";

  useEffect(() => {
    if (isTourDetail) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsDocked(entry.isIntersecting),
      { threshold: 0.1 },
    );

    const footerBtn = document.getElementById("footer-whatsapp-btn");
    if (footerBtn) observer.observe(footerBtn);

    return () => {
      if (footerBtn) observer.unobserve(footerBtn);
    };
  }, [isTourDetail]);

  if (isTourDetail) return null;

  return (
    <a
      href={`https://wa.me/${number}?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%2C%20por%20favor.`}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-pill whatsapp-btn-style animate-whatsapp-attention whatsapp-shake transition-all duration-500 ease-in-out ${
        isDocked
          ? "opacity-0 scale-75 translate-y-10 pointer-events-none"
          : "opacity-100 scale-100 translate-y-0"
      }`}
      style={{ right: "clamp(1.75rem, 5vw, 5%)" }}
      aria-label="Contactar por WhatsApp"
    >
      <span className="hidden sm:inline">WhatsApp</span>

      <Image
        src="/icons/whatsapp.svg"
        alt=""
        width={18}
        height={18}
        className="flex-shrink-0"
      />
    </a>
  );
}
