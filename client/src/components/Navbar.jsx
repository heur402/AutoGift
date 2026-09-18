import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FiShoppingBag, FiMenu, FiX, FiShoppingCart } from "react-icons/fi";
import { useAuth } from "../lib/AuthContext";
import { useCart } from "../lib/CartContext";

const links = [
  { to: "/",        label: "Home" },
  { to: "/products",label: "Products" },
  { to: "/about",   label: "About" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar({ forceGuest = false }) {
  const [open, setOpen] = useState(false);
  const { user: authenticatedUser, logout } = useAuth();
  const user = forceGuest ? null : authenticatedUser;
  const { items } = useCart();

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-slate-950/80 border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
              <FiShoppingBag className="w-5 h-5" />
            </span>
            AutoGift
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  `text-sm transition ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/cart" aria-label="Shopping cart" className="relative p-2 text-slate-300 hover:text-white"><FiShoppingCart /><span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-fuchsia-500 text-[10px] text-white flex items-center justify-center">{items.length}</span></Link>
            {user ? <><Link to="/profile" className="text-sm text-emerald-300 hover:text-white px-3 py-2">${Number(user.balance || 0).toFixed(2)}</Link><Link to="/profile" className="text-sm text-slate-300 hover:text-white px-3 py-2">{user.name}</Link><button onClick={logout} className="text-sm text-slate-300 hover:text-white px-3 py-2">Logout</button></> : <><Link to="/login" className="text-sm text-slate-300 hover:text-white px-3 py-2">Login</Link>
            <Link
              to="/register"
              className="text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium hover:opacity-90 transition"
            >
              Sign Up
            </Link></>}
          </div>

          <button
            aria-label="Toggle menu"
            aria-expanded={open}
            className="md:hidden text-white p-2"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <FiX size={22} /> : <FiMenu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden pb-4 flex flex-col gap-1">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2 text-sm ${isActive ? "text-white" : "text-slate-400 hover:text-white"}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            {user ? <><Link to="/profile" onClick={() => setOpen(false)} className="py-2 text-sm text-emerald-300">Balance: ${Number(user.balance || 0).toFixed(2)}</Link><Link to="/profile" onClick={() => setOpen(false)} className="py-2 text-sm text-slate-300">Profile</Link><button onClick={() => { logout(); setOpen(false); }} className="py-2 text-left text-sm text-slate-300">Logout</button></> : <Link to="/login" onClick={() => setOpen(false)} className="py-2 text-sm text-slate-300">Login</Link>}
            <Link to="/cart" onClick={() => setOpen(false)} className="py-2 text-sm text-slate-300">Cart ({items.length})</Link>
            {!user && <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="mt-2 text-center text-sm px-4 py-2 rounded-lg bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-medium"
            >
              Sign Up
            </Link>}
          </div>
        )}
      </nav>
    </header>
  );
}