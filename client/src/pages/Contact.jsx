import { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiCheck } from "react-icons/fi";
import PageHeader from "../components/PageHeader";

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const update = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // No backend yet — just show a confirmation in the UI.
    setSent(true);
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <>
      <PageHeader
        title="Contact"
        subtitle="Questions or feedback? Send us a message — this is a demo form."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid lg:grid-cols-3 gap-10">
        {/* Info column */}
        <div className="space-y-6">
                  <InfoRow icon={<FiMail />} label="Email" value="hello@autogift.example" />
          <InfoRow icon={<FiPhone />}  label="Phone"   value="+1 (555) 010-0000" />
          <InfoRow icon={<FiMapPin />} label="Address" value="123 Demo Street, Sample City" />
          <p className="text-xs text-slate-500 pt-4">
            These are placeholder details for demonstration only.
          </p>
        </div>

        {/* Form column */}
        <div className="lg:col-span-2">
          {sent && (
            <div className="mb-6 flex items-center gap-2 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
              <FiCheck /> Message received (UI only — nothing was sent).
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-5">
            <Field label="Name">
              <input
                required
                value={form.name}
                onChange={update("name")}
                className="input"
                placeholder="Your name"
              />
            </Field>

            <Field label="Email">
              <input
                required
                type="email"
                value={form.email}
                onChange={update("email")}
                className="input"
                placeholder="you@example.com"
              />
            </Field>

            <Field label="Message">
              <textarea
                required
                rows={6}
                value={form.message}
                onChange={update("message")}
                className="input resize-none"
                placeholder="How can we help?"
              />
            </Field>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 transition"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Small utility style — scoped via a plain className reused above */}
      <style>{`
        .input {
          width: 100%;
          padding: 0.75rem 1rem;
          border-radius: 0.75rem;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.10);
          color: white;
          outline: none;
        }
        .input::placeholder { color: #64748b; }
        .input:focus { border-color: rgba(99,102,241,0.6); }
      `}</style>
    </>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="p-2 rounded-lg bg-indigo-500/10 text-indigo-300 mt-0.5">{icon}</span>
      <div>
        <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
        <p className="text-slate-200 text-sm mt-0.5">{value}</p>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-sm text-slate-300 mb-2">{label}</span>
      {children}
    </label>
  );
}