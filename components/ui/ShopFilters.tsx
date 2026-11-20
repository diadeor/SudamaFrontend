"use client";
import { Dispatch, useMemo, useState } from "react";
import { Category, Product } from "../functions/types";
import { LargeBtn, SmallBtn } from "./Button";
import { X } from "lucide-react";

export const ShopFilters = ({
  arr,
  setArr,
  categories,
}: {
  arr: Product[];
  setArr: Function;
  categories: Category[];
}) => {
  // Variables
  const [light, setLight] = useState<string[]>([]);
  const [cat, setCat] = useState<string[]>([]);
  const [season, setSeason] = useState<string[]>([]);
  const [placement, setPlacement] = useState<string[]>([]);
  const [care, setCare] = useState<string[]>([]);
  const [traits, setTraits] = useState<string[]>([]);
  const [extra, setExtra] = useState(false);

  // Arrays
  const exposureOptions = [
    {
      value: "Low Indirect Light",
      id: "low",
    },
    {
      value: "Bright Indirect Light",
      id: "indirect",
    },
    {
      value: "Full Sun",
      id: "full_sun",
    },
    {
      value: "Partial Sun",
      id: "partial_sun",
    },
  ];
  const seasonOptions = ["summer", "winter", "monsoon", "all"];
  const careOptions = ["beginner", "moderate", "expert"];
  const traitsOptions = [
    "air_purifying",
    "low_maintenance",
    "fragrant",
    "fast_growing",
    "rare",
    "medicinal",
    "none",
  ];
  const placementOptions = [
    "living_room",
    "bedroom",
    "bathroom",
    "balcony",
    "office",
    "garden",
    "entrance",
  ];

  // Loop Object
  type Item = {
    label: string;
    options: Array<any>;
    arr: Array<string>;
    setArr: Function;
    compare?: string;
    show?: string;
    replacement?: Boolean;
  };
  const sorter: Item[] = [
    {
      label: "Categories",
      options: categories,
      arr: cat,
      setArr: setCat,
      compare: "slug",
      show: "name",
    },
  ];
  const optSorters: Item[] = [
    {
      label: "Exposure",
      options: exposureOptions,
      arr: light,
      setArr: setLight,
      compare: "id",
      show: "value",
    },
    {
      label: "Season",
      options: seasonOptions,
      arr: season,
      setArr: setSeason,
    },
    {
      label: "Care",
      options: careOptions,
      arr: care,
      setArr: setCare,
    },
    {
      label: "Traits",
      options: traitsOptions,
      arr: traits,
      setArr: setTraits,
      replacement: true,
    },

    {
      label: "Placement",
      options: placementOptions,
      arr: placement,
      setArr: setPlacement,
      replacement: true,
    },
  ];
  const finalSorters = extra ? [...sorter, ...optSorters] : sorter;

  // Functions
  const toggle = (value: string, setter: Function) => {
    setter(
      (prev: Array<string>) =>
        prev.includes(value)
          ? prev.filter((item) => item !== value) // remove
          : [...prev, value], // add
    );
  };

  const matches = (itemValue: string | string[] | undefined, selected: string[]) => {
    if (selected.length === 0) return true;
    if (itemValue == null) return false; // product has no value for this field
    const values = Array.isArray(itemValue) ? itemValue : [itemValue];
    return selected.some((s) => values.includes(s));
  };

  const clearFilters = () => {
    for (let i of [...sorter, ...optSorters]) {
      i.setArr([]);
    }
    setArr(arr);
  };

  // Required CSS
  const inactiveClass =
    "hover:scale-110 hover:bg-primary-fixed/50 border-outline-variant/50 bg-surface-container-low text-on-surface-variant font-medium";
  const activeClass =
    "bg-primary-fixed-dim font-bold text-on-primary-fixed border-outline-variant/10";
  const baseClass =
    "px-2.5 cursor-pointer tracking-wide transition-all py-1 rounded-full text-xs border";

  return (
    <div>
      <div className="flex flex-row items-center justify-between">
        <h3 className="text-on-surface font-bold text-lg mb-3">Filters</h3>
        <p
          onClick={clearFilters}
          className="font-bold text-sm hover:scale-105 transition-all cursor-pointer bg-surface-variant px-2 rounded-md py-0.5 text-primary flex flex-row gap-1 items-center"
        >
          <span className="pt-0.5">
            <X size={`1em`} />
          </span>
          Clear all
        </p>
      </div>
      {finalSorters.map((item, idx) => {
        const { label, options, arr, setArr, show, compare, replacement } = item;
        if (idx === 1 && !extra) {
          return;
        }
        return (
          <section className="mb-6" key={idx}>
            <label className="block text-xs uppercase tracking-widest font-bold text-outline mb-4">
              {label}
            </label>
            <div className="flex flex-wrap gap-2">
              {options.map((innerItem, index) => {
                const isActive = arr.includes(compare ? innerItem[compare] : innerItem);

                return (
                  <span
                    key={index}
                    onClick={() => toggle(compare ? innerItem[compare] : innerItem, setArr)}
                    className={`${baseClass}  ${isActive ? activeClass : inactiveClass}`}
                  >
                    {show
                      ? innerItem[show]
                      : replacement
                        ? innerItem.replaceAll("_", " ")
                        : innerItem}
                  </span>
                );
              })}
            </div>
          </section>
        );
      })}
      <p className="font-bold text-sm cursor-pointer" onClick={() => setExtra((prev) => !prev)}>
        Show {extra ? "less" : "more"}
      </p>
      <div className="flex mt-2">
        <SmallBtn
          onClickFunc={() =>
            setArr((prev: Product) =>
              arr.filter(
                (p) =>
                  matches(p.categories, cat) &&
                  matches(p.season, season) &&
                  matches(p.care_level, care) &&
                  matches(p.placement, placement) &&
                  matches(p.traits, traits) &&
                  matches(p.light, light),
              ),
            )
          }
        >
          Apply Filters
        </SmallBtn>
      </div>
    </div>
  );
};
