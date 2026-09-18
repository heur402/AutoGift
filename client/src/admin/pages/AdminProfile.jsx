import { useState } from "react";
import { useAuth } from "../../lib/AuthContext";
import { api } from "../../lib/api";
import FormMessage from "../../components/FormMessage";
import { AdminAuthCard } from "../AdminLogin";
import { Field } from "../../pages/Login";

export default function AdminProfile() {
  const { user, login } = useAuth();
  const [form, setForm] = useState({ name: user.name || "", email: user.email || "", phone: user.phone || "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const update = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    setMessage("");
    try {
      const updated = await api.updateAdminProfile(user.id, form);
      login(updated);
      setForm((current) => ({ ...current, password: "" }));
      setMessage("Admin settings updated successfully.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AdminAuthCard title="Admin settings" subtitle="Update the administrator identity used across the dashboard.">
      <form onSubmit={submit} className="space-y-4">
        <Field label="Full name" value={form.name} onChange={update("name")} required />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
        <Field label="Phone number" type="tel" value={form.phone} onChange={update("phone")} required />
        <Field label="New password" type="password" value={form.password} onChange={update("password")} />
        <p className="text-xs text-slate-500">Leave the password blank to keep the current password.</p>
        <FormMessage error={error} />
        {message && <p className="text-sm text-emerald-300">{message}</p>}
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold">Save settings</button>
      </form>
    </AdminAuthCard>
  );
}
