import { getProjectBySlug, listPublishedProjectSlugs } from "@/lib/db";

export async function generateStaticParams() {
  return (await listPublishedProjectSlugs()).map((slug) => ({ slug }));
}
import { renderArticleOg, ogSize, ogContentType } from "@/lib/og";

// Pre-rendered at build (no edge runtime). Static asset on CDN per slug.
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
