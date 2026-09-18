import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import FormMessage from "../components/FormMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const users = await api.users(`?search=${encodeURIComponent(email.trim())}`);
      const user = users.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) throw new Error("No account was found for that email.");
      if (user.status === "blocked") throw new Error("This account is blocked.");
      login(user);
      navigate(location.state?.from || "/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard title="Welcome back" subtitle="Sign in to view your orders and profile.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Email" type="email" value={email} onChange={setEmail} required />
        <p className="text-xs text-slate-500">Demo mode uses your email only; password authentication is not enabled yet.</p>
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
  return (
    <label className="block">
      <span className="block mb-2 text-sm text-slate-300">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-indigo-500/60"
      />
    </label>
  );
}
