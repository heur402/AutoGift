import { NavLink, useNavigate } from "react-router-dom";
import {
  FiGrid, FiUsers, FiShoppingBag, FiDollarSign, FiBell, FiLogOut, FiX,
} from "react-icons/fi";
import { useAuth } from "../lib/AuthContext";

const nav = [
  { to: "/admin",         label: "Overview", icon: FiGrid,         end: true },
  { to: "/admin/users",   label: "Users",    icon: FiUsers },
  { to: "/admin/orders",  label: "Orders",   icon: FiShoppingBag },
  { to: "/admin/revenue", label: "Revenue",  icon: FiDollarSign },
  { to: "/admin/notifications", label: "Notifications", icon: FiBell },
];

function NavItems({ onNavigate }) {
  return (
    <nav className="p-3 space-y-1">
      {nav.map(({ to, label, icon: Icon, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          onClick={onNavigate}
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
  );
}

function SidebarFooter({ onSignOut }) {
  return (
    <div className="mt-auto border-t border-white/10 p-4">
      <p className="px-1 text-xs text-slate-500 leading-relaxed">
        Review account activity, payments, and user reports.
      </p>
      <button
        type="button"
        onClick={onSignOut}
        className="mt-4 flex w-full items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:bg-rose-500/10 hover:text-rose-200 transition"
      >
        <FiLogOut /> Sign out
      </button>
    </div>
  );
}

export default function AdminSidebar({ open, onClose }) {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const signOut = () => {
    logout();
    onClose?.();
    navigate("/admin/login", { replace: true });
  };

  return (
    <>
      {/* ─── Desktop sidebar (always visible, static) ─── */}
      <aside className="hidden lg:flex flex-col w-64 shrink-0 bg-slate-950 border-r border-white/10">
        <div className="h-16 flex items-center px-5 border-b border-white/10">
          <span className="text-white font-semibold">Admin Panel</span>
        </div>
        <NavItems />
        <SidebarFooter onSignOut={signOut} />
      </aside>

      {/* ─── Mobile drawer ─── */}
      {open && (
        <div
          className="fixed inset-0 bg-black/60 z-30 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`lg:hidden fixed top-0 left-0 z-40 h-full w-64
                    bg-slate-950 border-r border-white/10
                    transform transition-transform duration-200
                    ${open ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b border-white/10">
          <span className="text-white font-semibold">Admin Panel</span>
          <button
            className="text-slate-400 hover:text-white p-1"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <FiX />
          </button>
        </div>
        <NavItems onNavigate={onClose} />
        <SidebarFooter onSignOut={signOut} />
      </aside>
    </>
  );
}