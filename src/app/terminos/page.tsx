import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Terms & Conditions",
  description:
    "Términos y condiciones del servicio de Costa Franca Tours SAS, intermediario turístico en Mazatlán y destinos costeros de México.",
  robots: { index: true, follow: false },
};

// TODO: Have this document reviewed by a Mexican attorney before going live.
// Key legal areas: Ley Federal de Protección al Consumidor (LFPC),
// Ley General de Turismo, NOM-010-TUR-2001.

const contentEs = `
## Términos y Condiciones de Uso

**Costa Franca Tours SAS de CV** (en adelante "Costa Franca Tours") opera el sitio web costafrancatours.com y actúa como agente intermediario entre el cliente y los prestadores de servicios turísticos. Al usar este sitio o contratar nuestros servicios, acepta los presentes Términos y Condiciones.

---

### 1. Naturaleza del servicio

Costa Franca Tours actúa exclusivamente como **intermediario** entre el turista y los operadores turísticos locales ("prestadores"). No somos operadores directos de los tours. Nos encargamos de coordinar la reserva, comunicar la disponibilidad e informarle de los términos específicos del prestador.

La responsabilidad directa sobre la operación del tour (seguridad, equipamiento, personal, etc.) recae en el prestador del servicio.

---

### 2. Proceso de reserva

1. El cliente expresa su interés a través del formulario de este sitio web, que abre una conversación de WhatsApp con un asesor de Costa Franca Tours.
2. El asesor confirma disponibilidad, precio y condiciones con el prestador.
3. La reserva queda **confirmada** únicamente cuando el cliente recibe confirmación escrita (WhatsApp o correo) por parte de Costa Franca Tours.
4. Algunas reservas pueden requerir un **anticipo o pago total** para garantizar el lugar. Las condiciones de pago se informarán en el proceso de confirmación.

---

### 3. Precios

Los precios publicados en este sitio son **referenciales** y están expresados en **pesos mexicanos (MXN)** salvo indicación contraria. Los precios pueden variar por temporada, número de personas, disponibilidad o tipo de cambio. El precio final y vinculante es el confirmado por escrito por el asesor.

Los precios **no incluyen** propinas, traslados no especificados, alimentos y bebidas no mencionados, ni ningún servicio adicional fuera del itinerario confirmado.

---

### 4. Cancelaciones y reembolsos

Las políticas de cancelación son determinadas por cada prestador de servicio. Costa Franca Tours le informará de las condiciones aplicables al momento de confirmar su reserva. En general:

- **Cancelación con más de 48 horas de anticipación:** Reembolso sujeto a la política del prestador. Costa Franca Tours cobra una comisión de gestión de hasta el 10% del valor del servicio.
- **Cancelación con menos de 48 horas:** Puede aplicar una penalización de hasta el 100% del valor del servicio, según el prestador.
- **Cancelación por causas de fuerza mayor** (mal tiempo, emergencias oficiales, etc.): Se reprogramará la actividad sin costo adicional, sujeto a disponibilidad.

---

### 5. Responsabilidad y seguridad

Al participar en actividades turísticas, el cliente reconoce que algunas actividades conllevan riesgos inherentes. Costa Franca Tours y sus prestadores toman medidas razonables de seguridad, pero no pueden garantizar la ausencia total de riesgo.

El cliente es responsable de:
- Informar al asesor sobre cualquier condición médica relevante antes de confirmar una actividad de aventura.
- Seguir las instrucciones de seguridad del prestador durante el tour.
- Contar con un seguro de viajero que cubra actividades de aventura si así lo requiere.

Costa Franca Tours no se responsabiliza por lesiones, pérdidas o daños derivados del incumplimiento de las instrucciones de seguridad por parte del cliente.

---

### 6. Menores de edad

Los menores de 18 años deben participar acompañados de un adulto responsable. Algunas actividades pueden tener restricciones de edad o estatura; el asesor le informará al momento de la reserva.

---

### 7. Propiedad intelectual

Todo el contenido de este sitio web (textos, imágenes, logotipos, diseño) es propiedad de Costa Franca Tours o sus licenciantes y está protegido por las leyes mexicanas e internacionales de propiedad intelectual. Queda prohibida su reproducción total o parcial sin autorización escrita.

---

### 8. Modificaciones

Costa Franca Tours se reserva el derecho de modificar estos Términos en cualquier momento. Los cambios serán publicados en esta página. El uso continuado del sitio después de cualquier modificación implica la aceptación de los Términos actualizados.

---

### 9. Jurisdicción y legislación aplicable

Estos Términos se rigen por las leyes de los **Estados Unidos Mexicanos**. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de **Mazatlán, Sinaloa**, renunciando a cualquier otro fuero que pudiera corresponderles.

**Última actualización:** ${new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
`;

const contentEn = `
## Terms & Conditions

**Costa Franca Tours SAS de CV** ("Costa Franca Tours") operates the website costafrancatours.com and acts as a booking intermediary between the client and local tour service providers. By using this site or booking our services, you agree to these Terms & Conditions.

---

### 1. Nature of service

Costa Franca Tours acts exclusively as an **intermediary** between the tourist and local tour operators ("providers"). We are not direct tour operators. We coordinate the booking, communicate availability, and inform you of the provider's specific terms.

Direct responsibility for tour operations (safety, equipment, staff, etc.) rests with the service provider.

---

### 2. Booking process

1. The client expresses interest through this website's booking form, which opens a WhatsApp conversation with a Costa Franca Tours advisor.
2. The advisor confirms availability, pricing, and conditions with the provider.
3. A booking is **confirmed** only when the client receives written confirmation (WhatsApp or email) from Costa Franca Tours.
4. Some bookings may require a **deposit or full payment** to secure the spot. Payment terms will be communicated during confirmation.

---

### 3. Pricing

Prices published on this site are **reference prices** expressed in **Mexican pesos (MXN)** unless otherwise indicated. Prices may vary by season, group size, availability, or exchange rate. The final, binding price is the one confirmed in writing by the advisor.

Prices **do not include** gratuities, unspecified transfers, food and beverages not mentioned, or any additional service outside the confirmed itinerary.

---

### 4. Cancellations and refunds

Cancellation policies are set by each service provider. Costa Franca Tours will inform you of the applicable conditions at the time of booking confirmation. In general:

- **Cancellation more than 48 hours in advance:** Refund subject to the provider's policy. Costa Franca Tours charges a management fee of up to 10% of the service value.
- **Cancellation less than 48 hours before:** A penalty of up to 100% of the service value may apply, depending on the provider.
- **Cancellation due to force majeure** (severe weather, official emergencies, etc.): The activity will be rescheduled at no extra charge, subject to availability.

---

### 5. Liability and safety

By participating in tourism activities, the client acknowledges that some activities carry inherent risks. Costa Franca Tours and its providers take reasonable safety measures but cannot guarantee the complete absence of risk.

The client is responsible for:
- Informing the advisor of any relevant medical conditions before confirming an adventure activity.
- Following the provider's safety instructions during the tour.
- Carrying travel insurance covering adventure activities if required.

Costa Franca Tours is not liable for injuries, losses, or damages resulting from the client's failure to follow safety instructions.

---

### 6. Minors

Guests under 18 must be accompanied by a responsible adult. Some activities may have age or height restrictions; the advisor will inform you at the time of booking.

---

### 7. Intellectual property

All content on this website (text, images, logos, design) is the property of Costa Franca Tours or its licensors and is protected by Mexican and international intellectual property laws. Reproduction in whole or in part without written authorization is prohibited.

---

### 8. Modifications

Costa Franca Tours reserves the right to modify these Terms at any time. Changes will be published on this page. Continued use of the site after any modification constitutes acceptance of the updated Terms.

---

### 9. Jurisdiction and governing law

These Terms are governed by the laws of **Mexico**. For any dispute, the parties submit to the jurisdiction of the competent courts of **Mazatlán, Sinaloa**, waiving any other jurisdiction that may apply.

**Last updated:** ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
`;

export default async function TerminosPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);

  function renderContent(text: string) {
    return text
      .trim()
      .split("\n")
      .map((line, i) => {
        if (line.startsWith("## "))
          return <h1 key={i} className="font-display text-3xl md:text-4xl font-bold text-central-blue uppercase mb-8">{line.slice(3)}</h1>;
        if (line.startsWith("### "))
          return <h2 key={i} className="font-display text-xl font-bold text-central-blue mt-10 mb-4">{line.slice(4)}</h2>;
        if (line.startsWith("---"))
          return <hr key={i} className="border-gray-100 my-6" />;
        if (line.startsWith("**") && line.endsWith("**") && !line.slice(2, -2).includes("**"))
          return <p key={i} className="font-bold text-central-blue mt-4">{line.slice(2, -2)}</p>;
        if (/^\d+\./.test(line))
          return <li key={i} className="ml-6 text-gray-700 text-sm leading-relaxed list-decimal">{renderInline(line.replace(/^\d+\.\s*/, ""))}</li>;
        if (line.startsWith("- "))
          return <li key={i} className="ml-6 text-gray-700 text-sm leading-relaxed list-disc">{renderInline(line.slice(2))}</li>;
        if (line.trim() === "")
          return <div key={i} className="h-2" />;
        return <p key={i} className="text-gray-700 text-sm leading-relaxed">{renderInline(line)}</p>;
      });
  }

  function renderInline(text: string): React.ReactNode {
    const parts = text.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) =>
      part.startsWith("**") && part.endsWith("**")
        ? <strong key={i} className="text-central-blue font-bold">{part.slice(2, -2)}</strong>
        : part
    );
  }

  const content = lang === "en" ? contentEn : contentEs;

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 lg:pb-24">
      <Container size="sm">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 lg:p-12">
          <div className="w-24 h-1.5 bg-central-yellow rounded-full mb-8" />
          <div className="space-y-2">
            {renderContent(content)}
          </div>
          <div className="mt-12 pt-6 border-t border-gray-100 text-xs text-gray-400 space-y-1">
            <p>
              {lang === "en"
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
