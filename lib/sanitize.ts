import DOMPurify from "isomorphic-dompurify";

/**
 * Sanitize Tiptap-produced HTML before it lands in Supabase. Belt-and-suspenders
 * against an admin pasting markup with inline event handlers, <script>, etc.
 * Whitelist matches what the editor toolbar can produce + a few inline-style
 * affordances (drop caps, prose figures).
 */
const ALLOWED_TAGS = [
  "a", "p", "br", "hr", "blockquote", "code", "pre",
  "ul", "ol", "li",
  "h1", "h2", "h3", "h4", "h5", "h6",
  "strong", "em", "b", "i", "u", "s", "sup", "sub",
  "img", "figure", "figcaption",
  "table", "thead", "tbody", "tr", "th", "td",
  "span", "div",
];

const ALLOWED_ATTR = [
  "href", "target", "rel", "title",
  "src", "alt", "width", "height", "loading",
  "class", "id",
  "colspan", "rowspan",
];

export function sanitizeHtml(html: string): string {
  if (!html) return "";
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "style"],
  });
}
