export default function FormMessage({ error, success }) {
  if (error) return <p className="mt-4 text-sm text-rose-300">{error}</p>;
  if (success) return <p className="mt-4 text-sm text-emerald-300">{success}</p>;
  return null;
}
