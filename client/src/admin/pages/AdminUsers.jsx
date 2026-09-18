import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiUserX, FiUserCheck, FiBell, FiX } from "react-icons/fi";
import { api } from "../../lib/api";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [notifyTarget, setNotifyTarget] = useState(null);
  const [notifyText, setNotifyText] = useState("");
  const [toast, setToast] = useState(null);

  useEffect(() => {
    api.users().then(setUsers).catch((err) => setError(err.message));
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q)
    );
  }, [users, query]);

  const toggleBlock = (id) => {
    const user = users.find((item) => item.id === id);
    api.updateUserStatus(id, user.status === "blocked" ? "active" : "blocked")
      .then((updated) => setUsers((list) => list.map((item) => item.id === id ? updated : item)))
      .catch((err) => setError(err.message));
  };

  const sendNotify = (e) => {
    e.preventDefault();
    if (!notifyText.trim()) return;
    api.createNotification(notifyTarget.id, notifyText)
      .then(() => {
        setToast(`Notification sent to ${notifyTarget.name}.`);
        setNotifyTarget(null);
        setNotifyText("");
        setTimeout(() => setToast(null), 3000);
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Users</h2>
        <p className="mt-1 text-sm text-slate-400">
          Demo data. Blocking and notifications are UI-only and reset on refresh.
        </p>
      </header>

      {toast && (
        <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-sm">
          {toast}
        </div>
      )}
      {error && <p className="text-rose-300">{error}</p>}

      <div className="relative max-w-sm">
        <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search name, email, or ID..."
          className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
        />
      </div>

      <div className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wide">
              <tr>
                <th className="text-left px-4 py-3">User</th>
                <th className="text-left px-4 py-3">Joined</th>
                <th className="text-left px-4 py-3">Orders</th>
                <th className="text-left px-4 py-3">Spent</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/[0.02]">
                  <td className="px-4 py-3">
                    <p className="text-white font-medium">{u.name}</p>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </td>
                  <td className="px-4 py-3 text-slate-400">{u.joined}</td>
                  <td className="px-4 py-3 text-slate-300">{u.orders}</td>
                  <td className="px-4 py-3 text-slate-300">${u.spent.toFixed(2)}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-xs border ${
                        u.status === "blocked"
                          ? "bg-rose-500/10 text-rose-300 border-rose-500/20"
                          : "bg-emerald-500/10 text-emerald-300 border-emerald-500/20"
                      }`}
                    >
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setNotifyTarget(u)}
                        className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
                        aria-label="Send notification"
                        title="Send notification"
                      >
                        <FiBell />
                      </button>
                      <button
                        type="button"
                        onClick={() => toggleBlock(u.id)}
                        className={`p-2 rounded-lg hover:bg-white/5 ${
                          u.status === "blocked"
                            ? "text-emerald-300 hover:text-emerald-200"
                            : "text-rose-300 hover:text-rose-200"
                        }`}
                        aria-label={u.status === "blocked" ? "Unblock" : "Block"}
                        title={u.status === "blocked" ? "Unblock" : "Block"}
                      >
                        {u.status === "blocked" ? <FiUserCheck /> : <FiUserX />}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-slate-500">
                    No users match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Notification modal */}
      {notifyTarget && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={sendNotify}
            className="w-full max-w-md p-6 rounded-2xl bg-slate-900 border border-white/10"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-white font-semibold">
                Notify {notifyTarget.name}
              </h3>
              <button
                type="button"
                onClick={() => setNotifyTarget(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Close"
              >
                <FiX />
              </button>
            </div>

            <label className="block mt-5">
              <span className="block text-sm text-slate-300 mb-2">Message</span>
              <textarea
                rows={4}
                value={notifyText}
                onChange={(e) => setNotifyText(e.target.value)}
                className="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60 resize-none"
                placeholder="Write a short message..."
              />
            </label>

            <div className="mt-5 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setNotifyTarget(null)}
                className="px-4 py-2 rounded-lg text-sm text-slate-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg text-sm bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium hover:opacity-90"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
