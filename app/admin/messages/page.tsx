import AdminNav from "@/components/admin/AdminNav";
import MessagesList from "@/components/admin/MessagesList";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function MessagesPage() {
  const sb = createSupabaseServerClient();
  const { data, error } = await sb
    .from("contacts")
    .select("id, name, email, subject, message, read, created_at")
    .order("created_at", { ascending: false });

  const rows = (data ?? []) as {
    id: string;
    name: string;
    email: string;
    subject: string | null;
    message: string;
    read: boolean | null;
    created_at: string;
  }[];

  const unread = rows.filter((r) => !r.read).length;

  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Messages</h1>
        <div className="subtitle">
          {rows.length === 0
            ? "No contact-form submissions yet."
            : `${rows.length} total · ${unread} unread`}
        </div>
        {error && <p className="field-help" style={{ color: "var(--accent-deep)" }}>{error.message}</p>}
        <MessagesList rows={rows} />
      </main>
    </>
  );
}
