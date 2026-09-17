export default function PageHeader({ title, subtitle }) {
  return (
    <header className="border-b border-white/10 bg-gradient-to-b from-indigo-600/10 to-transparent">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-white">{title}</h1>
        {subtitle && (
          <p className="mt-3 text-slate-400 max-w-2xl">{subtitle}</p>
        )}
      </div>
    </header>
  );
}