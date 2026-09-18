import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { api } from "../lib/api";
import ProductGrid from "../components/ProductGrid";
import PageHeader from "../components/PageHeader";

const ALL = "All";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [sort, setSort] = useState("newest");
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.products("?limit=100").then(setAllProducts).catch((err) => setError(err.message));
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("search", query.trim());
    if (category !== ALL) params.set("category", category);
    if (sort) params.set("sort", sort);
    api.products(`?${params}`)
      .then(setProducts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [query, category, sort]);

  const categories = useMemo(() => {
    const set = new Set(allProducts.map((p) => p.category));
    return [ALL, ...Array.from(set).sort()];
  }, [allProducts]);

  const filtered = products;

  return (
    <>
      <PageHeader
        title="All Products"
        subtitle={`Browse all ${products.length} items in our catalog.`}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Controls */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-8">
          {/* Search */}
          <div className="relative w-full lg:max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            {/* Sort */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-indigo-500/60"
            >
              <option value="newest"     className="bg-slate-900">Newest</option>
              <option value="price-asc"  className="bg-slate-900">Price: Low to High</option>
              <option value="price-desc" className="bg-slate-900">Price: High to Low</option>
              <option value="rating"     className="bg-slate-900">Top Rated</option>
            </select>
          </div>
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={`px-3.5 py-1.5 rounded-full text-sm border transition ${
                category === c
                  ? "bg-indigo-500/20 border-indigo-500/60 text-white"
                  : "bg-white/5 border-white/10 text-slate-300 hover:border-white/30"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Result count */}
        <p className="text-sm text-slate-500 mb-4">
          {loading ? "Loading..." : `${filtered.length} ${filtered.length === 1 ? "product" : "products"}`}
        </p>

        {error ? <p className="text-rose-300">{error}</p> : <ProductGrid products={filtered} />}
      </section>
    </>
  );
}