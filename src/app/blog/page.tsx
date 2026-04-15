import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight } from "lucide-react";
import { cookies } from "next/headers";
import Container from "@/components/Container";
import { posts, formatDate } from "@/lib/posts";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog de Viajes",
  description:
    "Guías, consejos e historias para disfrutar Mazatlán y los destinos costeros de México al máximo.",
};

export default async function BlogIndexPage() {
  const cookieStore = await cookies();
  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16 lg:pb-24">
      <Container size="md">
        <div className="text-center mb-12 space-y-3">
          <h1 className="font-display text-4xl md:text-6xl font-bold text-central-blue uppercase">
            {t("blog_title")}
          </h1>
          <div className="w-24 h-1.5 bg-central-yellow mx-auto rounded-full" />
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            {t("blog_subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {posts.map((post) => {
            const title   = lang === "en" ? (post.titleEn   ?? post.title)   : post.title;
            const excerpt = lang === "en" ? (post.excerptEn ?? post.excerpt) : post.excerpt;

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col bg-white rounded-3xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <Image
                    src={post.ogImage}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6 lg:p-8 flex-1 flex flex-col">
                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-central-blue/50 mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-central-yellow" />
                      {formatDate(post.date, lang)}
                    </span>
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5 text-central-yellow" />
                      {post.author}
                    </span>
                  </div>
                  <h2 className="font-display text-xl lg:text-2xl font-bold text-central-blue mb-2 group-hover:text-central-yellow transition-colors">
                    {title}
                  </h2>
                  <p className="text-gray-500 text-sm line-clamp-3 mb-4 flex-1">{excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-central-blue font-bold text-sm group-hover:translate-x-1 transition-transform">
                    {t("blog_read")} <ArrowRight className="w-4 h-4 text-central-yellow" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </Container>
    </main>
  );
}
