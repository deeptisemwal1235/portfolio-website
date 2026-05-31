/**
 * "8 min read" / "1 min read" — uses 220 wpm (a reasonable average for
 * technical writing). Operates on raw HTML — strips tags before counting.
 * Returns null when content is empty so callers can decide whether to omit.
 */
export function calcReadTime(html: string | null | undefined): string | null {
  if (!html) return null;
  const text = String(html).replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  if (!text) return null;
  const words = text.split(" ").length;
  const minutes = Math.max(1, Math.round(words / 220));
  return `${minutes} min read`;
}

/**
 * True when `updated` is meaningfully later than `published` — i.e. a real
 * revision, not the same-day touch that happens when a draft is first
 * published. Defaults to a 7-day floor so trivial edits don't trigger a
 * "Last updated" label. Both args are ISO date strings (or null).
 */
export function isMeaningfullyUpdated(
  published: string | null | undefined,
  updated: string | null | undefined,
  minDays = 7,
): boolean {
  if (!published || !updated) return false;
  const p = new Date(published).getTime();
  const u = new Date(updated).getTime();
  if (Number.isNaN(p) || Number.isNaN(u)) return false;
  return u - p >= minDays * 24 * 60 * 60 * 1000;
}

/** "31 May 2026" — locale-stable day/month/year. Returns null on bad input. */
export function formatLongDate(iso: string | null | undefined): string | null {
  if (!iso) return null;
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
}
