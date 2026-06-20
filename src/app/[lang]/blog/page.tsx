import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, BookOpen, Clock } from "lucide-react";
import type { Metadata } from "next";
import Container from "@/components/Container";
import { posts, formatDate } from "@/lib/posts";
import { parseLang, getT, withLang, SUPPORTED_LANGS } from "@/lib/i18n";
import { hreflangAlternates } from "@/lib/seo";

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

  const title = isEn
    ? "Travel Blog · Mazatlán Travel Guides & Tips"
    : "Blog de Viajes · Guías y Consejos para Mazatlán";
  const description = isEn
    ? "Guides, tips, and insider stories to make the most of Mazatlán and Mexico's Pacific coast. Written by Costa Franca Tours — your local experts."
    : "Guías, consejos e historias de viaje para disfrutar Mazatlán al máximo. Escrito por Costa Franca Tours, tus expertos locales en el Pacífico mexicano.";
  const heroImage =
    posts.length > 0
      ? { url: `${baseUrl}${posts[0].ogImage}`, width: 1200, height: 630, type: "image/webp", alt: isEn ? "Costa Franca Tours Travel Blog" : "Blog de Viajes Costa Franca Tours" }
      : { url: `${baseUrl}/images/OP.jpg`, width: 1200, height: 630, type: "image/jpeg",   alt: isEn ? "Costa Franca Tours Travel Blog" : "Blog de Viajes Costa Franca Tours" };

  return {
    title,
    description,
    alternates: {
      canonical: `${baseUrl}${withLang(lang, "/blog")}`,
      ...hreflangAlternates(baseUrl, "/blog"),
    },
    openGraph: { title, description, url: `${baseUrl}${withLang(lang, "/blog")}`, type: "website", locale: isEn ? "en_US" : "es_MX", images: [heroImage] },
    twitter: { card: "summary_large_image", title, description, images: [heroImage.url] },
  };
}

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang: raw } = await params;
  const lang = parseLang(raw);
  const t = getT(lang);

  return (
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`, backgroundSize: "36px 36px" }}
          aria-hidden="true"
        />
        <Container className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="section-badge" style={{ color: "#E8D5AD", borderColor: "rgba(232,213,173,0.25)", background: "rgba(201,169,110,0.08)" }}>
              <BookOpen className="w-3 h-3" aria-hidden="true" />
              {lang === "en" ? "Travel Stories" : "Historias de Viaje"}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-none mb-3">{t("blog_title")}</h1>
          <p className="text-white/60 text-base md:text-lg max-w-xl mt-4">{t("blog_subtitle")}</p>
          <hr className="divider-gold max-w-16 opacity-60 mt-6" />
        </Container>
      </div>

      <div className="py-16 lg:py-24">
        <Container size="md">
          {posts.length === 0 ? (
            <p className="text-center text-navy/50 py-20">
              {lang === "en" ? "No posts yet. Check back soon!" : "Aún no hay artículos. ¡Vuelve pronto!"}
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
              {posts.map((post) => {
                const postTitle  = lang === "en" ? (post.titleEn  ?? post.title)  : post.title;
                const excerpt    = lang === "en" ? (post.excerptEn ?? post.excerpt) : post.excerpt;
                return (
                  <Link
                    key={post.id}
                    href={withLang(lang, `/blog/${post.slug}`)}
                    className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-navy/8 card-lift focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    style={{ boxShadow: "0 2px 20px rgba(26,58,80,0.07)" }}
                    aria-label={postTitle}
                  >
                    <div className="relative h-52 overflow-hidden bg-navy/5">
                      <Image src={post.ogImage} alt={postTitle} fill className="object-cover blog-card-img transition-transform duration-500 group-hover:scale-105" sizes="(max-width: 768px) 100vw, 50vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" aria-hidden="true" />
                      {post.category && (
                        <div className="absolute top-3 left-3">
                          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-wider bg-navy/70 text-gold backdrop-blur-sm">
                            {lang === "en" ? (post.categoryEn ?? post.category) : post.category}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6 lg:p-7 flex-1 flex flex-col gap-3">
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-navy/50">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3 h-3 text-gold" aria-hidden="true" />
                          <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
                        </span>
                        <span className="flex items-center gap-1.5">
                          <User className="w-3 h-3 text-teal" aria-hidden="true" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1.5 ml-auto">
                          <Clock className="w-3 h-3 text-navy/30" aria-hidden="true" />
                          {post.readingTimeMin} {t("blog_reading_time")}
                        </span>
                      </div>
                      <h2 className="font-display text-xl lg:text-2xl text-navy group-hover:text-gold transition-colors leading-snug">
                        {postTitle}
                      </h2>
                      <p className="text-navy/60 text-sm line-clamp-3 leading-relaxed flex-1">{excerpt}</p>
                      <span className="inline-flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-wider group-hover:text-gold transition-colors mt-1">
                        {t("blog_read")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}
