# CLAUDE.md — Deepti Semwal Portfolio Website

> **Design source:** Claude Design prototype bundle at `energy-policy-expert-portfolio-website/`.
> Read `chats/chat1.md` for full design intent. The finalized HTML/CSS/JS files are the
> pixel-perfect visual reference — implement them in Next.js/React, matching every layout
> detail, spacing, color, and typographic choice exactly.

---

## Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14** (App Router) | SSR/SSG, Vercel-native, API routes built-in |
| Styling | **Tailwind CSS** + global CSS variables | Matches prototype's CSS-variable architecture |
| Database | **Supabase** (free tier) | Postgres, Auth, Storage — all free |
| Auth | **Supabase Auth** (email/password, single admin) | No extra service needed |
| Image uploads | **Supabase Storage** | Free 1 GB bucket |
| Hosting | **Vercel** (free hobby tier) | Zero-config Next.js deployment |
| Rich text editor | **Tiptap** (open-source) | Blog/project content editing |
| Contact form | Save to Supabase `contacts` table + optional **Resend** (100 emails/day free) | |
| Prose rendering | `@tailwindcss/typography` (`prose` class) | Renders saved HTML from Tiptap |

**All services are free tier — no credit card required for hobby usage.**

---

## Design System — Lock These In Exactly

### Color Tokens (Rose Clay — locked, do not allow user to change)

```css
:root {
  --bg:           #f6e2d5;   /* page background */
  --bg-2:         #f0d2c0;   /* subtle alternate bg */
  --bg-3:         #e8c0a8;   /* deeper bg / hover states */
  --paper:        #fcefe4;   /* card / panel surfaces */
  --ink:          #2f1d1a;   /* primary text */
  --ink-2:        #503530;   /* secondary text */
  --ink-3:        #806258;   /* muted / captions */
  --rule:         #e0b8a4;   /* dividers */
  --rule-2:       #d09f88;   /* stronger dividers */
  --accent:       #c46a5a;   /* CTA, highlights (terracotta-peach) */
  --accent-deep:  #9a4438;   /* accent hover */
  --accent-soft:  #f0c0b0;   /* subtle accent tint */
  --accent-glow:  #f8d6c8;   /* very light accent bg */
  --leaf:         #5e6b48;   /* deep sage — used for tags/chips */
}
```

Map these to Tailwind via `tailwind.config.js` `extend.colors`.

### Typography (Editorial pairing — locked)

| Role | Font | Source |
|---|---|---|
| Display / headings | **Instrument Serif** (regular + italic) | Google Fonts |
| Body / UI | **DM Sans** (400, 500, 700) | Google Fonts |
| Labels / metadata / eyebrows | **JetBrains Mono** (400, 500) | Google Fonts |

Load via `next/font/google`. Apply as CSS variables `--serif`, `--sans`, `--mono`.

Typography classes to implement (match prototype exactly):
- `.display` — Instrument Serif, weight 400, letter-spacing -0.01em, line-height 0.95
- `.eyebrow` — JetBrains Mono, 11px, letter-spacing 0.22em, uppercase, color `--ink-3`
- `.label` — JetBrains Mono, 11px, letter-spacing 0.18em, uppercase

### Body background

Apply subtle radial gradient over the flat `--bg` color (paper-grain warmth):
```css
background-image:
  radial-gradient(1200px 800px at 80% -10%, rgba(201,122,85,0.10), transparent 60%),
  radial-gradient(900px 600px at -5% 30%, rgba(243,205,178,0.35), transparent 60%);
```

### Logo / Favicon

- **DS wordmark** in nav: circular `--ink` filled badge (38×38px, border-radius 50%) with italic `DS` in Instrument Serif in `--paper` color. Beside it: "Deepti Semwal" in Instrument Serif + "Energy Policy · Regulations" in small DM Sans.
- **Favicon:** inline SVG — dark square background `#2a1f17`, italic "DS" text `#f4ebe0`.

---

## Site Structure

```
/                        → Public portfolio (single-page scroll)
/projects/[slug]         → Project full-page article view
/analysis/[slug]         → Blog/analysis article view
/admin                   → Login page
/admin/dashboard         → CMS dashboard (protected)
/admin/projects/new      → Create project
/admin/projects/[id]     → Edit project
/admin/analysis/new      → Create blog post
/admin/analysis/[id]     → Edit blog post
```

Section IDs for smooth-scroll nav: `#top`, `#skills`, `#services`, `#projects`, `#analysis`, `#contact`

---

## Public Sections — Implement Pixel-Perfect from Prototype

### Navbar (`components/ui/Navbar.tsx`)

- Sticky, `backdrop-filter: blur(14px) saturate(140%)`, bg `rgba(244,235,224,0.78)`
- On scroll: add bottom border `var(--rule)` (`nav.scrolled` class via JS scroll listener)
- Left: DS logo mark + name + subtitle
- Center/right: nav links — Skills, Services, Projects, Analysis, Contact
- Far right: `"Let's Talk →"` CTA button (pill, accent bg)
- All links are anchor links (`#section`) on home page; prefix with `/` on inner pages

### 01 — Hero (`components/sections/Hero.tsx`)

Layout: two-column grid (`hero-grid`)
- **Left column:**
  - Eyebrow (JetBrains Mono): `"Deepti Semwal · est. portfolio 2025"`
  - Large display heading (Instrument Serif, ~80–100px): `"Energy Policy & Regulations Expert"`
  - Bio copy: *"I help startups, regulators, and developers navigate India's energy transition — turning tariff orders, carbon markets, and power-sector rules into clear, executable strategy."*
  - Pills row: `● Available for consultation` · `Masters · IIT Gandhinagar` · `Noida, India`
  - CTA buttons: `"View work ↗"` (accent filled) + `"Get in touch"` (ghost/outline)

- **Right column (aside):**
  - Portrait image: `assets/headshot.png` → store in Supabase Storage, reference via env var or Next.js public folder. Subtle bottom gradient overlay in accent tones.
  - Below portrait: short italic quote or availability note

- **Below the grid:** Horizontal ticker / marquee strip (dark `--ink` bg, light text):
  `Tariff Orders · ARR · Power Markets · Carbon Credits · Green Hydrogen · CBG · Regulations ·` (repeated, CSS animation scroll)

### 02 — Skills (`components/sections/Skills.tsx`)

Section header pattern (reused across all sections):
- Section number eyebrow: `§ 01 — Capabilities`
- Section heading: `"What I know."`
- Lede paragraph

6-cell grid (`skills-grid`), each card (`skill` article):
- Numbered eyebrow: `01` – `06` in mono
- SVG glyph icon (stroke, 24×24 viewBox, use inline SVGs from prototype)
- Skill name (Instrument Serif heading)
- 1–2 line description

Skills with descriptions:
1. **Energy Regulations** — CERC/SERC orders, licensing, compliance, and PPA structuring across generation and distribution segments.
2. **Power Markets** — DAM/TAM/RTM mechanics, IEX price-curve reading, and portfolio hedging strategy.
3. **Tariff Order and ARR** — Annual Revenue Requirement filings, tariff petitions, and true-up proceedings.
4. **Carbon Markets** — PAT scheme, carbon credit valuation, and emerging Article 6 compliance pathways.
5. **CBG (Compressed Bio Gas)** — SATAT scheme, feedstock economics, off-take pricing and project finance for CBG developers.
6. **Green Hydrogen & Power Derivatives** — SECI tender analysis, electrolyser economics, and electricity derivative instruments.

### 03 — Services (`components/sections/Services.tsx`)

Section eyebrow: `§ 02 — Engagement`
Section heading: `"How I can help."`
Lede: *"Four service tracks I run for clients — from one-off regulatory reads to month-long strategy retainers. Each engagement is scoped against your decision deadline, not the other way around."*

Editorial vertical list (`services-list`) — each service is a clickable row linking to `#contact`:
- Service number: `/01`, `/02`, `/03`, `/04` in mono
- Service title in Instrument Serif (display size)
- Description in DM Sans
- `↗` arrow right-aligned

Services:
1. **Energy Regulations Consultation** — Decode tariff orders, CERC/SERC notifications, and PPA terms. Written opinions, redlines, and stakeholder briefings — turnaround in days, not weeks.
2. **Strategy & New-Initiative Ideation** — For energy startups: market-entry strategy, regulatory moats, and pricing playbooks across power, carbon, hydrogen, and bio-gas.
3. **Energy Consumption Analysis** — Load profiling, baseline benchmarking, and peak-demand reduction plans that translate directly into lower power-purchase costs.
4. **Income Projection in RE** — Financial modelling for solar, wind, and hybrid assets — tariff discovery, generation forecasting, and P90 revenue scenarios.

### 04 — Projects (`components/sections/Projects.tsx`)

Section eyebrow: `§ 03 — Projects`
Section heading: `"Selected work."`
Lede: *"Selected academic and consulting projects — from microgrid economics to MPPT control. Click any card for the full write-up."*

Asymmetric 3-card grid (`project-grid`). Each card:
- Thumbnail area with cover image (or styled placeholder with `scene-label` text if no image yet)
- Year badge (mono, top-right of thumb)
- Project title (Instrument Serif)
- Tag chips (e.g. `Wind`, `Techno-econ`)
- Clicking card → `/projects/[slug]`

**Seed projects (add via admin or SQL):**

| Slug | Title | Year | Tags |
|---|---|---|---|
| `micro-wind-turbine-cost-benefit-2025` | Micro wind turbine vs. large turbine — a cost-benefit analysis | 2025 | Wind, Techno-econ |
| `bess-smart-ev-charging-flexibility-2025` | BESS & smart EV charging for grid flexibility | 2025 | Storage, EV |
| `mppt-grey-wolf-optimization-pv-2020` | MPPT design using grey-wolf optimization for PV systems under partial shading | 2020 | Solar, Control, Optimisation |

### 05 — My Analysis / Blogs (`components/sections/Analysis.tsx`)

Section eyebrow: `§ 04 — Analysis`
Section heading: `"My analysis."` (with `<em>analysis</em>` in italic Instrument Serif)

Blog card grid (`analysis-grid`), each card (`article`):
- Cover image area (placeholder until real image added)
- Category tag chip + read time
- Article title
- Excerpt
- Date + `"Read →"`

**Seed blog posts (add via admin or SQL — content already written in prototype `blog/` folder, copy verbatim):**

| Slug | Title | Category |
|---|---|---|
| `cbg-satat-2-0-bankable` | Why SATAT 2.0 finally makes CBG bankable | Bio-energy |
| `cbam-india-readiness` | CBAM and India: reading the EU carbon border mechanism | Carbon |
| `green-h2-seci-tender` | Inside SECI's latest green hydrogen tender | Hydrogen |
| `discom-true-up-explained` | How DISCOM true-up proceedings actually work | Tariff |
| `electricity-derivatives-india` | Electricity derivatives come to India — what traders need to know | Power Markets |
| `pm-surya-ghar-rooftop` | PM Surya Ghar — the real numbers behind the rooftop push | Solar |

Empty state (when no posts): *"Articles coming soon — check back shortly."*

### 06 — Contact (`components/sections/Contact.tsx`)

Two-column layout:
- **Left:** contact details
  - Email: `deeptisemwal1235@gmail.com` (mailto link)
  - Location: Noida, India
  - Availability note: `● Available for consultation`
- **Right:** form with fields:
  - Name (text, required, placeholder: `"Your full name"`)
  - Email (email, required, placeholder: `"you@company.com"`)
  - Subject (text, placeholder: `"What is this about?"`)
  - Message (textarea 5 rows, required, placeholder: `"Tell me a little about your project, timeline, and what you'd like to discuss…"`)
  - Submit button: `"Send message →"` (accent filled)
- On submit: POST to `/api/contact` → save to Supabase `contacts` table
- Show success/error toast via `sonner`

---

## Project Detail Page (`/projects/[slug]`)

Match `projects/micro-wind.html`, `projects/bess-ev.html`, `projects/mppt.html` from prototype.

Layout:
- Back link: `← Back to projects` (links to `/#projects`)
- Detail meta row: Category tag · Year · Read time · `by Deepti Semwal`
- Large display heading (Instrument Serif)
- Standfirst / excerpt paragraph (larger, italic)
- Full-width cover image banner (placeholder striped div until image uploaded)
- Rich text body (`prose` class, max-width ~720px, centered)
  - Supports: drop caps on first paragraph, stat rows (`detail-stat` items), callout blocks (`detail-callout`), figure/caption pairs
- Footer nav: prev/next project links

Fetch: `getStaticParams` from Supabase `projects` table (published only). Use `generateMetadata` with title + excerpt.

---

## Blog Detail Page (`/analysis/[slug]`)

Match `blog/cbg-satat.html` etc. from prototype (identical layout to project detail).

Layout:
- Back link: `← Back to analysis`
- Meta: Category · Date (e.g. `May 2026`) · Read time · `by Deepti Semwal`
- Heading + standfirst
- Cover image banner
- Rich text body (`prose` class)

Fetch: `getStaticParams` from Supabase `posts` table (published only).

---

## Database Schema (Supabase / Postgres)

```sql
-- Projects
create table projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,                 -- standfirst, ~160 chars
  content text,                 -- HTML from Tiptap
  cover_image_url text,
  year int,
  category text,
  tags text[],
  read_time text,               -- e.g. "8 min read"
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Blog posts (My Analysis)
create table posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text,
  content text,                 -- HTML from Tiptap
  cover_image_url text,
  category text,
  tags text[],
  read_time text,
  published boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Contact form submissions
create table contacts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);
```

**RLS Policies:**
- `projects`, `posts`: public `SELECT` where `published = true`; authenticated users full access
- `contacts`: anyone can `INSERT`; only authenticated users can `SELECT`

---

## Admin CMS

### Auth & Middleware

- Single user — create manually in Supabase Auth dashboard (no public sign-up route)
- `/admin` → login form (email + password) using `@supabase/ssr`
- `middleware.ts` protects all `/admin/*` routes → redirect to `/admin` if unauthenticated
- Logout button in admin nav

### Dashboard (`/admin/dashboard`)

- Two tables: Projects list + Analysis list
- Columns: Title · Status (Published / Draft) · Year/Date · Edit · Delete
- `"New Project"` and `"New Article"` CTA buttons

### Editor (shared pattern for projects and posts)

Fields:
- Title → auto-generates slug (editable)
- Excerpt / standfirst (textarea)
- Category (text)
- Tags (comma-separated or tag chip input)
- Year (number — projects only)
- Read time (text, e.g. `"6 min read"`)
- Cover image (file upload → Supabase Storage bucket `portfolio-media`)
- **Content** — Tiptap rich text editor with: headings (H2, H3), bold, italic, lists, blockquote, image insert, link, horizontal rule, drop-cap support
- Published toggle
- Save / Publish button

---

## File Structure

```
deepti-portfolio/
├── app/
│   ├── page.tsx                   # Main portfolio page (all sections)
│   ├── layout.tsx                 # Root layout, fonts, metadata
│   ├── globals.css                # CSS custom properties (matches prototype :root exactly)
│   ├── projects/
│   │   └── [slug]/page.tsx        # Project detail
│   ├── analysis/
│   │   └── [slug]/page.tsx        # Blog article
│   ├── api/
│   │   └── contact/route.ts       # Contact form POST handler
│   └── admin/
│       ├── page.tsx               # Login
│       ├── dashboard/page.tsx
│       ├── projects/
│       │   ├── new/page.tsx
│       │   └── [id]/page.tsx
│       └── analysis/
│           ├── new/page.tsx
│           └── [id]/page.tsx
├── components/
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Skills.tsx
│   │   ├── Services.tsx
│   │   ├── Projects.tsx
│   │   ├── Analysis.tsx
│   │   └── Contact.tsx
│   ├── ui/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── ArticleCard.tsx
│   │   ├── Ticker.tsx             # Marquee strip under hero
│   │   └── RichTextEditor.tsx     # Tiptap wrapper
│   └── admin/
│       ├── AdminNav.tsx
│       └── ImageUpload.tsx
├── lib/
│   ├── supabase/
│   │   ├── client.ts              # Browser Supabase client
│   │   ├── server.ts              # Server Supabase client
│   │   └── middleware.ts
│   └── utils.ts                   # slugify, formatDate, calcReadTime
├── middleware.ts                   # Protect /admin/*
├── public/
│   └── headshot.png               # Hero portrait (copy from assets/headshot.png)
├── .env.local
├── tailwind.config.js
├── next.config.js
└── package.json
```

---

## Animations & Interactions (match prototype)

- **Scroll reveal:** elements with `.reveal` class fade-in + translate-up when they enter viewport. Use `IntersectionObserver` in a `useEffect` hook or a `RevealWrapper` client component. CSS:
  ```css
  .reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
  .reveal.visible { opacity: 1; transform: none; }
  ```
- **Ticker/marquee:** CSS `@keyframes` horizontal scroll, duplicated content for seamless loop. Pause on hover.
- **Nav scroll effect:** add `scrolled` class to nav on `window.scrollY > 10`.
- **Service rows:** hover → background shifts to `--bg-2`, `↗` arrow translates right.
- **Project cards:** hover → thumb image scales slightly (1.03), card lifts with box-shadow.
- No heavy animation libraries — all CSS-driven.

---

## Key Dependencies

```json
{
  "dependencies": {
    "next": "14.x",
    "react": "18.x",
    "tailwindcss": "3.x",
    "@tailwindcss/typography": "^0.5",
    "@supabase/supabase-js": "^2",
    "@supabase/ssr": "^0.5",
    "@tiptap/react": "^2",
    "@tiptap/starter-kit": "^2",
    "@tiptap/extension-image": "^2",
    "@tiptap/extension-link": "^2",
    "@tiptap/extension-placeholder": "^2",
    "resend": "^3",
    "slugify": "^1",
    "date-fns": "^3",
    "sonner": "^1"
  }
}
```

---

## Environment Variables

```env
# .env.local — never commit
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional — contact form email notification
RESEND_API_KEY=your-resend-key
CONTACT_TO_EMAIL=deeptisemwal1235@gmail.com
```

Add all to Vercel → Settings → Environment Variables before deploying.

---

## Deployment Checklist

1. Create Supabase project → run SQL migrations above → enable RLS policies
2. Create Supabase Storage bucket `portfolio-media` (public read)
3. Create admin user: Supabase Dashboard → Authentication → Users → Invite User
4. Upload `headshot.png` to `public/` or Supabase Storage
5. Push code to GitHub → connect to Vercel → add env vars → deploy
6. Seed 3 projects + 6 blog posts via admin dashboard (use content from prototype `projects/` and `blog/` HTML files — the full article text is already written there)
7. Verify `/admin` login works on production
8. Test contact form end-to-end

---

## Content Migration from Prototype

The prototype `blog/` and `projects/` HTML files contain complete, publication-ready article content. When seeding:

- Copy body text from `<main class="detail-body">` into the Tiptap editor
- Use `<h1>` as the post title, `<p class="standfirst">` as excerpt
- Image placeholders (`<div class="detail-banner">`) → replace with real images when available; leave cover_image_url null until then

**Prototype blog files → post slugs:**
- `blog/cbg-satat.html` → `cbg-satat-2-0-bankable`
- `blog/cbam-india.html` → `cbam-india-readiness`
- `blog/green-h2-tender.html` → `green-h2-seci-tender`
- `blog/discom-true-up.html` → `discom-true-up-explained`
- `blog/power-derivatives.html` → `electricity-derivatives-india`
- `blog/rooftop-pm-surya.html` → `pm-surya-ghar-rooftop`

**Prototype project files → slugs:**
- `projects/micro-wind.html` → `micro-wind-turbine-cost-benefit-2025`
- `projects/bess-ev.html` → `bess-smart-ev-charging-flexibility-2025`
- `projects/mppt.html` → `mppt-grey-wolf-optimization-pv-2020`

---

## Session Log

### Session 1 — 2026-05-24 — Public site scaffold

Scope: ship the full public portfolio (everything visible at `/`, `/projects/[slug]`, `/analysis/[slug]`) and stub the contact API. CMS / Supabase / Tiptap / Resend are deferred to Session 2.

Added:
- `package.json`, `tsconfig.json`, `next.config.js`, `postcss.config.js`, `tailwind.config.ts`, `.gitignore`, `README.md`
- `app/layout.tsx` — fonts (Instrument Serif, DM Sans, JetBrains Mono via `next/font/google` → CSS vars), inline-SVG favicon, Sonner toaster, `NavScroll` mount
- `app/globals.css` — ported verbatim from prototype `assets/styles.css`, with the design tokens kept exactly as specified
- `app/page.tsx` — composes the six public sections
- `app/projects/[slug]/page.tsx` and `app/analysis/[slug]/page.tsx` — SSG via `generateStaticParams`, prototype copy rendered into `.detail-body` via `dangerouslySetInnerHTML`
- `app/api/contact/route.ts` — POST stub: validates, logs, returns `{ok:true}` (Supabase persistence + Resend in Session 2)
- `components/sections/{Hero,Skills,Services,Projects,Analysis,Contact}.tsx`
- `components/ui/{Navbar,Footer,NavScroll}.tsx` — `NavScroll` is the only client component; it handles the scroll class, `IntersectionObserver` reveal, and `[data-year]` from the prototype's `script.js`
- `components/ContactForm.tsx` — client form, sonner toasts, POSTs to `/api/contact`
- `lib/content/projects.ts` and `lib/content/posts.ts` — typed seed arrays. Body copy lifted verbatim from each prototype detail HTML. The shape (slug/title/excerpt/contentHtml/cover) matches the planned Supabase schema, so Session 2 can swap fetching from the same template
- `public/headshot.png` — copied from prototype assets

Verified: `npm run build` succeeds, 14 routes prerendered (1 home, 6 analysis, 3 projects, 1 not-found, 1 dynamic API).

Out of scope (Session 2+): Supabase client + schema + RLS, `/admin` login & dashboard, Tiptap editor, image upload to Storage, Resend email, Vercel deploy. The contact API will be swapped to persist + email at that point.

Git: repo initialised at the workspace root, author `Deepti <deeptisemwal1235@gmail.com>` (repo-local config), single commit pushed to `main` on `https://github.com/deeptisemwal1235/portfolio-website.git`. The prototype bundle under `energy-policy-expert-portfolio-website/` is gitignored — it stays locally as visual reference but doesn't ship.
