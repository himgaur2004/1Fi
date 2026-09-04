import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const variants = product.variants || [];
  const primaryVariant = variants[0] || {};
  
  // Find minimum price among variants
  const minPrice = variants.reduce(
    (min, v) => (v.price < min ? v.price : min),
    primaryVariant.price || 0
  );
  const minMrp = variants.reduce(
    (min, v) => (v.mrp < min ? v.mrp : min),
    primaryVariant.mrp || 0
  );

  const imageSrc = primaryVariant.images && primaryVariant.images[0]
    ? `/products/${primaryVariant.images[0]}`
    : "/products/iphone-17-pro-silver-1.png";

  return (
    <Link
      to={`/products/${product.slug}`}
      className="group block border border-hairline rounded-md bg-white/60 p-5 hover:border-brass/70 transition-all duration-200 hover:bg-white focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none"
    >
      <div className="aspect-square w-full rounded-md border border-hairline bg-paper/60 p-4 mb-4 overflow-hidden flex items-center justify-center group-hover:border-hairline/80">
        <img
          src={imageSrc}
          alt={product.name}
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div>
        <div className="flex items-center justify-between gap-2 mb-1">
          <span className="text-xs uppercase tracking-wider font-semibold text-slate">
            {product.brand}
          </span>
          <span className="text-[11px] font-medium text-moss bg-moss/10 px-2 py-0.5 rounded border border-moss/20">
            0% EMI eligible
          </span>
        </div>

        <h3 className="font-display text-xl font-semibold text-ink group-hover:text-brass transition-colors leading-snug">
          {product.name}
        </h3>

        <p className="text-xs text-slate mt-1">
          {variants.length} edition{variants.length > 1 ? "s" : ""} available
          {primaryVariant.storage ? ` · From ${primaryVariant.storage}` : ""}
        </p>

        <div className="mt-4 pt-3 border-t border-hairline flex items-baseline justify-between">
          <div>
            <span className="text-[11px] text-slate block">Starting at</span>
            <span className="font-display text-xl font-semibold text-ink tabular-nums-emi">
              ₹{minPrice.toLocaleString("en-IN")}
            </span>
          </div>
          {minMrp > minPrice && (
            <span className="text-xs text-slate line-through tabular-nums-emi">
              ₹{minMrp.toLocaleString("en-IN")}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
