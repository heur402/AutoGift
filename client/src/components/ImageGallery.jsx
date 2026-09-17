import { useEffect, useState } from "react";

export default function ImageGallery({ images = [], alt = "" }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    setActive(0);
  }, [images]);

  if (!images.length) {
    return (
      <div className="aspect-square rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center text-slate-600">
        No image
      </div>
    );
  }

  return (
    <div>
      <div className="aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
        <img src={images[active]} alt={alt} className="w-full h-full object-cover" />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-2 flex-wrap">
          {images.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
              className={`w-16 h-16 rounded-lg overflow-hidden border transition ${
                i === active
                  ? "border-indigo-500 ring-2 ring-indigo-500/40"
                  : "border-white/10 hover:border-white/30"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}