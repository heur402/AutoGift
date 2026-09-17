import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"            element={<Home />} />
          <Route path="/products"    element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about"       element={<About />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="/privacy"     element={<Privacy />} />
          <Route path="/terms"       element={<Terms />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}