import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import PageHeader from "../components/PageHeader";

export default function About() {
  return (
    <>
      <PageHeader
        title="About AutoGift"
        subtitle="A simple demo product catalog built with Vite, React, and Tailwind CSS."
      />

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
        <div>
          <h2 className="text-xl font-semibold text-white">What this is</h2>
          <p className="mt-3 text-slate-300 leading-relaxed">
            AutoGift is a frontend-only demonstration of a product catalog. It shows
            a grid of sample products, individual product detail pages, search,
            filtering, and basic routing — all running on static dummy data.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">What this is not</h2>
          <ul className="mt-3 space-y-2 text-slate-300 leading-relaxed list-disc list-inside">
            <li>There is no real store, checkout, or payment system.</li>
            <li>No user accounts, orders, or inventory are stored.</li>
            <li>The product data is static and lives in a local file.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-white">Tech stack</h2>
          <ul className="mt-3 space-y-2 text-slate-300 leading-relaxed list-disc list-inside">
            <li>Vite + React</li>
            <li>Tailwind CSS v4</li>
            <li>React Router</li>
            <li>React Icons</li>
          </ul>
        </div>

        <div className="pt-4">
          <Link
            to="/products"
            className="inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200 font-medium"
          >
            Browse the catalog <FiArrowRight />
          </Link>
        </div>
      </section>
    </>
  );
}