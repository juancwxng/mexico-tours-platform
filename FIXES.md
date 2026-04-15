# Costa Franca Tours — Patch Notes

Archivos corregidos y razón de cada cambio.

---

## package.json
- **Nombre corregido** `central-franca-tours` → `costa-franca-tours`.
- **Eliminado** `tailwindcss-animate` (incompatible con Tailwind v4; `tw-animate-css` cubre la misma funcionalidad y sí es compatible).

## tsconfig.json
- **Alias `@/*` corregido** de `"./*"` a `"./src/*"`.  
  El código usa `@/components/...` y `@/lib/...`, que viven en `src/`, no en la raíz. El error estaba enmascarado por el resolver interno de Next.js pero rompía IDEs y herramientas externas.

## src/app/globals.css
- **`@import "@tailwindcss/typography"`** reemplazado por **`@plugin "@tailwindcss/typography"`**.  
  En Tailwind v4 los plugins se registran con la directiva `@plugin`, no con `@import`.

## src/app/robots.ts · src/app/sitemap.ts · src/app/layout.tsx
- Añadida función `getSiteUrl()` que lanza un error explícito en build de producción si `NEXT_PUBLIC_SITE_URL` no está definida. Sin esto el sitemap y robots.txt apuntaban a `http://localhost:3000` en producción, arruinando el SEO.

## src/app/blog/[slug]/opengraph-image.tsx
- `params` tipado como `Promise<{ slug: string }>` y añadido `await params`.  
  En Next.js 15, los parámetros de rutas dinámicas son Promises. Sin `await` la función recibía un objeto envuelto, no el slug real.

## src/app/catalog/page.tsx
- Los links de categorías disponibles ahora apuntan a `/tours?category=<slug>` en lugar de `/tours`.  
  Antes, clicar cualquier categoría llevaba a la misma página sin filtro.
- Texto Lorem Ipsum reemplazado por texto descriptivo real.

## src/app/tours/[slug]/page.tsx
- `priceValidUntil` en JSON-LD ahora se calcula dinámicamente como fin del año siguiente (`getPriceValidUntil()`). Ya no expirará cada año sin intervención manual.
- `image` en el JSON-LD solo se incluye cuando hay imágenes reales (evita mandar el placeholder al structured data de Google).
- Aprovecha el cambio de `getTourImages` (ver `src/lib/tours.ts`).

## src/components/BookingDrawer.tsx
- **Rediseño del layout del drawer** para iOS.  
  El enfoque anterior (`absolute bottom-full` sobre un contenedor de altura 0) causaba que el panel quedara fuera de pantalla en algunos dispositivos. Ahora el panel y la barra inferior están en un mismo `fixed` container con `flex-col-reverse`, y el panel se abre animando `max-height` en lugar de `translateY`.

## src/components/BookingForm.tsx
- **Comparación de fechas** corregida: `new Date(date) < new Date(minDate)` en lugar de comparación de strings.
- **Límite máximo de personas** (`MAX_ADULTS = 20`, `MAX_CHILDREN = 20`). Los botones `+` se deshabilitan al llegar al tope.
- Los botones `−` también se deshabilitan en su mínimo (1 adulto, 0 niños) para consistencia visual.

## src/components/Footer.tsx
- **"Aviso de Privacidad"** ahora apunta a `/privacidad` (página por crear).
- **"Términos"** ahora apunta a `/terminos` (página por crear).  
  Tener ambos en `/contact` era un problema legal (LFPDPPP) y de usabilidad.
- Texto Lorem Ipsum del footer reemplazado por descripción real.

## src/components/ShareButton.tsx
- El bloque `catch` ahora distingue `AbortError` (usuario canceló el share sheet, no es error) de errores reales de permisos de clipboard.
- Cuando falla por permisos, muestra el mensaje "No se pudo copiar" durante 3 segundos en lugar de silenciarlo.

## src/components/TourCard.tsx
- Extraída la lógica de fallback de imagen al sub-componente interno `ImageWithFallback`.  
  Esto permite que en el futuro `TourCard` sea Server Component; por ahora queda como Client Component pero con la dependencia de `useState` localizada.

## src/components/TourCarousel.tsx
- Ya no depende del placeholder `/images/placeholder.webp` para saber si hay imágenes: usa `images.length === 0` directamente.  
  Antes, `getTourImages` inyectaba el placeholder en el array, haciendo que el carousel mostrara dots y flechas para una sola imagen de placeholder.

## src/lib/tours.ts
- `getTourImages` retorna `[]` cuando `imageCount === 0`, en lugar de `["/images/placeholder.webp"]`.  
  La responsabilidad del estado vacío queda en el componente visual (`TourCarousel`), no en la capa de datos.

## src/lib/posts.ts
- **Archivo restaurado** (estaba truncado en el monolito fuente).
- Añadidas las funciones `getPostBySlug` y `formatDate` que el resto del código ya importaba pero que no estaban exportadas en el archivo truncado.
- `formatDate` parsea la fecha con hora `T12:00:00` para evitar el off-by-one day en zonas UTC negativas (America/Mazatlan, UTC-7).

## .env.local.example (archivo nuevo)
- Documenta todas las variables de entorno requeridas con ejemplos.

---

## Pendientes que requieren contenido (no código)
| Archivo a crear | Motivo |
|---|---|
| `src/app/privacidad/page.tsx` | Aviso de Privacidad requerido por LFPDPPP |
| `src/app/terminos/page.tsx` | Términos y condiciones |
| Textos Lorem Ipsum en `HeroVideo`, `not-found`, `contact`, `tours/page`, `blog/page` | SEO y credibilidad |
| `NEXT_PUBLIC_SITE_URL` en variables de entorno de producción | Sin esto el sitemap apunta a localhost |
