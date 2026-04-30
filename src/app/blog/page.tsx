import Link from "next/link";
import Image from "next/image";
import { Calendar, User, ArrowRight, BookOpen } from "lucide-react";
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
    <main className="pt-16 sm:pt-[4.5rem] lg:pt-20">
      {/* Header */}
      <div className="bg-navy-section text-white py-16 lg:py-20 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(201,169,110,1) 1px, transparent 0)`,
            backgroundSize: "36px 36px",
          }}
        />
        <Container className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <span className="section-badge" style={{ color: "#E8D5AD", borderColor: "rgba(232,213,173,0.25)", background: "rgba(201,169,110,0.08)" }}>
              <BookOpen className="w-3 h-3" />
              {lang === "en" ? "Travel Stories" : "Historias de Viaje"}
            </span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl text-white leading-none mb-3">
            {t("blog_title")}
          </h1>
          <hr className="divider-gold max-w-16 opacity-60" />
        </Container>
      </div>

      <div className="py-16 lg:py-24">
        <Container size="md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {posts.map((post) => {
              const title   = lang === "en" ? (post.titleEn   ?? post.title)   : post.title;
              const excerpt = lang === "en" ? (post.excerptEn ?? post.excerpt) : post.excerpt;

              return (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-pearl-warm card-lift"
                  style={{ boxShadow: "0 2px 20px rgba(26,58,80,0.07)" }}
                >
                  <div className="relative h-52 overflow-hidden bg-pearl-warm">
                    <Image
                      src={post.ogImage}
                      alt={title}
                      fill
                      className="object-cover blog-card-img"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/30 to-transparent" />
                  </div>
                  <div className="p-6 lg:p-7 flex-1 flex flex-col gap-3">
                    <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-wider text-ink-muted">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-gold" />
                        {formatDate(post.date, lang)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <User className="w-3 h-3 text-teal" />
                        {post.author}
                      </span>
                    </div>
                    <h2 className="font-display text-xl lg:text-2xl text-navy group-hover:text-gold transition-colors leading-snug">
                      {title}
                    </h2>
                    <p className="text-ink-muted text-sm line-clamp-3 leading-relaxed flex-1">{excerpt}</p>
                    <span className="inline-flex items-center gap-2 text-navy font-bold text-xs uppercase tracking-wider group-hover:text-gold transition-colors mt-1">
                      {t("blog_read")}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </Container>
      </div>
    </main>
  );
}
