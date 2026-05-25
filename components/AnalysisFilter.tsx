"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
function formatPostDate(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("en-US", { month: "short", year: "numeric" });
}

type Post = {
  slug: string;
  title: string;
  category: string | null;
  excerpt: string | null;
  read_time: string | null;
  published_at: string | null;
};

export default function AnalysisFilter({ posts }: { posts: Post[] }) {
  const categories = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.category && set.add(p.category));
    return ["All", ...Array.from(set).sort()];
  }, [posts]);
  const [active, setActive] = useState("All");

  const visible = active === "All" ? posts : posts.filter((p) => p.category === active);

  return (
    <>
      <div className="filter-chips" role="tablist" aria-label="Filter by category">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={active === c}
            className={`filter-chip${active === c ? " active" : ""}`}
            onClick={() => setActive(c)}
          >
            {c}
            {c !== "All" && (
              <span className="filter-chip-count">
                {posts.filter((p) => p.category === c).length}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="analysis-grid">
        {visible.map((p) => (
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
        ))}
      </div>
    </>
  );
}
