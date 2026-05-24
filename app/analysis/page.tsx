import type { Metadata } from "next";
import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { getPublishedPosts, formatPostDate } from "@/lib/db";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Analysis · Deepti Semwal",
  description: "Short reads on India's energy sector — tariff moves, market design, carbon, hydrogen, and biofuels.",
};

export default async function AnalysisIndex() {
  const posts = await getPublishedPosts();

  // Group by category for a more browsable index, falling back to a flat
  // list when there are very few posts.
  const showByCategory = posts.length > 6;
  const grouped = posts.reduce<Record<string, typeof posts>>((acc, p) => {
    const k = p.category ?? "Uncategorised";
    (acc[k] ||= []).push(p);
    return acc;
  }, {});

  return (
    <>
      <Navbar home={false} />
      <header className="index-hero">
        <div className="container">
          <span className="eyebrow">§ All analysis</span>
          <h1 className="display">
            Every <em>analysis</em>.
          </h1>
          <p className="lede">
            Short reads on India&apos;s energy sector — tariff moves, market design, and what new
            policy notifications mean for the people actually building things.
          </p>
        </div>
      </header>

      <section className="s">
        <div className="container">
          {posts.length === 0 ? (
            <p className="lede">Articles coming soon — check back shortly.</p>
          ) : showByCategory ? (
            Object.entries(grouped).map(([cat, rows]) => (
              <div key={cat} style={{ marginBottom: 64 }}>
                <h2 className="index-cat-heading">{cat}</h2>
                <div className="analysis-grid">{rows.map(renderCard)}</div>
              </div>
            ))
          ) : (
            <div className="analysis-grid">{posts.map(renderCard)}</div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

function renderCard(p: {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  read_time: string | null;
  published_at: string | null;
}) {
  return (
    <Link className="article" href={`/analysis/${p.slug}`} key={p.slug}>
      <div className="article-meta">
        <span className="cat">{p.category}</span>
        <span>
          {formatPostDate(p.published_at)}
          {p.read_time ? ` · ${p.read_time}` : ""}
        </span>
      </div>
      <h3>{p.title}</h3>
      {p.excerpt && <p>{p.excerpt}</p>}
      <span className="read">Read article <span className="arr">↗</span></span>
    </Link>
  );
}
