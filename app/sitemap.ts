import type { MetadataRoute } from "next";
import { listPublishedProjectsForSitemap, listPublishedPostsForSitemap } from "@/lib/db";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-xi-ivory.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [projects, posts] = await Promise.all([
    listPublishedProjectsForSitemap(),
    listPublishedPostsForSitemap(),
  ]);
  const now = new Date();

  const homeAnchors: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
    { url: `${SITE_URL}/analysis`, lastModified: now, changeFrequency: "weekly", priority: 0.85 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${SITE_URL}/projects/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${SITE_URL}/analysis/${p.slug}`,
    lastModified: p.updated_at ? new Date(p.updated_at) : now,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...homeAnchors, ...projectRoutes, ...postRoutes];
}
