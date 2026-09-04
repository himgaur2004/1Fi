import { useState } from "react";

export default function CustomerReviews({ ratingSummary = {}, reviews = [] }) {
  const [filterStar, setFilterStar] = useState(0); // 0 = All

  const filteredReviews = filterStar === 0
    ? reviews
    : reviews.filter((r) => r.rating === filterStar);

  const average = ratingSummary.average || 4.8;
  const totalRatings = ratingSummary.totalRatings || 1420;
  const totalReviews = ratingSummary.totalReviews || 384;
  const distribution = ratingSummary.distribution || [
    { star: 5, percentage: 84, count: 1192 },
    { star: 4, percentage: 11, count: 156 },
    { star: 3, percentage: 3, count: 42 },
    { star: 2, percentage: 1, count: 15 },
    { star: 1, percentage: 1, count: 15 },
  ];

  return (
    <section className="mt-14 border-t border-hairline pt-10">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="font-display text-2xl font-semibold text-ink">
            Customer Ratings & Reviews
          </h2>
          <p className="text-xs text-slate mt-0.5">
            Verified purchases financed via 1Fi mutual fund pledges
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 p-6 rounded-md border border-hairline bg-white/70 mb-8 items-center">
        <div className="text-center md:text-left border-b md:border-b-0 md:border-r border-hairline pb-6 md:pb-0 md:pr-6">
          <div className="flex items-baseline justify-center md:justify-start gap-2">
            <span className="font-display text-5xl font-bold text-ink">
              {average}
            </span>
            <span className="text-slate text-lg">/ 5</span>
          </div>
          <div className="flex items-center justify-center md:justify-start gap-1 text-brass text-lg my-1.5">
            {"★".repeat(Math.round(average))}
            <span className="text-hairline">
              {"★".repeat(5 - Math.round(average))}
            </span>
          </div>
          <p className="text-xs text-slate">
            Based on <span className="font-semibold text-ink">{totalRatings.toLocaleString("en-IN")}</span> ratings &amp; <span className="font-semibold text-ink">{totalReviews.toLocaleString("en-IN")}</span> reviews
          </p>
          <div className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-moss bg-moss/10 px-2.5 py-1 rounded border border-moss/20">
            <span>✓</span> 100% Verified Buyers
          </div>
        </div>

        <div className="space-y-2">
          {distribution.map((d) => (
            <div key={d.star} className="flex items-center gap-3 text-xs">
              <span className="w-8 font-medium text-slate text-right">
                {d.star} ★
              </span>
              <div className="flex-1 h-2 rounded-full bg-hairline/70 overflow-hidden">
                <div
                  style={{ width: `${d.percentage}%` }}
                  className="h-full bg-brass rounded-full"
                />
              </div>
              <span className="w-12 font-mono text-[11px] text-slate text-right">
                {d.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
        <span className="text-xs uppercase tracking-wider text-slate font-semibold mr-1">
          Filter:
        </span>
        <button
          type="button"
          onClick={() => setFilterStar(0)}
          className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
            filterStar === 0
              ? "bg-ink text-white"
              : "border border-hairline bg-white/70 text-slate hover:text-ink"
          }`}
        >
          All ({reviews.length})
        </button>
        <button
          type="button"
          onClick={() => setFilterStar(5)}
          className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
            filterStar === 5
              ? "bg-ink text-white"
              : "border border-hairline bg-white/70 text-slate hover:text-ink"
          }`}
        >
          5 Stars
        </button>
        <button
          type="button"
          onClick={() => setFilterStar(4)}
          className={`px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider transition-colors ${
            filterStar === 4
              ? "bg-ink text-white"
              : "border border-hairline bg-white/70 text-slate hover:text-ink"
          }`}
        >
          4 Stars
        </button>
      </div>

      <div className="space-y-4">
        {filteredReviews.map((rev) => (
          <div
            key={rev.id}
            className="p-5 rounded-md border border-hairline bg-white/70 hover:bg-white transition-colors"
          >
            <div className="flex items-start justify-between gap-4 mb-2">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="inline-flex items-center gap-0.5 bg-moss text-white text-[11px] font-bold px-1.5 py-0.5 rounded">
                    <span>{rev.rating}</span>
                    <span>★</span>
                  </span>
                  <h4 className="font-sans font-semibold text-ink text-sm sm:text-base">
                    {rev.title}
                  </h4>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate">
                  <span className="font-medium text-ink">{rev.author}</span>
                  <span>&bull;</span>
                  {rev.verifiedBuyer && (
                    <>
                      <span className="text-moss font-medium">✓ Verified Buyer</span>
                      <span>&bull;</span>
                    </>
                  )}
                  <span>{rev.date}</span>
                </div>
              </div>

              <div className="text-xs text-slate font-mono whitespace-nowrap">
                👍 {rev.helpfulCount}
              </div>
            </div>

            <p className="text-sm text-slate leading-relaxed mt-3">
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
