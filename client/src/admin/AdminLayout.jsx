import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { useApi } from "../lib/useApi";
import { api } from "../lib/api";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data, error } = useApi(api.orders, []);
  const orders = data ?? [];

  return (
    <div className="h-screen flex bg-slate-950 overflow-hidden">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 min-w-0 flex flex-col h-screen">
        <AdminTopbar
          onOpenSidebar={() => setSidebarOpen(true)}
          notifications={error ? 0 : orders.filter((order) => order.status === "pending").length}
        />
        {/* This is the ONLY scrollable region */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}