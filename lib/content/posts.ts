export type Post = {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  thumb: "thumb-a" | "thumb-b" | "thumb-c";
  bannerScene: string;
  excerpt: string;
  standfirst: string;
  contentHtml: string;
};

export const POSTS: Post[] = [
  {
    slug: "cbg-satat-2-0-bankable",
    title: "Why SATAT 2.0 finally makes CBG bankable",
    category: "Bio-energy",
    date: "May 2026",
    readTime: "6 min",
    thumb: "thumb-b",
    bannerScene: "[ article cover · bio-energy · 21:9 ]",
    excerpt:
      "Long off-take guarantees were the missing piece. The latest revisions to SATAT change the unit economics for compressed bio-gas plants — here's the new math.",
    standfirst:
      "Long off-take guarantees were the missing piece. The 2026 revisions to SATAT change the unit economics for Compressed Bio-Gas — here is the new math, and the new risks.",
    contentHtml: `
<p>For six years, SATAT — Sustainable Alternative Towards Affordable Transportation — was the right idea, executed cautiously. The scheme set a fixed buyback price for Compressed Bio-Gas (CBG) from oil marketing companies, and signed thousands of letters of intent (LoIs) with developers. But LoIs are not PPAs. A developer with a five-year project loan and a one-year price guarantee is a developer who doesn't get past sanction.</p>
<p>SATAT 2.0, notified earlier this year, fixes this. It extends the price-protection envelope to ten years, indexes the buyback to the wholesale price index with a cap, and — crucially — requires the OMC offtaker to lift a minimum quantity per quarter. That last clause is the bankability unlock.</p>
<h2>What changes for the unit economics</h2>
<p>On a 10 TPD plant running on press-mud feedstock, the IRR moves from roughly 11.4% (under the old regime) to about 17.6% under SATAT 2.0 — assuming the indexation cap doesn't bind. The biggest swing is in the financing structure: lenders now look at the project as a partial take-or-pay, not a merchant risk, which compresses the cost of debt by roughly 180 basis points.</p>
<div class="callout">"The price never was the binding constraint on CBG. The offtake risk was. SATAT 2.0 finally treats the disease, not the symptom."</div>
<h2>The new risks</h2>
<p>Bankability isn't free. Three risks that the old regime didn't have:</p>
<ul>
  <li><strong>Feedstock-price escalation.</strong> The indexation is to WPI, not to feedstock cost. If press-mud, paddy straw, or municipal organic waste sees the kind of price jump cattle dung saw in 2023, the margin compression is on the developer.</li>
  <li><strong>OMC counterparty risk.</strong> Take-or-pay only matters if the counterparty pays. The PSU OMCs are creditworthy on paper, but receivable cycles have stretched.</li>
  <li><strong>Plant utilisation.</strong> Many SATAT 1.0 plants are running at 40–55% capacity. The new scheme doesn't fix the digester-loading problem; it just makes the consequence visible.</li>
</ul>
<h2>What this means for new developers</h2>
<p>Three takeaways for anyone evaluating a CBG investment in 2026:</p>
<ul>
  <li>Site selection now matters more than scheme arbitrage. Feedstock proximity dominates the LCOE.</li>
  <li>Hedging your feedstock cost via long contracts (or backward integration) is the new alpha.</li>
  <li>The financing window is open — most lenders are still calibrating models, and rates haven't fully repriced. First-movers will lock in the cheap debt.</li>
</ul>
`,
  },
  {
    slug: "cbam-india-readiness",
    title: "CBAM is here. Will India's CCTS be ready in time?",
    category: "Carbon",
    date: "Apr 2026",
    readTime: "8 min",
    thumb: "thumb-a",
    bannerScene: "[ article cover · carbon · 21:9 ]",
    excerpt:
      "EU's Carbon Border Adjustment hits hard in 2026. I look at how India's Carbon Credit Trading Scheme stacks up — and where the price-discovery gap will hurt exporters.",
    standfirst:
      "The EU's Carbon Border Adjustment hits hard from 2026. I look at how India's Carbon Credit Trading Scheme stacks up — and where the price-discovery gap will hurt exporters.",
    contentHtml: `
<p>From January 2026, exporters of cement, iron &amp; steel, aluminium, fertilisers, electricity and hydrogen into the EU must surrender CBAM certificates equal to the embedded emissions of their goods, minus any carbon price already paid in the country of origin. The credit for a domestic carbon price is the lever — and India's Carbon Credit Trading Scheme (CCTS) is what's supposed to pull it.</p>
<h2>The price discovery gap</h2>
<p>The first CCTS auctions cleared at roughly ₹450–540 per tonne CO₂e. The EU ETS, by contrast, is trading at €72–84/t — over 16× higher. That delta is what CBAM will charge at the EU border. For Indian steel exporters, this is several billion euros a year of leakage.</p>
<p>The structural issue is that CCTS is a baseline-and-credit scheme calibrated to <em>relative</em> intensity improvement, not absolute emissions. Compliance is cheap because nearly every obligated entity over-performs against a generous baseline. The EU will not recognise this as equivalent carbon pricing without major design changes.</p>
<div class="callout">"CBAM doesn't care how clever your trading scheme is. It cares what you actually pay per tonne. Right now, India pays a tenth of what it needs to."</div>
<h2>What CCTS would need to do</h2>
<ul>
  <li>Tighten sectoral baselines aggressively in cycles 2 and 3.</li>
  <li>Introduce an absolute cap component, at least for the CBAM-exposed sectors.</li>
  <li>Build a clearing-house mechanism for EU recognition — a counterparty CBAM-eligible buyer should be able to verify the carbon price.</li>
</ul>
<h2>What exporters should do now</h2>
<p>Three plays I'd run for an exposed exporter:</p>
<ul>
  <li>Map embedded emissions per shipment line, not per facility. CBAM is product-level; your accounting probably isn't.</li>
  <li>Voluntarily over-purchase CCTS credits to build a paper trail of carbon spend — even if the EU doesn't recognise the price today, the documentation will matter when it does.</li>
  <li>Consider partial green-power PPAs for the most energy-intensive process steps. Lower embedded emissions = lower CBAM exposure, dollar-for-dollar.</li>
</ul>
`,
  },
  {
    slug: "green-h2-seci-tender",
    title: "Inside SECI's latest green hydrogen tender",
    category: "Hydrogen",
    date: "Mar 2026",
    readTime: "5 min",
    thumb: "thumb-c",
    bannerScene: "[ article cover · hydrogen · 21:9 ]",
    excerpt:
      "The price discovery from the second round of SIGHT tranche-II tells us where electrolyser CAPEX is settling — and what offtake risk the market is actually willing to price in.",
    standfirst:
      "Price discovery from the second round of SIGHT tranche-II tells us where electrolyser CAPEX is settling — and what off-take risk the market is willing to price in.",
    contentHtml: `
<p>The second SECI green-hydrogen tender under SIGHT (Strategic Interventions for Green Hydrogen Transition) cleared earlier this quarter. The bids tell a more interesting story than the headline weighted-average price.</p>
<h2>The numbers</h2>
<p>Cleared weighted-average incentive: ₹38.7/kg over three years (vs ₹50/kg ceiling). Winners spread across six developers, three of them new entrants. Lowest L1 bid: ₹29.6/kg.</p>
<h2>What the spread tells us</h2>
<p>The gap between L1 and L5 is wide — over 40% — which is unusual for a mature commodity auction. Three reasons:</p>
<ul>
  <li><strong>Electrolyser sourcing is bifurcating.</strong> Bidders with locked Chinese-stack supply bid much lower than bidders going through PLI-eligible domestic manufacturers.</li>
  <li><strong>Off-take risk is being priced very differently.</strong> Refinery captive bids cleared at a premium; merchant-market bids cleared deep below them. Most market participants still don't believe in a liquid merchant market for green H₂ before 2030.</li>
  <li><strong>RE PPA structure matters more than RE PPA price.</strong> Round-the-clock vs day-time-only PPAs change the electrolyser utilisation factor by 30+ percentage points — and that is what's actually driving the LCOH.</li>
</ul>
<div class="callout">"The market is no longer asking 'can we make green hydrogen?' It's asking 'will anybody be there to buy it in 2031?'"</div>
<h2>The implicit electrolyser CAPEX</h2>
<p>Back-solving from the L1 bid, electrolyser CAPEX is now implicitly priced around $640/kW (alkaline, Chinese-sourced). That's roughly half what tender-1 implied, and it brings green hydrogen genuinely close to grey on a fully-loaded basis for some refineries.</p>
`,
  },
  {
    slug: "discom-true-up-explained",
    title: "How DISCOM true-up proceedings actually work",
    category: "Tariff",
    date: "Feb 2026",
    readTime: "7 min",
    thumb: "thumb-b",
    bannerScene: "[ article cover · tariff · 21:9 ]",
    excerpt:
      "True-up petitions are recovering less each year. I unpack the regulatory accounting behind the gap — and what it means for distribution franchise bidders.",
    standfirst:
      "True-up petitions are recovering less each year. I unpack the regulatory accounting behind the gap — and what it means for distribution franchise bidders.",
    contentHtml: `
<p>The Aggregate Revenue Requirement (ARR) is supposed to be a settling-up mechanism. The DISCOM files projected costs at the start of the tariff period, regulator approves a recovery tariff, and three years later the true-up petition reconciles actuals against projections. Any under-recovery flows into the next cycle as a carrying-cost-adjusted regulatory asset.</p>
<p>That's the theory. The reality is that regulatory assets have been accumulating across most state DISCOMs at a faster rate than they're being recovered. Some sit on books at over ₹15,000 Cr. The compounding effect on the discount rate is dangerous.</p>
<h2>Why the gap is structural</h2>
<p>Three reasons true-up under-recovery is not a temporary blip:</p>
<ul>
  <li><strong>Disallowance of "controllable" costs.</strong> Regulators routinely disallow O&amp;M overshoots as inefficiency, even when the inflation index moved against the DISCOM. The argument is fair in principle and brutal in practice.</li>
  <li><strong>Power purchase cost normalisation.</strong> Spot purchases on IEX during peak summer get challenged as imprudent procurement, despite being the cheapest option in real time.</li>
  <li><strong>Subsidy timing mismatch.</strong> Cross-subsidy from agriculture is paid by state governments with significant delay; the DISCOM books receivable on day 1 but cash arrives years later, and the carrying cost is only partially recovered.</li>
</ul>
<div class="callout">"A regulatory asset earning 9% in a 11% cost-of-funds world is a slow-motion default. That's the math no DISCOM CFO wants to publish."</div>
<h2>What this means for franchise bidders</h2>
<p>For distribution franchise / parallel licensing bidders evaluating a take-over: the embedded true-up gap is the dominant variable. Discount the regulatory asset aggressively in your DCF — even a 30% haircut is generous in most state contexts. Build the bid around what you can actually collect from end-consumers, not what's on the inherited balance sheet.</p>
`,
  },
  {
    slug: "electricity-derivatives-india",
    title: "Electricity derivatives come to India — what traders need to know",
    category: "Markets",
    date: "Jan 2026",
    readTime: "6 min",
    thumb: "thumb-a",
    bannerScene: "[ article cover · markets · 21:9 ]",
    excerpt:
      "SEBI's framework for electricity derivatives is live. What instruments are likely first, who'll trade them, and the basis-risk traps to avoid.",
    standfirst:
      "SEBI's framework for electricity derivative contracts is live. What instruments are likely first, who'll trade them, and the basis-risk traps to avoid.",
    contentHtml: `
<p>Last quarter the SEBI–CERC joint framework for electricity derivative contracts finally cleared. The mechanism: SEBI regulates the contract; CERC regulates the underlying physical market. It's an awkward jurisdictional handshake, but a workable one — and India is now formally a market with electricity futures.</p>
<h2>What contracts come first</h2>
<p>The likely first wave:</p>
<ul>
  <li><strong>Monthly base-load futures</strong> referenced to the IEX area-clearing price. Standard quanto contract, settled in INR.</li>
  <li><strong>Quarterly peak/off-peak strips</strong> for the bigger trader desks who want exposure to TOD spreads.</li>
  <li><strong>Daily forward physical</strong> — already exists as DA &amp; G-DAM products, now likely to get a financial overlay.</li>
</ul>
<h2>Who's actually going to trade</h2>
<p>The interesting buyers are not the obvious ones. Generators are already hedged via PPAs. Big industrial consumers have open-access procurement. The first real liquidity will come from:</p>
<ul>
  <li>Open-access consumers with no long-term PPA — hedging spot-market exposure.</li>
  <li>RE developers with merchant exposure — selling forward when futures trade above their LCOE.</li>
  <li>Distribution franchisees with surplus or shortfall positions across regions.</li>
</ul>
<div class="callout">"The point of a derivative market isn't who's smart enough to predict prices. It's who needs to be insured against being wrong about them."</div>
<h2>The basis-risk trap</h2>
<p>One landmine: the contract references area clearing price, but most physical exposure is at the bilateral PPA price or the DSM-adjusted realisation. Basis risk between the index and your actual cash position can erode the hedge silently. Build your basis model before you build your hedge — not the other way around.</p>
`,
  },
  {
    slug: "pm-surya-ghar-rooftop",
    title: "PM Surya Ghar — the real numbers behind the rooftop push",
    category: "Solar",
    date: "Dec 2025",
    readTime: "5 min",
    thumb: "thumb-c",
    bannerScene: "[ article cover · solar · 21:9 ]",
    excerpt:
      "The flagship rooftop scheme passed its first anniversary. State-level rollouts tell a more complicated story than the headline numbers suggest.",
    standfirst:
      "The flagship rooftop scheme passed its first anniversary. State-level rollouts tell a more complicated story than the headline numbers suggest.",
    contentHtml: `
<p>PM Surya Ghar — Muft Bijli Yojana launched in early 2024 with the headline target of 1 crore residential rooftop installations by 2027. The first-year report card is a study in regional contrasts.</p>
<h2>The headline numbers</h2>
<p>~16 lakh installations completed in year one. Gujarat, Maharashtra and Kerala account for over 60% of the total. Twelve states have fewer than 5,000 installations each. The gap is not about solar resource — it's about DISCOM net-metering operationalisation.</p>
<h2>What's working in the high-uptake states</h2>
<ul>
  <li>Single-window applications integrated with the DISCOM IT systems.</li>
  <li>Empanelled installer networks with capped pricing and quality SLAs.</li>
  <li>Subsidy direct-credited within 30 days of commissioning — not the 4–6 months elsewhere.</li>
</ul>
<div class="callout">"Schemes don't fail because they are badly designed. They fail because the last-mile integration with the discom never quite happens."</div>
<h2>What this means for installers</h2>
<p>The economics are now genuinely compelling — under 4-year payback in most slabs, and rapidly improving with module-price declines. But the operational bottleneck is paperwork, not capital. Installers who invest in the DISCOM-portal interface and customer-handholding workflow will out-compete those who optimise for module pricing alone.</p>
<h2>The next stress test</h2>
<p>As installed capacity crosses 5% of feeder load in any given residential zone, the DISCOM-side voltage management becomes non-trivial. A handful of feeders in Ahmedabad are already there. The next 18 months will reveal whether the LV grid is ready for the scheme to actually scale.</p>
`,
  },
];
