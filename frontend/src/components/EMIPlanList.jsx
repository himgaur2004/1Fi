import EMIPlanRow from "./EMIPlanRow";

export default function EMIPlanList({ plans, selectedPlan, onSelectPlan, onProceed }) {
  const currentPlan = selectedPlan || (plans && plans[0]);

  return (
    <div>
      <div className="flex items-center justify-between mb-2.5">
        <div>
          <h2 className="font-sans text-sm font-semibold text-ink">
            EMI plans backed by mutual funds
          </h2>
          <p className="text-xs text-slate mt-0.5">
            Click any tenure below to select your installment plan
          </p>
        </div>
        {currentPlan && (
          <span className="text-xs font-semibold text-brass bg-brass/10 px-2.5 py-1 rounded border border-brass/20">
            {currentPlan.tenureMonths} Mo Selected
          </span>
        )}
      </div>

      <div
        role="radiogroup"
        aria-label="Flexible EMI Tenures"
        className="border border-hairline rounded-md overflow-hidden bg-white/70 divide-y divide-hairline shadow-xs"
      >
        {plans.map((plan) => (
          <EMIPlanRow
            key={plan.tenureMonths}
            plan={plan}
            selected={currentPlan && currentPlan.tenureMonths === plan.tenureMonths}
            onSelect={() => onSelectPlan(plan)}
          />
        ))}
      </div>

      <div className="mt-5 hidden md:block">
        <button
          type="button"
          onClick={() => onProceed(currentPlan)}
          className="w-full sm:w-auto px-7 py-3.5 bg-brass text-white font-sans font-medium rounded-md hover:bg-brass/90 active:bg-brass/95 transition-all focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none cursor-pointer flex items-center justify-center gap-2 shadow-xs"
        >
          <span>
            Proceed with ₹{currentPlan ? currentPlan.monthlyAmount.toLocaleString("en-IN") : 0}/mo Plan ({currentPlan ? currentPlan.tenureMonths : 0} months)
          </span>
          <span>&rarr;</span>
        </button>
      </div>
    </div>
  );
}
