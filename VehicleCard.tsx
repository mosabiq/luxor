import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

// ============================================================================
// TypeScript Interfaces
// ============================================================================
export interface HotspotPosition {
  x: number; // in pixels relative to 476x412 card
  y: number; // in pixels relative to 476x412 card
}

export interface VehicleSlide {
  id: string;
  name: string;
  image: string;
  isAerial?: boolean;
}

// ============================================================================
// 1. Vehicle Hotspot Component (47 × 47 px translucent circle with white center)
// ============================================================================
interface VehicleHotspotProps {
  x: number;
  y: number;
  onClick?: () => void;
}

export const VehicleHotspot: React.FC<VehicleHotspotProps> = ({ x, y, onClick }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        left: `${x}px`,
        top: `${y}px`,
        transform: "translate(-50%, -50%)",
      }}
      className="absolute w-[47px] h-[47px] rounded-full p-0 border-none cursor-pointer z-20 transition-transform duration-200 ease-out hover:scale-105 active:scale-95 focus:outline-none"
      aria-label="Interactive Vehicle Hotspot"
    >
      <div className="w-full h-full rounded-full bg-[#EBEBEB]/75 backdrop-blur-md shadow-[0_5px_15px_rgba(0,0,0,0.06)] flex items-center justify-center">
        <span className="w-[11px] h-[11px] rounded-full bg-white shadow-[0_1px_3px_rgba(0,0,0,0.25)]" />
      </div>
    </button>
  );
};

// ============================================================================
// 2. Vehicle Image Component (Centered vertically & horizontally with containment)
// ============================================================================
interface VehicleImageProps {
  slide: VehicleSlide;
}

export const VehicleImage: React.FC<VehicleImageProps> = ({ slide }) => {
  if (slide.isAerial) {
    return (
      <img
        src={slide.image}
        alt={slide.name}
        className="absolute left-1/2 top-[27px] -translate-x-1/2 w-[158px] h-[275px] object-contain drop-shadow-[0_15px_22px_rgba(0,0,0,0.16)] pointer-events-none select-none"
      />
    );
  }

  return (
    <img
      src={slide.image}
      alt={slide.name}
      className="absolute left-1/2 top-[45px] -translate-x-1/2 w-[320px] max-w-[82%] h-[220px] object-contain drop-shadow-[0_16px_24px_rgba(0,0,0,0.22)] pointer-events-none select-none"
    />
  );
};

// ============================================================================
// 3. Vehicle Navigation Control Component (200 × 55 px rounded capsule)
// ============================================================================
interface VehicleNavigationProps {
  onPrev: () => void;
  onNext: () => void;
  isFirstSlide: boolean;
}

export const VehicleNavigation: React.FC<VehicleNavigationProps> = ({
  onPrev,
  onNext,
  isFirstSlide,
}) => {
  return (
    <div className="absolute left-1/2 top-[318px] -translate-x-1/2 w-[200px] h-[55px] rounded-full bg-[#EEEEEE] shadow-[0_3px_10px_rgba(0,0,0,0.05)] flex items-center justify-between p-[2px] box-border z-25">
      {/* Left Arrow (Active on first slide) */}
      <button
        type="button"
        onClick={onPrev}
        className={`h-[51px] rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 outline-none ${
          isFirstSlide
            ? "w-[100px] bg-white text-[#111111] shadow-[0_2px_7px_rgba(0,0,0,0.10)]"
            : "w-[94px] bg-transparent text-[#999999]"
        }`}
        aria-label="Previous Vehicle"
      >
        <ArrowLeft size={24} strokeWidth={2.2} />
      </button>

      {/* Right Arrow (Active on subsequent slides) */}
      <button
        type="button"
        onClick={onNext}
        className={`h-[51px] rounded-full border-none cursor-pointer flex items-center justify-center transition-all duration-200 outline-none ${
          !isFirstSlide
            ? "w-[100px] bg-white text-[#111111] shadow-[0_2px_7px_rgba(0,0,0,0.10)]"
            : "w-[94px] bg-transparent text-[#999999]"
        }`}
        aria-label="Next Vehicle"
      >
        <ArrowRight size={24} strokeWidth={2.2} />
      </button>
    </div>
  );
};

// ============================================================================
// Main VehicleCard Component (Exact 476 × 412 px Single Source of Truth)
// ============================================================================
const vehicleSlides: VehicleSlide[] = [
  {
    id: "silver-sports-car",
    name: "Silver Sports Car Top-Down",
    image: "porsche_clean_up.png",
    isAerial: true,
  },
  {
    id: "toyota-van",
    name: "Toyota Van",
    image: "toyota van.png",
    isAerial: false,
  },
  {
    id: "innova-crysta",
    name: "Innova Crysta",
    image: "innova crysta.png",
    isAerial: false,
  },
];

export const VehicleCard: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + vehicleSlides.length) % vehicleSlides.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % vehicleSlides.length);
  };

  const currentSlide = vehicleSlides[currentIndex];

  return (
    <div
      className="relative w-full max-w-[476px] h-[412px] bg-[#F8F8F8] border-[5px] border-white rounded-[36px] overflow-hidden shadow-[0_8px_25px_rgba(0,0,0,0.08)] box-border select-none"
      style={{ aspectRatio: "476 / 412" }}
    >
      {/* Vehicle Stage */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <VehicleImage slide={currentSlide} />

        {/* Two Hotspots (Visible on Top-Down View) */}
        {currentSlide.isAerial && (
          <>
            {/* Left Hotspot (X ≈ 157px, Y ≈ 121px) */}
            <VehicleHotspot x={157} y={121} />

            {/* Right / Rear Hotspot (X ≈ 280px, Y ≈ 270px) */}
            <VehicleHotspot x={280} y={270} />
          </>
        )}
      </div>

      {/* Bottom Capsule Navigation Control */}
      <VehicleNavigation
        onPrev={handlePrev}
        onNext={handleNext}
        isFirstSlide={currentIndex === 0}
      />
    </div>
  );
};

export default VehicleCard;
