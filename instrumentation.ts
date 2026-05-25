/**
 * Next.js instrumentation hook. Loads the matching Sentry init based on the
 * runtime (Node.js server vs. Edge). When SENTRY_DSN isn't set, the imported
 * configs no-op so this is safe to leave in.
 */
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("./sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("./sentry.edge.config");
  }
}
