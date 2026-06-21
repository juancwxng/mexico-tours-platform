import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import type { Metadata } from "next";
import { posts, getPostBySlug, formatDate } from "@/lib/posts";
import Container from "@/components/Container";
import ReadingProgress from "@/components/ReadingProgress";
import BlogImage from "@/components/BlogImage";
import SocialShareBar from "@/components/SocialShareBar";
import { parseLang, getT, withLang, SUPPORTED_LANGS } from "@/lib/i18n";
import { safeJsonLd, parseInlineMarkdown } from "@/lib/utils";
import { hreflangAlternates } from "@/lib/seo";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap((lang) =>
    posts.map((post) => ({ lang, slug: post.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  const post = getPostBySlug(slug);
  if (!post) return { title: "Artículo no encontrado" };

  const isEn = lang === "en";
  const path = `/blog/${post.slug}`;
  const title = isEn ? (post.titleEn ?? post.title) : post.title;
  const excerpt = isEn ? (post.excerptEn ?? post.excerpt) : post.excerpt;

  const ogImages = [
    {
      url: `${baseUrl}${post.ogImage}`,
      width: 1200,
      height: 630,
      type: "image/webp",
      alt: title,
    },
    ...(post.images ?? [])
      .filter((img) => img.width >= img.height)
      .map((img) => ({
        url: `${baseUrl}${img.src}`,
        width: img.width,
        height: img.height,
        type: "image/webp",
        alt: isEn ? (img.altEn ?? img.alt) : img.alt,
      })),
  ];

  return {
    title,
    description: excerpt,
    alternates: {
      canonical: `${baseUrl}${withLang(lang, path)}`,
      ...hreflangAlternates(baseUrl, path),
    },
    openGraph: {
      title,
      description: excerpt,
      type: "article",
      url: `${baseUrl}${withLang(lang, path)}`,
      locale: isEn ? "en_US" : "es_MX",
      alternateLocale: isEn ? ["es_MX"] : ["en_US"],
      images: ogImages,
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      description: excerpt,
      images: [
        { url: `${baseUrl}${post.twitterImage ?? post.ogImage}`, alt: title },
      ],
    },
    other: {
      "og:type": "article",
      "article:published_time": post.date,
      "article:modified_time": post.lastModified ?? post.date,
      "article:author": post.author,
      "pinterest:description": excerpt,
      "pinterest:media": `${baseUrl}${post.pinterestImage}`,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang: raw, slug } = await params;
  const lang = parseLang(raw);
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const t = getT(lang);
  const isEn = lang === "en";

  const title = isEn ? (post.titleEn ?? post.title) : post.title;
  const excerpt = isEn ? (post.excerptEn ?? post.excerpt) : post.excerpt;
  const content = isEn ? (post.contentEn ?? post.content) : post.content;
  const displayTags = isEn ? (post.tagsEn ?? post.tags) : post.tags;

  const canonicalUrl = `${baseUrl}${withLang(lang, `/blog/${post.slug}`)}`;

  const schemaImages = [
    `${baseUrl}${post.pinterestImage}`,
    `${baseUrl}${post.ogImage}`,
    ...(post.images ?? []).map((img) => `${baseUrl}${img.src}`),
  ];

  const jsonLd = safeJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: excerpt,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    image: schemaImages,
    url: canonicalUrl,
    inLanguage: isEn ? "en-US" : "es-MX",
    author: { "@type": "Person", name: post.author, url: baseUrl },
    publisher: {
      "@type": "Organization",
      name: "Costa Franca Tours SAS",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo/Logo_CostaFrancaTours.svg`,
      },
    },
    keywords: displayTags?.join(", "),
    articleSection: post.category,
    timeRequired: `PT${post.readingTimeMin}M`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: isEn ? "Home" : "Inicio",
          item: `${baseUrl}${withLang(lang, "/")}`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}${withLang(lang, "/blog")}`,
        },
        { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
      ],
    },
  });

  const images = post.images ?? [];

  const faqJsonLd = post.faq?.length
    ? safeJsonLd({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faq.map((item) => ({
          "@type": "Question",
          name: isEn ? (item.questionEn ?? item.question) : item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: isEn ? (item.answerEn ?? item.answer) : item.answer,
          },
        })),
      })
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: faqJsonLd }}
        />
      )}
      <ReadingProgress />
      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16">
        <Container size="sm">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-navy/50 flex-wrap">
              <li>
                <Link
                  href={withLang(lang, "/")}
                  className="hover:text-navy transition-colors"
                >
                  {isEn ? "Home" : "Inicio"}
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                ›
              </li>
              <li>
                <Link
                  href={withLang(lang, "/blog")}
                  className="hover:text-navy transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">
                ›
              </li>
              <li
                className="text-navy font-medium truncate max-w-[200px]"
                aria-current="page"
              >
                {title}
              </li>
            </ol>
          </nav>

          <article itemScope itemType="https://schema.org/Article">
            <meta itemProp="datePublished" content={post.date} />
            <meta
              itemProp="dateModified"
              content={post.lastModified ?? post.date}
            />
            <meta itemProp="author" content={post.author} />
            {displayTags?.map((tag) => (
              <meta key={tag} itemProp="keywords" content={tag} />
            ))}

            <header className="mb-10 lg:mb-14 space-y-5">
              {post.category && (
                <div>
                  <span className="teal-pill">
                    {isEn ? (post.categoryEn ?? post.category) : post.category}
                  </span>
                </div>
              )}
              <h1
                itemProp="headline"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight"
              >
                {title}
              </h1>
              <p
                className="text-navy/60 text-lg leading-relaxed"
                itemProp="description"
              >
                {excerpt}
              </p>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold uppercase tracking-wider text-navy/50 border-t border-gray-100 pt-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" aria-hidden="true" />
                  <time dateTime={post.date}>
                    {formatDate(post.date, lang)}
                  </time>
                </span>
                <span className="flex items-center gap-1.5">
                  <User className="w-4 h-4 text-gold" aria-hidden="true" />
                  {post.author}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-gold" aria-hidden="true" />
                  {post.readingTimeMin} {t("blog_reading_time")}
                </span>
                {post.lastModified && post.lastModified !== post.date && (
                  <span className="text-navy/35">
                    {t("blog_updated")}: {formatDate(post.lastModified, lang)}
                  </span>
                )}
              </div>
            </header>

            <div
              className="relative mx-0 sm:-mx-6 lg:-mx-8 mb-12 rounded-2xl overflow-hidden aspect-[16/9]"
              itemProp="image"
              itemScope
              itemType="https://schema.org/ImageObject"
            >
              <meta itemProp="url" content={`${baseUrl}${post.ogImage}`} />
              <meta itemProp="width" content="1200" />
              <meta itemProp="height" content="630" />
              <Image
                src={post.ogImage}
                alt={title}
                fill
                className="object-cover rounded-2xl"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              />
            </div>

            <div
              className="prose prose-lg prose-headings:font-display max-w-none leading-loose text-navy prose-p:text-navy/80 prose-p:leading-relaxed prose-a:text-teal prose-a:no-underline hover:prose-a:underline prose-strong:text-navy prose-strong:font-bold"
              itemProp="articleBody"
            >
              {content.map((paragraph, i) => {
                const img = images.find((img) => img.afterParagraph === i);
                const heading = paragraph.match(/^##\s+(.+)/);
                return (
                  <div key={i}>
                    {heading ? (
                      <h2>{heading[1]}</h2>
                    ) : (
                      <p
                        dangerouslySetInnerHTML={{
                          __html: parseInlineMarkdown(paragraph),
                        }}
                      />
                    )}
                    {img && (
                      <BlogImage image={img} lang={lang} priority={false} />
                    )}
                  </div>
                );
              })}
            </div>

            {post.faq && post.faq.length > 0 && (
              <div className="mt-12 pt-10 border-t border-gray-100">
                <h2 className="font-display text-2xl md:text-3xl font-bold text-navy mb-6">
                  {isEn ? "Frequently Asked Questions" : "Preguntas Frecuentes"}
                </h2>
                <div className="space-y-6">
                  {post.faq.map((item, i) => (
                    <div key={i}>
                      <h3 className="font-display text-lg font-bold text-navy mb-1.5">
                        {isEn
                          ? (item.questionEn ?? item.question)
                          : item.question}
                      </h3>
                      <p className="text-navy/70 leading-relaxed">
                        {isEn ? (item.answerEn ?? item.answer) : item.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {displayTags && displayTags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-navy/40" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy/40 mr-1">
                  {t("blog_tags")}:
                </span>
                {displayTags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-navy/5 text-navy/60 border border-navy/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <SocialShareBar
              url={canonicalUrl}
              title={title}
              description={excerpt}
              pinterestImage={`${baseUrl}${post.pinterestImage}`}
            />

            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href={withLang(lang, "/blog")}
                className="inline-flex items-center gap-2 text-navy/60 hover:text-navy transition-colors font-semibold text-sm"
              >
                <ArrowLeft className="w-4 h-4" aria-hidden="true" />
                {t("blog_back")}
              </Link>
            </div>
          </article>
        </Container>
      </main>
    </>
  );
}
