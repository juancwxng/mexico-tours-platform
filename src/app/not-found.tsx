import Link from "next/link";
import Container from "@/components/Container";

export default function NotFound() {
  return (
    <html lang="es" className="scroll-smooth">
      <body className="antialiased flex flex-col min-h-dvh bg-background text-foreground">
        <main className="pt-16 pb-16 flex-1 flex items-center bg-[#fafafa]">
          <Container>
            <div className="text-center space-y-7 py-24">
              <p className="font-display text-[8rem] leading-none text-shimmer select-none">404</p>
              <h1 className="font-display text-3xl md:text-4xl text-navy">
                Página no encontrada · Page not found
              </h1>
              <hr className="divider-gold max-w-16 mx-auto" />
              <p className="text-navy/60 max-w-md mx-auto text-lg leading-relaxed">
                La página que buscas no existe o fue movida.
                <br />
                <span className="text-sm text-navy/45">The page you are looking for does not exist or was moved.</span>
              </p>
              <Link href="/" className="btn-gold inline-flex mt-2">
                ← Inicio / Home
              </Link>
            </div>
          </Container>
        </main>
      </body>
    </html>
  );
}
