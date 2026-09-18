import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

export default function Profile() {
  const { user, login, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) return;
    Promise.all([api.orders(`?userId=${encodeURIComponent(user.id)}`), api.notifications(user.id)])
      .then(([userOrders, userNotifications]) => {
        setOrders(userOrders);
        setNotifications(userNotifications);
      })
      .catch((err) => setError(err.message));
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;

  const refreshUser = () => api.user(user.id).then(login).catch((err) => setError(err.message));

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      <header className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-wide text-indigo-300">Your account</p>
          <h1 className="mt-2 text-3xl font-bold text-white">Profile</h1>
          <p className="mt-2 text-slate-400">Manage your account details and review your orders.</p>
        </div>
        <button onClick={logout} className="text-sm text-slate-300 hover:text-white">Sign out</button>
      </header>
      {error && <p className="text-rose-300">{error}</p>}
      <div className="grid md:grid-cols-3 gap-4">
        <Info label="Name" value={user.name} />
        <Info label="Email" value={user.email} />
        <Info label="Member since" value={new Date(user.joined).toLocaleDateString()} />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Info label="Orders" value={user.orders} />
        <Info label="Total spent" value={`$${Number(user.spent).toFixed(2)}`} />
      </div>
      <section>
        <h2 className="text-xl font-semibold text-white">Order history</h2>
        <div className="mt-4 overflow-x-auto rounded-2xl border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-slate-400"><tr><th className="text-left px-4 py-3">Order</th><th className="text-left px-4 py-3">Product</th><th className="text-left px-4 py-3">Amount</th><th className="text-left px-4 py-3">Status</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((order) => <tr key={order.id}><td className="px-4 py-3 text-slate-300">{order.id}</td><td className="px-4 py-3 text-slate-300">{order.product}</td><td className="px-4 py-3 text-slate-300">${order.amount.toFixed(2)}</td><td className="px-4 py-3 text-slate-400">{order.status}</td></tr>)}
              {!orders.length && <tr><td colSpan={4} className="px-4 py-8 text-center text-slate-500">No orders yet.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
      <section>
        <h2 className="text-xl font-semibold text-white">Notifications</h2>
        <ul className="mt-4 space-y-3">{notifications.map((item) => <li key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10 text-slate-300">{item.message}</li>)}</ul>
        {!notifications.length && <p className="mt-4 text-slate-500">No notifications.</p>}
      </section>
      <button onClick={refreshUser} className="text-sm text-indigo-300 hover:text-white">Refresh profile data</button>
      <Link to="/products" className="block text-sm text-indigo-300 hover:text-white">Continue shopping</Link>
    </section>
  );
}

function Info({ label, value }) {
  return <div className="p-4 rounded-2xl bg-white/5 border border-white/10"><p className="text-xs uppercase tracking-wide text-slate-500">{label}</p><p className="mt-2 text-white font-medium">{value}</p></div>;
}
