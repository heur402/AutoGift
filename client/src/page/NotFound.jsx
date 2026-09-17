import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

export default function NotFound() {
  return (
    <section className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="text-3xl font-bold text-white">Page not found</h1>
      <p className="mt-3 text-slate-400">This page hasn't been built yet.</p>
      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 text-indigo-300 hover:text-indigo-200"
      >
        <FiArrowLeft /> Back to Home
      </Link>
    </section>
  );
}