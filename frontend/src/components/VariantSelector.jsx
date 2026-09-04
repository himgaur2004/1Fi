export default function VariantSelector({ variants, activeVariantId, onChange }) {
  return (
    <div className="mt-4">
      <p className="text-xs font-semibold uppercase tracking-wider text-slate mb-2">
        Select Edition & Storage
      </p>
      <div className="flex flex-wrap gap-2">
        {variants.map((v) => {
          const isActive = v.variantId === activeVariantId;
          return (
            <button
              key={v.variantId}
              type="button"
              onClick={() => onChange(v.variantId)}
              className={`px-3.5 py-2 text-sm rounded-md border transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none cursor-pointer
                ${
                  isActive
                    ? "border-brass text-ink bg-brass/[0.08] font-medium shadow-none ring-1 ring-brass"
                    : "border-hairline text-slate hover:border-ink/40 bg-white/60"
                }`}
            >
              <span className="text-ink font-medium">{v.color}</span>
              {v.storage && (
                <span className="text-slate font-normal"> &middot; {v.storage}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
