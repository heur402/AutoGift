import { NavLink } from "react-router-dom";
import {
  FiGrid, FiUsers, FiShoppingBag, FiDollarSign, FiX,
} from "react-icons/fi";

const nav = [
  { to: "/admin",          label: "Overview", icon: FiGrid,         end: true },
  { to: "/admin/users",    label: "Users",    icon: FiUsers },
  { to: "/admin/orders",   label: "Orders",   icon: FiShoppingBag },
  { to: "/admin/revenue",  label: "Revenue",  icon: FiDollarSign },
];

export default function AdminSidebar({ open, onClose }) {
  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 z-40 h-full w-64 shrink-0
                    bg-slate-950 border-r border-white/10
                    transform transition-transform duration-200
                    ${open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <span className="text-white font-semibold">Admin Panel</span>
          <button
            className="lg:hidden text-slate-400 hover:text-white p-1"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>

        <nav className="p-3 space-y-1">
          {nav.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-indigo-500/15 text-white"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="px-5 mt-6 text-xs text-slate-500 leading-relaxed">
          Demo admin UI. No authentication, no persistence.
        </div>
      </aside>
    </>
  );
}