import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getProjectBySlug, listPublishedProjectSlugs } from "@/lib/db";
import { thumbClassFor } from "@/lib/svgMap";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/jsonLd";
import { getSettings } from "@/lib/settings";
import ShareButtons from "@/components/ShareButtons";
import AuthorBio from "@/components/AuthorBio";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await listPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProjectBySlug(params.slug);
  if (!p) return {};
  const url = `${SITE_URL}/projects/${p.slug}`;
  return {
    title: `${p.title} · Deepti Semwal`,
    description: p.excerpt ?? undefined,
    authors: [{ name: "Deepti Semwal", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: p.title,
      description: p.excerpt ?? undefined,
      publishedTime: p.created_at,
      modifiedTime: p.updated_at,
      authors: ["Deepti Semwal"],
      section: p.category ?? undefined,
      tags: p.tags ?? undefined,
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.excerpt ?? undefined },
  };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const [p, settings] = await Promise.all([getProjectBySlug(params.slug), getSettings()]);
  if (!p) notFound();

  const thumb = thumbClassFor(p.slug);

  const ld = articleJsonLd({
    kind: "Article",
    url: `${SITE_URL}/projects/${p.slug}`,
    title: p.title,
    description: p.excerpt,
    image: p.cover_image_url,
    datePublished: p.created_at,
    dateModified: p.updated_at,
    category: p.category,
    tags: p.tags,
    settings,
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Projects", url: `${SITE_URL}/projects` },
    { name: p.title, url: `${SITE_URL}/projects/${p.slug}` },
  ]);

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={crumbs} />
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/#projects">← Back to projects</a>
          <div className="detail-meta">
            {p.category && <span className="cat">{p.category}</span>}
            {p.year !== null && <time dateTime={String(p.year)}>{p.year}</time>}
            {p.read_time && <span>{p.read_time}</span>}
            <span>by Deepti Semwal</span>
          </div>
          <h1>{p.title}.</h1>
          {p.excerpt && <p className="standfirst">{p.excerpt}</p>}
        </div>
      </header>

      <div className="container">
        <div className={`detail-banner ${p.cover_image_url ? "" : thumb}`}>
          {p.cover_image_url ? (
            <Image
              src={p.cover_image_url}
              alt={p.title}
              fill
              priority
              sizes="(max-width: 1240px) 100vw, 1240px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <span className="scene-label">[ banner image · 21:9 ]</span>
          )}
        </div>
      </div>

      <main className="detail-body">
        <article className="container" dangerouslySetInnerHTML={{ __html: p.content ?? "" }} />
        <div className="container">
          <ShareButtons url={`${SITE_URL}/projects/${p.slug}`} title={p.title} />
        </div>
        <div className="container">
          <AuthorBio settings={settings} />
        </div>
        <div className="container">
          <div className="detail-footer">
            <div>{[p.category, p.year].filter(Boolean).join(" · ")}</div>
            <a href="/#projects">← Back to projects</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
