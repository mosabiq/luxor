import React, { useState } from "react";

export type VehicleType = "5 Seater" | "7 Seater" | "Van";
export type BookingMode = "room" | "vehicle";

export interface BookingState {
  activeMode: BookingMode;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  dropoffDate: string;
  vehicleType: VehicleType;
}

// ----------------------------------------------------
// 1. Mode Selector Component
// ----------------------------------------------------
interface BookingModeSelectorProps {
  activeMode: BookingMode;
  onSelectMode: (mode: BookingMode) => void;
}

export const BookingModeSelector: React.FC<BookingModeSelectorProps> = ({
  activeMode,
  onSelectMode,
}) => {
  return (
    <div className="flex items-center bg-white border border-[#E7E7E7] rounded-full p-1 w-fit shadow-sm mb-5">
      <button
        type="button"
        onClick={() => onSelectMode("room")}
        className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
          activeMode === "room"
            ? "bg-[#111111] text-white shadow-md"
            : "bg-transparent text-[#111111] hover:bg-[#F7F7F7]"
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 4v16M2 8h18a2 2 0 0 1 2 2v10M2 17h20M6 8v9" />
        </svg>
        <span>Room</span>
      </button>

      <button
        type="button"
        onClick={() => onSelectMode("vehicle")}
        className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
          activeMode === "vehicle"
            ? "bg-[#111111] text-white shadow-md"
            : "bg-transparent text-[#111111] hover:bg-[#F7F7F7]"
        }`}
      >
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
          <circle cx="7" cy="17" r="2" />
          <path d="M9 17h6" />
          <circle cx="17" cy="17" r="2" />
        </svg>
        <span>Vehicle</span>
      </button>
    </div>
  );
};

// ----------------------------------------------------
// 2. Location Input with Suggestions
// ----------------------------------------------------
interface LocationInputProps {
  label: string;
  value: string;
  placeholder: string;
  onChange: (val: string) => void;
  suggestions?: string[];
}

export const LocationInput: React.FC<LocationInputProps> = ({
  label,
  value,
  placeholder,
  onChange,
  suggestions = [
    "Downtown Terminal, City Center",
    "International Airport (Terminal 1)",
    "123 Anywhere St., Any City",
    "Grand Resort & Marina Hotel",
  ],
}) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-1 relative">
      <label className="text-[11px] font-bold text-[#6B6B6B] tracking-wider uppercase">
        {label}
      </label>
      <div className="relative">
        <div className="flex items-center gap-2 bg-[#F7F7F7] border border-[#E7E7E7] rounded-full px-3.5 py-2.5 hover:border-[#111] focus-within:border-[#111] focus-within:bg-white transition-colors">
          <svg className="w-4 h-4 text-[#111111] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <input
            type="text"
            value={value}
            placeholder={placeholder}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 200)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-[#111111] text-xs font-medium outline-none placeholder:text-[#8C8C8C]"
          />
        </div>

        {open && (
          <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E7E7E7] rounded-2xl shadow-xl z-50 overflow-hidden py-1">
            {suggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onChange(item)}
                className="px-4 py-2.5 text-xs text-[#222] font-medium hover:bg-[#F5F5F5] cursor-pointer"
              >
                📍 {item}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 3. DatePicker Component
// ----------------------------------------------------
interface DatePickerProps {
  label: string;
  value: string;
  minDate?: string;
  onChange: (val: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  label,
  value,
  minDate,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[11px] font-bold text-[#6B6B6B] tracking-wider uppercase">
        {label}
      </label>
      <div className="relative flex items-center gap-2 bg-[#F7F7F7] border border-[#E7E7E7] rounded-full px-3.5 py-2.5 hover:border-[#111] cursor-pointer transition-colors">
        <svg className="w-4 h-4 text-[#111111] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
        <span className="text-xs font-semibold text-[#111111]">
          {value || "Select date"}
        </span>
        <input
          type="date"
          min={minDate}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
        />
      </div>
    </div>
  );
};

// ----------------------------------------------------
// 4. Vehicle Type Dropdown
// ----------------------------------------------------
interface VehicleTypeDropdownProps {
  value: VehicleType;
  onChange: (type: VehicleType) => void;
}

export const VehicleTypeDropdown: React.FC<VehicleTypeDropdownProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const options: VehicleType[] = ["5 Seater", "7 Seater", "Van"];

  return (
    <div className="flex flex-col gap-1 relative w-full max-w-[280px]">
      <label className="text-[11px] font-bold text-[#6B6B6B] tracking-wider uppercase">
        VEHICLE TYPE
      </label>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between bg-[#F7F7F7] border border-[#E7E7E7] rounded-full px-4 py-2.5 hover:border-[#111] transition-colors"
      >
        <div className="flex items-center gap-2 text-xs font-semibold text-[#111]">
          <svg className="w-4 h-4 text-[#111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
            <circle cx="7" cy="17" r="2" />
            <path d="M9 17h6" />
            <circle cx="17" cy="17" r="2" />
          </svg>
          <span>{value}</span>
        </div>
        <span className="text-[10px] font-bold text-[#111]">˅</span>
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-[#E7E7E7] rounded-2xl shadow-xl z-50 overflow-hidden py-1">
          {options.map((opt) => (
            <div
              key={opt}
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={`flex items-center gap-2.5 px-4 py-2.5 text-xs font-medium hover:bg-[#F5F5F5] cursor-pointer ${
                value === opt ? "font-semibold text-[#111]" : "text-[#444]"
              }`}
            >
              <span className={`text-xs ${value === opt ? "opacity-100" : "opacity-0"}`}>
                ✓
              </span>
              <span>{opt}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------
// 5. Search Button
// ----------------------------------------------------
interface SearchButtonProps {
  label: string;
  onClick: () => void;
}

export const SearchButton: React.FC<SearchButtonProps> = ({
  label,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="h-11 bg-[#111111] hover:bg-[#222222] active:scale-[0.98] text-white px-7 rounded-full text-sm font-semibold flex items-center gap-2 shadow-md hover:shadow-lg transition-all duration-150"
    >
      <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <span>{label}</span>
    </button>
  );
};

// ----------------------------------------------------
// 6. Main VehicleBookingWidget (Combined Master Component)
// ----------------------------------------------------
export default function VehicleBookingWidget() {
  const [activeMode, setActiveMode] = useState<BookingMode>("vehicle");
  const [pickupLocation, setPickupLocation] = useState("Downtown Terminal, City Center");
  const [dropoffLocation, setDropoffLocation] = useState("123 Anywhere St., Any City");
  const [pickupDate, setPickupDate] = useState("Dec 26, 2028");
  const [dropoffDate, setDropoffDate] = useState("Dec 30, 2028");
  const [vehicleType, setVehicleType] = useState<VehicleType>("5 Seater");

  const handleSearch = () => {
    alert(`Searching ${vehicleType} from ${pickupLocation} to ${dropoffLocation}`);
  };

  return (
    <div className="w-full max-w-[720px] bg-white border border-[#E7E7E7] rounded-[32px] p-6 shadow-2xl transition-all duration-300">
      {/* Top Segmented Selector */}
      <BookingModeSelector
        activeMode={activeMode}
        onSelectMode={setActiveMode}
      />

      {activeMode === "vehicle" ? (
        <div className="flex flex-col gap-4">
          {/* Top Row: Locations & Dates */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <LocationInput
              label="Pickup Location"
              placeholder="Type pickup location"
              value={pickupLocation}
              onChange={setPickupLocation}
            />

            <LocationInput
              label="Drop-off Location"
              placeholder="Type drop-off location"
              value={dropoffLocation}
              onChange={setDropoffLocation}
            />

            <DatePicker
              label="Pickup Date"
              value={pickupDate}
              onChange={setPickupDate}
            />

            <DatePicker
              label="Drop-off Date"
              value={dropoffDate}
              onChange={setDropoffDate}
            />
          </div>

          {/* Bottom Row: Vehicle Type Dropdown & Search Button */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4 pt-1">
            <VehicleTypeDropdown
              value={vehicleType}
              onChange={setVehicleType}
            />

            <SearchButton
              label="Find Vehicle"
              onClick={handleSearch}
            />
          </div>
        </div>
      ) : (
        /* Room Mode */
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2.5 bg-[#F7F7F7] border border-[#E7E7E7] rounded-full px-4 py-3">
              <svg className="w-4 h-4 text-[#111]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
              <input
                type="text"
                defaultValue="Type your destination"
                className="w-full bg-transparent text-[#111] text-sm outline-none"
              />
            </div>
            <button className="w-12 h-12 bg-[#111] rounded-2xl flex items-center justify-center text-white hover:bg-[#252525]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#6B6B6B]">ROOMS</span>
              <div className="border border-[#ECECEC] rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#111] bg-white">
                <span className="text-[#2563EB]">🛏</span> 2 ˅
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#6B6B6B]">ADULTS</span>
              <div className="border border-[#ECECEC] rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#111] bg-white">
                <span className="text-[#2563EB]">👤</span> 2 ˅
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#6B6B6B]">KIDS</span>
              <div className="border border-[#ECECEC] rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#111] bg-white">
                <span className="text-[#2563EB]">👶</span> 0 ˅
              </div>
            </div>

            <div className="w-[1px] h-8 bg-[#EBEBEB] mx-1 mt-4"></div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#6B6B6B]">CHECK IN</span>
              <div className="border border-[#ECECEC] rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#111] bg-white">
                <span className="text-[#2563EB]">📅</span> SEP 6, 2028
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-bold text-[#6B6B6B]">CHECK OUT</span>
              <div className="border border-[#ECECEC] rounded-xl px-3.5 py-2.5 flex items-center gap-2 text-xs font-bold text-[#111] bg-white">
                <span className="text-[#2563EB]">📅</span> SEP 12, 2028
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
