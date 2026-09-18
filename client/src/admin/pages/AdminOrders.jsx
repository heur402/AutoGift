import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../../lib/api";

export default function AdminOrders() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(null);
  useEffect(() => {
    Promise.all([api.orders(), api.users()])
      .then(([orderData, userData]) => { setOrders(orderData); setUsers(userData); })
      .catch((err) => setError(err.message));
  }, []);
  const userById = Object.fromEntries(users.map((u) => [u.id, u]));

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((o) => {
      const matchesStatus = status === "all" || o.status === status;
      const buyer = userById[o.userId];
      const matchesQuery =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        (buyer?.name.toLowerCase().includes(q) ?? false);
      return matchesStatus && matchesQuery;
    });
  }, [query, status, orders, userById]);

  const changeStatus = (id, nextStatus) => {
    setUpdating(id);
    api.updateOrderStatus(id, nextStatus)
      .then((updated) => setOrders((current) => current.map((order) => order.id === id ? updated : order)))
      .catch((err) => setError(err.message))
      .finally(() => setUpdating(null));
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Orders</h2>
        <p className="mt-1 text-sm text-slate-400">        Every product purchase, with customer and fulfillment status.</p>
      </header>
      {error && <p className="text-rose-300">{error}</p>}

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative w-full sm:max-w-sm">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search order, product, or user..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
          />
        </div>

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/60"
        >
          <option value="all"       className="bg-slate-900">All statuses</option>
          <option value="delivered" className="bg-slate-900">Delivered</option>
          <option value="shipped"   className="bg-slate-900">Shipped</option>
          <option value="pending"   className="bg-slate-900">Pending</option>
          <option value="cancelled" className="bg-slate-900">Cancelled</option>
        </select>
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">Order</th>
                <th className="text-left px-4 py-3">Customer</th>
                <th className="text-left px-4 py-3">Product</th>
                <th className="text-left px-4 py-3">Amount</th>
                <th className="text-left px-4 py-3">Date</th>
                <th className="text-left px-4 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((o) => (
                <tr key={o.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3 text-slate-300">{o.id}</td>
                  <td className="px-4 py-3 text-slate-300">{userById[o.userId]?.name ?? "—"}</td>
                  <td className="px-4 py-3 text-slate-300">{o.product}</td>
                  <td className="px-4 py-3 text-slate-300">${o.amount.toFixed(2)}</td>
                  <td className="px-4 py-3 text-slate-400">{o.date}</td>
                  <td className="px-4 py-3">
                    <select value={o.status} disabled={updating === o.id} onChange={(event) => changeStatus(o.id, event.target.value)} className="px-2 py-1 rounded-lg bg-slate-900 border border-white/10 text-slate-300 text-xs">
                      {["pending", "shipped", "delivered", "cancelled"].map((value) => <option key={value} value={value}>{value}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    No orders match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}