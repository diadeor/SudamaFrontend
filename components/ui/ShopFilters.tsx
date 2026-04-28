"use client";
import { Check, Heart, Sun, Moon, Shapes, SunDim, SunMedium } from "lucide-react";
import { useState } from "react";

export const ShopFilters = () => {
  const [selectedLight, setSelectedLight] = useState("bright");
  const [selectedCat, setSelectedCat] = useState("Ferns");
  const options = [
    {
      value: "Low Indirect Light",
      Icon: SunDim,
      id: "low",
    },
    {
      value: "Bright Indirect Light",
      Icon: SunMedium,
      id: "bright",
    },
    {
      value: "Full Sun",
      Icon: Sun,
      id: "full",
    },
  ];
  const categories = ["Ferns", "Succulents", "Trees", "Climbers"];

  return (
    <div>
      <h3 className="text-on-surface font-bold text-lg mb-6">Filters</h3>
      <section className="mb-6">
        <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-4">
          Exposure
        </label>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-3">
          {options.map((option, index) => {
            const { value, Icon, id } = option;
            const isActive = id === selectedLight;
            return (
              <label key={index} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="light-exposure"
                  value={id}
                  checked={isActive}
                  onChange={(e) => setSelectedLight(e.target.value)}
                  className="hidden"
                />

                <div
                  className={`w-5 h-5 bg-primary-fixed rounded-sm flex items-center justify-center transition-colors `}
                >
                  <Check size="1em" className={isActive ? "block" : "hidden"} />
                </div>

                <span
                  className={`text-sm font-medium ${
                    isActive ? "text-on-surface font-semibold" : "text-on-surface-variant"
                  }`}
                >
                  {value}
                </span>
              </label>
            );
          })}
        </div>
      </section>
      <section className="mb-4">
        <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-4">
          Classification
        </label>
        <div className="flex flex-wrap gap-2">
          {categories.map((cat, index) => {
            const isActive = cat === selectedCat;
            const inactiveClass =
              "hover:scale-110 hover:bg-primary-fixed/50 border-outline-variant/50 bg-surface-container-low text-on-surface-variant font-medium";
            const activeClass =
              "bg-primary-fixed text-on-primary-fixed font-bold border-outline-variant/10";

            return (
              <span
                key={index}
                onClick={() => setSelectedCat(cat)}
                className={`px-5 cursor-pointer tracking-wide transition-all py-1.5 rounded-full text-xs border  ${isActive ? activeClass : inactiveClass}`}
              >
                {cat}
              </span>
            );
          })}
        </div>
      </section>
    </div>
  );
};
