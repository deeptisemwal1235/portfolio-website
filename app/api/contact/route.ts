import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
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
