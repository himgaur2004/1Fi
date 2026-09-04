import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import ProductDetailPage from "./pages/ProductDetailPage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-paper text-ink flex flex-col font-sans selection:bg-brass/20 selection:text-ink">
        <Navbar />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products/:slug" element={<ProductDetailPage />} />
          </Routes>
        </div>
        <footer className="border-t border-hairline py-8 text-xs text-slate">
          <div className="max-w-[1100px] mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p>&copy; 2026 1Fi Technologies. Intelligent consumer asset financing backed by mutual fund assets.</p>
            <p className="font-mono">Assignment Submission &middot; SDE-1</p>
          </div>
        </footer>
      </div>
    </BrowserRouter>
  );
}
