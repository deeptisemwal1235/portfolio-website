import { notFound } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getProjectBySlugForAdmin } from "@/lib/db";
import { thumbClassFor } from "@/lib/svgMap";

export const dynamic = "force-dynamic";

export default async function PreviewProjectPage({ params }: { params: { slug: string } }) {
  const p = await getProjectBySlugForAdmin(params.slug);
  if (!p) notFound();

  const thumb = thumbClassFor(p.slug);

  return (
    <>
      <PreviewBanner kind="project" published={!!p.published} />
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/admin/dashboard">← Back to dashboard</a>
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
            <Image
              src={p.cover_image_url}
              alt={p.title}
              fill
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
          <div className="detail-footer">
            <div>{[p.category, p.year].filter(Boolean).join(" · ")}</div>
            <a href="/admin/dashboard">← Back to dashboard</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PreviewBanner({ kind, published }: { kind: "project" | "article"; published: boolean }) {
  return (
    <div
      style={{
        background: published ? "var(--leaf)" : "var(--accent-deep)",
        color: "var(--paper)",
        textAlign: "center",
        padding: "10px 16px",
        fontFamily: "var(--mono)",
        fontSize: 11,
        letterSpacing: "0.18em",
        textTransform: "uppercase",
      }}
    >
      {published
        ? `Preview · this ${kind} is published — viewing the live version`
        : `Draft preview · this ${kind} is NOT yet public`}
    </div>
  );
}
