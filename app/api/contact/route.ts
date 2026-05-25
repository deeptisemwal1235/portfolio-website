import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

/**
 * In-memory sliding-window rate limit, keyed by client IP.
 *
 * Vercel's Node serverless functions can run multiple warm instances, so a
 * determined attacker could route around this by getting cold dispatch on
 * different instances. But in practice an abusive script hammering the
 * endpoint hits the same warm instance, and this is enough to protect the
 * Supabase + Resend free-tier quotas. No new dependency, no Redis.
 *
 * Limit: 3 submissions per 60s per IP.
 */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 3;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): { limited: boolean; retryAfterSec: number } {
  const now = Date.now();
  const cutoff = now - WINDOW_MS;
  const recent = (hits.get(ip) ?? []).filter((t) => t > cutoff);
  if (recent.length >= MAX_PER_WINDOW) {
    const oldest = recent[0];
    return { limited: true, retryAfterSec: Math.max(1, Math.ceil((oldest + WINDOW_MS - now) / 1000)) };
  }
  recent.push(now);
  hits.set(ip, recent);
  // Opportunistic cleanup so the map can't grow forever on a long-lived instance.
  if (hits.size > 5000) {
    for (const [key, ts] of hits) {
      const live = ts.filter((t) => t > cutoff);
      if (live.length === 0) hits.delete(key);
      else hits.set(key, live);
    }
  }
  return { limited: false, retryAfterSec: 0 };
}

function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

function originAllowed(req: Request): boolean {
  const origin = req.headers.get("origin");
  // Same-origin form posts from the browser always send an Origin header.
  // Drop everything that doesn't.
  if (!origin) return false;
  let host: string;
  try { host = new URL(origin).host; } catch { return false; }
  const reqHost = req.headers.get("host") ?? "";
  if (host === reqHost) return true;
  // Allow explicitly configured production origin too (for previews proxying
  // to a different host in front of the same deployment).
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  if (siteUrl) {
    try { if (new URL(siteUrl).host === host) return true; } catch {}
  }
  // Allow *.vercel.app preview deployments hitting their own host.
  if (host.endsWith(".vercel.app") && host === reqHost) return true;
  return false;
}

export async function POST(req: Request) {
  if (!originAllowed(req)) {
    console.warn(`[contact] rejected cross-origin/no-origin post — origin=${req.headers.get("origin") ?? "(none)"}`);
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 403 });
  }
  const ip = clientIp(req);
  const rl = rateLimited(ip);
  if (rl.limited) {
    console.warn(`[contact] rate-limited ip=${ip} retryAfter=${rl.retryAfterSec}s`);
    return NextResponse.json(
      { ok: false, error: "Too many requests — please wait a minute and try again." },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } }
    );
  }

  const body = await req.json().catch(() => null);

  // Honeypot: humans never fill this hidden input. Bots usually do.
  // Return 200 so the bot thinks it worked (don't tip them off that we
  // discarded it). Skip Supabase + Resend entirely.
  if (body && typeof body.website === "string" && body.website.trim().length > 0) {
    console.warn(`[contact] honeypot tripped ip=${ip} website=${body.website.slice(0, 80)}`);
    return NextResponse.json({ ok: true });
  }

  if (!body?.name || !body?.email || !body?.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }

  const payload = {
    name: String(body.name).slice(0, 200),
    email: String(body.email).slice(0, 200),
    subject: body.subject ? String(body.subject).slice(0, 200) : null,
    message: String(body.message).slice(0, 5000),
  };

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (url && serviceKey) {
    const sb = createClient(url, serviceKey, { auth: { persistSession: false } });
    const { error } = await sb.from("contacts").insert(payload);
    if (error) {
      console.error("[contact] insert:", error.message);
      return NextResponse.json({ ok: false, error: "Could not save message" }, { status: 500 });
    }
  } else {
    console.warn("[contact] Supabase env missing — message not persisted:", payload);
  }

  const resendKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (resendKey && to) {
    try {
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
        to,
        replyTo: payload.email,
        subject: `New portfolio enquiry: ${payload.subject || "(no subject)"}`,
        text: `From: ${payload.name} <${payload.email}>\nSubject: ${payload.subject ?? "(none)"}\n\n${payload.message}`,
      });
    } catch (e) {
      console.error("[contact] resend:", e);
      // don't fail the request — the message is already saved
    }
  }

  return NextResponse.json({ ok: true });
}
