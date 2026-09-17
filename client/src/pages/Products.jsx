import { useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { products } from "../assets/products";
import ProductGrid from "../components/ProductGrid";
import PageHeader from "../components/PageHeader";

const ALL = "All";

export default function Products() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(ALL);
  const [sort, setSort] = useState("newest");

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return [ALL, ...Array.from(set).sort()];
  }, []);

  const filtered = useMemo(() => {
    let list = [...products];

    if (category !== ALL) {
      list = list.filter((p) => p.category === category);
    }

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    if (sort === "price-asc")  list.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort === "rating")     list.sort((a, b) => b.rating - a.rating);
    // "newest" keeps original order from the data file

    return list;
  }, [query, category, sort]);

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
          {filtered.length} {filtered.length === 1 ? "product" : "products"}
        </p>

        <ProductGrid products={filtered} />
      </section>
    </>
  );
}