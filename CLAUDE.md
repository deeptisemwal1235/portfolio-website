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

### Session 2 — 2026-05-24 — Supabase CMS + admin + Resend + deploy guide

Scope: everything deferred from Session 1 — Supabase persistence, admin CMS, Tiptap editor, Resend wiring, and a step-by-step deploy guide. The public site now reads from Supabase instead of the static seed.

Added:
- `supabase/schema.sql` — projects, posts, contacts tables + `updated_at` trigger + RLS policies + Storage `portfolio-media` bucket policies. Run once via Supabase SQL editor.
- `lib/supabase/{client,server,middleware}.ts` — `@supabase/ssr` clients (browser, RSC, edge middleware)
- `lib/db.ts` — server-side fetchers (`getPublishedProjects`, `getProjectBySlug`, `getPublishedPosts`, `getPostBySlug`, `formatPostDate`) and cookie-free `listPublished*Slugs` helpers for `generateStaticParams` at build time
- `lib/svgMap.ts` — slug → SVG / thumb-class map so the three prototype projects keep their hand-drawn schematics; new admin-created projects fall back to a rotating gradient placeholder
- `lib/types.ts` — `ProjectRow`, `PostRow`
- `middleware.ts` + `lib/supabase/middleware.ts` — protects `/admin/*` (redirects unauthenticated → `/admin`, and already-signed-in → `/admin/dashboard`)
- Refactored `components/sections/Projects.tsx`, `components/sections/Analysis.tsx`, `app/projects/[slug]/page.tsx`, `app/analysis/[slug]/page.tsx` to fetch from Supabase. Pages use `revalidate = 60` for ISR.
- `app/admin/layout.tsx` + `app/admin/admin.css` — admin chrome (rose-clay palette, utilitarian tables / forms / Tiptap styles)
- `app/admin/page.tsx` — login form (`components/admin/LoginForm.tsx`, email/password via Supabase Auth)
- `app/admin/dashboard/page.tsx` — projects + posts tables with status pills + edit/delete (`components/admin/{AdminNav,DeleteRowButton}.tsx`)
- `app/admin/{projects,analysis}/new/page.tsx` and `[id]/page.tsx` — create/edit shared component `components/admin/ContentEditor.tsx` (title/slug auto, excerpt, category, tags, year or publish-date, read time, cover upload, published toggle)
- `components/admin/RichTextEditor.tsx` — Tiptap (StarterKit + Link + Image + Placeholder) with toolbar (H2/H3, bold/italic, lists, blockquote, HR, link, image upload)
- `components/admin/ImageUpload.tsx` + `lib/storage.ts` — uploads to Supabase Storage `portfolio-media` bucket, returns public URL
- Updated `app/api/contact/route.ts` — persists to `contacts` via service-role client, fires Resend email if `RESEND_API_KEY` + `CONTACT_TO_EMAIL` are set (failure to send email does not fail the save)
- `scripts/seed.ts` — one-shot idempotent seeder that upserts the prototype 3 projects + 6 posts; run `npx tsx scripts/seed.ts`
- `.env.example` — documents the five (or six) required env vars
- `SETUP.md` — end-to-end first-time setup: Supabase project / schema / storage / admin user / API keys / Resend / local dev / seed / Vercel deploy via GitHub

Out of scope (Session 3+): live deploy verification (waiting on user to create Supabase + Resend accounts and paste keys), favicon iteration, draft preview routes, project/post drag-to-reorder.

Verified: `npm run build` succeeds with placeholder env vars; 11 routes generated (4 admin, 2 dynamic detail, public home, login, not-found, api). Middleware compiled to 82.4 kB.

### Session 3 — 2026-05-24 — Supabase wired, seeded, live on Vercel

Scope: connect the Session 2 scaffold to a real Supabase project, seed it, and ship it to Vercel. No code changes — pure configuration + deploy.

Done:
- `.env.local` populated with Supabase project `brtymmjustqesyworyav`, the new-format API keys (`sb_publishable_*` as anon, `sb_secret_*` as service role), Resend key, and `CONTACT_TO_EMAIL`. File is gitignored.
- Ran `supabase/schema.sql` in the Supabase SQL editor → `projects`, `posts`, `contacts` tables + RLS + Storage bucket policies in place.
- Created Storage bucket `portfolio-media` (public read).
- Created admin auth user in Supabase Auth (email `deeptisemwal1235@gmail.com`).
- Ran `npx tsx scripts/seed.ts` → 3 projects + 6 posts upserted successfully.
- `npm run build` against live Supabase: 15 routes (public home + 3 project SSG + 6 analysis SSG + 6 admin + api + not-found), middleware 82.4 kB.
- Imported the GitHub repo into Vercel as `portfolio-website`, framework auto-detected Next.js, env vars pasted into Production + Preview + Development scope.
- **Live:** https://portfolio-website-xi-ivory.vercel.app
- Smoke-tested live: `/`, `/projects/micro-wind-turbine-cost-benefit-2025`, `/analysis/cbg-satat-2-0-bankable`, `/admin` all return 200.

---

## Backlog (deferred — pick up in future sessions)

Legend: **🔥** high-impact / do-soon · **📦** quality-of-life · **🌱** nice-to-have

### Operational
- 📦 Verify a custom Resend sending domain (currently emails go from the sandbox `onboarding@resend.dev`, which is rate-limited and may land in spam). Once verified, set `RESEND_FROM_EMAIL=Portfolio <contact@yourdomain.com>` in Vercel env.
- 🌱 Point a real custom domain at the Vercel project (e.g. `deeptisemwal.com`) and update the Supabase Site URL accordingly.

### UI / UX
- 📦 Admin-created projects with no cover image always get `thumb-a` gradient — rotate a/b/c by index instead.
- 📦 Footer is three-up center alignment — could tighten: name + tagline left, social right.
- 📦 No favicon variations (apple-touch-icon, maskable). Single SVG works but install on mobile looks generic.
- 📦 Footer mentions "Designed with care · Noida → World" — replace with a real tagline or remove.
- 🌱 Pause ticker on hover; respect `prefers-reduced-motion`.

### Features missing
- 📦 **Category filter** on analysis once post count > ~8.
- 📦 **Related-posts** widget on each article (by shared category/tags).
- 📦 **Share buttons** on articles (X, LinkedIn, copy-link).
- 📦 **"Last updated"** indicator on articles when `updated_at` > `published_at + N days`.
- 📦 **Newsletter signup** even if it's just a Supabase email-capture row.
- 📦 **Drag-reorder for posts** (currently only projects have it).
- 📦 **Image library / reuse** in admin — every upload creates a new file; can't pick a previously-uploaded image.
- 🌱 Site-wide search (FlexSearch in browser is enough for this content size).
- 🌱 Auto-save / draft in Tiptap editor — long writes risk loss on tab close.
- 🌱 Post revision history.
- 🌱 Bulk publish/delete in admin.
- 🌱 Soft-delete / trash with 30-day restore.

### SEO
- 📦 **Breadcrumb JSON-LD** on detail pages (`Home > Analysis > {title}`).
- 📦 **Canonical URLs** explicit on home + index pages (detail pages done in Session 6).
- 📦 Project pages use `Article` — `TechArticle` or `ScholarlyArticle` would be more precise.
- 📦 Declare `<link rel="alternate" hreflang>` even at single-locale.
- 🌱 Add `/feed.xml` (RSS/Atom) — energy analysts use feed readers.
- 🌱 Verify ownership in Google Search Console + Bing Webmaster + submit sitemap.

### AI / LLM optimization
- 📦 **Structured Service schema** for the 4 services — appears in AI assistant "what does she offer" answers.
- 📦 **FAQ block on `/about`** ("What does Deepti consult on?", "Where is she based?") with FAQPage JSON-LD. AI loves Q&A.
- 🌱 **Author bio block** on every article with structured Person data — helps AI cite you, not just the article.
- 🌱 Wrap dates in `<time datetime="...">` for richer parsing.

### Performance
- 📦 Pre-generate OG image at build instead of edge runtime.
- 📦 Add `@next/bundle-analyzer` so future bloat is visible.
- 🌱 PWA manifest + service worker for installable / offline-first.
- 🌱 Lazy-load `sonner` toaster import (saves ~10KB on first paint).
- 🌱 Preload the hero image with `<link rel="preload" as="image">` for absolute fastest LCP.

### Accessibility
- 📦 **Focus trap** inside open mobile drawer — tab currently leaks to elements behind the drawer.
- 📦 Respect `prefers-reduced-motion` — disable ticker, reveal transitions, hover translates.
- 📦 Color contrast: `--ink-3` (#806258) on `--bg-2` (#f0d2c0) is ~3.4:1 — below WCAG AA 4.5:1 for body. Bump `--ink-3` to ~#6a4f44.
- 📦 Add `aria-modal="true"` to mobile drawer when open.
- 🌱 Audit heading hierarchy (h1 → h2 → h3 with no skips).
- 🌱 Add `aria-describedby` from form fields to help/error text.

### Security
- 📦 **Origin check on `/api/contact`** — drop requests not from your own domain or empty Origin (kills most bots).
- 📦 Sanitize Tiptap HTML server-side (DOMPurify) — belt-and-suspenders against admin-side mistakes.
- 📦 Add a honeypot field to the contact form — kills 90% of bot submissions instantly.
- 🌱 Tighten CSP to nonce-based (drop `'unsafe-inline'` from script-src).
- 🌱 2FA on Supabase admin login.

### Reliability / observability
- 📦 **Global `error.tsx`** error boundary so a render failure in one section doesn't blow up the page.
- 📦 **Supabase nightly backups** — set up via Supabase dashboard → Database → Backups (free tier has 7-day point-in-time).
- 📦 **Sentry (or similar)** for runtime error tracking — free tier covers personal sites.
- 🌱 UptimeRobot or BetterStack ping every 5 min.

### Admin UX
- 📦 **`Cmd+S` shortcut** in editor to save.
- 📦 **Unsaved-changes warning** when navigating away from the editor.
- 📦 **Visible link** to draft preview directly from the editor (currently have to go back to dashboard).
- 📦 **Saving spinner** in the editor toolbar.
- 🌱 Mobile-friendly admin (currently desktop-only assumption).
- 🌱 "Duplicate post" button to clone a post as starter.

### Content (user tasks)
- 🔥 **Real About page content** — replace the four placeholder Tiptap sections at `/admin/settings → About`.
- 🔥 **At least one project cover image** uploaded — proves the upload flow works and looks great on social.
- 📦 **Testimonials section** with 2-3 quotes from clients/professors. Trust signal.
- 📦 Write the next 1–2 analysis posts through admin to validate the end-to-end author flow.

### Dev experience
- 🌱 Vitest + Playwright for at least one smoke test per public route.
- 🌱 Storybook for the section components.
- 🌱 Expand README with full "fork this and use it" walkthrough.

---

### Session 4 — 2026-05-24 — Polish + CMS expansion

Scope: clear every remaining backlog item from Session 3, then a polish round (404, JSON-LD, footer social).

Headshot + media
- New portrait `deepti-headshot.jpeg` uploaded to Supabase Storage at `portfolio-media/hero/deepti-headshot.jpeg`. Hero now reads from `NEXT_PUBLIC_HEADSHOT_URL` with the bucket URL as fallback. Old `public/headshot.png` deleted.
- `scripts/upload-headshot.ts` — one-off uploader using the service role key.

Social + SEO
- `app/opengraph-image.tsx` — Next ImageResponse renders a 1200x630 brand card (Rose Clay bg, DS mark, "Energy Policy & Regulations Expert" serif headline, capability strip).
- `app/layout.tsx` got `metadataBase`, full `openGraph` + `twitter` blocks. Twitter inherits the OG image via Next convention.
- `app/sitemap.ts` + `app/robots.ts` — auto-generated XML sitemap (home + every published project + post with real `updated_at` lastmod), robots blocks `/admin` and `/api`.
- `lib/jsonLd.tsx` — JSON-LD builders for WebSite, Person, Article (project detail), BlogPosting (analysis detail). Home + both detail templates emit structured data.

Mobile UX
- Hamburger nav: client `Navbar` with slide-down drawer rendered as a sibling of `<nav>` (the nav's `backdrop-filter` was containing-blocking `position: fixed` descendants — drawer was collapsing to ~76px).
- Mobile clamps: hero h1 → `clamp(58px, 19vw, 104px)`, gutter min → 32px, sections + detail pages tightened (drop-cap 4.4em → 3em, stat-row collapses to 1-col below 380px, banner 21:9 → 16:10 on phones).
- Fixed `.nav-inner { padding: 18px 0 }` silently zeroing the container's horizontal padding — split into `padding-top`/`padding-bottom`.

Reliability + analytics
- Rate-limit on `/api/contact`: in-memory sliding window keyed by `x-forwarded-for`, 3 req / 60s per IP, `429` + `Retry-After` header. Frontend surfaces the server message in the toast.
- `@vercel/analytics` + `@vercel/speed-insights` mounted in `layout.tsx`.
- `.github/workflows/build.yml` — `npm ci && npm run build` on every PR + push, against stub Supabase env so secrets aren't required for the check.

CMS
- View/Preview link per row in the admin dashboard.
- Tag autocomplete in `ContentEditor` (`<datalist>` + click-to-add chips) backed by `lib/db.listAllTags(table)`.
- Draft-preview routes `/admin/preview/projects/[slug]` and `/admin/preview/analysis/[slug]` — fetch via `get*BySlugForAdmin` (no `published` filter), render with detail templates plus a coloured banner ("DRAFT PREVIEW" or "Published").
- Drag-to-reorder for the projects grid: new `display_order` column (migration `0001_project_display_order.sql`), `/admin/projects/order` with native HTML5 drag handles + ↑/↓ buttons, `getPublishedProjects()` now sorts by `display_order` first.
- `site_settings` (key/value) table for editable site config. Footer renders LinkedIn / X / GitHub icons from this table; admin can edit at `/admin/settings`. Migration `0002_site_settings.sql` seeds with the supplied URLs.

Polish
- Branded 404 (`app/not-found.tsx`) in the Rose Clay palette with home + contact CTAs.

Verified: live at https://portfolio-website-xi-ivory.vercel.app — home, projects, analysis, admin, and `/sitemap.xml` + `/robots.txt` all return 200. Rate limiter test (5 POSTs from same forwarded IP) returns `200,200,200,429,429` with `Retry-After: 58`.

Apply once in Supabase SQL editor: `supabase/migrations/0001_project_display_order.sql` (done) and `supabase/migrations/0002_site_settings.sql` (done — footer social icons live).

### Session 5 — 2026-05-24 — Perf pass + About page + fully editable site

Scope: ship a real perf round, an About page, and turn every piece of copy on the public site into something editable from `/admin/settings`. Three migrations land in this session — all applied to production.

Perf
- `next.config.js`: `images.remotePatterns` whitelists `*.supabase.co/storage/v1/object/public/**`; `formats: ["image/avif","image/webp"]`. Vercel's image optimizer now rewrites every bucket URL.
- All raw `<img>` → `<Image fill>` with realistic `sizes` strings: hero portrait (priority, 320/60vw/420), project card thumbs (100vw/50vw/33vw), detail banners (priority, 100vw → 1240). Admin preview banners stay lazy.
- `<link rel="preconnect">` to the Supabase Storage origin in `<head>` so the TLS handshake starts before the hero image request.
- Verified: headshot served as 30 KB AVIF (was 99 KB JPEG) — roughly 70% smaller, no quality loss.

About page
- New `/about` route (server-rendered, ISR 60s). Hero with serif "Hi, I'm Deepti." + portrait, then four prose sections (intro, experience, education, certifications, skills) all driven by Tiptap-edited HTML in `site_settings`.
- "About" link added to public nav (desktop + mobile drawer) and to `app/sitemap.ts`.
- Placeholder content invites editing — real LinkedIn copy is pasted via `/admin/settings → About`.

Editable site
- `lib/settings.ts` now exports `SETTING_DEFAULTS` (full record of every key + its fallback). `getSettings()` always returns the full `Settings` object — missing rows fall back to defaults so pages never break mid-edit or before a migration runs.
- 20+ keys total: 3 social, 10 hero (eyebrow, bio, 3 pills, image URL, 2 CTA label/href pairs), 4 contact (email, location, availability, response time), 5 about (intro/experience/education/certifications/skills as HTML).
- `Hero.tsx` and `Contact.tsx` refactored as `async` server components reading from settings. The brand headline ("Energy Policy & Regulations Expert.") stays hardcoded — it's identity, not copy.
- `/admin/settings` revamped into a 5-tab editor (Site / Hero image / Contact / About / Social) backed by `components/admin/SettingsForm.tsx`. Tiptap is reused for the About sections; `ImageUpload` is reused for the hero image (uploads land in the `portfolio-media` bucket).
- One "Save all settings" button upserts every key in a single request.

Polish
- Hero grid was `align-items: end` (from the prototype) — pushed the text column to align with the bottom of the taller portrait column, leaving a big empty band above the eyebrow on desktop. Switched to `align-items: start` so both columns flow from the top.

Migrations applied (all in Supabase SQL editor, all `on conflict do nothing` so re-running is a no-op):
- `0001_project_display_order.sql` — projects.display_order column for drag-reorder
- `0002_site_settings.sql` — site_settings table + initial social seeds
- `0003_settings_hero_about.sql` — hero / contact / about default seeds

Live and verified: https://portfolio-website-xi-ivory.vercel.app/ and /about both 200 with content fed from `site_settings`.

### Session 6 — 2026-05-25 — 11 🔥 backlog items + admin loading UX

Scope: cleared every engineering 🔥 backlog item in one stretch. 9 logical commits, three migrations applied.

SEO + AI + a11y (A)
- `Person` JSON-LD now ships `sameAs` (LinkedIn + X + GitHub from settings) and `knowsAbout` (6 core expertise areas). Article schema's author reuses the enriched Person.
- `/llms.txt` route emits the llmstxt.org markdown manifest dynamically — every project + post auto-listed.
- Skip-to-content link in `<body>`, lands at `<main id="main">` on the home page.
- `<html lang="en">` → `"en-IN"`.
- Article + project detail metadata now emits `article:published_time`, `article:modified_time`, `article:author`, `article:section`, `article:tag` OG tags + `<meta name="author">` + canonical URL.

Per-slug OG (B)
- `lib/og.tsx` shared builder (Rose Clay flat bg, DS mark, § CATEGORY eyebrow, big serif title that auto-scales 88px → 76px → 64px for long titles).
- `app/analysis/[slug]/opengraph-image.tsx` + `app/projects/[slug]/opengraph-image.tsx`. Shared cards on LinkedIn/X/WhatsApp now show the actual title + category.

Reading time (C)
- `lib/utils.calcReadTime(html)` — strip tags, 220 wpm, "N min read".
- `ContentEditor.save()` fills `read_time` automatically when blank; "Auto" button next to the field recomputes from current content.

`/admin/messages` (D)
- New route lists every contacts row with name/email/subject/date and unread accent. Expand to read; expansion auto-marks read.
- All/Unread filter tabs. Per-row: reply by email (mailto), toggle read, delete (confirm gate).
- Migration `0004_contacts_read_flag.sql` adds `contacts.read` + RLS update/delete policies.

Index pages (E)
- `/projects` lists every published project in the asymmetric grid.
- `/analysis` lists every published post; groups by category when count > 6.
- Home Projects + Analysis sections show top 3/6 with "See all" CTA when more exists.
- `sitemap.xml` includes both index routes.

Admin loading UX (F)
- `nextjs-toploader` mounted in `app/layout.tsx` — every route change shows a 2px terracotta progress bar at the top. No more silent clicks.
- `ContentEditor` slug now auto-tracks the title field while typing. Editing the slug directly flips `slugAuto` off so manual edits aren't clobbered.

Editable hero + ticker + section heads (G)
- New settings: `hero_headline_html`, `ticker_words`, plus `section_{skills,services,projects,analysis,contact}_{eyebrow,title_html,lede}` (15 keys).
- Hero, Skills, Services, Projects, Analysis, Contact all read from settings.
- `/admin/settings` adds "Hero" and "Section heads" tabs.
- Migration `0005_settings_hero_sections.sql`.

Editable skills + services cards (H)
- 20 new keys: `skill_{1..6}_{title,desc}` + `service_{1..4}_{title,desc}`.
- Glyphs stay hardcoded by index (brand iconography).
- `/admin/settings` adds "Skills (6)" and "Services (4)" tabs.
- Migration `0006_settings_skills_services.sql`.

Security headers (I)
- `next.config.js` `headers()` block: CSP (with `'unsafe-inline'` for now — Next hydration + Tiptap + toploader all need it), `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` denying camera/mic/geo/FLoC, `X-Content-Type-Options: nosniff`. Tightening to nonce-based CSP is a future hardening step.

Migrations applied in production:
- `0004_contacts_read_flag.sql` ✅
- `0005_settings_hero_sections.sql` ✅
- `0006_settings_skills_services.sql` ✅

`/admin/settings` now has 7 tabs covering ~50 editable keys. Every visible word on the home page (except brand iconography) can be edited without touching code.

### Session 7 — 2026-05-25 — Top-5 📦 polish

Scope: knock out the highest-value items remaining in the 📦 tier. Three commits, no migrations.

Reliability + a11y (J)
- `app/error.tsx` — Next renders this when any uncaught error fires below the root layout. Branded Rose Clay page with "Try again" (`reset()`) + Home CTAs and an `error.digest` reference for log correlation.
- `--ink-3` colour token: `#806258` → `#6a4f44`. The old value was ~3.4:1 contrast against `--bg-2`, below WCAG AA's 4.5:1 floor for body text. The new value clears AA on all three light backgrounds. Eyebrows, meta labels, pills, and section nums all read noticeably darker.

Security + SEO (K)
- Honeypot on the contact form. Off-screen "Website (leave blank)" input (`aria-hidden`, `tabIndex={-1}`, autoComplete off). Real visitors never fill it; spam bots fill every field they see. `/api/contact` returns `{ok:true}` when `website` is non-empty — doesn't tell the bot we caught them, doesn't hit Supabase or Resend. Logs the IP + truncated value for monitoring.
- `lib/jsonLd.breadcrumbJsonLd()` builder. Both detail pages now emit a second `<script type="application/ld+json">` with `BreadcrumbList` (`Home > {Projects|Analysis} > {title}`). Google rich-results can render the trail under each search snippet instead of the raw URL.

Editor UX (L)
- ContentEditor tracks dirty state by diffing `form` against a `savedRef` snapshot. Three behaviours hang off that:
  - `Cmd+S` / `Ctrl+S` triggers `save()` from anywhere on the page (window listener, preventDefault swallows the browser's "save page" dialog). Works even while Tiptap has focus.
  - `beforeunload` fires the browser's native "leave with unsaved changes?" prompt when navigating away.
  - Mono pill next to Save reads `● Unsaved changes — ⌘S to save` while dirty, `Saved` after success (edit mode only), `Saving…` during the transition.

Backlog now at 53 items: 0 🔥 engineering items left, 2 🔥 content tasks (real About copy + a project cover image — both need the user, not code). The remaining 51 items are 📦 polish / hardening + 🌱 nice-to-haves.

### Session 8 — 2026-05-25 — 10-item backlog sweep

Scope: ten 📦 items in one pass — security hardening, SEO, a11y, perf, and a couple of editorial features. One commit (`9deeffa`), one migration.

Security
- `lib/sanitize.ts` — `isomorphic-dompurify` whitelist sanitizer. Allowed tags cover Tiptap output + figure / table; FORBID_ATTR strips inline event handlers and `style`. Called from `ContentEditor.save()` for both projects + posts, and from `SettingsForm.save()` for every `*_html` key. Belt-and-suspenders against an admin pasting markup with onclick / script.
- `/api/contact` `originAllowed()`: requires an Origin header, rejects when the host isn't `req.host` or `NEXT_PUBLIC_SITE_URL`'s host. Returns 403 with `{ok:false, error:"Bad request"}`. Bots that POST without an Origin header are dropped before rate limiter, Supabase, or Resend get touched.

Features
- `components/AnalysisFilter.tsx` — client tabs on `/analysis` with `All` + one chip per category (with per-category count). Replaces the old category-grouped layout from Session 6.
- `lib/db.ts:getRelatedPosts()` — scores siblings by (tagOverlap * 2 + categoryMatch). Top 3 render as a `related-posts` block on each `/analysis/[slug]`.
- `components/ShareButtons.tsx` — X / LinkedIn / Copy-link row under each article body. Copy uses `navigator.clipboard` with sonner toast confirmation.

SEO
- `app/feed.xml/route.ts` — valid RSS 2.0 with atom self-link, every published post, 10-min revalidate + 1-day SWR cache header. `<link rel="alternate" type="application/rss+xml">` added to `<head>` so feed readers auto-discover.
- FAQ on `/about` + `FAQPage` JSON-LD via `lib/jsonLd.faqJsonLd()`. 5 editable Q&A pairs (`faq_1_q..5_a`) seeded with sensible defaults that AI assistants will surface when asked "what does Deepti consult on / where is she based / etc."

Perf
- Removed `runtime = "edge"` from all three OG image routes (`/opengraph-image`, `/analysis/[slug]/opengraph-image`, `/projects/[slug]/opengraph-image`). Added `generateStaticParams` to the two per-slug ones — they now build as static assets on the CDN instead of an edge invocation per share. Build output confirms ● for every OG variant (10 cards total).

A11y
- `prefers-reduced-motion` media query in `globals.css` — neutralises `*` animations + transitions, pins ticker, locks `.reveal` to its final state.
- `Navbar` mobile drawer: focus trap (Tab/Shift+Tab cycles within the drawer), focus moves into the drawer on open and back to the burger on Escape, `aria-modal="true"` + `aria-label` set when open.

Admin
- New `FAQ` tab in `/admin/settings` (10 fields). New `faq_*` keys in `SETTING_DEFAULTS` so the page never breaks pre-migration.
- New `.filter-chips`, `.share-row`, `.share-btn`, `.related-posts`, `.faq-section`, `.faq-item` CSS in `globals.css`.

Verified: `npm run build` → 30 routes, 14 SSG (including 10 OG cards), middleware 82.4 kB. Live on `9deeffa`.

Migration applied in production:
- `0007_settings_faq.sql` ✅

### Session 9 — 2026-05-25 — 9 more backlog items (skipped newsletter)

Scope: deeper round of polish + a few new features. One commit (`8b23c05`), two migrations.

Reliability
- `@sentry/nextjs` wired with no-op-without-DSN init for client / server / edge runtimes (`sentry.{client,server,edge}.config.ts` + `instrumentation.ts` + a tiny `components/SentryInit.tsx` for client bootstrap from the root layout). When `NEXT_PUBLIC_SENTRY_DSN` and/or `SENTRY_DSN` are unset, every init is a no-op and the SDK never enters the first-load bundle (dynamic import in `SentryInit` is the gate). `app/error.tsx` now dynamic-imports `@sentry/nextjs` and `captureException`s the boundary's error so visible failures land in the dashboard. CSP `connect-src` extended to `*.sentry.io / *.ingest.sentry.io / *.ingest.us.sentry.io / *.ingest.de.sentry.io`.

Admin UX
- `ImageUpload` got a "Browse uploads" toggle that lazy-lists the `portfolio-media` bucket (newest 100, image MIME filter) and renders a clickable thumbnail grid. Stops bucket bloat from re-uploading the same hero / cover. CSS in `app/admin/admin.css` (`.image-library*`).
- `ContentEditor` autosaves the working form to `localStorage` 1s after every change while dirty. On mount, if a fresher draft is found, a `restore-banner` offers Restore / Discard. Successful server save clears the draft key. Keyed by `editor-draft:${kind}:${id|new}`.
- Drag-reorder extended to analysis: `OrderEditor` parameterised by `table` + a `meta` column (used for category since posts don't have year); new route `app/admin/analysis/order`; dashboard's Analysis card gets the same "Reorder" link as projects.
- `posts.display_order` column + index migration `0008_posts_display_order.sql` (mirror of `0001`). `lib/db.getPublishedPosts()` now orders by `display_order` first.

Editorial
- New `components/sections/Testimonials.tsx` slots between Services and Projects on home. 3 quote slots, all editable from a new "Testimonials" tab in `/admin/settings`. Section auto-hides when every slot is blank. CSS includes responsive count-1 / 2 / 3 grids. Migration `0009_settings_testimonials.sql` seeds the keys (all empty). Defaults in `SETTING_DEFAULTS` so the homepage never breaks pre-migration.
- `components/AuthorBio.tsx` — 120px circular portrait + name + bio paragraph + 3 links (About / Contact / LinkedIn from settings). Rendered under every article and project detail page, after the share row. Reinforces the existing Person JSON-LD for AI-citation purposes.

SEO / a11y
- `<time datetime="…">` wrapping every formatted date and project year across detail pages, card grids, `AnalysisFilter`, and the related-posts block. Tiny diff; every parser (Google, AI assistants, feed readers) now sees structured timestamps.
- `--ink-3` colour token: `#6a4f44` → `#5d4338` (second bump in two sessions). Cleared AA at 10px mono against both `--paper` and `--bg-2`. Contact form label alpha bumped 0.55 → 0.78, placeholder 0.32 → 0.55 to clear AA against the dark contact section background.

Perf / dev experience
- `@next/bundle-analyzer` wired behind `ANALYZE=true`. `npm run analyze` dumps the report to `.next/analyze/`. Wrapped via `withBundleAnalyzer(nextConfig)`; no-op otherwise.

Skipped (per user): newsletter signup. Will pick up later when there's something to email.

Verified: `npm run build` → all routes green, 14 SSG (including the 10 per-slug OG cards from Session 8), middleware 80.7 kB. Tested locally that Sentry is no-op without DSN.

Migrations to apply:
- `0008_posts_display_order.sql`
- `0009_settings_testimonials.sql`

Backlog: still 51-ish items, all 📦 / 🌱. Biggest remaining levers: bulk publish/delete in admin, site-wide search (FlexSearch), post revision history, soft-delete / trash, mobile-friendly admin, project/post revision history, Storybook, Vitest/Playwright smoke tests.
