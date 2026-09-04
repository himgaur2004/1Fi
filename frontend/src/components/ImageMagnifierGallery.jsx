import { useState, useRef } from "react";

export default function ImageMagnifierGallery({ images = [], productName = "", variantColor = "" }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isZooming, setIsZooming] = useState(false);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0, percentX: 0, percentY: 0 });

  const containerRef = useRef(null);

  const angleLabels = [
    "Front View",
    "Back & Camera",
    "Side Profile",
    "3D Angle"
  ];

  const currentImage = images[activeIdx] || images[0] || "iphone-17-pro-silver-1.png";
  const imageSrc = `/products/${currentImage}`;

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Mouse coords relative to image container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Lens dimensions
    const lensSize = 140;
    
    // Clamp lens position inside container
    let x = mouseX - lensSize / 2;
    let y = mouseY - lensSize / 2;

    if (x < 0) x = 0;
    if (y < 0) y = 0;
    if (x > rect.width - lensSize) x = rect.width - lensSize;
    if (y > rect.height - lensSize) y = rect.height - lensSize;

    // Calculate percentages for zoomed background (0% to 100%)
    const percentX = (x / (rect.width - lensSize)) * 100;
    const percentY = (y / (rect.height - lensSize)) * 100;

    setLensPosition({ x, y, percentX, percentY });
  };

  const handleMouseEnter = () => setIsZooming(true);
  const handleMouseLeave = () => setIsZooming(false);

  return (
    <div className="relative">
      <div className="flex flex-col-reverse sm:flex-row gap-4 items-start">
        <div className="flex sm:flex-col gap-2.5 overflow-x-auto sm:overflow-visible w-full sm:w-[84px] shrink-0 py-1">
          {images.map((img, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={img}
                type="button"
                onClick={() => setActiveIdx(idx)}
                onMouseEnter={() => setActiveIdx(idx)}
                className={`relative rounded-md border p-1.5 transition-all duration-150 bg-white/80 group focus-visible:ring-2 focus-visible:ring-brass outline-none cursor-pointer flex flex-col items-center
                  ${
                    isActive
                      ? "border-brass shadow-sm ring-1 ring-brass"
                      : "border-hairline hover:border-slate/50"
                  }`}
                title={angleLabels[idx] || `Angle ${idx + 1}`}
              >
                <div className="w-14 h-14 sm:w-16 sm:h-16 flex items-center justify-center overflow-hidden">
                  <img
                    src={`/products/${img}`}
                    alt={`${productName} thumbnail ${idx + 1}`}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform"
                  />
                </div>
                <span className="hidden sm:block text-[9px] font-medium text-slate uppercase tracking-tight mt-1 text-center truncate max-w-[64px]">
                  {angleLabels[idx] || `Angle ${idx + 1}`}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex-1 w-full relative">
          <div
            ref={containerRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
            className="relative aspect-square w-full rounded-md border border-hairline bg-white/70 p-6 flex items-center justify-center overflow-hidden cursor-crosshair select-none"
          >
            <img
              src={imageSrc}
              alt={`${productName} in ${variantColor} - ${angleLabels[activeIdx] || "View"}`}
              className="w-full h-full object-contain transition-transform duration-200"
            />

            <div className={`absolute bottom-3 left-3 bg-paper/90 backdrop-blur-sm border border-hairline px-2.5 py-1 rounded text-[11px] font-medium text-slate pointer-events-none transition-opacity duration-200 ${isZooming ? 'opacity-0' : 'opacity-100'}`}>
              Roll over image to zoom
            </div>

            {isZooming && (
              <div
                style={{
                  top: `${lensPosition.y}px`,
                  left: `${lensPosition.x}px`,
                  width: "140px",
                  height: "140px",
                }}
                className="absolute pointer-events-none border border-brass/70 bg-brass/15 shadow-sm rounded-sm"
              />
            )}
          </div>

          {isZooming && (
            <div
              className="hidden lg:block absolute top-0 left-[103%] w-[480px] h-[480px] z-40 bg-white border border-hairline rounded-md shadow-2xl overflow-hidden pointer-events-none"
            >
              <div
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundPosition: `${lensPosition.percentX}% ${lensPosition.percentY}%`,
                  backgroundSize: "280% 280%",
                  backgroundRepeat: "no-repeat",
                  width: "100%",
                  height: "100%",
                }}
              />
              <div className="absolute top-2 right-2 bg-paper/90 px-2 py-0.5 rounded text-[10px] uppercase font-mono tracking-wider text-slate border border-hairline">
                2.8&times; Magnification
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Angle label caption */}
      <div className="mt-2.5 flex items-center justify-between text-xs text-slate px-1">
        <span className="font-medium text-ink">
          Angle: <span className="text-slate font-normal">{angleLabels[activeIdx]}</span>
        </span>
        <span className="font-mono text-[11px]">{activeIdx + 1} of {images.length} photos</span>
      </div>
    </div>
  );
}
