import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useProduct } from "../hooks/useProduct";
import VariantSelector from "../components/VariantSelector";
import EMIPlanList from "../components/EMIPlanList";
import ImageMagnifierGallery from "../components/ImageMagnifierGallery";
import SellerInfoCard from "../components/SellerInfoCard";
import ProductSpecs from "../components/ProductSpecs";
import CustomerReviews from "../components/CustomerReviews";
import { Loading, ErrorState, NotFound } from "../components/StatusStates";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const { product, status } = useProduct(slug);

  const [activeVariantId, setActiveVariantId] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);

  // Sync active variant when product loads or slug changes
  useEffect(() => {
    if (product && product.variants && product.variants.length > 0) {
      const defaultVariant = product.variants[0];
      setActiveVariantId(defaultVariant.variantId);
      if (defaultVariant.emiPlans && defaultVariant.emiPlans.length > 0) {
        setSelectedPlan(defaultVariant.emiPlans[0]);
      }
    }
  }, [product]);

  if (status === "loading") return <Loading />;
  if (status === "error") return <ErrorState />;
  if (status === "notfound" || !product) return <NotFound />;

  const variant =
    product.variants.find((v) => v.variantId === activeVariantId) ||
    product.variants[0];

  // When variant changes, keep the same tenure if possible or default to first plan
  const handleVariantChange = (variantId) => {
    setActiveVariantId(variantId);
    const newVariant = product.variants.find((v) => v.variantId === variantId);
    if (newVariant && newVariant.emiPlans) {
      const matchedPlan = newVariant.emiPlans.find(
        (p) => p.tenureMonths === (selectedPlan ? selectedPlan.tenureMonths : 3)
      );
      setSelectedPlan(matchedPlan || newVariant.emiPlans[0]);
    }
  };

  const currentPlan = selectedPlan || (variant.emiPlans && variant.emiPlans[0]);

  const handleProceed = (planToProceed) => {
    const targetPlan = planToProceed || currentPlan;
    console.log("Proceeding with plan selection:", {
      productSlug: product.slug,
      productName: product.name,
      variantId: variant.variantId,
      color: variant.color,
      storage: variant.storage,
      price: variant.price,
      selectedPlan: targetPlan,
    });

    setConfirmationModal({
      productName: product.name,
      variantName: `${variant.color}${variant.storage ? ` · ${variant.storage}` : ""}`,
      monthlyAmount: targetPlan.monthlyAmount,
      tenureMonths: targetPlan.tenureMonths,
      interestRate: targetPlan.interestRate,
      cashback: targetPlan.cashback,
      totalFinanced: targetPlan.monthlyAmount * targetPlan.tenureMonths,
    });
  };

  // Pricing calculations
  const discountAmount = variant.mrp > variant.price ? variant.mrp - variant.price : 0;
  const discountPercent = variant.mrp > variant.price
    ? Math.round(((variant.mrp - variant.price) / variant.mrp) * 100)
    : 0;

  return (
    <main className="max-w-[1150px] mx-auto px-6 py-8 pb-28 md:pb-16">
      <nav className="text-xs uppercase tracking-wider text-slate mb-6 flex items-center gap-2">
        <Link to="/" className="hover:text-ink transition-colors">
          Catalog
        </Link>
        <span>/</span>
        <span className="text-slate font-normal">{product.brand}</span>
        <span>/</span>
        <span className="text-ink font-medium">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-[48%_52%] gap-10 lg:gap-12 items-start">
        <div className="space-y-6">
          <ImageMagnifierGallery
            images={variant.images}
            productName={product.name}
            variantColor={variant.color}
          />

          <VariantSelector
            variants={product.variants}
            activeVariantId={variant.variantId}
            onChange={handleVariantChange}
          />

          <SellerInfoCard seller={product.seller} />

          <div className="p-4 rounded-md border border-hairline bg-white/60 text-xs text-slate space-y-1.5">
            <p className="font-semibold text-ink flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-brass"></span>
              Mutual Fund Portfolio Pledge
            </p>
            <p className="leading-relaxed">
              Your mutual fund investments stay invested in your folio and continue earning full market returns. No liquidation required—units serve as lien security for the duration of the chosen tenure.
            </p>
          </div>
        </div>

        <div>
          <div className="border-b border-hairline pb-6">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-widest text-slate">
                {product.brand}
              </span>
              <span className="text-hairline">&bull;</span>
              <span className="text-xs font-medium text-moss bg-moss/10 px-2 py-0.5 rounded border border-moss/20">
                0% Interest Tenures
              </span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-semibold text-ink tracking-tight">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-3 mt-1.5 text-slate text-sm sm:text-base">
              <span>{variant.storage ? `${variant.storage} · ` : ""}{variant.color} Edition</span>
              <span>&bull;</span>
              <span className="inline-flex items-center gap-1 text-xs text-moss font-semibold bg-moss/10 px-2 py-0.5 rounded">
                ★ {product.ratingSummary?.average || 4.8} ({product.ratingSummary?.totalRatings || 1420})
              </span>
            </div>

            <div className="mt-5 p-4 rounded-md border border-hairline bg-white/70 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="font-display text-3xl sm:text-4xl font-semibold text-ink tabular-nums-emi">
                  ₹{variant.price.toLocaleString("en-IN")}
                </span>
                {variant.mrp > variant.price && (
                  <>
                    <span className="text-slate line-through text-base sm:text-lg tabular-nums-emi">
                      ₹{variant.mrp.toLocaleString("en-IN")}
                    </span>
                    <span className="text-xs font-bold text-moss bg-moss/10 px-2 py-0.5 rounded border border-moss/20">
                      {discountPercent}% OFF (Save ₹{discountAmount.toLocaleString("en-IN")})
                    </span>
                  </>
                )}
              </div>

              <div className="pt-2 border-t border-hairline/80 flex flex-wrap items-center justify-between text-xs text-slate gap-2">
                <span>
                  EMI starts at <strong className="text-ink font-semibold">₹{variant.emiPlans?.[6]?.monthlyAmount?.toLocaleString("en-IN") || "3,238"}/mo</strong>
                </span>
                <span className="text-moss font-medium">
                  ₹0 Down Payment with 1Fi Pledge
                </span>
              </div>
            </div>

            {product.description && (
              <p className="text-slate text-sm mt-4 leading-relaxed">
                {product.description}
              </p>
            )}
          </div>

          <div className="mt-6">
            <EMIPlanList
              plans={variant.emiPlans}
              selectedPlan={currentPlan}
              onSelectPlan={setSelectedPlan}
              onProceed={handleProceed}
            />
          </div>
        </div>
      </div>

      <ProductSpecs
        highlights={product.highlights}
        specifications={product.specifications}
        inTheBox={product.inTheBox}
      />

      <CustomerReviews
        ratingSummary={product.ratingSummary}
        reviews={product.reviews}
      />

      {currentPlan && (
        <aside aria-label="Mobile checkout bar" className="lg:hidden fixed bottom-0 left-0 right-0 bg-paper/95 backdrop-blur-md border-t border-hairline p-4 z-30 shadow-lg">
          <div className="flex items-center justify-between gap-4 max-w-[1100px] mx-auto">
            <div>
              <p className="text-xs text-slate uppercase tracking-wider">
                {currentPlan.tenureMonths} Mo Plan
              </p>
              <p className="font-display text-lg font-bold text-ink tabular-nums-emi">
                ₹{currentPlan.monthlyAmount.toLocaleString("en-IN")}
                <span className="text-xs font-normal text-slate">/mo</span>
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleProceed(currentPlan)}
              className="px-6 py-3 bg-brass text-white text-sm font-medium rounded-md hover:bg-brass/90 active:bg-brass/95 transition-all focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none cursor-pointer"
            >
              Proceed with plan
            </button>
          </div>
        </aside>
      )}

      {confirmationModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-ink/40 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="bg-paper border border-hairline rounded-md max-w-md w-full p-6 shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-hairline">
              <h3 className="font-display text-xl font-semibold text-ink">
                Plan Selection Summary
              </h3>
              <button
                type="button"
                onClick={() => setConfirmationModal(null)}
                className="text-slate hover:text-ink text-sm px-2 py-1 rounded focus-visible:ring-2 focus-visible:ring-brass cursor-pointer"
              >
                &times; Close
              </button>
            </div>

            <div className="py-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate">Selected Device</span>
                <span className="font-medium text-ink text-right">
                  {confirmationModal.productName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Configuration</span>
                <span className="text-ink text-right">
                  {confirmationModal.variantName}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">EMI Schedule</span>
                <span className="font-semibold text-ink tabular-nums-emi text-right">
                  ₹{confirmationModal.monthlyAmount.toLocaleString("en-IN")} &times; {confirmationModal.tenureMonths} mo
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate">Interest Rate</span>
                <span className="text-right font-medium text-moss">
                  {confirmationModal.interestRate === 0
                    ? "0% Flat (Zero Surcharge)"
                    : `${confirmationModal.interestRate}% Annual Flat`}
                </span>
              </div>
              {confirmationModal.cashback > 0 && (
                <div className="flex justify-between text-moss">
                  <span>Guaranteed Cashback</span>
                  <span className="font-semibold tabular-nums-emi">
                    ₹{confirmationModal.cashback.toLocaleString("en-IN")}
                  </span>
                </div>
              )}
              <div className="pt-3 border-t border-hairline flex justify-between text-base">
                <span className="font-medium text-ink">Total Repayment</span>
                <span className="font-display font-semibold text-ink tabular-nums-emi">
                  ₹{confirmationModal.totalFinanced.toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-hairline flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setConfirmationModal(null)}
                className="px-4 py-2 text-sm text-slate hover:text-ink transition-colors border border-hairline rounded-md cursor-pointer"
              >
                Back to Configurator
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(
                    `Application initiated for ${confirmationModal.productName} (${confirmationModal.variantName}) on a ${confirmationModal.tenureMonths}-month plan at ₹${confirmationModal.monthlyAmount.toLocaleString("en-IN")}/mo.`
                  );
                  setConfirmationModal(null);
                }}
                className="px-5 py-2 text-sm bg-brass text-white font-medium rounded-md hover:bg-brass/90 transition-all focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none cursor-pointer"
              >
                Confirm & Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
