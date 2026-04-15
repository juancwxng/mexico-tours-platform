import Link from "next/link";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";

export default async function NotFound() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 flex-1 flex items-center">
      <Container>
        <div className="text-center space-y-6 py-24">
          <p className="font-display text-8xl font-bold text-central-yellow">404</p>
          <h1 className="font-display text-3xl font-bold text-central-blue uppercase">
            {t("not_found_title")}
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            {t("not_found_sub")}
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 bg-central-blue text-white font-bold px-6 py-3 rounded-xl hover:bg-central-blue/90 transition-colors"
          >
            {t("not_found_back")}
          </Link>
        </div>
      </Container>
    </main>
  );
}
