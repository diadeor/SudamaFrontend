import { DatabaseX } from "lucide-react";
import { Category, ProductCard } from "../functions/types";
import ShopCard from "../ui/ShopCard";
import { slugToName } from "@/lib/helpers";

const MultipleProducts = ({
  prods,
  categories,
  limit,
}: {
  prods: ProductCard[] | undefined;
  categories: Category[] | null | undefined;
  limit?: number;
}) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-5">
      {prods ? (
        prods.slice(0, limit).map((item, index) => {
          return (
            <ShopCard data={item} key={index} cat={slugToName(item.primaryCategory, categories)} />
          );
        })
      ) : (
        <div className="col-span-full bg-surface-container-high py-10 rounded-md flex flex-col items-center justify-center gap-5">
          <DatabaseX size={`3em`} />
          <p className="font-bold text-center">
            Products failed to load.
            <br />
            Please refresh the page and try again.
          </p>
        </div>
      )}
    </div>
  );
};

export default MultipleProducts;
