import type { ReactNode } from "react";
import { createElement as h, Fragment } from "react";

export type Project = {
  slug: string;
  title: string;
  year: number;
  tags: string[];
  thumb: "thumb-a" | "thumb-b" | "thumb-c";
  sceneLabel: string;
  svg: ReactNode;
  meta: {
    cat: string;
    note: string;
    readTime: string;
    bannerScene: string;
    footer: string;
  };
  standfirst: string;
  contentHtml: string;
};

const windSvg = h(
  "svg",
  { className: "thumb-svg", viewBox: "0 0 400 220", fill: "none", stroke: "#faf4ea", strokeWidth: 1.4 },
  h("line", { x1: 280, y1: 60, x2: 280, y2: 200, strokeWidth: 3 }),
  h("circle", { cx: 280, cy: 60, r: 6, fill: "#faf4ea" }),
  h("path", { d: "M280 60 L280 8 M280 60 L324 86 M280 60 L236 86", strokeWidth: 2.5 }),
  h(
    "g",
    { opacity: 0.9 },
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

const bessSvg = h(
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

const mpptSvg = h(
  "svg",
  { className: "thumb-svg", viewBox: "0 0 600 200", fill: "none", stroke: "#faf4ea", strokeWidth: 1.4 },
  h(
    "g",
    { transform: "translate(40,40)" },
    h("rect", { x: 0, y: 0, width: 140, height: 84, rx: 3 }),
    h("line", { x1: 0, y1: 28, x2: 140, y2: 28 }),
    h("line", { x1: 0, y1: 56, x2: 140, y2: 56 }),
    h("line", { x1: 35, y1: 0, x2: 35, y2: 84 }),
    h("line", { x1: 70, y1: 0, x2: 70, y2: 84 }),
    h("line", { x1: 105, y1: 0, x2: 105, y2: 84 }),
    h("path", { d: "M0 0 L60 0 L0 60 Z", fill: "#faf4ea", opacity: 0.25, stroke: "none" })
  ),
  h("path", {
    d: "M210 150 C 250 150, 280 60, 320 60 C 360 60, 380 130, 420 130 C 460 130, 480 80, 520 80",
    strokeWidth: 2,
  }),
  h("circle", { cx: 320, cy: 60, r: 4, fill: "#faf4ea" }),
  h("circle", { cx: 420, cy: 130, r: 4, fill: "#faf4ea" }),
  h(
    "g",
    { fill: "#faf4ea" },
    h("circle", { cx: 540, cy: 60, r: 2.5 }),
    h("circle", { cx: 555, cy: 50, r: 2.5 }),
    h("circle", { cx: 570, cy: 64, r: 2.5 }),
    h("circle", { cx: 555, cy: 74, r: 2.5 })
  ),
  h("line", { x1: 200, y1: 160, x2: 540, y2: 160, strokeDasharray: "2 4" }),
  h(
    "text",
    {
      x: 208,
      y: 178,
      fontFamily: "JetBrains Mono, monospace",
      fontSize: 9,
      fill: "#faf4ea",
      stroke: "none",
      letterSpacing: 2,
    },
    "P-V CURVE · PARTIAL SHADING"
  )
);

// Silence unused Fragment if tree-shaking complains
void Fragment;

export const PROJECTS: Project[] = [
  {
    slug: "micro-wind-turbine-cost-benefit-2025",
    title: "Micro wind turbine vs. large turbine — a cost-benefit analysis",
    year: 2025,
    tags: ["Wind", "Techno-econ"],
    thumb: "thumb-a",
    sceneLabel: "[ project cover · wind turbine schematic ]",
    svg: windSvg,
    meta: {
      cat: "Project · Wind",
      note: "Techno-economic analysis",
      readTime: "14 min read",
      bannerScene: "[ banner image · wind farm comparison illustration · 21:9 ]",
      footer: "Project · 2025 · IIT Gandhinagar / Independent",
    },
    standfirst:
      "Below 100 kW the wind business behaves nothing like utility-scale. A site-by-site comparison of small distributed turbines against a single large turbine for the same nameplate capacity — and where the crossover actually sits.",
    contentHtml: `
<p>Indian wind is dominated by 2 – 3 MW utility-scale machines. But under the MNRE Small Wind / Hybrid policy, sub-100 kW turbines are slowly making a case in distributed contexts — agriculture pumps, telecom towers, captive industrial loads. The question I set out to answer was simple: <em>at what point does an array of small turbines beat a single large turbine of equivalent capacity?</em></p>
<p>The answer, predictably, is "it depends" — but the dependencies are surprising. Hub-height economics, capacity utilisation factor (CUF), and the implicit cost of land tenure dominate. CAPEX per MW is almost a red herring.</p>
<h2>Setting up the comparison</h2>
<p>I built two parallel models for the same 250 kW design load: (a) one 250 kW turbine on a 50 m tower, (b) ten 25 kW micro-turbines distributed across the load footprint at 18 m hub height. Both run against the same 10-year wind-speed time series from a representative site in Tamil Nadu.</p>
<ul>
  <li>Wind shear coefficient: 0.21 (empirical, agri-fringe terrain)</li>
  <li>CAPEX assumed: ₹6.8 Cr/MW (large) vs ₹9.4 Cr/MW (micro, weighted average)</li>
  <li>O&amp;M: 1.4% of CAPEX/yr (large), 2.6% (micro — higher per-unit field cost)</li>
  <li>Discount rate: 9.5% real</li>
  <li>Project life: 20 yr (large), 15 yr (micro)</li>
</ul>
<div class="stat-row">
  <div class="stat"><div class="num">26%</div><div class="lbl">CUF · large turbine</div></div>
  <div class="stat"><div class="num">18%</div><div class="lbl">CUF · micro array</div></div>
  <div class="stat"><div class="num">₹4.92</div><div class="lbl">LCOE crossover (₹/kWh)</div></div>
</div>
<h2>Where micro turbines actually win</h2>
<p>Despite a ~40% higher levelised cost on paper, micro turbines win on three site profiles that the LCOE calculation cannot capture:</p>
<ul>
  <li><strong>Land-constrained captive sites.</strong> A 250 kW machine needs roughly 0.6 acres of clearance. Ten micro units sit inside the existing footprint — over the parking shed, the storage yard, the boundary wall.</li>
  <li><strong>Behind-the-meter consumption.</strong> Distributed generation that displaces grid imports is valued at the retail tariff, not the wholesale clearing price. That changes the bid from ~₹3.5/kWh to ₹7.8–9.2/kWh in HT industrial slabs.</li>
  <li><strong>Hybrid pairings.</strong> Micro turbines stack cleanly with rooftop PV and small BESS. Generation profiles are anti-correlated (PV daytime, wind dusk/night), pushing combined CUF above either alone.</li>
</ul>
<div class="callout">"Small wind isn't a worse version of utility wind. It's a different product — sold to different buyers, on different terms, against a different opportunity cost."</div>
<h2>The regulatory headwind</h2>
<p>The bigger constraint isn't engineering — it's that net-metering caps in most states still treat small wind under the same envelope as rooftop solar. For an industrial consumer already at the rooftop-solar cap, adding a small turbine pushes them into open-access territory, with wheeling, CSS and additional surcharges that destroy the behind-the-meter premium.</p>
<p>Three states have moved on this — Tamil Nadu (2024 amendment), Gujarat (2025 draft), and Rajasthan (2025) — but the rules are still inconsistent and developers are wary of stranded-asset risk.</p>
<h2>Conclusion</h2>
<p>On a pure ₹/kWh basis, large wind continues to dominate. But for a meaningful slice of the C&amp;I market — particularly land-constrained, multi-shift industrial sites — micro turbines as part of a hybrid solar-wind-BESS stack now beat both pure rooftop solar and an open-access wind PPA. The blocker is regulatory, not technical.</p>
<p>A clearer net-metering / banking framework specifically for distributed wind under 100 kW would unlock an estimated 1.2 – 1.6 GW of behind-the-meter capacity over the next five years. The IRR math is already there.</p>
`,
  },
  {
    slug: "bess-smart-ev-charging-flexibility-2025",
    title: "BESS & smart EV charging for grid flexibility",
    year: 2025,
    tags: ["Storage", "EV"],
    thumb: "thumb-b",
    sceneLabel: "[ BESS + smart EV charging schematic ]",
    svg: bessSvg,
    meta: {
      cat: "Project · Storage & EV",
      note: "Grid services modelling",
      readTime: "12 min read",
      bannerScene: "[ banner · BESS + EV charging diagram · 21:9 ]",
      footer: "Project · 2025 · IIT Gandhinagar / Independent",
    },
    standfirst:
      "Treating EV fleets and distributed BESS as a single, coordinated flexibility asset. A simulation of how much net frequency-regulation capacity an Indian DISCOM can extract from its own customer base — and what to pay for it.",
    contentHtml: `
<p>Renewables push variability into the grid; EVs add another stochastic load on top. Conventional wisdom treats these as twin problems. But viewed from a system operator's chair, both are <em>flexible</em> in a way thermal plants are not — they can ramp instantly, in either direction. The project tested how much that flexibility is worth when you actually pay for it.</p>
<h2>The simulation</h2>
<p>I modelled a notional 100 MW distribution feeder with three layers of flexible resource:</p>
<ul>
  <li>10 MW / 40 MWh utility BESS at the substation</li>
  <li>~2 000 residential EVs with smart bidirectional chargers (V1G + V2G capable)</li>
  <li>~140 commercial fleet EVs with depot charging schedulable in 15-min slots</li>
</ul>
<p>The optimisation problem was: given a forecasted load + a forecasted RE generation profile + a real-time market price signal, what dispatch schedule minimises total cost while maintaining frequency &amp; voltage limits at every node?</p>
<div class="stat-row">
  <div class="stat"><div class="num">42%</div><div class="lbl">Peak demand shaved</div></div>
  <div class="stat"><div class="num">₹2.4/kWh</div><div class="lbl">Avg. flex compensation</div></div>
  <div class="stat"><div class="num">6.1 yr</div><div class="lbl">DISCOM payback period</div></div>
</div>
<h2>Key finding: the EV fleet dominates</h2>
<p>Counter-intuitively, the commercial EV fleet — only ~140 vehicles — provided more usable flexibility than the 10 MW utility BESS. Two reasons:</p>
<ul>
  <li><strong>Latent capacity.</strong> A 60 kWh fleet EV sitting at depot is a battery. 140 of them parked overnight = ~8.4 MWh of dispatchable storage at near-zero incremental CAPEX.</li>
  <li><strong>Schedulability.</strong> Fleet operators want full-by-morning, not full-immediately. That two-hour slack is exactly the window the operator needs to absorb RE over-generation or shave the evening peak.</li>
</ul>
<div class="callout">"The cheapest battery on a DISCOM's network is the one its customers have already paid for. The expensive thing is the contract to use it."</div>
<h2>The contracting problem</h2>
<p>Indian regulations don't yet allow DISCOMs to settle real-time flexibility payments to individual EV owners. The closest analogue is the Ancillary Services Regulations, but those are designed for generators, not aggregated demand-side resources. The simulation assumes a workable aggregator framework — which CERC's draft 2025 paper hints at but doesn't operationalise.</p>
<h2>Tariff implications</h2>
<p>For the flex-payment model to clear, the DISCOM needs to be allowed to pass through ancillary service costs as a separate line item in the ARR. Several SERCs are now exploring this under the broader "Flexible Resources" track — but a uniform framework is still missing.</p>
<h2>Conclusion</h2>
<p>Distributed flexibility — properly contracted — is cheaper than building new peakers, cheaper than utility-scale BESS at current cell prices, and structurally aligned with the EV adoption curve. What's missing is the regulatory plumbing: aggregator licenses, real-time settlement, and metering standards. The technology problem is solved. The market design problem is not.</p>
`,
  },
  {
    slug: "mppt-grey-wolf-optimization-pv-2020",
    title: "MPPT design using grey-wolf optimization for PV systems under partial shading",
    year: 2020,
    tags: ["Solar", "Control", "Optimisation"],
    thumb: "thumb-c",
    sceneLabel: "[ MPPT · grey wolf optimisation ]",
    svg: mpptSvg,
    meta: {
      cat: "Project · Solar · Control",
      note: "Metaheuristic optimisation",
      readTime: "11 min read",
      bannerScene: "[ banner · P-V curve with multiple local maxima · 21:9 ]",
      footer: "Project · 2020 · B.Tech dissertation, published in IJESI",
    },
    standfirst:
      "Classical Perturb-and-Observe MPPT chokes the moment a leaf falls on a panel. A grey-wolf-optimised tracker can find the true global maximum on a multi-peak P–V curve — and the dynamics look exactly like a wolf pack closing in on prey.",
    contentHtml: `
<p>Under uniform irradiance, a PV array's power-voltage curve has a single, well-behaved peak. Conventional Maximum Power Point Trackers — Perturb &amp; Observe (P&amp;O), Incremental Conductance — track that peak comfortably. The trouble starts when partial shading produces multiple local maxima: a bird-droppping, a chimney shadow, a passing cloud edge. Now the P–V curve has several peaks, and a hill-climbing tracker happily locks onto the wrong one — losing 15 – 40% of available power.</p>
<h2>Why grey wolf?</h2>
<p>Grey Wolf Optimisation (GWO) is a population-based metaheuristic modelled on the hunting hierarchy of grey wolves. Four roles — alpha, beta, delta, and the omegas — search the solution space cooperatively: the alpha holds the current best estimate, the beta and delta corroborate, and the omegas explore. Over iterations, the pack converges on the global optimum. The structure is elegantly suited to multi-modal landscapes — exactly what a shaded P–V curve is.</p>
<ul>
  <li>Search agents: 4 (α, β, δ, ω)</li>
  <li>Decision variable: duty cycle <em>D</em> ∈ [0, 1] of the boost converter</li>
  <li>Fitness function: instantaneous PV power <em>P = V × I</em></li>
  <li>Convergence criterion: |ΔP/ΔD| &lt; ε across 5 iterations</li>
</ul>
<div class="stat-row">
  <div class="stat"><div class="num">99.2%</div><div class="lbl">Tracking efficiency (GWO)</div></div>
  <div class="stat"><div class="num">82.6%</div><div class="lbl">Tracking efficiency (P&amp;O)</div></div>
  <div class="stat"><div class="num">0.34 s</div><div class="lbl">Convergence time</div></div>
</div>
<h2>Simulation setup</h2>
<p>The system was built in MATLAB / Simulink: a 4-panel series string (each 60 W, V<sub>oc</sub> 22 V), a boost converter, and an RL load. Three shading patterns were tested — single panel at 30% irradiance, alternating shade, and a moving cloud edge. Each pattern produces a different P–V topology and a different test of the tracker's ability to escape a local maximum.</p>
<h2>Comparing the algorithms</h2>
<p>Across all three shading patterns, GWO consistently located the global maximum where P&amp;O locked onto a local one. The trade-off is convergence time — GWO needs a few hundred milliseconds to do its population search; P&amp;O is essentially instantaneous. For slow-moving irradiance changes (cloud cover, hour-of-day) this is irrelevant. For rapid transients (vehicles passing under a parking-shade canopy) the difference matters.</p>
<div class="callout">"A good optimiser doesn't just find the answer — it knows when to stop looking. That's what makes GWO interesting for embedded controllers."</div>
<h2>Why this still matters in 2025</h2>
<p>The project was completed in 2020 as part of my undergraduate dissertation. Five years later, two things have changed:</p>
<ul>
  <li>Module-level power electronics (MLPE — DC optimisers, micro-inverters) are now cheap enough that partial-shading MPPT at the string level matters less.</li>
  <li>But agrivoltaic and floating-PV installations <em>inherently</em> shade unevenly — and they're growing fast. GWO-class trackers are showing up again at the inverter level.</li>
</ul>
<h2>Conclusion</h2>
<p>Metaheuristic MPPTs are not a replacement for conventional trackers — they're a complement, deployed when the P–V landscape is genuinely multi-modal. Grey Wolf Optimisation in particular is computationally light, easy to embed on commodity microcontrollers, and conceptually transparent to debug — three properties that matter more in field hardware than the published efficiency figure.</p>
`,
  },
];
