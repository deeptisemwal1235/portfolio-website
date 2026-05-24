import LoginForm from "@/components/admin/LoginForm";

export default function AdminLoginPage() {
  return (
    <div className="login-shell">
      <div className="login-card">
        <h1>Admin</h1>
        <div className="subtitle">Deepti Semwal · Portfolio CMS</div>
        <LoginForm />
      </div>
    </div>
  );
}
