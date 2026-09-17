import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";

export default function ProductCard({ product }) {
  const thumb = product.images?.[0];

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block rounded-2xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/40 transition"
    >
      <div className="aspect-square overflow-hidden bg-slate-900">
        {thumb ? (
          <img
            src={thumb}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-slate-600 text-sm">
            No image
          </div>
        )}
      </div>

      <div className="p-4">
        <p className="text-xs text-slate-500">{product.category}</p>
        <h3 className="mt-1 text-white font-medium truncate">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-indigo-300 font-semibold">
            {product.currency} {product.price.toFixed(2)}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-amber-300">
            <FiStar className="fill-current" /> {product.rating?.toFixed(1) ?? "—"}
          </span>
        </div>
      </div>
    </Link>
  );
}