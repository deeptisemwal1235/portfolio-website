"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

type Row = { id: string; title: string; year?: number | null; meta?: string | null; published: boolean };

export default function OrderEditor({
  rows: initial,
  table = "projects",
  metaLabel,
}: {
  rows: Row[];
  table?: "projects" | "posts";
  metaLabel?: string;
}) {
  const router = useRouter();
  const [rows, setRows] = useState(initial);
  const [pending, start] = useTransition();
  const [draggingId, setDraggingId] = useState<string | null>(null);

  function move(id: string, delta: number) {
    setRows((prev) => {
      const i = prev.findIndex((r) => r.id === id);
      const j = i + delta;
      if (i < 0 || j < 0 || j >= prev.length) return prev;
      const next = [...prev];
      [next[i], next[j]] = [next[j]!, next[i]!];
      return next;
    });
  }

  function onDragStart(id: string) {
    return (e: React.DragEvent) => {
      setDraggingId(id);
      e.dataTransfer.effectAllowed = "move";
    };
  }
  function onDragOver(e: React.DragEvent) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  }
  function onDrop(targetId: string) {
    return (e: React.DragEvent) => {
      e.preventDefault();
      if (!draggingId || draggingId === targetId) return;
      setRows((prev) => {
        const from = prev.findIndex((r) => r.id === draggingId);
        const to = prev.findIndex((r) => r.id === targetId);
        if (from < 0 || to < 0) return prev;
        const next = [...prev];
        const [picked] = next.splice(from, 1);
        next.splice(to, 0, picked!);
        return next;
      });
      setDraggingId(null);
    };
  }

  async function save() {
    start(async () => {
      const sb = createSupabaseBrowserClient();
      // Sequential updates — fine for ~10 items, avoids needing a Postgres
      // function. Each call hits RLS as the authenticated admin user.
      for (let i = 0; i < rows.length; i++) {
        const { error } = await sb
          .from(table)
          .update({ display_order: i + 1 })
          .eq("id", rows[i]!.id);
        if (error) {
          toast.error(`Save failed at "${rows[i]!.title}": ${error.message}`);
          return;
        }
      }
      toast.success("Order saved");
      router.push("/admin/dashboard");
      router.refresh();
    });
  }

  return (
    <div>
      <p className="subtitle" style={{ marginBottom: 18 }}>
        Drag rows to reorder, or use ↑ / ↓. This is the order the public projects
        grid uses (top → bottom maps to the asymmetric 3-card layout).
      </p>
      <ul className="order-list">
        {rows.map((r, i) => (
          <li
            key={r.id}
            className={`order-row${draggingId === r.id ? " dragging" : ""}`}
            draggable
            onDragStart={onDragStart(r.id)}
            onDragOver={onDragOver}
            onDrop={onDrop(r.id)}
            onDragEnd={() => setDraggingId(null)}
          >
            <span className="drag-handle" aria-hidden="true">⋮⋮</span>
            <span className="order-num">{i + 1}</span>
            <span className="order-title">{r.title}</span>
            <span className="order-year">{r.year ?? r.meta ?? "—"}</span>
            <span className={`status-pill ${r.published ? "published" : "draft"}`}>
              {r.published ? "Published" : "Draft"}
            </span>
            <span className="order-arrows">
              <button type="button" className="btn-link" onClick={() => move(r.id, -1)} disabled={i === 0}>↑</button>
              <button type="button" className="btn-link" onClick={() => move(r.id, +1)} disabled={i === rows.length - 1}>↓</button>
            </span>
          </li>
        ))}
      </ul>
      <div className="actions" style={{ marginTop: 24 }}>
        <button type="button" className="btn-primary-cta" onClick={save} disabled={pending}>
          {pending ? "Saving…" : "Save order"}
        </button>
        <button type="button" className="btn-link" onClick={() => router.push("/admin/dashboard")}>
          Cancel
        </button>
      </div>
    </div>
  );
}
