"use client";

import { useEffect } from "react";
import Link from "next/link";

/**
 * Global error boundary — Next.js renders this when an uncaught error fires
 * inside any route below the root layout. Keeps the visitor on a branded page
 * instead of the default Next error overlay.
 */
export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    // In production, Vercel logs already capture this. The console.error is
    // there for local dev so you don't have to dig through the network tab.
    if (process.env.NODE_ENV !== "production") console.error(error);
    // Report to Sentry when configured. Imported dynamically so the SDK
    // doesn't enter the first-load bundle when DSN isn't set.
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      import("@sentry/nextjs").then((Sentry) => Sentry.captureException(error)).catch(() => {});
    }
  }, [error]);

  return (
    <main className="notfound" role="alert">
      <div className="container">
        <span className="eyebrow">§ Something broke</span>
        <h1 className="display">
          That page<br />
          ran into <em>trouble</em>.
        </h1>
        <p className="lede">
          A render error — most often a flaky network request to Supabase or the image optimizer.
          Try reloading; if it persists, the error has been logged.
        </p>
        {error.digest && (
          <p style={{ marginTop: 8, fontFamily: "var(--mono)", fontSize: 11, letterSpacing: "0.14em", color: "var(--ink-3)" }}>
            REF: {error.digest}
          </p>
        )}
        <div className="notfound-actions">
          <button type="button" className="btn btn-primary" onClick={() => reset()}>
            Try again <span className="arr">↻</span>
          </button>
          <Link className="btn btn-ghost" href="/">Back to home</Link>
        </div>
      </div>
    </main>
  );
}
