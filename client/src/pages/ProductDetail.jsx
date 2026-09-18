import { Link, useParams } from "react-router-dom";
import { api } from "../lib/api";
import { useApi } from "../lib/useApi";
import { useCart } from "../lib/CartContext";
import { useState } from "react";
import { FiArrowLeft, FiStar } from "react-icons/fi";
import ImageGallery from "../components/ImageGallery";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, loading, error } = useApi(() => api.product(id), [id]);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  if (loading) return <section className="max-w-3xl mx-auto px-4 py-20 text-center text-slate-400">Loading product...</section>;
  if (error || !product) {
    return (
      <section className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-white">Product not found</h1>
        <p className="mt-2 text-slate-400">The product you're looking for doesn't exist.</p>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200">
          <FiArrowLeft /> Back to Home
        </Link>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white">
        <FiArrowLeft /> Back
      </Link>

      <div className="mt-6 grid lg:grid-cols-2 gap-10">
        <ImageGallery key={product.id} images={product.images} alt={product.name} />

        <div>
          <p className="text-xs uppercase tracking-wide text-slate-500">{product.category}</p>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold text-white">{product.name}</h1>

          <div className="mt-3 flex items-center gap-4">
            <span className="text-2xl font-semibold text-indigo-300">
              {product.currency} {product.price.toFixed(2)}
            </span>
            <span className="inline-flex items-center gap-1 text-sm text-amber-300">
              <FiStar className="fill-current" /> {product.rating?.toFixed(1) ?? "—"}
            </span>
          </div>

          <p className="mt-6 text-slate-300 leading-relaxed">{product.description}</p>

          <button
            type="button"
            onClick={() => { addItem(product); setAdded(true); }}
            className="mt-8 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold hover:opacity-90 transition"
          >
            {added ? "Ready for checkout" : "Buy this product"}
          </button>

          <p className="mt-3 text-xs text-slate-500">One product per order. Your balance is charged at checkout.</p>
        </div>
      </div>
    </section>
  );
}