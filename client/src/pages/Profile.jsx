import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { api } from "../lib/api";
import { useAuth } from "../lib/AuthContext";

export default function Profile() {
  const { user, login, logout } = useAuth();
  const [orders, setOrders] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState("");
  const [amount, setAmount] = useState("");
  const [walletMessage, setWalletMessage] = useState("");

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
  const updateWallet = async (type) => {
    setWalletMessage("");
    try {
      const result = await api.createWalletTransaction(user.id, type, amount);
      login({ ...user, balance: result.balance, deposited: type === "deposit" ? Number(user.deposited || 0) + Number(amount) : user.deposited, withdrawn: type === "withdrawal" ? Number(user.withdrawn || 0) + Number(amount) : user.withdrawn });
      setAmount("");
      setWalletMessage(type === "deposit" ? "Deposit recorded. You can now buy a product." : "Withdrawal request recorded.");
    } catch (err) {
      setWalletMessage(err.message);
    }
  };

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
        <Info label="Available balance" value={`$${Number(user.balance || 0).toFixed(2)}`} />
        <Info label="Verification" value={user.verified ? "Verified buyer" : "Deposit and buy to verify"} />
      </div>
      <section className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <p className="text-xs uppercase tracking-wide text-indigo-300">Wallet</p>
        <h2 className="mt-2 text-xl font-semibold text-white">Fund your account</h2>
        <p className="mt-1 text-sm text-slate-400">A deposit unlocks purchasing and helps verify your account.</p>
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <input type="number" min="1" step="0.01" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Amount" className="sm:max-w-xs flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white" />
          <button type="button" onClick={() => updateWallet("deposit")} className="px-5 py-3 rounded-xl bg-emerald-500/20 text-emerald-200 border border-emerald-500/30">Deposit</button>
          <button type="button" onClick={() => updateWallet("withdrawal")} className="px-5 py-3 rounded-xl bg-amber-500/20 text-amber-200 border border-amber-500/30">Withdraw</button>
        </div>
        {walletMessage && <p className="mt-3 text-sm text-indigo-200">{walletMessage}</p>}
      </section>
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
        <ul className="mt-4 space-y-3">{notifications.map((item) => <li key={item.id} className="p-4 rounded-xl bg-white/5 border border-white/10"><p className="font-medium text-white">{item.title || "Update from AutoGift"}</p><p className="mt-1 text-slate-300">{item.message}</p></li>)}</ul>
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
