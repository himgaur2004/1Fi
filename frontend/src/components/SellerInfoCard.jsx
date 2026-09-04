import { useState } from "react";

export default function SellerInfoCard({ seller = {} }) {
  const [pincode, setPincode] = useState("");
  const [deliveryStatus, setDeliveryStatus] = useState(null);

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (!pincode || pincode.trim().length < 6) {
      setDeliveryStatus({ valid: false, message: "Please enter a valid 6-digit PIN code." });
      return;
    }
    setDeliveryStatus({
      valid: true,
      message: `Delivery available to ${pincode.trim()} by Saturday • Free Express Shipping`,
    });
  };

  return (
    <div className="border border-hairline rounded-md bg-white/70 p-5 mt-6 space-y-4">
      <div className="flex items-start justify-between gap-3 border-b border-hairline pb-4">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-slate font-semibold block mb-0.5">
            Verified Seller
          </span>
          <h3 className="font-sans font-semibold text-ink text-base">
            {seller.name || "OmniTech Retail Pvt Ltd"}
          </h3>
          <p className="text-xs text-moss font-medium mt-0.5 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-moss"></span>
            {seller.badge || "Authorized Brand Partner"}
          </p>
        </div>

        <div className="text-right">
          <div className="inline-flex items-center gap-1 bg-moss text-white text-xs font-bold px-2 py-0.5 rounded">
            <span>{seller.rating || 4.8}</span>
            <span>★</span>
          </div>
          <p className="text-[11px] text-slate mt-1">
            {(seller.reviewCount || 18420).toLocaleString("en-IN")} ratings
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
        <div className="flex items-center gap-2.5 text-ink">
          <div className="w-7 h-7 rounded-full bg-brass/10 text-brass flex items-center justify-center font-bold text-xs shrink-0">
            ✓
          </div>
          <div>
            <p className="font-medium text-ink">7-Day Replacement</p>
            <p className="text-slate text-[11px]">{seller.returnPolicy || "Hassle-free replacement for defects"}</p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 text-ink">
          <div className="w-7 h-7 rounded-full bg-moss/10 text-moss flex items-center justify-center font-bold text-xs shrink-0">
            ★
          </div>
          <div>
            <p className="font-medium text-ink">1-Year Warranty</p>
            <p className="text-slate text-[11px]">{seller.warranty || "Official brand manufacturer warranty"}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline pt-3">
        <form onSubmit={handleCheckPincode} className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            maxLength={6}
            value={pincode}
            onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
            placeholder="Enter Delivery PIN Code"
            className="px-3 py-2 text-xs border border-hairline rounded-md bg-white text-ink placeholder:text-slate focus-visible:ring-2 focus-visible:ring-brass outline-none flex-1"
          />
          <button
            type="submit"
            className="px-4 py-2 text-xs font-semibold uppercase tracking-wider bg-ink text-white rounded-md hover:bg-ink/90 transition-colors cursor-pointer"
          >
            Check Delivery
          </button>
        </form>

        {deliveryStatus && (
          <p
            className={`text-xs mt-2 font-medium ${
              deliveryStatus.valid ? "text-moss" : "text-red-600"
            }`}
          >
            {deliveryStatus.message}
          </p>
        )}
      </div>
    </div>
  );
}
