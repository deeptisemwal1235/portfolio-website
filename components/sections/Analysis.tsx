import Link from "next/link";
import { getPublishedPosts, formatPostDate } from "@/lib/db";
import { getSettings } from "@/lib/settings";

export default async function Analysis() {
  const [all, s] = await Promise.all([getPublishedPosts(), getSettings()]);
  const posts = all.slice(0, 6);
  const hasMore = all.length > 6;

  return (
    <section className="s" id="analysis">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">{s.section_analysis_eyebrow}</span>
            <h2 dangerouslySetInnerHTML={{ __html: s.section_analysis_title_html }} />
          </div>
          <p className="lede">{s.section_analysis_lede}</p>
        </div>

        {posts.length === 0 ? (
          <p className="lede">Articles coming soon — check back shortly.</p>
        ) : (
          <div className="analysis-grid">
            {posts.map((p) => (
              <Link className="article reveal" href={`/analysis/${p.slug}`} key={p.slug}>
                <div className="article-meta">
                  <span className="cat">{p.category}</span>
                  <span>
                    {p.published_at && (
                      <time dateTime={p.published_at}>{formatPostDate(p.published_at)}</time>
                    )}
                    {p.read_time ? ` · ${p.read_time}` : ""}
                  </span>
                </div>
                <h3>{p.title}</h3>
                {p.excerpt && <p>{p.excerpt}</p>}
                <span className="read">
                  Read article <span className="arr">↗</span>
                </span>
              </Link>
            ))}
          </div>
        )}
        {hasMore && (
          <div style={{ marginTop: 36, textAlign: "right" }}>
            <Link href="/analysis" className="btn btn-ghost">See all analysis ↗</Link>
          </div>
        )}
      </div>
    </section>
  );
}
