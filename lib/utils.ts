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
