import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getProjectBySlug, listPublishedProjectSlugs } from "@/lib/db";
import { thumbClassFor } from "@/lib/svgMap";

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await listPublishedProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const p = await getProjectBySlug(params.slug);
  if (!p) return {};
  return { title: `${p.title} · Deepti Semwal`, description: p.excerpt ?? undefined };
}

export default async function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const p = await getProjectBySlug(params.slug);
  if (!p) notFound();

  const thumb = thumbClassFor(p.slug);

  return (
    <>
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/#projects">← Back to projects</a>
          <div className="detail-meta">
            {p.category && <span className="cat">{p.category}</span>}
            {p.year !== null && <span>{p.year}</span>}
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.cover_image_url}
              alt={p.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <span className="scene-label">[ banner image · 21:9 ]</span>
          )}
        </div>
      </div>

      <main className="detail-body">
        <article className="container" dangerouslySetInnerHTML={{ __html: p.content ?? "" }} />
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
