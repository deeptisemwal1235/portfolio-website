import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getPostBySlug, listPublishedPostSlugs, formatPostDate } from "@/lib/db";
import { thumbClassFor } from "@/lib/svgMap";
import { JsonLd, articleJsonLd, SITE_URL } from "@/lib/jsonLd";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await listPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getPostBySlug(params.slug);
  if (!p) return {};
  return { title: `${p.title} · Deepti Semwal`, description: p.excerpt ?? undefined };
}

export default async function AnalysisDetailPage({ params }: { params: { slug: string } }) {
  const p = await getPostBySlug(params.slug);
  if (!p) notFound();

  const date = formatPostDate(p.published_at);
  const thumb = thumbClassFor(p.slug);

  const ld = articleJsonLd({
    kind: "BlogPosting",
    url: `${SITE_URL}/analysis/${p.slug}`,
    title: p.title,
    description: p.excerpt,
    image: p.cover_image_url,
    datePublished: p.published_at ?? p.created_at,
    dateModified: p.updated_at,
    category: p.category,
    tags: p.tags,
  });

  return (
    <>
      <JsonLd data={ld} />
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/#analysis">← Back to analysis</a>
          <div className="detail-meta">
            {p.category && <span className="cat">{p.category}</span>}
            {date && <span>{date}</span>}
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
            <span className="scene-label">[ article cover · 21:9 ]</span>
          )}
        </div>
      </div>

      <main className="detail-body">
        <article className="container" dangerouslySetInnerHTML={{ __html: p.content ?? "" }} />
        <div className="container">
          <div className="detail-footer">
            <div>{[date && `Published ${date}`, p.category].filter(Boolean).join(" · ")}</div>
            <a href="/#analysis">← All analysis</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
