import { useState } from "react";

export default function ProductSpecs({ highlights = [], specifications = [], inTheBox = [] }) {
  const [activeTab, setActiveTab] = useState("specs"); // "specs" | "highlights" | "box"

  return (
    <section className="mt-12 border-t border-hairline pt-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-semibold text-ink">
          Product Details & Specifications
        </h2>
        <div className="flex gap-2 border border-hairline rounded-md p-1 bg-white/60">
          <button
            type="button"
            onClick={() => setActiveTab("specs")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === "specs"
                ? "bg-ink text-white"
                : "text-slate hover:text-ink"
            }`}
          >
            Specifications
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("highlights")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === "highlights"
                ? "bg-ink text-white"
                : "text-slate hover:text-ink"
            }`}
          >
            Key Highlights
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("box")}
            className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider rounded transition-colors ${
              activeTab === "box"
                ? "bg-ink text-white"
                : "text-slate hover:text-ink"
            }`}
          >
            In The Box
          </button>
        </div>
      </div>

      {activeTab === "specs" && (
        <div className="space-y-6">
          {specifications.map((cat, idx) => (
            <div key={cat.category || idx} className="border border-hairline rounded-md bg-white/70 overflow-hidden">
              <div className="bg-paper/80 px-4 py-2.5 border-b border-hairline">
                <h3 className="text-xs font-semibold uppercase tracking-widest text-slate">
                  {cat.category}
                </h3>
              </div>
              <div className="divide-y divide-hairline">
                {cat.items.map((item, i) => (
                  <div
                    key={item.key || i}
                    className="grid grid-cols-1 sm:grid-cols-[220px_1fr] px-4 py-3 text-xs sm:text-sm hover:bg-ink/[0.015] transition-colors"
                  >
                    <span className="text-slate font-medium">{item.key}</span>
                    <span className="text-ink mt-0.5 sm:mt-0">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === "highlights" && (
        <div className="border border-hairline rounded-md bg-white/70 p-6">
          <ul className="space-y-3.5">
            {highlights.map((h, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-ink">
                <span className="w-2 h-2 rounded-full bg-brass mt-1.5 shrink-0" />
                <span className="leading-relaxed">{h}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {activeTab === "box" && (
        <div className="border border-hairline rounded-md bg-white/70 p-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {inTheBox.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded border border-hairline bg-paper/50">
                <span className="w-5 h-5 rounded-full bg-moss/10 text-moss flex items-center justify-center text-xs font-bold shrink-0">
                  ✓
                </span>
                <span className="text-sm font-medium text-ink">{item}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
