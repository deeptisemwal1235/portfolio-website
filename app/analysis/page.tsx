import type { Metadata } from "next";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import AnalysisFilter from "@/components/AnalysisFilter";
import { getPublishedPosts } from "@/lib/db";
import { SITE_URL } from "@/lib/jsonLd";

export const revalidate = 60;

const ANALYSIS_URL = `${SITE_URL}/analysis`;

export const metadata: Metadata = {
  title: "Analysis · Deepti Semwal",
  description: "Short reads on India's energy sector — tariff moves, market design, carbon, hydrogen, and biofuels.",
  alternates: {
    canonical: ANALYSIS_URL,
    languages: { "en-IN": ANALYSIS_URL, "x-default": ANALYSIS_URL },
  },
};

export default async function AnalysisIndex() {
  const posts = await getPublishedPosts();

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
          ) : (
            <AnalysisFilter
              posts={posts.map((p) => ({
                slug: p.slug,
                title: p.title,
                category: p.category,
                excerpt: p.excerpt,
                read_time: p.read_time,
                published_at: p.published_at,
              }))}
            />
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
