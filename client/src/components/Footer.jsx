import { Link } from "react-router-dom";
import { FiShoppingBag } from "react-icons/fi";

const cols = [
  { title: "Shop", links: [
    { to: "/",         label: "Home" },
    { to: "/products", label: "All Products" },
  ]},
  { title: "Company", links: [
    { to: "/about",   label: "About" },
    { to: "/contact", label: "Contact" },
  ]},
  { title: "Legal", links: [
    { to: "/privacy", label: "Privacy" },
    { to: "/terms",   label: "Terms" },
  ]},
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div>
          <Link to="/" className="flex items-center gap-2 text-white font-bold text-lg">
            <span className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
              <FiShoppingBag className="w-5 h-5" />
            </span>
            AutoGift
          </Link>
          <p className="mt-4 text-sm text-slate-400 max-w-xs">
            A website dedicated to provide gift to their followers.
          </p>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h3 className="text-white font-semibold text-sm">{c.title}</h3>
            <ul className="mt-4 space-y-2">
              {c.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-slate-400 hover:text-white transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-white/10 py-6 text-center text-xs text-slate-500">
        © 2026 AutoGift. All rights reserved.
      </div>
    </footer>
  );
}