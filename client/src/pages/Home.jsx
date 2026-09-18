import { api } from "../lib/api";
import { useApi } from "../lib/useApi";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const { data, loading, error } = useApi(() => api.products("?sort=newest&limit=20"), []);
  const latest = data ?? [];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Latest Products</h1>
        <p className="mt-2 text-slate-400 text-sm">
          Showing the newest {latest.length} items in our catalog.
        </p>
      </header>

      {loading && <p className="text-slate-400">Loading products...</p>}
      {error && <p className="text-rose-300">{error}</p>}
      {!loading && !error && <ProductGrid products={latest} />}
    </section>
  );
}