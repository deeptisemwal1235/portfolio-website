import Link from "next/link";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata = {
  title: "Page not found · Deepti Semwal",
};

export default function NotFound() {
  return (
    <>
      <Navbar home={false} />
      <main className="notfound">
        <div className="container">
          <span className="eyebrow">§ 404 — page not found</span>
          <h1 className="display">
            That page<br />
            doesn&apos;t <em>exist</em>.
          </h1>
          <p className="lede">
            Likely a stale link or a typo in the URL. The home page has everything —
            skills, services, projects, and analysis.
          </p>
          <div className="notfound-actions">
            <Link className="btn btn-primary" href="/">Back to home <span className="arr">↗</span></Link>
            <Link className="btn btn-ghost" href="/#contact">Tell me about the broken link</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
