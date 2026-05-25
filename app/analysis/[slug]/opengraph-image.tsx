import { getPostBySlug, formatPostDate, listPublishedPostSlugs } from "@/lib/db";

export async function generateStaticParams() {
  return (await listPublishedPostSlugs()).map((slug) => ({ slug }));
}
import { renderArticleOg, ogSize, ogContentType } from "@/lib/og";

// Pre-rendered at build time via generateImageMetadata + the slug's
// generateStaticParams. Edge runtime removed so each card is a static asset.
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Article cover";

export default async function Image({ params }: { params: { slug: string } }) {
  const p = await getPostBySlug(params.slug);
  const title = p?.title ?? "Article";
  const category = p?.category ?? "Analysis";
  const date = p ? formatPostDate(p.published_at) : "";
  return renderArticleOg({
    title,
    category,
    meta: [date, p?.read_time].filter(Boolean).join(" · ") || undefined,
  });
}
