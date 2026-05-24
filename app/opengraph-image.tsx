import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Deepti Semwal — Energy Policy & Regulations Expert";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Rose Clay palette (matches the site)
const BG = "#f6e2d5";
const PAPER = "#fcefe4";
const INK = "#2f1d1a";
const INK_2 = "#503530";
const INK_3 = "#806258";
const ACCENT_DEEP = "#9a4438";
const RULE = "#e0b8a4";

export default async function Image() {
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
        {/* Top row: DS mark + name */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: "50%",
              background: INK,
              color: PAPER,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontStyle: "italic",
              letterSpacing: "-0.04em",
            }}
          >
            DS
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 28, fontWeight: 500, letterSpacing: "-0.01em", color: INK }}>
              Deepti Semwal
            </div>
            <div
              style={{
                fontSize: 16,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: INK_3,
                marginTop: 4,
                fontFamily: "ui-monospace, Menlo, monospace",
              }}
            >
              Energy Policy · Regulations
            </div>
          </div>
        </div>

        {/* Headline */}
        <div style={{ display: "flex", flexDirection: "column", marginTop: 24 }}>
          <div
            style={{
              fontSize: 18,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: INK_3,
              marginBottom: 28,
              fontFamily: "ui-monospace, Menlo, monospace",
            }}
          >
            § Portfolio · est. 2025
          </div>
          <div
            style={{
              fontSize: 108,
              lineHeight: 0.95,
              letterSpacing: "-0.025em",
              color: INK,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span>Energy Policy</span>
            <span>
              <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>&</span> Regulations
            </span>
            <span style={{ fontStyle: "italic", color: ACCENT_DEEP }}>Expert.</span>
          </div>
        </div>

        {/* Bottom row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `1px solid ${RULE}`,
            paddingTop: 24,
            fontSize: 20,
            color: INK_2,
            fontFamily: "ui-monospace, Menlo, monospace",
            letterSpacing: "0.14em",
            textTransform: "uppercase",
          }}
        >
          <span>Tariff · Power Markets · Carbon · Green H₂</span>
          <span>Noida, India</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
