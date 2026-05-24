/**
 * JSON-LD helpers. Emit one <script type="application/ld+json"> per page
 * to make Google rich-results eligible and strengthen the Knowledge Graph
 * entity for Deepti.
 */

import type { Settings } from "@/lib/settings";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-website-xi-ivory.vercel.app";

const KNOWS_ABOUT = [
  "Energy Regulations",
  "Power Markets",
  "Tariff Orders",
  "Carbon Markets",
  "Compressed Bio-Gas",
  "Green Hydrogen",
];

function personPayload(settings?: Settings) {
  const sameAs = settings
    ? [settings.social_linkedin_url, settings.social_twitter_url, settings.social_github_url].filter(Boolean)
    : undefined;
  return {
    "@type": "Person",
    name: "Deepti Semwal",
    jobTitle: "Energy Policy & Regulations Expert",
    email: "mailto:deeptisemwal1235@gmail.com",
    address: { "@type": "PostalAddress", addressLocality: "Noida", addressCountry: "IN" },
    alumniOf: { "@type": "CollegeOrUniversity", name: "IIT Gandhinagar" },
    url: SITE_URL,
    knowsAbout: KNOWS_ABOUT,
    ...(sameAs && sameAs.length ? { sameAs } : {}),
  };
}

type ArticleInput = {
  kind: "Article" | "BlogPosting";
  url: string;
  title: string;
  description?: string | null;
  image?: string | null;
  datePublished?: string | null;
  dateModified?: string | null;
  category?: string | null;
  tags?: string[] | null;
  settings?: Settings;
};

export function articleJsonLd(a: ArticleInput) {
  return {
    "@context": "https://schema.org",
    "@type": a.kind,
    headline: a.title,
    description: a.description ?? undefined,
    image: a.image ? [a.image] : [`${SITE_URL}${a.url.replace(SITE_URL, "")}/opengraph-image`],
    author: personPayload(a.settings),
    publisher: { "@type": "Organization", name: "Deepti Semwal", url: SITE_URL },
    datePublished: a.datePublished ?? undefined,
    dateModified: a.dateModified ?? a.datePublished ?? undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": a.url },
    articleSection: a.category ?? undefined,
    keywords: a.tags && a.tags.length ? a.tags.join(", ") : undefined,
  };
}

export function personJsonLd(settings?: Settings) {
  return { "@context": "https://schema.org", ...personPayload(settings) };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deepti Semwal — Energy Policy & Regulations Expert",
    url: SITE_URL,
  };
}

/** Renders a <script> tag with the JSON-LD payload. Server-safe. */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is XSS-safe here because we control the inputs end-to-end.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
