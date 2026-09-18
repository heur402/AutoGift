import { Routes, Route } from "react-router-dom";

import PublicLayout from "./components/PublicLayout";

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";

import AdminLayout from "./admin/AdminLayout";
import AdminOverview from "./admin/pages/AdminOverview";
import AdminUsers from "./admin/pages/AdminUsers";
import AdminOrders from "./admin/pages/AdminOrders";
import AdminRevenue from "./admin/pages/AdminRevenue";
import AdminNotifications from "./admin/pages/AdminNotifications";
import AdminAuthLayout from "./admin/AdminAuthLayout";
import AdminLogin from "./admin/AdminLogin";
import AdminRegister from "./admin/AdminRegister";
import AdminProfile from "./admin/pages/AdminProfile";

export default function App() {
  return (
    <Routes>
      {/* Public store — has Navbar + Footer */}
      <Route element={<PublicLayout />}>
        <Route path="/"            element={<Home />} />
        <Route path="/products"    element={<Products />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/about"       element={<About />} />
        <Route path="/contact"     element={<Contact />} />
        <Route path="/privacy"     element={<Privacy />} />
        <Route path="/terms"       element={<Terms />} />
        <Route path="/login"       element={<Login />} />
        <Route path="/register"    element={<Register />} />
        <Route path="/profile"     element={<Profile />} />
        <Route path="/cart"        element={<Cart />} />
        <Route path="*"            element={<NotFound />} />
      </Route>

      <Route element={<AdminAuthLayout />}>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/register" element={<AdminRegister />} />
      </Route>

      {/* Admin — has Sidebar + Topbar only, no store chrome */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index          element={<AdminOverview />} />
        <Route path="users"   element={<AdminUsers />} />
        <Route path="orders"  element={<AdminOrders />} />
        <Route path="revenue" element={<AdminRevenue />} />
        <Route path="notifications" element={<AdminNotifications />} />
        <Route path="profile" element={<AdminProfile />} />
      </Route>
    </Routes>
  );
}