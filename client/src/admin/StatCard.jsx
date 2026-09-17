export default function StatCard({ icon: Icon, label, value, sub, accent = "indigo" }) {
  const accents = {
    indigo:  "from-indigo-500/20 to-indigo-500/5 text-indigo-300",
    fuchsia: "from-fuchsia-500/20 to-fuchsia-500/5 text-fuchsia-300",
    emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-300",
    amber:   "from-amber-500/20 to-amber-500/5 text-amber-300",
  };

  return (
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
      <div className="flex items-center justify-between">
        <span className={`p-2.5 rounded-xl bg-gradient-to-br ${accents[accent]}`}>
          <Icon />
        </span>
      </div>
      <p className="mt-4 text-slate-400 text-xs uppercase tracking-wide">{label}</p>
      <p className="mt-1 text-2xl font-bold text-white">{value}</p>
      {sub && <p className="mt-1 text-xs text-slate-500">{sub}</p>}
    </div>
  );
}