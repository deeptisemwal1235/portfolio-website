import { notFound } from "next/navigation";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getPostBySlugForAdmin, formatPostDate } from "@/lib/db";
import { thumbClassFor } from "@/lib/svgMap";

export const dynamic = "force-dynamic";

export default async function PreviewAnalysisPage({ params }: { params: { slug: string } }) {
  const p = await getPostBySlugForAdmin(params.slug);
  if (!p) notFound();

  const date = formatPostDate(p.published_at);
  const thumb = thumbClassFor(p.slug);

  return (
    <>
      <PreviewBanner published={!!p.published} />
      <Navbar home={false} />
      <header className="detail-hero">
        <div className="container">
          <a className="back-link" href="/admin/dashboard">← Back to dashboard</a>
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
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={p.cover_image_url}
              alt={p.title}
              style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
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
            <a href="/admin/dashboard">← Back to dashboard</a>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}

function PreviewBanner({ published }: { published: boolean }) {
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
        ? "Preview · this article is published — viewing the live version"
        : "Draft preview · this article is NOT yet public"}
    </div>
  );
}
