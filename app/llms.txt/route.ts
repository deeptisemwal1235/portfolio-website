import { listPublishedProjectsForSitemap, listPublishedPostsForSitemap } from "@/lib/db";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-xi-ivory.vercel.app";

export const revalidate = 3600;

/**
 * /llms.txt — emerging standard at https://llmstxt.org telling AI crawlers
 * (ChatGPT, Claude, Perplexity, etc.) what this site is and what's worth
 * reading. Plain markdown, served as text/plain.
 */
export async function GET() {
  const [projects, posts] = await Promise.all([
    listPublishedProjectsForSitemap(),
    listPublishedPostsForSitemap(),
  ]);

  const body = `# Deepti Semwal

> Energy Policy & Regulations Expert based in Noida, India. M.Tech from IIT Gandhinagar. Independent consultant helping startups, regulators, and developers navigate India's energy transition — tariff orders, carbon markets, power-sector rules, CBG, and green hydrogen.

## About

Portfolio site of Deepti Semwal — published analysis on India's energy sector, selected technical projects (wind, BESS, MPPT), and service offerings (regulatory consultation, RE income projection, energy-consumption analysis).

- [About Deepti](${SITE_URL}/about)
- [Contact](${SITE_URL}/#contact): deeptisemwal1235@gmail.com

## Analysis (blog)

${posts.map((p) => `- [${p.slug}](${SITE_URL}/analysis/${p.slug})`).join("\n")}

## Projects

${projects.map((p) => `- [${p.slug}](${SITE_URL}/projects/${p.slug})`).join("\n")}

## Optional

- [Sitemap](${SITE_URL}/sitemap.xml)
- [robots.txt](${SITE_URL}/robots.txt)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
