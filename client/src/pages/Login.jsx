import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import FormMessage from "../components/FormMessage";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "", phone: "" });
  const [role, setRole] = useState("user");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await api.login(role === "admin"
        ? { email: form.email, password: form.password }
        : { phone: form.phone, password: form.password });
      login(user);
      navigate(user.role === "admin" ? "/admin" : location.state?.from || "/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to view your orders and profile.">
      <form onSubmit={submit} className="space-y-5">
        <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-white/5">
          {["user", "admin"].map((value) => <button key={value} type="button" onClick={() => setRole(value)} className={`py-2 rounded-lg text-sm capitalize ${role === value ? "bg-indigo-500 text-white" : "text-slate-400"}`}>{value} login</button>)}
        </div>
        {role === "admin"
          ? <Field label="Admin email" type="email" value={form.email} onChange={(value) => setForm({ ...form, email: value })} required />
          : <Field label="Phone number" type="tel" value={form.phone} onChange={(value) => setForm({ ...form, phone: value })} required />}
        <Field label="Password" type="password" value={form.password} onChange={(value) => setForm({ ...form, password: value })} required />
        <FormMessage error={error} />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold">
          Sign in
        </button>
        <p className="text-center text-sm text-slate-400">
          New here? <Link to="/register" className="text-indigo-300 hover:text-white">Create an account</Link>
        </p>
      </form>
    </AuthCard>
  );
}

export function AuthCard({ title, subtitle, children }) {
  return (
    <section className="max-w-md mx-auto px-4 py-16">
      <div className="p-6 sm:p-8 rounded-2xl bg-white/5 border border-white/10">
        <h1 className="text-2xl font-bold text-white">{title}</h1>
        <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
        <div className="mt-7">{children}</div>
      </div>
    </section>
  );
}

export function Field({ label, type = "text", value, onChange, required }) {
  const [visible, setVisible] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword && visible ? "text" : type;

  return (
    <label className="block">
      <span className="block mb-2 text-sm text-slate-300">{label}</span>
      <span className="relative block">
        <input
          type={inputType}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          required={required}
          className={`w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60 ${isPassword ? "pr-12" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-white"
            aria-label={visible ? `Hide ${label}` : `Show ${label}`}
          >
            {visible ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </span>
    </label>
  );
}
