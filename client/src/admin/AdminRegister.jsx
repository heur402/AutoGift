import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import FormMessage from "../components/FormMessage";
import { AdminAuthCard } from "./AdminLogin";
import { Field } from "../pages/Login";

export default function AdminRegister() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", secretKey: "" });
  const [error, setError] = useState("");
  const update = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const admin = await api.registerAdmin(form);
      login(admin);
      navigate("/admin");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminAuthCard title="Create admin account" subtitle="Create a protected administrator account using the server secret key.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name" value={form.name} onChange={update("name")} required />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
        <Field label="Phone number" type="tel" value={form.phone} onChange={update("phone")} required />
        <Field label="Password" type="password" value={form.password} onChange={update("password")} required />
        <Field label="Admin secret key" type="password" value={form.secretKey} onChange={update("secretKey")} required />
        <p className="text-xs leading-relaxed text-slate-500">This key must match ADMIN_SECRET_KEY configured on the server. Never share it publicly.</p>
        <FormMessage error={error} />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold">
          Create admin account
        </button>
        <p className="text-center text-sm text-slate-400">
          Already registered? <Link to="/admin/login" className="text-indigo-300 hover:text-white">Sign in</Link>
        </p>
      </form>
    </AdminAuthCard>
  );
}
