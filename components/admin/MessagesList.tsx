"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Row = {
  id: string;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  read: boolean | null;
  created_at: string;
};

export default function MessagesList({ rows: initial }: { rows: Row[] }) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [openId, setOpenId] = useState<string | null>(null);
  const [pending, start] = useTransition();
  const [filter, setFilter] = useState<"all" | "unread">("all");

  function fmt(iso: string) {
    return new Date(iso).toLocaleString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
      hour: "2-digit", minute: "2-digit",
    });
  }

  async function toggleRead(row: Row, next: boolean) {
    const sb = createSupabaseBrowserClient();
    const { error } = await sb.from("contacts").update({ read: next }).eq("id", row.id);
    if (error) { toast.error(error.message); return; }
    setRows((r) => r.map((x) => (x.id === row.id ? { ...x, read: next } : x)));
  }

  async function remove(row: Row) {
    if (!confirm(`Delete message from ${row.name}? This can't be undone.`)) return;
    start(async () => {
      const sb = createSupabaseBrowserClient();
      const { error } = await sb.from("contacts").delete().eq("id", row.id);
      if (error) { toast.error(error.message); return; }
      setRows((r) => r.filter((x) => x.id !== row.id));
      toast.success("Deleted");
      router.refresh();
    });
  }

  function open(row: Row) {
    setOpenId((cur) => (cur === row.id ? null : row.id));
    if (!row.read) toggleRead(row, true);
  }

  const visible = filter === "unread" ? rows.filter((r) => !r.read) : rows;

  if (rows.length === 0) return null;

  return (
    <div>
      <div className="settings-tabs" style={{ marginBottom: 12 }}>
        <button type="button" className={`settings-tab${filter === "all" ? " active" : ""}`} onClick={() => setFilter("all")}>All</button>
        <button type="button" className={`settings-tab${filter === "unread" ? " active" : ""}`} onClick={() => setFilter("unread")}>Unread</button>
      </div>

      <ul className="messages-list">
        {visible.map((row) => {
          const isOpen = openId === row.id;
          return (
            <li key={row.id} className={`message-row${row.read ? "" : " unread"}${isOpen ? " open" : ""}`}>
              <button type="button" className="message-head" onClick={() => open(row)}>
                <span className="message-from">
                  {!row.read && <span className="unread-dot" aria-label="unread" />}
                  <strong>{row.name}</strong> <span className="message-email">&lt;{row.email}&gt;</span>
                </span>
                <span className="message-subject">{row.subject || "(no subject)"}</span>
                <span className="message-date">{fmt(row.created_at)}</span>
              </button>
              {isOpen && (
                <div className="message-body">
                  <pre>{row.message}</pre>
                  <div className="message-actions">
                    <a className="btn-link" href={`mailto:${row.email}?subject=Re: ${encodeURIComponent(row.subject || "your message")}`}>Reply by email ↗</a>
                    <button type="button" className="btn-link" onClick={() => toggleRead(row, !row.read)}>
                      {row.read ? "Mark unread" : "Mark read"}
                    </button>
                    <button type="button" className="btn-link danger" onClick={() => remove(row)} disabled={pending}>
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
