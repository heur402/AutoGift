import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";
import FormMessage from "../components/FormMessage";
import { AuthCard, Field } from "./Login";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();
  const update = (key) => (value) => setForm((current) => ({ ...current, [key]: value }));

  const submit = async (event) => {
    event.preventDefault();
    setError("");
    try {
      const user = await api.createUser(form);
      login(user);
      navigate("/profile");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthCard title="Create your account" subtitle="Register to keep your profile and order history together.">
      <form onSubmit={submit} className="space-y-5">
        <Field label="Name" value={form.name} onChange={update("name")} required />
        <Field label="Email" type="email" value={form.email} onChange={update("email")} required />
        <p className="text-xs text-slate-500">Demo mode does not collect or store passwords yet.</p>
        <FormMessage error={error} />
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold">
          Create account
        </button>
        <p className="text-center text-sm text-slate-400">
          Already registered? <Link to="/login" className="text-indigo-300 hover:text-white">Sign in</Link>
        </p>
      </form>
    </AuthCard>
  );
}
