import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { api } from "../../lib/api";

const emptyProduct = {
  name: "", price: "", currency: "USD", category: "", rating: "5",
  images: "", description: "",
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyProduct);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  const loadProducts = () => api.products("?limit=100").then(setProducts).catch((err) => setError(err.message));
  useEffect(() => { loadProducts(); }, []);

  const update = (key) => (event) => setForm((current) => ({ ...current, [key]: event.target.value }));
  const startEdit = (product) => {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      currency: product.currency,
      category: product.category,
      rating: product.rating,
      images: product.images.join("\n"),
      description: product.description,
    });
    setMessage("");
    setError("");
  };
  const reset = () => {
    setEditingId(null);
    setForm(emptyProduct);
  };

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");
    const payload = {
      ...form,
      price: Number(form.price),
      rating: Number(form.rating),
      images: form.images.split(/\n|,/).map((image) => image.trim()).filter(Boolean),
    };
    try {
      const saved = editingId
        ? await api.updateProduct(editingId, payload)
        : await api.createProduct(payload);
      setProducts((current) => editingId
        ? current.map((product) => product.id === editingId ? saved : product)
        : [saved, ...current]);
      setMessage(editingId ? "Product updated successfully." : "Product added to the storefront.");
      reset();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product) => {
    if (!window.confirm(`Delete ${product.name}? Existing orders will keep their purchase record.`)) return;
    try {
      await api.deleteProduct(product.id);
      setProducts((current) => current.filter((item) => item.id !== product.id));
      setMessage("Product removed from the storefront.");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <p className="text-xs uppercase tracking-wide text-indigo-300">Catalog management</p>
        <h2 className="mt-2 text-xl sm:text-2xl font-bold text-white">Products</h2>
        <p className="mt-1 text-sm text-slate-400">Add products that customers can buy and track through Orders.</p>
      </header>
      {message && <p className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-sm">{message}</p>}
      {error && <p className="text-rose-300">{error}</p>}

      <section className="p-5 rounded-2xl bg-white/5 border border-white/10">
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-white font-semibold">{editingId ? "Edit product" : "Add a product"}</h3>
          {editingId && <button type="button" onClick={reset} className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white"><FiX /> Cancel</button>}
        </div>
        <form onSubmit={submit} className="mt-5 grid md:grid-cols-2 gap-4">
          <Input label="Product name" value={form.name} onChange={update("name")} required />
          <Input label="Category" value={form.category} onChange={update("category")} required />
          <Input label="Price" type="number" min="0" step="0.01" value={form.price} onChange={update("price")} required />
          <Input label="Currency" value={form.currency} onChange={update("currency")} required />
          <Input label="Rating (0-5)" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={update("rating")} required />
          <label className="block md:col-span-2"><span className="block mb-2 text-sm text-slate-300">Image URLs (one per line, up to 5)</span><textarea rows={3} value={form.images} onChange={update("images")} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60" placeholder="https://..." /></label>
          <label className="block md:col-span-2"><span className="block mb-2 text-sm text-slate-300">Description</span><textarea rows={4} value={form.description} onChange={update("description")} required className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60" /></label>
          <button disabled={saving} className="md:col-span-2 inline-flex justify-center items-center gap-2 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white font-semibold disabled:opacity-50"><FiPlus /> {saving ? "Saving..." : editingId ? "Save product" : "Add product"}</button>
        </form>
      </section>

      <section className="rounded-2xl border border-white/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-white/5 text-slate-400 text-xs uppercase tracking-wide"><tr><th className="text-left px-4 py-3">Product</th><th className="text-left px-4 py-3">Category</th><th className="text-left px-4 py-3">Price</th><th className="text-left px-4 py-3">Rating</th><th className="text-right px-4 py-3">Actions</th></tr></thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => <tr key={product.id} className="hover:bg-white/[0.02]"><td className="px-4 py-3"><p className="text-white font-medium">{product.name}</p><p className="text-xs text-slate-500">{product.id}</p></td><td className="px-4 py-3 text-slate-300">{product.category}</td><td className="px-4 py-3 text-slate-300">{product.currency} {Number(product.price).toFixed(2)}</td><td className="px-4 py-3 text-slate-300">{Number(product.rating).toFixed(1)}</td><td className="px-4 py-3"><div className="flex justify-end gap-2"><button type="button" onClick={() => startEdit(product)} className="p-2 rounded-lg text-indigo-300 hover:bg-white/10" title="Edit product" aria-label={`Edit ${product.name}`}><FiEdit2 /></button><button type="button" onClick={() => remove(product)} className="p-2 rounded-lg text-rose-300 hover:bg-white/10" title="Delete product" aria-label={`Delete ${product.name}`}><FiTrash2 /></button></div></td></tr>)}
              {!products.length && <tr><td colSpan={5} className="px-4 py-10 text-center text-slate-500">No products in the catalog.</td></tr>}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Input({ label, ...props }) {
  return <label className="block"><span className="block mb-2 text-sm text-slate-300">{label}</span><input {...props} className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-slate-500 focus:outline-none focus:border-indigo-500/60" /></label>;
}
