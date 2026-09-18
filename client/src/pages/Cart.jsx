import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiTrash2 } from "react-icons/fi";
import { useCart } from "../lib/CartContext";
import { useAuth } from "../lib/AuthContext";
import { api } from "../lib/api";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, clear, total } = useCart();
  const { user } = useAuth();
  const [message, setMessage] = useState("");
  const [placing, setPlacing] = useState(false);
  const navigate = useNavigate();

  const placeOrder = async () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    setPlacing(true);
    setMessage("");
    try {
      const item = items[0];
      await api.createOrder({ userId: user.id, productId: item.id, product: item.name, amount: item.price });
      clear();
      setMessage("Your order was placed successfully.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setPlacing(false);
    }
  };

  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><FiArrowLeft /> Continue shopping</Link>
      <div className="mt-6 flex items-end justify-between gap-4">
        <div><p className="text-xs uppercase tracking-wide text-indigo-300">Your bag</p><h1 className="mt-2 text-3xl font-bold text-white">Shopping cart</h1></div>
        {items.length > 0 && <button onClick={clear} className="text-sm text-slate-400 hover:text-rose-300">Clear cart</button>}
      </div>
      {message && <p className="mt-5 p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-200">{message}</p>}
      {!items.length ? (
        <div className="mt-10 p-10 text-center rounded-2xl bg-white/5 border border-white/10"><p className="text-slate-400">Your cart is empty.</p><Link to="/products" className="inline-block mt-5 px-5 py-2.5 rounded-xl bg-indigo-500 text-white">Browse products</Link></div>
      ) : (
        <div className="mt-8 grid lg:grid-cols-[1fr_320px] gap-6">
          <div className="space-y-3">{items.map((item) => <div key={item.id} className="flex gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <img src={item.images?.[0]} alt="" className="w-20 h-20 rounded-xl object-cover" />
            <div className="min-w-0 flex-1"><Link to={`/product/${item.id}`} className="font-medium text-white hover:text-indigo-300">{item.name}</Link><p className="text-sm text-slate-500">{item.currency} {item.price.toFixed(2)} each</p><p className="mt-2 text-sm text-slate-300">Quantity: {item.quantity}</p></div>
            <div className="text-right"><p className="text-indigo-300 font-semibold">${(item.price * item.quantity).toFixed(2)}</p><button onClick={() => removeItem(item.id)} className="mt-4 text-slate-500 hover:text-rose-300" aria-label={`Remove ${item.name}`}><FiTrash2 /></button></div>
          </div>)}</div>
          <aside className="h-fit p-5 rounded-2xl bg-white/5 border border-white/10"><h2 className="text-white font-semibold">One-product order</h2><div className="mt-5 flex justify-between text-slate-300"><span>Total</span><span>${total.toFixed(2)}</span></div><p className="mt-3 text-xs text-slate-500">Your available balance is charged immediately.</p><button disabled={placing} onClick={placeOrder} className="mt-6 w-full py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold disabled:opacity-50">{placing ? "Placing order..." : user ? "Buy now" : "Sign in to checkout"}</button></aside>
        </div>
      )}
    </section>
  );
}
