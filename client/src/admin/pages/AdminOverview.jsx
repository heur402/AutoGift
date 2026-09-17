import { FiUsers, FiShoppingBag, FiDollarSign, FiTrendingUp } from "react-icons/fi";
import StatCard from "../StatCard";
import { adminUsers, adminOrders, adminActivity, adminRevenue } from "../adminData";

export default function AdminOverview() {
  const totalUsers    = adminUsers.length;
  const blockedUsers  = adminUsers.filter((u) => u.status === "blocked").length;
  const totalOrders   = adminOrders.length;
  const totalRevenue  = adminRevenue.reduce((s, m) => s + m.amount, 0);
  const lastMonth     = adminRevenue[adminRevenue.length - 1];
  const prevMonth     = adminRevenue[adminRevenue.length - 2];
  const growth        = prevMonth
    ? (((lastMonth.amount - prevMonth.amount) / prevMonth.amount) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-8">
      <header>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Overview</h2>
        <p className="mt-1 text-sm text-slate-400">
          Demo numbers — no real users, orders, or payments.
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={FiUsers}       label="Total Users"    value={totalUsers}                  sub={`${blockedUsers} blocked`} accent="indigo"  />
        <StatCard icon={FiShoppingBag} label="Total Orders"   value={totalOrders}                 sub="All time"                  accent="fuchsia" />
        <StatCard icon={FiDollarSign}  label="Total Revenue"  value={`$${totalRevenue.toFixed(2)}`} sub="Last 6 months"            accent="emerald" />
        <StatCard icon={FiTrendingUp}  label="Monthly Growth" value={`${growth}%`}                sub="Feb vs Jan (demo)"         accent="amber"   />
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent orders */}
        <div className="lg:col-span-2 p-5 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold">Recent Orders</h3>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="text-slate-500 text-xs uppercase tracking-wide">
                <tr>
                  <th className="text-left py-2 pr-4">Order</th>
                  <th className="text-left py-2 pr-4">Product</th>
                  <th className="text-left py-2 pr-4">Amount</th>
                  <th className="text-left py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {adminOrders.slice(0, 6).map((o) => (
                  <tr key={o.id}>
                    <td className="py-3 pr-4 text-slate-300">{o.id}</td>
                    <td className="py-3 pr-4 text-slate-300">{o.product}</td>
                    <td className="py-3 pr-4 text-slate-300">${o.amount.toFixed(2)}</td>
                    <td className="py-3">
                      <StatusPill status={o.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity */}
        <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <h3 className="text-white font-semibold">Recent Activity</h3>
          <ul className="mt-4 space-y-3">
            {adminActivity.map((a) => (
              <li key={a.id} className="text-sm">
                <p className="text-slate-300">{a.text}</p>
                <p className="text-xs text-slate-500 mt-0.5">{a.time}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function StatusPill({ status }) {
  const styles = {
    delivered: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    shipped:   "bg-indigo-500/10 text-indigo-300 border-indigo-500/20",
    pending:   "bg-amber-500/10 text-amber-300 border-amber-500/20",
    cancelled: "bg-rose-500/10 text-rose-300 border-rose-500/20",
  };
  return (
    <span className={`inline-block px-2 py-0.5 rounded-full text-xs border ${styles[status] ?? styles.pending}`}>
      {status}
    </span>
  );
}