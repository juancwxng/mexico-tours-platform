"use client";

import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  number?: string;
}

export default function WhatsAppPill({ number = "526691525822" }: Props) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0.1,
      },
    );

    const footer = document.querySelector("footer");
    if (footer) observer.observe(footer);

    return () => {
      if (footer) observer.unobserve(footer);
    };
  }, []);

  return (
    <a
      href={`https://wa.me/${number}?text=Hola%2C%20me%20gustar%C3%ADa%20obtener%20m%C3%A1s%20informaci%C3%B3n%2C%20por%20favor.`}
      target="_blank"
      rel="noopener noreferrer"
      className={`whatsapp-pill transition-all duration-500 ease-in-out ${
        isVisible
          ? "opacity-100 scale-100 translate-y-0"
          : "opacity-0 scale-90 translate-y-10 pointer-events-none"
      }`}
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-4 h-4 flex-shrink-0" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
