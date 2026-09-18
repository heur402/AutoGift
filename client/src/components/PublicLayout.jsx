import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useAuth } from "../lib/AuthContext";

export default function PublicLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar forceGuest={user?.role === "admin"} />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}