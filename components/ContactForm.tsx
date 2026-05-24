"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    if (!data.name || !data.email || !data.message) {
      setStatus({ text: "✕ Please fill in all required fields", ok: false });
      toast.error("Please fill in all required fields");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus({ text: "✓ Message sent — Deepti will reply within 48 hrs", ok: true });
      toast.success("Message sent — reply within 48 hrs");
      form.reset();
      setTimeout(() => setStatus(null), 6000);
    } catch {
      setStatus({ text: "✕ Could not send — please try again", ok: false });
      toast.error("Could not send — please try again");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="contact-form" id="contact-form" noValidate onSubmit={onSubmit}>
      <div className="field">
        <label htmlFor="f-name">Name</label>
        <input id="f-name" name="name" type="text" placeholder="Your full name" required />
      </div>
      <div className="field">
        <label htmlFor="f-email">Email</label>
        <input id="f-email" name="email" type="email" placeholder="you@company.com" required />
      </div>
      <div className="field full">
        <label htmlFor="f-subject">Subject</label>
        <input id="f-subject" name="subject" type="text" placeholder="What is this about?" />
      </div>
      <div className="field full">
        <label htmlFor="f-message">Message</label>
        <textarea
          id="f-message"
          name="message"
          rows={5}
          placeholder="Tell me a little about your project, timeline, and what you'd like to discuss…"
          required
        />
      </div>
      <div className="form-actions">
        <span className={`form-status${status?.ok ? " ok" : ""}`} role="status" aria-live="polite">
          {status?.text ?? ""}
        </span>
        <button className="btn-submit" type="submit" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"} <span className="arr">↗</span>
        </button>
      </div>
    </form>
  );
}
