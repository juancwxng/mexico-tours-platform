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
    title: isEn ? "Terms & Conditions" : "Términos y Condiciones",
    description: isEn
      ? "Terms and conditions of service for Costa Franca Tours SAS, tourism intermediary in Mazatlán and Mexico's Pacific coast."
      : "Términos y condiciones del servicio de Costa Franca Tours SAS, intermediario turístico en Mazatlán y destinos costeros de México.",
    robots: { index: true, follow: false },
    alternates: {
      canonical: `${baseUrl}${withLang(lang, "/terminos")}`,
      ...hreflangAlternates(baseUrl, "/terminos"),
    },
  };
}

// ─── Static bilingual content ─────────────────────────────────────────────────
const contentEs = `
## Términos y Condiciones de Uso

**Costa Franca Tours SAS de CV** (en adelante "Costa Franca Tours") opera el sitio web costafrancatours.com y actúa como agente intermediario entre el cliente y los prestadores de servicios turísticos. Al usar este sitio o contratar nuestros servicios, acepta los presentes Términos y Condiciones.

---

### 1. Naturaleza del servicio

Costa Franca Tours actúa exclusivamente como **intermediario** entre el turista y los operadores turísticos locales ("prestadores"). No somos operadores directos de los tours. Nos encargamos de coordinar la reserva, comunicar la disponibilidad e informarle de los términos específicos del prestador.

---

### 2. Proceso de reserva

1. El cliente expresa su interés a través del formulario de este sitio web, que abre una conversación de WhatsApp con un asesor de Costa Franca Tours.
2. El asesor confirma disponibilidad, precio y condiciones con el prestador.
3. La reserva queda **confirmada** únicamente cuando el cliente recibe confirmación escrita por parte de Costa Franca Tours.
4. Algunas reservas pueden requerir un **anticipo o pago total** para garantizar el lugar.

---

### 3. Precios

Los precios publicados en este sitio son **referenciales** y están expresados en **pesos mexicanos (MXN)** salvo indicación contraria. El precio final y vinculante es el confirmado por escrito por el asesor.

---

### 4. Cancelaciones y reembolsos

- **Cancelación con más de 48 horas de anticipación:** Reembolso sujeto a la política del prestador. Costa Franca Tours cobra una comisión de gestión de hasta el 10%.
- **Cancelación con menos de 48 horas:** Puede aplicar una penalización de hasta el 100% del valor del servicio.
- **Cancelación por causas de fuerza mayor:** Se reprogramará la actividad sin costo adicional, sujeto a disponibilidad.

---

### 5. Responsabilidad y seguridad

Al participar en actividades turísticas, el cliente reconoce que algunas actividades conllevan riesgos inherentes. Costa Franca Tours y sus prestadores toman medidas razonables de seguridad, pero no pueden garantizar la ausencia total de riesgo.

---

### 6. Menores de edad

Los menores de 18 años deben participar acompañados de un adulto responsable. Algunas actividades pueden tener restricciones de edad o estatura.

---

### 7. Propiedad intelectual

Todo el contenido de este sitio web es propiedad de Costa Franca Tours o sus licenciantes y está protegido por las leyes mexicanas e internacionales de propiedad intelectual.

---

### 8. Jurisdicción y legislación aplicable

Estos Términos se rigen por las leyes de los **Estados Unidos Mexicanos**. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de **Mazatlán, Sinaloa**.
`;

const contentEn = `
## Terms & Conditions

**Costa Franca Tours SAS de CV** ("Costa Franca Tours") operates the website costafrancatours.com and acts as a booking intermediary between the client and local tour service providers. By using this site or booking our services, you agree to these Terms & Conditions.

---

### 1. Nature of service

Costa Franca Tours acts exclusively as an **intermediary** between the tourist and local tour operators ("providers"). We are not direct tour operators. We coordinate the booking, communicate availability, and inform you of the provider's specific terms.

---

### 2. Booking process

1. The client expresses interest through this website's booking form, which opens a WhatsApp conversation with a Costa Franca Tours advisor.
2. The advisor confirms availability, pricing, and conditions with the provider.
3. A booking is **confirmed** only when the client receives written confirmation from Costa Franca Tours.
4. Some bookings may require a **deposit or full payment** to secure the spot.

---

### 3. Pricing

Prices published on this site are **reference prices** expressed in **Mexican pesos (MXN)** unless otherwise indicated. The final, binding price is the one confirmed in writing by the advisor.

---

### 4. Cancellations and refunds

- **Cancellation more than 48 hours in advance:** Refund subject to the provider's policy. Costa Franca Tours charges a management fee of up to 10%.
- **Cancellation less than 48 hours before:** A penalty of up to 100% of the service value may apply.
- **Cancellation due to force majeure:** The activity will be rescheduled at no extra charge, subject to availability.

---

### 5. Liability and safety

By participating in tourism activities, the client acknowledges that some activities carry inherent risks. Costa Franca Tours and its providers take reasonable safety measures but cannot guarantee the complete absence of risk.

---

### 6. Minors

Guests under 18 must be accompanied by a responsible adult. Some activities may have age or height restrictions.

---

### 7. Intellectual property

All content on this website is the property of Costa Franca Tours or its licensors and is protected by Mexican and international intellectual property laws.

---

### 8. Jurisdiction and governing law

These Terms are governed by the laws of **Mexico**. For any dispute, the parties submit to the jurisdiction of the competent courts of **Mazatlán, Sinaloa**.
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

export default async function TerminosPage({
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
                ? "These terms are governed by the laws of Mexico. The Spanish version prevails in case of discrepancy."
                : "Estos Términos se rigen por las leyes de México. En caso de discrepancia, prevalece la versión en español."}
            </p>
            <p>Costa Franca Tours SAS de CV — Mazatlán, Sinaloa, México</p>
          </div>
        </div>
      </Container>
    </main>
  );
}
