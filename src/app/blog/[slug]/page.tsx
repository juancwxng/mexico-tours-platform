import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag } from "lucide-react";
import { cookies } from "next/headers";
import type { Metadata } from "next";
import { posts, getPostBySlug, formatDate } from "@/lib/posts";
import Container from "@/components/Container";
import ReadingProgress from "@/components/ReadingProgress";
import BlogImage from "@/components/BlogImage";
import SocialShareBar from "@/components/SocialShareBar";
import { parseLang, getT, LANG_COOKIE } from "@/lib/i18n";
import { safeJsonLd } from "@/lib/utils";
import { hreflangAlternates } from "@/lib/seo";

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

  const pageUrl = `${baseUrl}/blog/${post.slug}`;

  // All images for OG — hero first, then body images (landscape preferred for cards)
  const ogImages = [
    {
      url: `${baseUrl}${post.ogImage}`,
      width: 1200,
      height: 630,
      type: "image/jpeg",
      alt: post.titleEn ?? post.title,
    },
    ...(post.images ?? [])
      .filter((img) => img.width >= img.height) // landscape only for OG
      .map((img) => ({
        url: `${baseUrl}${img.src}`,
        width: img.width,
        height: img.height,
        type: "image/jpeg",
        alt: img.altEn ?? img.alt,
      })),
  ];

  return {
    title: post.titleEn ?? post.title,
    description: post.excerptEn ?? post.excerpt,
    alternates: {
      canonical: pageUrl,
      ...hreflangAlternates(pageUrl),
    },
    openGraph: {
      title: post.titleEn ?? post.title,
      description: post.excerptEn ?? post.excerpt,
      type: "article",
      url: pageUrl,
      locale: "es_MX",
      alternateLocale: ["en_US"],
      images: ogImages,
      publishedTime: post.date,
      modifiedTime: post.lastModified ?? post.date,
      authors: [post.author],
      tags: post.tags,
      section: post.category,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: post.titleEn ?? post.title,
      description: post.excerptEn ?? post.excerpt,
      images: [
        {
          url: `${baseUrl}${post.twitterImage ?? post.ogImage}`,
          alt: post.titleEn ?? post.title,
        },
      ],
    },
    other: {
      // Pinterest Rich Pin — article type
      "og:type": "article",
      "article:published_time": post.date,
      "article:modified_time": post.lastModified ?? post.date,
      "article:author": post.author,
      // Pinterest-specific media (portrait 2:3 preferred)
      "pinterest:description": post.excerptEn ?? post.excerpt,
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
  const excerpt = lang === "en" ? (post.excerptEn ?? post.excerpt) : post.excerpt;
  const content = lang === "en" ? (post.contentEn ?? post.content) : post.content;

  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;

  // All image URLs for Article schema — Pinterest portrait image first for richness
  const schemaImages = [
    `${baseUrl}${post.pinterestImage}`,  // 1000×1500
    `${baseUrl}${post.ogImage}`,          // 1200×630
    ...(post.images ?? []).map((img) => `${baseUrl}${img.src}`),
  ];

  const jsonLd = safeJsonLd({
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.lastModified ?? post.date,
    // Multiple images — Google uses first matching 16:9, Pinterest prefers 2:3
    image: schemaImages,
    url: canonicalUrl,
    inLanguage: "es-MX",
    author: {
      "@type": "Organization",
      name: post.author,
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Costa Franca Tours SAS",
      url: baseUrl,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/logo/Logo_CostaFrancaTours.svg`,
      },
    },
    keywords: post.tags?.join(", "),
    articleSection: post.category,
    timeRequired: `PT${post.readingTimeMin}M`,
    // BreadcrumbList for richer SERP display
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${baseUrl}/blog` },
        { "@type": "ListItem", position: 3, name: post.title, item: canonicalUrl },
      ],
    },
  });

  // Interleave images between paragraphs — one image per section
  // Images are distributed evenly across content paragraphs
  const images = post.images ?? [];
  const totalParagraphs = content.length;

  function getImageAfterParagraph(paragraphIndex: number): typeof images[number] | null {
    if (!images.length) return null;
    // Insert first image after paragraph 0, rest distributed proportionally
    const imgIndex = images.findIndex((_, i) => {
      const insertAfter = Math.round((i / images.length) * totalParagraphs) - 1;
      return insertAfter === paragraphIndex;
    });
    return imgIndex !== -1 ? images[imgIndex] : null;
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <ReadingProgress />

      <main className="pt-16 sm:pt-[4.5rem] lg:pt-20 pb-16">
        <Container size="sm">

          {/* Breadcrumb — visible + semantic */}
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex items-center gap-2 text-sm text-navy/50 flex-wrap">
              <li>
                <Link href="/" className="hover:text-navy transition-colors">
                  Inicio
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">›</li>
              <li>
                <Link href="/blog" className="hover:text-navy transition-colors">
                  Blog
                </Link>
              </li>
              <li aria-hidden="true" className="select-none">›</li>
              <li className="text-navy font-medium truncate max-w-[200px]" aria-current="page">
                {title}
              </li>
            </ol>
          </nav>

          <article itemScope itemType="https://schema.org/Article">
            {/* Hidden machine-readable fields */}
            <meta itemProp="datePublished" content={post.date} />
            <meta itemProp="dateModified" content={post.lastModified ?? post.date} />
            <meta itemProp="author" content={post.author} />
            {post.tags?.map((tag) => (
              <meta key={tag} itemProp="keywords" content={tag} />
            ))}

            <header className="mb-10 lg:mb-14 space-y-5">
              {/* Category badge */}
              {post.category && (
                <div>
                  <span className="teal-pill">{post.category}</span>
                </div>
              )}

              <h1
                itemProp="headline"
                className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-navy leading-tight"
              >
                {title}
              </h1>

              <p className="text-navy/60 text-lg leading-relaxed" itemProp="description">
                {excerpt}
              </p>

              {/* Byline */}
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm font-bold uppercase tracking-wider text-navy/50 border-t border-gray-100 pt-5">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-gold" aria-hidden="true" />
                  <time dateTime={post.date}>{formatDate(post.date, lang)}</time>
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

            {/* Hero image — full bleed, priority loaded */}
            <div
              className="relative -mx-4 sm:-mx-6 lg:-mx-8 mb-12 rounded-none sm:rounded-2xl overflow-hidden aspect-[16/9]"
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
                className="object-cover"
                priority
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
              />
            </div>

            {/* Article body — paragraphs with images interleaved */}
            <div
              className="prose prose-lg prose-headings:font-display max-w-none leading-loose text-navy
                         prose-p:text-navy/80 prose-p:leading-relaxed
                         prose-a:text-teal prose-a:no-underline hover:prose-a:underline
                         prose-strong:text-navy prose-strong:font-bold"
              itemProp="articleBody"
            >
              {content.map((paragraph, i) => (
                <div key={i}>
                  <p>{paragraph}</p>
                  {(() => {
                    const img = getImageAfterParagraph(i);
                    if (!img) return null;
                    return (
                      <BlogImage
                        image={img}
                        lang={lang}
                        priority={false}
                      />
                    );
                  })()}
                </div>
              ))}
            </div>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-navy/40" aria-hidden="true" />
                <span className="text-xs font-bold uppercase tracking-wider text-navy/40 mr-1">
                  {t("blog_tags")}:
                </span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-navy/5 text-navy/60 border border-navy/10"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Social share bar */}
            <SocialShareBar
              url={canonicalUrl}
              title={title}
              description={excerpt}
              pinterestImage={`${baseUrl}${post.pinterestImage}`}
              instagramImage={
                post.instagramImage ? `${baseUrl}${post.instagramImage}` : undefined
              }
            />

            {/* Back link */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <Link
                href="/blog"
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
