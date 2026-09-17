export default function LegalSection({ id, title, children }) {
  return (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <div className="mt-3 space-y-3 text-slate-300 leading-relaxed text-sm sm:text-base">
        {children}
      </div>
    </section>
  );
}