import { ImageResponse } from "next/og";
import { getPostBySlug } from "@/lib/posts";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// In Next.js 15, dynamic route params are a Promise and must be awaited.
export default async function BlogOGImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "flex-end",
          backgroundColor: "#29577E",
          padding: "64px",
        }}
      >
        <div
          style={{
            fontSize: 16,
            fontWeight: 700,
            color: "#FAD02C",
            textTransform: "uppercase",
            letterSpacing: "0.2em",
            marginBottom: "16px",
          }}
        >
          Costa Franca Tours
        </div>
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.1,
            maxWidth: "900px",
          }}
        >
          {post?.title ?? "Costa Franca Tours"}
        </div>
        <div
          style={{
            width: "80px",
            height: "6px",
            backgroundColor: "#FAD02C",
            borderRadius: "999px",
            marginTop: "24px",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
