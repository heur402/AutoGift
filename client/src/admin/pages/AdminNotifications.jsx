import { useEffect, useMemo, useState } from "react";
import { FiCheck, FiSearch, FiTrash2 } from "react-icons/fi";
import { api } from "../../lib/api";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");

  const load = () => api.allNotifications().then(setNotifications).catch((err) => setError(err.message));
  useEffect(() => { load(); }, []);

  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    return notifications.filter((item) => {
      const matchesFilter = filter === "all" || (filter === "unread" ? !item.read : item.read);
      const matchesSearch = !search || `${item.title} ${item.message} ${item.userId}`.toLowerCase().includes(search);
      return matchesFilter && matchesSearch;
    });
  }, [notifications, query, filter]);

  const markRead = (id) => api.markNotificationRead(id)
    .then((updated) => setNotifications((current) => current.map((item) => item.id === id ? updated : item)))
    .catch((err) => setError(err.message));

  const remove = (id) => api.deleteNotification(id)
    .then(() => setNotifications((current) => current.filter((item) => item.id !== id)))
    .catch((err) => setError(err.message));

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-wide text-indigo-300">Admin inbox</p>
        <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white">Notifications</h2>
        <p className="mt-1 text-sm text-slate-400">Review purchase, wallet, and user updates.</p>
      </header>
      {error && <p className="text-rose-300">{error}</p>}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search notifications..." className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60" />
        </div>
        <select value={filter} onChange={(event) => setFilter(event.target.value)} className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm">
          <option value="all" className="bg-slate-900">All notifications</option>
          <option value="unread" className="bg-slate-900">Unread</option>
          <option value="read" className="bg-slate-900">Read</option>
        </select>
      </div>
      <div className="space-y-3">
        {filtered.map((item) => (
          <article key={item.id} className={`p-4 rounded-2xl border ${item.read ? "bg-white/5 border-white/10" : "bg-indigo-500/10 border-indigo-500/30"}`}>
            <div className="flex items-start gap-4">
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold text-white">{item.title}</h3>
                  {!item.read && <span className="px-2 py-0.5 rounded-full bg-fuchsia-500/20 text-fuchsia-200 text-[10px] uppercase tracking-wide">New</span>}
                </div>
                <p className="mt-1 text-sm text-slate-300">{item.message}</p>
                <p className="mt-2 text-xs text-slate-500">{new Date(item.createdAt).toLocaleString()} · Recipient: {item.userId}</p>
              </div>
              <div className="flex items-center gap-1">
                {!item.read && <button type="button" onClick={() => markRead(item.id)} className="p-2 rounded-lg text-emerald-300 hover:bg-white/10" title="Mark as read" aria-label="Mark as read"><FiCheck /></button>}
                <button type="button" onClick={() => remove(item.id)} className="p-2 rounded-lg text-rose-300 hover:bg-white/10" title="Delete notification" aria-label="Delete notification"><FiTrash2 /></button>
              </div>
            </div>
          </article>
        ))}
        {!filtered.length && <div className="p-10 text-center rounded-2xl bg-white/5 border border-white/10 text-slate-500">No notifications match your filters.</div>}
      </div>
    </div>
  );
}
