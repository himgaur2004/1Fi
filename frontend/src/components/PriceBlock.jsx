export default function PriceBlock({ mrp, price }) {
  const savings = mrp > price ? mrp - price : 0;

  return (
    <div className="flex flex-wrap items-baseline gap-3">
      <span className="font-display text-3xl font-semibold text-ink tabular-nums-emi">
        ₹{price.toLocaleString("en-IN")}
      </span>
      {mrp > price && (
        <>
          <span className="text-slate line-through text-base tabular-nums-emi">
            ₹{mrp.toLocaleString("en-IN")}
          </span>
          <span className="text-xs font-semibold text-moss bg-moss/10 px-2 py-0.5 rounded border border-moss/20">
            Save ₹{savings.toLocaleString("en-IN")}
          </span>
        </>
      )}
    </div>
  );
}
