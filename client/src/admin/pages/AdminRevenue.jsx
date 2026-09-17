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
        <StatCard icon={FiTrendingUp}  label="Best Month"      value={best.month}  sub={`$${best.amount.toFixed(2)}`}