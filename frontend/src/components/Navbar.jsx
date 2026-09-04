import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="border-b border-hairline bg-paper/95 sticky top-0 z-20 backdrop-blur-sm">
      <div className="max-w-[1100px] mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group">
          <span className="font-display font-bold text-2xl tracking-tight text-ink group-hover:text-brass transition-colors">
            1Fi
          </span>
          <span className="hidden sm:inline-block text-xs font-medium uppercase tracking-widest text-slate border-l border-hairline pl-3">
            Mutual Fund Financed Device Plans
          </span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-wider text-slate hover:text-ink transition-colors"
          >
            Catalog
          </Link>
        
        </div>
      </div>
    </header>
  );
}
