import type { ReactNode } from "react";
import { createElement as h } from "react";

const wind = h(
  "svg",
  { className: "thumb-svg", viewBox: "0 0 400 220", fill: "none", stroke: "#faf4ea", strokeWidth: 1.4 },
  h("line", { x1: 280, y1: 60, x2: 280, y2: 200, strokeWidth: 3 }),
  h("circle", { cx: 280, cy: 60, r: 6, fill: "#faf4ea" }),
  h("path", { d: "M280 60 L280 8 M280 60 L324 86 M280 60 L236 86", strokeWidth: 2.5 }),
  h("g", { opacity: 0.9 },
    h("line", { x1: 80, y1: 140, x2: 80, y2: 200, strokeWidth: 1.6 }),
    h("circle", { cx: 80, cy: 140, r: 3, fill: "#faf4ea" }),
    h("path", { d: "M80 140 L80 116 M80 140 L100 152 M80 140 L60 152", strokeWidth: 1.2 }),
    h("line", { x1: 130, y1: 150, x2: 130, y2: 200, strokeWidth: 1.6 }),
    h("circle", { cx: 130, cy: 150, r: 3, fill: "#faf4ea" }),
    h("path", { d: "M130 150 L130 128 M130 150 L150 162 M130 150 L110 162", strokeWidth: 1.2 }),
    h("line", { x1: 180, y1: 135, x2: 180, y2: 200, strokeWidth: 1.6 }),
    h("circle", { cx: 180, cy: 135, r: 3, fill: "#faf4ea" }),
    h("path", { d: "M180 135 L180 110 M180 135 L200 147 M180 135 L160 147", strokeWidth: 1.2 })
  ),
  h("line", { x1: 0, y1: 200, x2: 400, y2: 200, stroke: "#faf4ea", strokeDasharray: "2 4" })
);

const bess = h(
  "svg",
  { className: "thumb-svg", viewBox: "0 0 400 220", fill: "none", stroke: "#faf4ea", strokeWidth: 1.4 },
  h("rect", { x: 40, y: 80, width: 120, height: 60, rx: 6 }),
  h("rect", { x: 160, y: 96, width: 8, height: 28, fill: "#faf4ea" }),
  h("rect", { x: 52, y: 92, width: 20, height: 36, fill: "#faf4ea", opacity: 0.9 }),
  h("rect", { x: 78, y: 92, width: 20, height: 36, fill: "#faf4ea", opacity: 0.6 }),
  h("rect", { x: 104, y: 92, width: 20, height: 36, fill: "#faf4ea", opacity: 0.35 }),
  h("rect", { x: 130, y: 92, width: 20, height: 36, fill: "#faf4ea", opacity: 0.15 }),
  h("path", { d: "M190 110 L240 110 M232 102 L240 110 L232 118" }),
  h("path", { d: "M260 130 L280 100 L340 100 L360 130 L360 150 L260 150 Z" }),
  h("circle", { cx: 280, cy: 158, r: 10 }),
  h("circle", { cx: 340, cy: 158, r: 10 }),
  h("path", { d: "M285 130 L335 130", strokeWidth: 1 }),
  h("path", { d: "M308 80 L300 102 L312 102 L302 124 L320 100 L308 100 Z", fill: "#faf4ea", stroke: "none" })
);

const mppt = h(
  "svg",
  { className: "thumb-svg", viewBox: "0 0 600 200", fill: "none", stroke: "#faf4ea", strokeWidth: 1.4 },
  h("g", { transform: "translate(40,40)" },
    h("rect", { x: 0, y: 0, width: 140, height: 84, rx: 3 }),
    h("line", { x1: 0, y1: 28, x2: 140, y2: 28 }),
    h("line", { x1: 0, y1: 56, x2: 140, y2: 56 }),
    h("line", { x1: 35, y1: 0, x2: 35, y2: 84 }),
    h("line", { x1: 70, y1: 0, x2: 70, y2: 84 }),
    h("line", { x1: 105, y1: 0, x2: 105, y2: 84 }),
    h("path", { d: "M0 0 L60 0 L0 60 Z", fill: "#faf4ea", opacity: 0.25, stroke: "none" })
  ),
  h("path", { d: "M210 150 C 250 150, 280 60, 320 60 C 360 60, 380 130, 420 130 C 460 130, 480 80, 520 80", strokeWidth: 2 }),
  h("circle", { cx: 320, cy: 60, r: 4, fill: "#faf4ea" }),
  h("circle", { cx: 420, cy: 130, r: 4, fill: "#faf4ea" }),
  h("g", { fill: "#faf4ea" },
    h("circle", { cx: 540, cy: 60, r: 2.5 }),
    h("circle", { cx: 555, cy: 50, r: 2.5 }),
    h("circle", { cx: 570, cy: 64, r: 2.5 }),
    h("circle", { cx: 555, cy: 74, r: 2.5 })
  ),
  h("line", { x1: 200, y1: 160, x2: 540, y2: 160, strokeDasharray: "2 4" }),
  h("text", { x: 208, y: 178, fontFamily: "JetBrains Mono, monospace", fontSize: 9, fill: "#faf4ea", stroke: "none", letterSpacing: 2 }, "P-V CURVE · PARTIAL SHADING")
);

export const PROJECT_THUMB_SVG: Record<string, ReactNode> = {
  "micro-wind-turbine-cost-benefit-2025": wind,
  "bess-smart-ev-charging-flexibility-2025": bess,
  "mppt-grey-wolf-optimization-pv-2020": mppt,
};

export const PROJECT_THUMB_CLASS: Record<string, string> = {
  "micro-wind-turbine-cost-benefit-2025": "thumb-a",
  "bess-smart-ev-charging-flexibility-2025": "thumb-b",
  "mppt-grey-wolf-optimization-pv-2020": "thumb-c",
};

// rotating fallback so multiple "new" cards don't all look identical
const FALLBACKS = ["thumb-a", "thumb-b", "thumb-c"];
export function thumbClassFor(slug: string, index = 0): string {
  return PROJECT_THUMB_CLASS[slug] ?? FALLBACKS[index % FALLBACKS.length];
}
