import { ImageResponse } from "next/og";

// Shared OG card renderer for /analysis/[slug] and /projects/[slug].
// Brand: Rose Clay flat bg, DS mark, category eyebrow, big serif title,
// expertise strip footer.

const BG = "#f6e2d5";
const PAPER = "#fcefe4";
const INK = "#2f1d1a";
const INK_2 = "#503530";
const INK_3 = "#806258";
const ACCENT_DEEP = "#9a4438";
const RULE = "#e0b8a4";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export function renderArticleOg({
  category,
  title,
  meta,
}: {
  category: string;
  title: string;
  meta?: string;
}) {
  // Scale font down for very long titles so they fit on 2-3 lines.
  const titleLen = title.length;
  const titleSize = titleLen > 70 ? 64 : titleLen > 45 ? 76 : 88;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 88px",
          background: BG,
          color: INK,
          fontFamily: "Georgia, serif",
        }}
      >
        {/* Top: DS mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: "50%",
              background: INK,
              color: PAPER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
            }}
          >
            DS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 24, fontWeight: 500, letterSpacing: "-0.01em", color: INK }}>
              Deepti Semwal
            </div>
            <div
              style={{
                fontSize: 14,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: INK_3,
                marginTop: 2,
                fontFamily: "ui-monospace, Menlo, monospace",
              }}
            >
              Energy Policy · Regulations
            </div>
          </div>
        </div>

        {/* Middle: category eyebrow + title */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: ACCENT_DEEP,
              marginBottom: 24,
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            {`§ ${category}`}
          </div>
          <div
            style={{
              fontSize: titleSize,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: INK,
              display: "flex",
              maxWidth: 1024,
            }}
          >
            {title}
          </div>
        </div>

        {/* Bottom: separator + meta */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 24,
            fontSize: 18,
            color: INK_2,
            fontFamily: "ui-monospace, Menlo, monospace",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>{meta || "Read at deeptisemwal.com"}</span>
          <span>by Deepti Semwal</span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
