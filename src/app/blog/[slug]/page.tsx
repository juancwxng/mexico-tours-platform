import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { posts, getPostBySlug, formatDate } from "@/lib/posts";
import Container from "@/components/Container";
import ReadingProgress from "@/components/ReadingProgress";
import ShareButton from "@/components/ShareButton";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { safeJsonLd } from "@/lib/utils";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export async function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `${baseUrl}/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      url: `${baseUrl}/blog/${post.slug}`,
      locale: "es_MX",
      alternateLocale: ["en_US"],
      images: [
        { url: `${baseUrl}${post.ogImage}`, width: 1200, height: 630, type: "image/jpeg", alt: post.title },
      ],
      publishedTime: post.date,
      authors: [post.author],
    } as Metadata["openGraph"],
    other: {
      "pinterest:description": post.excerpt,
      "pinterest:media": `${baseUrl}${post.pinterestImage}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [{ slug }, cookieStore] = await Promise.all([params, cookies()]);

  const post = getPostBySlug(slug);
  if (!post) notFound();

  const lang = parseLang(cookieStore.get(LANG_COOKIE)?.value);
  const t = getT(lang);

  const title   = lang === "en" ? (post.titleEn   ?? post.title)   : post.title;
  const content = lang === "en" ? (post.contentEn ?? post.content) : post.content;

  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;

  // safeJsonLd escapes <, >, & — safe for dangerouslySetInnerHTML
  const jsonLd = safeJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Person", name: post.author },
    publisher: {
      "@type": "Organization",
      name: "Costa Franca Tours SAS",
      url: baseUrl,
    },
    image: `${baseUrl}${post.ogImage}`,
    url: canonicalUrl,
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ReadingProgress />
      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16">
        <Container size="sm">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-central-blue/70 hover:text-central-blue transition-colors font-medium text-sm"
            >
              <ArrowLeft className="w-4 h-4" /> {t("blog_back")}
            </Link>
          </div>

          <article>
            <header className="text-center mb-10 lg:mb-14 space-y-4">
              <div className="flex items-center justify-center gap-4 text-sm font-bold uppercase tracking-wider text-central-blue/50">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-central-yellow" />
                  {formatDate(post.date, lang)}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-300" />
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-central-yellow" />
                  {post.author}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-central-blue leading-tight">
                {title}
              </h1>
            </header>

            {/* Hero image */}
            <div className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-12 rounded-none sm:rounded-2xl overflow-hidden aspect-[16/9]">
              <Image
                src={post.ogImage}
                alt={title}
                fill
                className="object-cover"
                priority
                sizes="100vw"
              />
            </div>

            {/* Body */}
            <div className="prose prose-lg prose-headings:font-display max-w-none leading-loose text-central-blue">
              {content.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            {/* Footer actions */}
            <footer className="mt-12 pt-6 border-t border-gray-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <a
                href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(canonicalUrl)}&media=${encodeURIComponent(`${baseUrl}${post.pinterestImage}`)}&description=${encodeURIComponent(post.excerpt)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 h-11 px-5 rounded-xl font-bold text-sm border border-gray-200 hover:border-red-400 hover:text-red-500 transition-colors"
              >
                📌 {t("blog_pin")}
              </a>
              <ShareButton url={canonicalUrl} title={title} />
            </footer>
          </article>
        </Container>
      </main>
    </>
  );
}
