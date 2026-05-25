"use client";

import { useEffect } from "react";

/**
 * One-shot client-side Sentry bootstrap. Imports the init lazily so the
 * Sentry bundle never enters first-load JS when DSN isn't configured.
 * Safe to mount unconditionally — sentry.client.config.ts no-ops without DSN.
 */
export default function SentryInit() {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_SENTRY_DSN) return;
    import("../sentry.client.config");
  }, []);
  return null;
}
