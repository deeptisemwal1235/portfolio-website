import AdminNav from "@/components/admin/AdminNav";
import OrderEditor from "@/components/admin/OrderEditor";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function OrderPostsPage() {
  const sb = createSupabaseServerClient();
  const { data } = await sb
    .from("posts")
    .select("id, title, category, published_at, published, display_order")
    .order("display_order", { ascending: true, nullsFirst: false })
    .order("published_at", { ascending: false });

  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Reorder analysis</h1>
        <OrderEditor
          table="posts"
          rows={(data ?? []).map((r) => ({
            id: r.id,
            title: r.title,
            meta: r.category,
            published: r.published,
          }))}
        />
      </main>
    </>
  );
}
