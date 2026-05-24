import AdminNav from "@/components/admin/AdminNav";
import SettingsForm from "@/components/admin/SettingsForm";
import { getSettings } from "@/lib/settings";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <>
      <AdminNav />
      <main className="admin-main">
        <h1>Site settings</h1>
        <div className="subtitle">Footer social links. Leave blank to hide an icon.</div>
        <SettingsForm initial={settings} />
      </main>
    </>
  );
}
