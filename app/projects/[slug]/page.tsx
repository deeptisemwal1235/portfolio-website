import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { PROJECTS } from "@/lib/content/projects";

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) return {};
  return { title: `${p.title} · Deepti Semwal`, description: p.standfirst };
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const p = PROJECTS.find((x) => x.slug === params.slug);
  if (!p) notFound();

  return (
    <>
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/#projects">← Back to projects</a>
          <div className="detail-meta">
            <span className="cat">{p.meta.cat}</span>
            <span>{p.year}</span>
            <span>{p.meta.note}</span>
            <span>{p.meta.readTime}</span>
          </div>
          <h1>{p.title}.</h1>
          <p className="standfirst">{p.standfirst}</p>
        </div>
      </header>

      <div className="container">
        <div className={`detail-banner ${p.thumb}`}>
          <span className="scene-label">{p.meta.bannerScene}</span>
        </div>
      </div>

      <main className="detail-body">
        <article className="container" dangerouslySetInnerHTML={{ __html: p.contentHtml }} />
        <div className="container">
          <div className="detail-footer">
            <div>{p.meta.footer}</div>
            <a href="/#projects">← Back to projects</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
