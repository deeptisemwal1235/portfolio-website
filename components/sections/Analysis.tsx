import Link from "next/link";
import { getPublishedPosts, formatPostDate } from "@/lib/db";

export default async function Analysis() {
  const posts = await getPublishedPosts();

  return (
    <section className="s" id="analysis">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="section-num">§ 04 — Writing</span>
            <h2>My <em>analysis.</em></h2>
          </div>
          <p className="lede">
            Short reads on India&apos;s energy sector — tariff moves, market design, and what new policy notifications mean for the people actually building things.
          </p>
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
                    {formatPostDate(p.published_at)}
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
      </div>
    </section>
  );
}
