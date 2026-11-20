import { Product } from "../functions/types";
import ShopCard from "../ui/ShopCard";

const MultipleProducts = ({ prods }: { prods: Product[] }) => {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(170px,1fr))] gap-5">
      {prods &&
        prods.map((item, index) => {
          return <ShopCard data={item} key={index} />;
        })}
    </div>
  );
};

export default MultipleProducts;
