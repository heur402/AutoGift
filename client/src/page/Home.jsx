import { products } from "../assets/products";
import ProductGrid from "../components/ProductGrid";

export default function Home() {
  const latest = products.slice(0, 20);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Latest Products</h1>
        <p className="mt-2 text-slate-400 text-sm">
          Showing the newest {latest.length} items in our catalog.
        </p>
      </header>

      <ProductGrid products={latest} />
    </section>
  );
}