import { LargeBtn } from "@/components/ui/Button";
import ShopCard from "@/components/ui/ShopCard";
import Image from "next/image";
import { ShopFilters } from "@/components/ui/ShopFilters";
import { fetchReq } from "@/components/functions/request";
import { Product } from "@/components/functions/types";

const Shop = async () => {
  const { data, error } = await fetchReq("/api/products", false);
  const { products }: { products: Product[] } = data;

  return (
    <section className="max-w-7xl mx-auto">
      <header className="h-60 mb-8 overflow-hidden relative flex flex-col justify-center">
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
      <div className="flex flex-col lg:flex-row gap-8">
        {/* <!-- Sidebar Filters --> */}
        <aside className="w-full lg:w-64 shrink-0 space-y-10">
          <ShopFilters />
        </aside>
        <div className="grow">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(170px,1fr))] gap-5">
            {products.map((item, index) => {
              return <ShopCard data={item} key={index} />;
            })}
          </div>

          <div className="mt-15 flex justify-center">
            <LargeBtn link="ok">Expand Archive</LargeBtn>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
