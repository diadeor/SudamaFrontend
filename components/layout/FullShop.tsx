"use client";
import { ShopFilters } from "../ui/ShopFilters";
import { LargeBtn } from "../ui/Button";
import MultipleProducts from "./Prods";
import { useState } from "react";
import { Category, Product } from "../functions/types";
import { Leaf } from "lucide-react";

const FulLShop = ({ prods, cats }: { prods: Product[]; cats: Category[] }) => {
  const [filtered, setFiltered] = useState<Product[]>(prods);
  return (
    prods && (
      <div className="flex flex-col lg:flex-row gap-5">
        <aside className="w-full lg:w-70 shrink-0 space-y-10">
          <ShopFilters arr={prods} setArr={setFiltered} categories={cats} />
        </aside>
        <div className="grow">
          {filtered.length ? (
            <MultipleProducts prods={filtered} />
          ) : (
            <div
              role="status"
              className="w-full h-full flex flex-col gap-5 items-center justify-center"
            >
              <Leaf size={`3em`} />
              <p className="text-lg font-semibold">No plants match these filters</p>
              <p className="max-w-sm text-sm text-on-surface-variant">
                Try removing a filter. Combining several narrows the results.
              </p>
            </div>
          )}
          {filtered.length ? (
            <div className="mt-10 mb-5 flex justify-center">
              <LargeBtn link="ok">Expand Archive</LargeBtn>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    )
  );
};

export default FulLShop;
