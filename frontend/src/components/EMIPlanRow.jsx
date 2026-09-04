export default function EMIPlanRow({ plan, selected, onSelect }) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`group w-full flex items-center justify-between px-4 sm:px-5 py-3.5 border-b border-hairline text-left transition-all duration-150 focus-visible:ring-2 focus-visible:ring-brass focus-visible:ring-offset-2 outline-none cursor-pointer last:border-b-0 select-none
        ${
          selected
            ? "border-l-4 border-l-brass bg-brass/[0.09] ring-1 ring-inset ring-brass/20 shadow-xs"
            : "border-l-4 border-l-transparent hover:bg-ink/[0.03] hover:border-l-slate/40"
        }`}
    >
      <div className="flex items-center gap-3.5 sm:gap-4">
        {/* Visual radio button indicator */}
        <div
          className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all duration-150 ${
            selected
              ? "bg-brass text-white shadow-xs scale-105"
              : "border-2 border-slate/40 group-hover:border-slate/70 bg-white"
          }`}
        >
          {selected && (
            <svg
              className="w-3 h-3 stroke-[3]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          )}
        </div>

        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className={`font-sans tabular-nums-emi transition-colors ${
                selected ? "font-bold text-ink text-base sm:text-lg" : "font-medium text-ink text-base"
              }`}
            >
              ₹{plan.monthlyAmount.toLocaleString("en-IN")}
              <span className="text-slate font-normal text-sm sm:text-base">
                {" "}
                &times; {plan.tenureMonths} months
              </span>
            </p>
            {selected && (
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brass bg-brass/15 px-2 py-0.5 rounded-full">
                Selected Plan
              </span>
            )}
          </div>
          {plan.cashback > 0 && (
            <p className="text-xs sm:text-sm text-moss font-medium mt-0.5">
              Additional cashback of ₹{plan.cashback.toLocaleString("en-IN")}
            </p>
          )}
        </div>
      </div>

      <div className="text-right shrink-0 ml-2">
        <span
          className={`text-xs sm:text-sm font-semibold whitespace-nowrap px-2.5 py-1 rounded transition-colors ${
            plan.interestRate === 0
              ? "bg-moss/10 text-moss border border-moss/20"
              : selected
              ? "bg-white text-slate border border-slate/30"
              : "text-slate"
          }`}
        >
          {plan.interestRate === 0 ? "0% interest" : `${plan.interestRate}% interest`}
        </span>
      </div>
    </button>
  );
}
