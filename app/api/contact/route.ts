import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || !body.name || !body.email || !body.message) {
    return NextResponse.json({ ok: false, error: "Missing required fields" }, { status: 400 });
  }
  // Session 2: persist to Supabase + send Resend notification.
  console.log("[contact] submission:", {
    name: body.name,
    email: body.email,
    subject: body.subject ?? "",
    message: body.message,
    at: new Date().toISOString(),
  });
  return NextResponse.json({ ok: true });
}
