import { getPublishedPosts } from "@/lib/db";
import { SITE_URL } from "@/lib/jsonLd";

export const revalidate = 600;

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const posts = await getPublishedPosts();
  const latest = posts[0]?.published_at ?? posts[0]?.updated_at ?? new Date().toISOString();

  const items = posts
    .map((p) => {
      const url = `${SITE_URL}/analysis/${p.slug}`;
      const date = new Date(p.published_at ?? p.created_at).toUTCString();
      return `    <item>
      <title>${esc(p.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${date}</pubDate>
      ${p.category ? `<category>${esc(p.category)}</category>` : ""}
      <description>${esc(p.excerpt ?? "")}</description>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Deepti Semwal — Analysis</title>
    <link>${SITE_URL}/analysis</link>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    <description>Short reads on India's energy sector — tariff moves, market design, carbon, hydrogen, and biofuels.</description>
    <language>en-IN</language>
    <lastBuildDate>${new Date(latest).toUTCString()}</lastBuildDate>
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=600, stale-while-revalidate=86400",
    },
  });
}
