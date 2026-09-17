import { Link } from "react-router-dom";
import { FiMenu, FiBell, FiExternalLink } from "react-icons/fi";

export default function AdminTopbar({ onOpenSidebar, notifications }) {
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
        <h1 className="text-white font-semibold text-sm sm:text-base">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        <Link
          to="/"
          className="hidden sm:inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-white"
        >
          View store <FiExternalLink />
        </Link>

        <div className="relative">
          <button
            type="button"
            aria-label="Notifications"
            className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/5"
          >
            <FiBell />
          </button>
          {notifications > 0 && (
            <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-fuchsia-500 text-white text-[10px] flex items-center justify-center">
              {notifications}
            </span>
          )}
        </div>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-fuchsia-500 flex items-center justify-center text-white text-xs font-semibold">
          AD
        </div>
      </div>
    </header>
  );
}