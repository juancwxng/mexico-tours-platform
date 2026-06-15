export default function cloudflareLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  const params = [`width=${width}`];
  if (quality) params.push(`quality=${quality}`);
  const paramsString = params.join(",");
  return `/cdn-cgi/image/${paramsString}${src}`;
}
