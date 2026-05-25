import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import Link from "next/link";
import { getPostBySlug, listPublishedPostSlugs, formatPostDate, getRelatedPosts } from "@/lib/db";
import ShareButtons from "@/components/ShareButtons";
import AuthorBio from "@/components/AuthorBio";
import { thumbClassFor } from "@/lib/svgMap";
import { JsonLd, articleJsonLd, breadcrumbJsonLd, SITE_URL } from "@/lib/jsonLd";
import { getSettings } from "@/lib/settings";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await listPublishedPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getPostBySlug(params.slug);
  if (!p) return {};
  const url = `${SITE_URL}/analysis/${p.slug}`;
  const datePublished = p.published_at ?? p.created_at;
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
      publishedTime: datePublished ?? undefined,
      modifiedTime: p.updated_at ?? undefined,
      authors: ["Deepti Semwal"],
      section: p.category ?? undefined,
      tags: p.tags ?? undefined,
    },
    twitter: { card: "summary_large_image", title: p.title, description: p.excerpt ?? undefined },
  };
}

export default async function AnalysisDetailPage({ params }: { params: { slug: string } }) {
  const [p, settings] = await Promise.all([getPostBySlug(params.slug), getSettings()]);
  if (!p) notFound();
  const related = await getRelatedPosts({ slug: p.slug, category: p.category, tags: p.tags }, 3);
  const articleUrl = `${SITE_URL}/analysis/${p.slug}`;

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
    settings,
  });

  const crumbs = breadcrumbJsonLd([
    { name: "Home", url: SITE_URL },
    { name: "Analysis", url: `${SITE_URL}/analysis` },
    { name: p.title, url: `${SITE_URL}/analysis/${p.slug}` },
  ]);

  return (
    <>
      <JsonLd data={ld} />
      <JsonLd data={crumbs} />
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/#analysis">← Back to analysis</a>
          <div className="detail-meta">
            {p.category && <span className="cat">{p.category}</span>}
            {date && <time dateTime={p.published_at ?? p.created_at ?? undefined}>{date}</time>}
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
          <ShareButtons url={articleUrl} title={p.title} />
        </div>
        <div className="container">
          <AuthorBio settings={settings} />
        </div>
        {related.length > 0 && (
          <div className="container">
            <aside className="related-posts">
              <h2 className="related-heading">Related reading</h2>
              <div className="analysis-grid">
                {related.map((r) => (
                  <Link className="article" href={`/analysis/${r.slug}`} key={r.slug}>
                    <div className="article-meta">
                      <span className="cat">{r.category}</span>
                      <span>
                        {r.published_at && (
                          <time dateTime={r.published_at}>{formatPostDate(r.published_at)}</time>
                        )}
                        {r.read_time ? ` · ${r.read_time}` : ""}
                      </span>
                    </div>
                    <h3>{r.title}</h3>
                    {r.excerpt && <p>{r.excerpt}</p>}
                    <span className="read">Read article <span className="arr">↗</span></span>
                  </Link>
                ))}
              </div>
            </aside>
          </div>
        )}
        <div className="container">
          <div className="detail-footer">
            <div>
              {date && (
                <>Published <time dateTime={p.published_at ?? p.created_at ?? undefined}>{date}</time></>
              )}
              {p.category && <> · {p.category}</>}
            </div>
            <a href="/#analysis">← All analysis</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
