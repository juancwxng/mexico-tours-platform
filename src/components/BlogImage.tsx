import Image from "next/image";
import type { PostImage } from "@/lib/posts";

interface BlogImageProps {
  image: PostImage;
  lang: "es" | "en";
  priority?: boolean;
}

export default function BlogImage({ image, lang, priority = false }: BlogImageProps) {
  const alt = lang === "en" && image.altEn ? image.altEn : image.alt;
  const caption =
    lang === "en" && image.captionEn ? image.captionEn : image.caption;

  const isPortrait = image.height > image.width;

  return (
    <figure
      className={
        isPortrait
          ? // Portrait: narrow centered column — pinnable 2:3 ratio
            "my-10 mx-auto w-full max-w-sm"
          : // Landscape: full bleed with negative margins
            "my-10 -mx-4 sm:-mx-6 lg:-mx-8"
      }
    >
      <div
        className={[
          "overflow-hidden transform-gpu",
          isPortrait ? "rounded-2xl" : "rounded-none sm:rounded-2xl",
        ].join(" ")}
        style={{
          aspectRatio: `${image.width} / ${image.height}`,
          position: "relative",
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
          className="object-cover"
          priority={priority}
          loading={priority ? "eager" : "lazy"}
        />
      </div>
      {caption && (
        <figcaption className="mt-2 text-center text-xs text-navy/50 font-medium tracking-wide">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
