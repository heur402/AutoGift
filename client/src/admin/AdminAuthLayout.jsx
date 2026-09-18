import { Link, Outlet } from "react-router-dom";
import { FiShield } from "react-icons/fi";

export default function AdminAuthLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-white/10">
        <div className="max-w-6xl mx-auto w-full px-4 sm:px-6 py-5">
          <Link to="/admin/login" className="inline-flex items-center gap-2 text-white font-semibold">
            <span className="p-2 rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500">
              <FiShield className="w-5 h-5" />
            </span>
            AutoGift Admin
          </Link>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center py-10">
        <Outlet />
      </main>
      <p className="pb-6 text-center text-xs text-slate-500">Restricted access for AutoGift administrators.</p>
    </div>
  );
}
