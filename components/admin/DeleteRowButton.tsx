"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function DeleteRowButton({ table, id, label }: { table: "projects" | "posts"; id: string; label: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();

  function onClick() {
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;
    start(async () => {
      const sb = createSupabaseBrowserClient();
      const { error } = await sb.from(table).delete().eq("id", id);
      if (error) {
        toast.error(error.message);
        return;
      }
      toast.success("Deleted");
      router.refresh();
    });
  }

  return (
    <button className="btn-link danger" onClick={onClick} disabled={pending}>
      {pending ? "Deleting…" : "Delete"}
    </button>
  );
}
