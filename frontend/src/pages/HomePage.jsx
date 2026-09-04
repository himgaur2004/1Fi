import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/ProductCard";
import { Loading, ErrorState } from "../components/StatusStates";

export default function HomePage() {
  const { products, status } = useProducts();

  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorState />;

  return (
    <main className="max-w-[1100px] mx-auto px-6 py-10">
      <div className="border-b border-hairline pb-8 mb-10">
        <div className="inline-block px-2.5 py-1 rounded bg-brass/10 text-brass text-xs font-semibold uppercase tracking-widest mb-3 border border-brass/20">
          Smart Asset Financing
        </div>
        <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-ink tracking-tight max-w-2xl">
          Premium smartphones, financed by your investments.
        </h1>
        <p className="text-slate text-base sm:text-lg mt-3 max-w-2xl leading-relaxed">
          Select your flagship device and finance it with 0% interest tenures and instant cashbacks backed by your mutual fund portfolio.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-6 border-t border-hairline/80">
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-moss mt-2"></span>
            <div>
              <p className="text-xs font-semibold text-ink uppercase tracking-wider">Zero Depreciation Penalties</p>
              <p className="text-xs text-slate mt-0.5">Flexible 3 to 60-month tenures aligned with market returns.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-moss mt-2"></span>
            <div>
              <p className="text-xs font-semibold text-ink uppercase tracking-wider">0% Interest Up To 24M</p>
              <p className="text-xs text-slate mt-0.5">No hidden charges or compounding fee traps.</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <span className="w-2 h-2 rounded-full bg-moss mt-2"></span>
            <div>
              <p className="text-xs font-semibold text-ink uppercase tracking-wider">Up to ₹7,500 Cashback</p>
              <p className="text-xs text-slate mt-0.5">Credited directly to your mutual fund ledger upon approval.</p>
            </div>
          </div>
        </div>
      </div>

      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-display text-2xl font-semibold text-ink">
            Available Devices
          </h2>
          <span className="text-xs font-mono text-slate">
            {products.length} models ready to finance
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
}
