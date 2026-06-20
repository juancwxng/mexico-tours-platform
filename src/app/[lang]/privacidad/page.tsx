import type { Metadata } from "next";
import Container from "@/components/Container";
import { parseLang, withLang, SUPPORTED_LANGS } from "@/lib/i18n";
import { hreflangAlternates } from "@/lib/seo";
import type { ReactNode } from "react";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang: raw } = await params;
  const lang = parseLang(raw);
  const isEn = lang === "en";

  return {
    title: isEn ? "Privacy Notice" : "Aviso de Privacidad",
    description: isEn
      ? "Privacy Notice of Costa Franca Tours SAS, pursuant to Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP)."
      : "Aviso de Privacidad de Costa Franca Tours SAS, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).",
    robots: { index: true, follow: false },
    alternates: {
      canonical: `${baseUrl}${withLang(lang, "/privacidad")}`,
      ...hreflangAlternates(baseUrl, "/privacidad"),
    },
  };
}

// ─── Static bilingual content ─────────────────────────────────────────────────
const contentEs = `
## Aviso de Privacidad Integral

**Responsable del tratamiento de sus datos personales**

**Costa Franca Tours SAS de CV** (en adelante "Costa Franca Tours" o el "Responsable"), con domicilio en Mazatlán, Sinaloa, México — TODO: insertar domicilio fiscal completo —, es responsable del tratamiento de sus datos personales conforme a lo establecido en la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), su Reglamento y los Lineamientos del Aviso de Privacidad emitidos por el INAI.

Para cualquier asunto relacionado con este Aviso de Privacidad puede contactarnos en:

- **Correo electrónico:** privacidad@costafrancatours.com — TODO: confirmar correo
- **Teléfono / WhatsApp:** +52 669 000 0000 — TODO: confirmar teléfono
- **Horario de atención:** Lunes a Domingo, 8:00 AM – 10:00 PM (hora del Pacífico)

---

### 1. Datos personales que recabamos

Para los fines que se describen en el presente Aviso, Costa Franca Tours puede recabar las siguientes categorías de datos personales:

**Datos de identificación y contacto:**
- Nombre completo
- Número de teléfono / WhatsApp
- Correo electrónico

**Datos de la reserva y del servicio:**
- Número de personas (adultos y menores de edad)
- Fecha deseada para el tour
- Tour de interés

**No recabamos datos personales sensibles** (datos patrimoniales, financieros, de salud, biométricos, etc.) a través de este sitio web.

---

### 2. Finalidades del tratamiento

Sus datos personales son utilizados para las siguientes **finalidades primarias**:

1. Atender y procesar solicitudes de información y reservación de tours.
2. Confirmar disponibilidad y coordinar la prestación del servicio turístico contratado.
3. Enviarle comunicaciones relacionadas con su reserva a través de WhatsApp u otros medios de contacto proporcionados.
4. Cumplir con las obligaciones contractuales derivadas de la prestación del servicio.

---

### 3. Transferencias de datos

Para la prestación de los servicios turísticos, Costa Franca Tours actúa como intermediario entre el turista y los **operadores turísticos locales**. Sus datos de reserva serán compartidos con el prestador del servicio específico que Ud. contrate. No realizamos transferencias a terceros con fines comerciales sin su consentimiento previo.

---

### 4. Derechos ARCO

Usted tiene derecho a **Acceder, Rectificar, Cancelar u Oponerse** al tratamiento de sus datos personales enviando una solicitud a **privacidad@costafrancatours.com** con asunto "Solicitud ARCO". Responderemos en un plazo máximo de 20 días hábiles.

---

### 5. Cambios al Aviso de Privacidad

Nos reservamos el derecho de efectuar modificaciones al presente Aviso de Privacidad. Cualquier cambio será publicado en esta página.
`;

const contentEn = `
## Privacy Notice

**Data Controller**

**Costa Franca Tours SAS de CV** ("Costa Franca Tours" or the "Controller"), based in Mazatlán, Sinaloa, Mexico — TODO: insert full registered address —, is responsible for processing your personal data in accordance with Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP).

For any matter related to this Privacy Notice, please contact us at:

- **Email:** privacidad@costafrancatours.com — TODO: confirm email
- **Phone / WhatsApp:** +52 669 000 0000 — TODO: confirm phone
- **Business hours:** Monday to Sunday, 8:00 AM – 10:00 PM (Pacific Time)

---

### 1. Personal data we collect

**Identification and contact data:**
- Full name
- Phone number / WhatsApp
- Email address

**Booking and service data:**
- Number of guests (adults and minors)
- Desired tour date
- Tour of interest

**We do not collect sensitive personal data** (financial, health, biometric, etc.) through this website.

---

### 2. Purposes of processing

Your personal data is used for the following **primary purposes**:

1. Processing and responding to tour inquiry and booking requests.
2. Confirming availability and coordinating the provision of the contracted tourism service.
3. Sending you booking-related communications via WhatsApp or other contact methods provided.
4. Fulfilling contractual obligations arising from the provision of the service.

---

### 3. Data transfers

Costa Franca Tours acts as an intermediary between the tourist and **local tour operators**. Your booking data will be shared with the specific service provider for the tour you book. We do not transfer your data to third parties for commercial purposes without your prior consent.

---

### 4. Your rights

You have the right to **Access, Rectify, Cancel or Object** to the processing of your personal data by sending a request to **privacidad@costafrancatours.com** with the subject "ARCO Request." We will respond within a maximum of 20 business days.

---

### 5. Changes to this Privacy Notice

We reserve the right to make changes to this Privacy Notice. Any changes will be published on this page.
`;

function renderInline(text: string): ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i} className="text-navy font-bold">{part.slice(2, -2)}</strong>
      : part
  );
}

function renderContent(text: string): ReactNode[] {
  return text.trim().split("\n").map((line, i) => {
    if (line.startsWith("## "))  return <h1 key={i} className="font-display text-3xl md:text-4xl font-bold text-navy uppercase mb-8">{line.slice(3)}</h1>;
    if (line.startsWith("### ")) return <h2 key={i} className="font-display text-xl font-bold text-navy mt-10 mb-4">{line.slice(4)}</h2>;
    if (line.startsWith("---")) return <hr key={i} className="border-gray-100 my-6" />;
    if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**"))
      return <p key={i} className="font-bold text-navy mt-4">{line.slice(2, -2)}</p>;
    if (/^\d+\./.test(line)) return <li key={i} className="ml-6 text-gray-700 text-sm leading-relaxed list-decimal">{renderInline(line.replace(/^\d+\.\s*/, ""))}</li>;
    if (line.startsWith("- ")) return <li key={i} className="ml-6 text-gray-700 text-sm leading-relaxed list-disc">{renderInline(line.slice(2))}</li>;
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="text-gray-700 text-sm leading-relaxed">{renderInline(line)}</p>;
  });
}

export default async function PrivacidadPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = parseLang(raw);
  const isEn = lang === "en";
  const content = isEn ? contentEn : contentEs;

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 lg:pb-24">
      <Container size="sm">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-12">
          <div className="w-24 h-1.5 bg-gold rounded-full mb-8" />
          <div className="space-y-2">{renderContent(content)}</div>
          <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400 space-y-1">
            <p>
              {isEn
                ? "This notice is governed by the laws of Mexico. The Spanish version prevails in case of discrepancy."
                : "Este Aviso se rige por las leyes de México. En caso de discrepancia, prevalece la versión en español."}
            </p>
            <p>Costa Franca Tours SAS de CV — Mazatlán, Sinaloa, México</p>
          </div>
        </div>
      </Container>
    </main>
  );
}
