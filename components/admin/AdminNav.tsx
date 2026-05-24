"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";

export default function AdminNav() {
  const router = useRouter();

  async function signOut() {
    const sb = createSupabaseBrowserClient();
    await sb.auth.signOut();
    router.push("/admin");
    router.refresh();
  }

  return (
    <nav className="admin-nav">
      <div className="brand">
        Deepti Semwal <small>CMS</small>
      </div>
      <div className="links">
        <Link href="/admin/dashboard">Dashboard</Link>
        <Link href="/" target="_blank">View site ↗</Link>
        <button className="signout" onClick={signOut}>Sign out</button>
      </div>
    </nav>
  );
}
