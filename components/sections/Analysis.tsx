import Link from "next/link";
import { POSTS } from "@/lib/content/posts";

export default function Analysis() {
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

        <div className="analysis-grid">
          {POSTS.map((p) => (
            <Link className="article reveal" href={`/analysis/${p.slug}`} key={p.slug}>
              <div className="article-meta">
                <span className="cat">{p.category}</span>
                <span>{p.date} · {p.readTime}</span>
              </div>
              <h3>{p.title}</h3>
              <p>{p.excerpt}</p>
              <span className="read">
                Read article <span className="arr">↗</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
