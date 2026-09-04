import { Link } from "react-router-dom";

export const Loading = () => (
  <div className="max-w-[1100px] mx-auto px-6 py-24 flex flex-col items-center justify-center gap-4 text-slate">
    <div className="w-6 h-6 border-2 border-hairline border-t-brass rounded-full animate-spin"></div>
    <span className="text-sm font-medium tracking-wide">Loading product…</span>
  </div>
);

export const ErrorState = () => (
  <div className="max-w-[1100px] mx-auto px-6 py-24 text-slate">
    <div className="border border-hairline bg-white/60 p-8 rounded-md max-w-lg">
      <h2 className="text-lg font-semibold text-ink mb-2">Connection Error</h2>
      <p className="text-sm mb-4">Couldn't load this product. Check your connection and try again.</p>
      <Link
        to="/"
        className="inline-block text-xs font-semibold text-ink uppercase tracking-wider underline hover:text-brass transition-colors"
      >
        &larr; Back to all devices
      </Link>
    </div>
  </div>
);

export const NotFound = () => (
  <div className="max-w-[1100px] mx-auto px-6 py-24 text-slate">
    <div className="border border-hairline bg-white/60 p-8 rounded-md max-w-lg">
      <h2 className="text-lg font-semibold text-ink mb-2">Device Not Found</h2>
      <p className="text-sm mb-4">No product matches this link.</p>
      <Link
        to="/"
        className="inline-block text-xs font-semibold text-ink uppercase tracking-wider underline hover:text-brass transition-colors"
      >
        &larr; Browse catalog
      </Link>
    </div>
  </div>
);
