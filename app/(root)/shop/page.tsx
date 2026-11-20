import { LargeBtn } from "@/components/ui/Button";
import Image from "next/image";
import { ShopFilters } from "@/components/ui/ShopFilters";
import { fetchReq } from "@/components/functions/request";
import { Category, Product } from "@/components/functions/types";
import MultipleProducts from "@/components/layout/Prods";
import FulLShop from "@/components/layout/FullShop";

const Shop = async () => {
  const { data } = await fetchReq("/api/products", false);
  const { data: cats } = await fetchReq("/api/categories", false);
  const { products }: { products: Product[] } = data;
  const { categories }: { categories: Category[] } = cats;

  return (
    <section className="max-w-304 mx-auto">
      <header className="h-50 mb-5 overflow-hidden relative flex flex-col justify-center">
        <div className="absolute -top-2 -right-3 opacity-50 pointer-events-none">
          <Image src={"/top-right.png"} width={150} height={500} alt="okay" />
        </div>
        <span className="label-md text-on-surface-variant tracking-widest font-medium uppercase text-xs block mb-1">
          Curated Collection
        </span>
        <h1 className="text-3xl z-15 font-extrabold leading-tight tracking-[-0.02em] text-primary">
          Bring Nature Indoors
        </h1>
        <p className="text-md text-secondary max-w-2xl mt-4 leading-relaxed">
          Discover beautiful, healthy plants for every room & outside condition. From easy-care
          ferns to sun-loving succulents, find your next green companion here
        </p>
      </header>
      <hr className="mb-5 border border-secondary/40" />
      <FulLShop prods={products} cats={categories} />
    </section>
  );
};

export default Shop;
