import { Link } from "react-router-dom";
import { FiMenu, FiBell, FiExternalLink } from "react-icons/fi";
import { useAuth } from "../lib/AuthContext";

export default function AdminTopbar({ onOpenSidebar, notifications }) {
  const { user: admin } = useAuth();
  const initials = admin?.name?.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase() || "AD";
  return (
    <header className="h-16 border-b border-white/10 bg-slate-950/70 backdrop-blur sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          className="lg:hidden text-slate-300 hover:text-white p-2"
          onClick={onOpenSidebar}
          aria-label="Open sidebar"
        >
          <FiMenu size={20} />
        </button>
        <div><h1 className="text-white font-semibold text-sm sm:text-base">Admin Dashboard</h1><p className="hidden sm:block text-xs text-slate-500">{admin?.name || "Administrator"}</p></div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          View store <FiExternalLink />
        </Link>

        <Link to="/admin/notifications" className="relative p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5" aria-label="View notifications">
          <FiBell />
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-fuchsia-500 text-white text-[10px] flex items-center justify-center">
              {notifications}
            </span>
          )}
        </Link>

        <Link to="/admin/profile" className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold" aria-label="Admin settings">
          {initials}
        </Link>
      </div>
    </header>
  );
}