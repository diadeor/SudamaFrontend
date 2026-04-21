import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  tag?: string;
  isLarge?: boolean;
  description?: string;
  category?: string;
}
const ProductCard = ({
  name,
  price,
  tag,
  category,
  description,
  isLarge = false,
}: ProductCardProps) => {
  const cardClasses =
    "flex flex-col p-5 bg-surface-dim backdrop-blur-lg group rounded-2xl relative";
  return (
    <div className={`${cardClasses} ${isLarge ? "xl:col-span-2 xl:row-span-2" : ""}`}>
      {tag && (
        <p className="absolute z-10 top-7 right-7 bg-secondary-container px-3 py-1 rounded-full text-[0.6rem] font-bold text-on-secondary-container uppercase">
          {tag}
        </p>
      )}
      <div className="aspect-square mb-6 overflow-hidden rounded-xl relative">
        <Image
          src="/wallpaper.jpg"
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      {category && (
        <span className="text-xs text-outline font-bold tracking-widest uppercase mb-1 block">
          {category}
        </span>
      )}
      <h3 className="text-primary font-bold text-lg mb-2">{name}</h3>
      {isLarge && description && <p className="text-md mb-5">{description}</p>}
      <p className="text-secondary font-bold text-lg">Rs. {price.toFixed(0)}</p>
      <Link href="#" className="mt-5 font-headline">
        <button className="w-full py-3 cursor-pointer hover:scale-95 transition-all rounded-2xl font-bold bg-primary text-on-primary uppercase text-md flex flex-row items-center justify-center gap-3">
          <p>Add to Cart</p>
          <ShoppingBasket />
        </button>
      </Link>
    </div>
  );
};

export default ProductCard;
