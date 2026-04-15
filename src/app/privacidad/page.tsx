import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Aviso de Privacidad | Privacy Notice",
  description:
    "Aviso de Privacidad de Costa Franca Tours SAS, conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP).",
  robots: { index: true, follow: false }, // no need to rank this page
};

// ─── Static content ───────────────────────────────────────────────────────────
// The legal text must be reviewed by a Mexican attorney before going live.
// Sections marked TODO require real company data to be filled in.

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

**Datos de menores de edad:** Cuando el servicio incluya participantes menores de 18 años, únicamente recabamos el número de menores, sin tratar datos personales directos del menor. El responsable de la reserva deberá ser mayor de edad.

**No recabamos datos personales sensibles** (datos patrimoniales, financieros, de salud, biométricos, etc.) a través de este sitio web.

---

### 2. Finalidades del tratamiento

Sus datos personales son utilizados para las siguientes **finalidades primarias** (necesarias para la relación jurídica que Ud. establece con nosotros):

1. Atender y procesar solicitudes de información y reservación de tours.
2. Confirmar disponibilidad y coordinar la prestación del servicio turístico contratado.
3. Enviarle comunicaciones relacionadas con su reserva a través de WhatsApp u otros medios de contacto proporcionados.
4. Cumplir con las obligaciones contractuales derivadas de la prestación del servicio.

**Finalidades secundarias** (no necesarias para la relación contractual):

5. Enviarle información sobre promociones, nuevos tours y destinos de Costa Franca Tours.
6. Realizar encuestas de satisfacción y mejora del servicio.

Si no desea que sus datos sean tratados para las finalidades secundarias, puede manifestarlo enviando un correo a privacidad@costafrancatours.com indicando "Oposición a finalidades secundarias". Lo anterior no afectará la prestación del servicio contratado.

---

### 3. Transferencias de datos

Para la prestación de los servicios turísticos, Costa Franca Tours actúa como intermediario entre el turista y los **operadores turísticos locales** ("prestadores de servicios"). Para coordinar su tour, sus datos de reserva serán compartidos con el prestador del servicio específico que Ud. contrate. Dichos prestadores actúan como encargados del tratamiento bajo instrucciones de Costa Franca Tours.

Adicionalmente, podemos transferir sus datos cuando:
- Sea requerido por autoridad competente mediante mandato legal.
- Sea necesario para proteger los derechos de terceros o del propio titular.

No realizamos transferencias a terceros con fines comerciales sin su consentimiento previo.

---

### 4. Medios para ejercer sus derechos ARCO

Usted tiene derecho a **Acceder, Rectificar, Cancelar u Oponerse** (derechos ARCO) al tratamiento de sus datos personales, así como a revocar su consentimiento, enviando una solicitud a:

**Correo:** privacidad@costafrancatours.com  
**Asunto:** Solicitud ARCO

Su solicitud deberá contener: nombre completo, descripción de los datos a ejercer el derecho, medio de contacto para notificarle la respuesta, y documento de identidad. Responderemos en un plazo máximo de 20 días hábiles conforme a la LFPDPPP.

---

### 5. Uso de cookies y tecnologías de rastreo

Este sitio web puede utilizar cookies de sesión con el único fin de recordar su preferencia de idioma. No utilizamos cookies de rastreo publicitario, perfilamiento de usuario ni compartimos datos de navegación con terceros con fines comerciales.

---

### 6. Cambios al Aviso de Privacidad

Nos reservamos el derecho de efectuar modificaciones al presente Aviso de Privacidad. Cualquier cambio será publicado en esta página con la indicación de la fecha de actualización. Le recomendamos revisar periódicamente este Aviso.

**Última actualización:** ${new Date().toLocaleDateString("es-MX", { year: "numeric", month: "long", day: "numeric" })}
`;

const contentEn = `
## Privacy Notice

**Data Controller**

**Costa Franca Tours SAS de CV** ("Costa Franca Tours" or the "Controller"), based in Mazatlán, Sinaloa, Mexico — TODO: insert full registered address —, is responsible for processing your personal data in accordance with Mexico's Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP), its Regulations, and the Privacy Notice Guidelines issued by INAI.

For any matter related to this Privacy Notice, please contact us at:

- **Email:** privacidad@costafrancatours.com — TODO: confirm email
- **Phone / WhatsApp:** +52 669 000 0000 — TODO: confirm phone
- **Business hours:** Monday to Sunday, 8:00 AM – 10:00 PM (Pacific Time)

---

### 1. Personal data we collect

To fulfill the purposes described below, Costa Franca Tours may collect the following categories of personal data:

**Identification and contact data:**
- Full name
- Phone number / WhatsApp
- Email address

**Booking and service data:**
- Number of guests (adults and minors)
- Desired tour date
- Tour of interest

**Minors:** When the service includes participants under 18 years of age, we only collect the number of minors, without processing any personal data of the minor directly. The booking contact must be an adult.

**We do not collect sensitive personal data** (financial, health, biometric, etc.) through this website.

---

### 2. Purposes of processing

Your personal data is used for the following **primary purposes** (necessary for the legal relationship you establish with us):

1. Processing and responding to tour inquiry and booking requests.
2. Confirming availability and coordinating the provision of the contracted tourism service.
3. Sending you booking-related communications via WhatsApp or other contact methods provided.
4. Fulfilling contractual obligations arising from the provision of the service.

**Secondary purposes** (not necessary for the contractual relationship):

5. Sending you information about promotions, new tours, and Costa Franca Tours destinations.
6. Conducting satisfaction surveys and service improvement research.

If you do not wish your data to be processed for secondary purposes, you may object by sending an email to privacidad@costafrancatours.com with the subject "Objection to secondary purposes." This will not affect the contracted service.

---

### 3. Data transfers

Costa Franca Tours acts as an intermediary between the tourist and **local tour operators** ("service providers"). To coordinate your tour, your booking data will be shared with the specific service provider for the tour you book. Such providers act as data processors under Costa Franca Tours' instructions.

We may also transfer your data when required by a competent authority by legal mandate, or when necessary to protect the rights of third parties.

We do not transfer your data to third parties for commercial purposes without your prior consent.

---

### 4. How to exercise your rights

You have the right to **Access, Rectify, Cancel or Object** (ARCO rights) to the processing of your personal data, as well as to revoke your consent, by sending a request to:

**Email:** privacidad@costafrancatours.com  
**Subject:** ARCO Request

Your request must include: full name, description of the data or right involved, preferred contact method for the response, and proof of identity. We will respond within a maximum of 20 business days as required by the LFPDPPP.

---

### 5. Cookies and tracking technologies

This website may use session cookies solely to remember your language preference. We do not use advertising tracking cookies, user profiling, or share browsing data with third parties for commercial purposes.

---

### 6. Changes to this Privacy Notice

We reserve the right to make changes to this Privacy Notice. Any changes will be published on this page with the updated date. We recommend reviewing this Notice periodically.

**Last updated:** ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
`;

export default async function PrivacidadPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);

  // Parse simple markdown-like content into sections
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
          return <li key={i} className="ml-6 text-gray-700 text-sm leading-relaxed list-decimal">{line.replace(/^\d+\.\s*/, "")}</li>;
        if (line.startsWith("- "))
          return <li key={i} className="ml-6 text-gray-700 text-sm leading-relaxed list-disc">{renderInline(line.slice(2))}</li>;
        if (line.trim() === "")
          return <div key={i} className="h-2" />;
        return <p key={i} className="text-gray-700 text-sm leading-relaxed">{renderInline(line)}</p>;
      });
  }

  function renderInline(text: string): React.ReactNode {
    // Bold: **text**
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
