# Setup — Supabase + Resend + Vercel

End-to-end first-time setup. Takes ~20 minutes.

## 1. Supabase project

1. https://supabase.com → Sign up / log in → **New project**
2. Name: `deepti-portfolio` · Region: closest to Noida (e.g. ap-south-1 Mumbai)
3. Save the database password somewhere (you won't need it for app code, but Supabase shows it once)
4. Wait ~2 minutes for the project to provision

## 2. Database schema + RLS

1. Project dashboard → **SQL Editor** → **New query**
2. Open `supabase/schema.sql` from this repo, paste the whole thing, **Run**
3. You should see "Success. No rows returned."

## 3. Storage bucket

1. Dashboard → **Storage** → **New bucket**
2. Name: `portfolio-media` · **Public bucket: ON** · Create
3. The bucket policies were already created by `schema.sql` — public read, authenticated write.

## 4. Admin user

1. Dashboard → **Authentication → Users → Add user → Create new user**
2. Email: `deeptisemwal1235@gmail.com` · choose a strong password · **Auto Confirm User: ON**
3. This is the only login for `/admin`. There is no public sign-up route.

## 5. Get the API keys

1. Dashboard → **Project Settings → Data API**
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role secret** key → `SUPABASE_SERVICE_ROLE_KEY` (never expose this in the browser)

## 6. Resend (contact form email)

1. https://resend.com → Sign up
2. **API Keys → Create API Key** · copy it → `RESEND_API_KEY`
3. The free tier sends from `onboarding@resend.dev` immediately — that's enough to start.
4. If you want emails from your own domain, **Domains → Add Domain** and add the DNS records they show.

## 7. Local `.env.local`

```bash
cp .env.example .env.local
# then edit .env.local with the values from steps 5 and 6
```

## 8. Seed the database

Run once to import the 3 projects + 6 blog posts from the prototype:

```bash
npx tsx scripts/seed.ts
```

You should see `✓ project …` and `✓ post …` lines, ending with `Seed complete.`

## 9. Run locally

```bash
npm run dev
# http://localhost:3000              → public site
# http://localhost:3000/admin        → login (use the Supabase admin user)
# http://localhost:3000/admin/dashboard → CMS (after login)
```

Test the contact form on `/#contact` — it should land in the `contacts` table and (if Resend is configured) hit your inbox.

## 10. Deploy on Vercel (via GitHub)

1. https://vercel.com → Sign up with GitHub
2. **Add New → Project** → import `deeptisemwal1235/portfolio-website`
3. Framework preset: **Next.js** (auto-detected)
4. **Environment Variables** — add all 5 (or 6) keys from `.env.local`. Apply to *Production*, *Preview*, *Development*.
5. **Deploy** — first build takes ~2 minutes
6. After deploy: the URL is `https://<project>.vercel.app`. The CMS lives at `/admin`.
7. Every `git push` to `main` triggers a new deploy automatically.

### Optional: custom domain

Vercel → Project → **Settings → Domains** → add your domain → follow the DNS instructions.

---

## Troubleshooting

- **Admin login redirects back to login** — the user wasn't created in Supabase Auth (step 4), or "Auto Confirm User" was off so the email isn't verified.
- **Contact form 500** — `SUPABASE_SERVICE_ROLE_KEY` missing/wrong, or RLS policies didn't apply (re-run the contacts section of `schema.sql`).
- **Image upload fails** — the `portfolio-media` bucket doesn't exist or isn't public. Re-check step 3.
- **No emails from contact form** — `RESEND_API_KEY` missing, or Resend's free tier doesn't allow sending to your address yet (verify your sending domain or use the default `onboarding@resend.dev`).
