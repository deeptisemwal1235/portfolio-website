import AdminNav from "@/components/admin/AdminNav";
import OrderEditor from "@/components/admin/OrderEditor";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function OrderProjectsPage() {
  const sb = createSupabaseServerClient();
  const { data } = await sb
    .from("projects")
    .select("id, title, year, published, display_order")
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("created_at", { ascending: true });

  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Reorder projects</h1>
        <OrderEditor rows={(data ?? []).map((r) => ({ id: r.id, title: r.title, year: r.year, published: r.published }))} />
      </main>
    </>
  );
}
