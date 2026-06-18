import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Calendar, User, Clock, Tag, Share2 } from "lucide-react";
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
  // fix: MIME type corrected from "image/jpeg" to "image/webp" for .webp files
  const ogImages = [
    {
      url: `${baseUrl}${post.ogImage}`,
      width: 1200,
      height: 630,
      type: "image/webp",
      alt: post.titleEn ?? post.title,
    },
    ...(post.images ?? [])
      .filter((img) => img.width >= img.height) // landscape only for OG
      .map((img) => ({
        url: `${baseUrl}${img.src}`,
        width: img.width,
        height: img.height,
        type: "image/webp",
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

  const displayTags = lang === "en" ? (post.tagsEn ?? post.tags) : post.tags;

  const title = lang === "en" ? (post.titleEn ?? post.title) : post.title;
  const excerpt =
    lang === "en" ? (post.excerptEn ?? post.excerpt) : post.excerpt;
  const content =
    lang === "en" ? (post.contentEn ?? post.content) : post.content;

  const canonicalUrl = `${baseUrl}/blog/${post.slug}`;

  // All image URLs for Article schema — Pinterest portrait image first for richness
  const schemaImages = [
    `${baseUrl}${post.pinterestImage}`, // 1000×1500
    `${baseUrl}${post.ogImage}`, // 1200×630
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
      "@type": "Person",
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
    keywords: displayTags?.join(", "),
    articleSection: post.category,
    timeRequired: `PT${post.readingTimeMin}M`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Inicio", item: baseUrl },
        {
          "@type": "ListItem",
          position: 2,
          name: "Blog",
          item: `${baseUrl}/blog`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: post.title,
          item: canonicalUrl,
        },
      ],
    },
  });

  const images = post.images ?? [];

  // ── i18n labels for the social images section ──────────────────────────────
  // Use existing dictionary keys — no hardcoded strings needed.
  const socialSectionLabel = t("blog_share_label");
  const pinterestLabel = t("blog_pin");
  const instagramLabel = `${t("blog_share_on")} Instagram`;
  const xCardLabel = `${t("blog_share_on")} X / Twitter`;

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
              <li aria-hidden="true" className="select-none">
                ›
              </li>
              <li>
                <Link
                  href="/blog"
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
            {/* Hidden machine-readable fields */}
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
              {/* Category badge */}
              {post.category && (
                <div>
                  <span className="teal-pill">
                    {lang === "en"
                      ? (post.categoryEn ?? post.category)
                      : post.category}
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

              {/* Byline */}
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
              {content.map((paragraph, i) => {
                const img = images.find((img) => img.afterParagraph === i);
                return (
                  <div key={i}>
                    <p>{paragraph}</p>
                    {img && (
                      <BlogImage image={img} lang={lang} priority={false} />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tags */}
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

            {/* ── Social images section ──────────────────────────────────────
                Renders the optimised social crops (Pinterest 2:3, Instagram 1:1,
                X/Twitter 16:9) so they're visible in the article, not just in
                <head> meta tags.  Each image is wrapped in the platform's share
                URL so clicking it opens the native share intent.
            ─────────────────────────────────────────────────────────────────── */}
            <section
              aria-label={socialSectionLabel}
              className="mt-12 pt-8 border-t border-gray-100"
            >
              <div className="flex items-center gap-2 mb-6">
                <Share2
                  className="w-4 h-4 text-gold"
                  aria-hidden="true"
                />
                <span className="text-xs font-bold uppercase tracking-wider text-navy/50">
                  {socialSectionLabel}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Pinterest — 2:3 portrait */}
                <a
                  href={`https://pinterest.com/pin/create/button/?url=${encodeURIComponent(canonicalUrl)}&media=${encodeURIComponent(`${baseUrl}${post.pinterestImage}`)}&description=${encodeURIComponent(excerpt)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block overflow-hidden rounded-xl border border-navy/8 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                  aria-label={pinterestLabel}
                  style={{ boxShadow: "0 2px 12px rgba(26,58,80,0.07)" }}
                >
                  <div className="relative w-full aspect-[2/3] bg-navy/5">
                    <Image
                      src={post.pinterestImage}
                      alt={`${title} — Pinterest`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, 33vw"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-3 left-3 right-3 inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider">
                      {/* Pinterest P icon */}
                      <svg
                        viewBox="0 0 24 24"
                        className="w-4 h-4 fill-current shrink-0"
                        aria-hidden="true"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
                      </svg>
                      Pinterest
                    </span>
                  </div>
                </a>

                {/* Instagram — 1:1 square */}
                {post.instagramImage && (
                  <a
                    href={`https://www.instagram.com/`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-xl border border-navy/8 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label={instagramLabel}
                    style={{ boxShadow: "0 2px 12px rgba(26,58,80,0.07)" }}
                  >
                    <div className="relative w-full aspect-square bg-navy/5">
                      <Image
                        src={post.instagramImage}
                        alt={`${title} — Instagram`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute bottom-3 left-3 right-3 inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider">
                        {/* Instagram gradient icon */}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 fill-current shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                        </svg>
                        Instagram
                      </span>
                    </div>
                  </a>
                )}

                {/* X / Twitter — 16:9 */}
                {post.twitterImage && (
                  <a
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(canonicalUrl)}&text=${encodeURIComponent(title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block overflow-hidden rounded-xl border border-navy/8 focus-visible:ring-2 focus-visible:ring-gold focus-visible:outline-none"
                    aria-label={xCardLabel}
                    style={{ boxShadow: "0 2px 12px rgba(26,58,80,0.07)" }}
                  >
                    <div className="relative w-full aspect-video bg-navy/5">
                      <Image
                        src={post.twitterImage}
                        alt={`${title} — X / Twitter`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, 33vw"
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-navy/60 via-transparent to-transparent"
                        aria-hidden="true"
                      />
                      <span className="absolute bottom-3 left-3 right-3 inline-flex items-center gap-1.5 text-white text-xs font-bold uppercase tracking-wider">
                        {/* X (Twitter) icon */}
                        <svg
                          viewBox="0 0 24 24"
                          className="w-4 h-4 fill-current shrink-0"
                          aria-hidden="true"
                        >
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        X / Twitter
                      </span>
                    </div>
                  </a>
                )}
              </div>
            </section>

            {/* Social share bar */}
            <SocialShareBar
              url={canonicalUrl}
              title={title}
              description={excerpt}
              pinterestImage={`${baseUrl}${post.pinterestImage}`}
              instagramImage={
                post.instagramImage
                  ? `${baseUrl}${post.instagramImage}`
                  : undefined
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
