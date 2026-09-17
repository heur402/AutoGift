import { FiDollarSign, FiTrendingUp, FiAward, FiBarChart2 } from "react-icons/fi";
import StatCard from "../StatCard";
import { adminRevenue, adminUsers, adminOrders } from "../adminData";

export default function AdminRevenue() {
  const total = adminRevenue.reduce((s, m) => s + m.amount, 0);
  const best  = adminRevenue.reduce((a, b) => (b.amount > a.amount ? b : a), adminRevenue[0]);
  const avg   = total / adminRevenue.length;
  const max   = Math.max(...adminRevenue.map((m) => m.amount));

  const topSpenders = [...adminUsers]
    .sort((a, b) => b.spent - a.spent)
    .slice(0, 5);

  const orderCount = adminOrders.length;
  const avgOrder   = orderCount
    ? adminOrders.reduce((s, o) => s + o.amount, 0) / orderCount
    : 0;

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Revenue</h2>
        <p className="mt-1 text-sm text-slate-400">
          Demo figures only. No real money is collected anywhere in this app.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiDollarSign}  label="Total (6 mo)"    value={`$${total.toFixed(2)}`}  accent="emerald" />
        <StatCard icon={FiTrendingUp}  label="Best Month"      value={best.month}  sub={`$${best.amount.toFixed(2)}`} accent="indigo" />
        <StatCard icon={FiBarChart2}   label="Monthly Average" value={`$${avg.toFixed(2)}`}    accent="fuchsia" />
        <StatCard icon={FiAward}       label="Avg Order"       value={`$${avgOrder.toFixed(2)}`} accent="amber" />
      </div>

      {/* Simple bar chart */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-white font-semibold">Monthly Revenue</h3>
        <div className="mt-6 flex items-end gap-3 h-48">
          {adminRevenue.map((m) => {
            const h = max ? (m.amount / max) * 100 : 0;
            return (
              <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex-1 flex items-end">
                  <div
                    className="w-full rounded-t-lg bg-gradient-to-t from-indigo-600/60 to-fuchsia-500/60"
                    style={{ height: `${h}%` }}
                    title={`$${m.amount.toFixed(2)}`}
                  />
                </div>
                <span className="text-[10px] text-slate-500 whitespace-nowrap">
                  {m.month.split(" ")[0]}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top spenders */}
      <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <h3 className="text-white font-semibold">Top Spenders (demo)</h3>
        <ul className="mt-4 divide-y divide-white/5">
          {topSpenders.map((u) => (
            <li key={u.id} className="flex items-center justify-between py-3">
              <div>
                <p className="text-slate-200 text-sm">{u.name}</p>
                <p className="text-xs text-slate-500">{u.email}</p>
              </div>
              <span className="text-indigo-300 font-medium">${u.spent.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}