import { MessageCircle } from "lucide-react";

interface Props {
  number?: string;
}

export default function WhatsAppPill({ number = "526690000000" }: Props) {
  return (
    <a
      href={`https://wa.me/${number}?text=Hola%2C%20me%20gustar%C3%ADa%20saber%20m%C3%A1s%20sobre%20sus%20tours.`}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-pill"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-4 h-4 flex-shrink-0" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
