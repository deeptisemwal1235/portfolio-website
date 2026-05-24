import { getProjectBySlug } from "@/lib/db";
import { renderArticleOg, ogSize, ogContentType } from "@/lib/og";

export const runtime = "edge";
export const size = ogSize;
export const contentType = ogContentType;
export const alt = "Project cover";

export default async function Image({ params }: { params: { slug: string } }) {
  const p = await getProjectBySlug(params.slug);
  const title = p?.title ?? "Project";
  const category = p?.category ?? "Project";
  return renderArticleOg({
    title,
    category,
    meta: [p?.year ? String(p.year) : null, p?.read_time].filter(Boolean).join(" · ") || undefined,
  });
}
