import Image from "next/image";
import FulLShop from "@/components/layout/FullShop";
import { getProducts, getCategories } from "@/lib/helpers";

const Shop = async () => {
  const products = await getProducts();
  const categories = await getCategories();

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
      {products && categories && <FulLShop prods={products} cats={categories} />}
    </section>
  );
};

export default Shop;
