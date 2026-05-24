import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { POSTS } from "@/lib/content/posts";

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = POSTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.title} · Deepti Semwal`, description: p.excerpt };
}

export default function AnalysisDetailPage({ params }: { params: { slug: string } }) {
  const p = POSTS.find((x) => x.slug === params.slug);
  if (!p) notFound();

  return (
    <>
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/#analysis">← Back to analysis</a>
          <div className="detail-meta">
            <span className="cat">{p.category}</span>
            <span>{p.date}</span>
            <span>{p.readTime} read</span>
            <span>by Deepti Semwal</span>
          </div>
          <h1>{p.title}.</h1>
          <p className="standfirst">{p.standfirst}</p>
        </div>
      </header>

      <div className="container">
        <div className={`detail-banner ${p.thumb}`}>
          <span className="scene-label">{p.bannerScene}</span>
        </div>
      </div>

      <main className="detail-body">
        <article className="container" dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
        <div className="container">
          <div className="detail-footer">
            <div>Published {p.date} · {p.category}</div>
            <a href="/#analysis">← All analysis</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
