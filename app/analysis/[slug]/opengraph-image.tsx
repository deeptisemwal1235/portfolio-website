import { getPostBySlug, formatPostDate } from "@/lib/db";
import { renderArticleOg, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
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
