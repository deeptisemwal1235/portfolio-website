import Image from "next/image";
import Link from "next/link";
import type { Settings } from "@/lib/settings";

/**
 * Compact author card under each article. Pairs with Person JSON-LD that
 * already ships on detail pages — helps AI assistants cite Deepti, not
 * just the article, when summarising her writing.
 */
export default function AuthorBio({ settings }: { settings: Settings }) {
  return (
    <aside className="author-bio" aria-label="About the author">
      <div className="author-bio-portrait">
        <Image
          src={settings.hero_image_url}
          alt="Deepti Semwal"
          fill
          sizes="120px"
        />
      </div>
      <div className="author-bio-text">
        <span className="eyebrow">Author</span>
        <h3 className="author-bio-name">Deepti Semwal</h3>
        <p>
          Energy Policy &amp; Regulations specialist based in Noida. Works with
          startups, regulators, and developers across India&apos;s power, carbon,
          hydrogen, and bio-gas sectors. M.Tech, IIT Gandhinagar.
        </p>
        <div className="author-bio-links">
          <Link href="/about">About →</Link>
          <Link href="/#contact">Get in touch ↗</Link>
          {settings.social_linkedin_url && (
            <a href={settings.social_linkedin_url} target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
          )}
        </div>
      </div>
    </aside>
  );
}
