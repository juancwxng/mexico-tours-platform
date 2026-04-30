import Link from "next/link";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 flex-1 flex items-center bg-pearl">
      <Container>
        <div className="text-center space-y-7 py-24">
          <p className="font-display text-[8rem] leading-none text-shimmer select-none">404</p>
          <h1 className="font-display text-3xl md:text-4xl text-navy">
            {t("not_found_title")}
          </h1>
          <hr className="divider-gold max-w-16 mx-auto" />
          <p className="text-ink-muted max-w-md mx-auto text-lg leading-relaxed">
            {t("not_found_sub")}
          </p>
          <Link href="/" className="btn-gold inline-flex mt-2">
            {t("not_found_back")}
          </Link>
        </div>
      </Container>
    </main>
  );
}
