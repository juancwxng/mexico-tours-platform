import Image from "next/image";
import type { PostImage } from "@/lib/posts";
import { parseInlineMarkdown } from "@/lib/utils";

interface BlogImageProps {
  image: PostImage;
  lang: "es" | "en";
  priority?: boolean;
}

export default function BlogImage({
  image,
  lang,
  priority = false,
}: BlogImageProps) {
  const alt = lang === "en" && image.altEn ? image.altEn : image.alt;
  const caption =
    lang === "en" && image.captionEn ? image.captionEn : image.caption;
  const isPortrait = image.height > image.width;

  return (
    <figure
      className={
        isPortrait
          ? "my-10 mx-auto w-full max-w-sm"
          : "my-10 -mx-4 sm:-mx-6 lg:-mx-8"
      }
    >
      <div
        className="overflow-hidden rounded-2xl relative"
        style={{
          aspectRatio: `${image.width} / ${image.height}`,
        }}
      >
        <Image
          src={image.src}
          alt={alt}
          fill
          sizes={
            isPortrait
              ? "(max-width: 640px) 100vw, 384px"
              : "(max-width: 1280px) 100vw, 800px"
          }
          className="object-cover rounded-2xl"
          priority={priority}
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-center text-xs text-navy/50 italic px-4">
          {parseInlineMarkdown(caption)}
        </figcaption>
      )}
    </figure>
  );
}
