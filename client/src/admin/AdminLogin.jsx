import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import FormMessage from "../components/FormMessage";
import { Field } from "../pages/Login";

export default function AdminLogin() {
  const { user, login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const update = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  if (user?.role === "admin") return <Navigate to="/admin" replace />;

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const admin = await api.login(form);
      if (admin.role !== "admin") throw new Error("This account does not have admin access.");
      login(admin);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminAuthCard title="Admin sign in" subtitle="Use your administrator email and password to continue.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
        <Field label="Password" type="password" value={form.password} onChange={update("password")} required />
        <FormMessage error={error} />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold">
          Sign in to dashboard
        </button>
        <p className="text-center text-sm text-slate-400">
          Need an admin account? <Link to="/admin/register" className="text-indigo-300 hover:text-white">Create one</Link>
        </p>
      </form>
    </AdminAuthCard>
  );
}

export function AdminAuthCard({ title, subtitle, children }) {
  return (
    <section className="w-full max-w-md px-4">
      <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10 shadow-2xl shadow-indigo-950/20">
        <p className="text-xs uppercase tracking-[0.2em] text-indigo-300">Secure portal</p>
        <h1 className="mt-3 text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}
