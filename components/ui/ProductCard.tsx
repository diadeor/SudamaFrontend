import { ShoppingBasket } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { LargeBtn, SmallBtn } from "./Button";

interface ProductCardProps {
  name: string;
  price: number;
  imageUrl: string;
  tag?: string;
  isLarge?: boolean;
  description?: string;
  category?: string;
}
const ProductCard = ({ name }: { name: string }) => {
  const cardClasses =
    "flex flex-col p-5 bg-surface-dim backdrop-blur-lg group rounded-2xl relative";
  return (
    <div className={`${cardClasses}`}>
      <div className="aspect-square mb-6 overflow-hidden rounded-xl relative">
        <Image
          src="/wallpaper.jpg"
          alt={name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      <h3 className="text-primary font-bold text-lg mb-2">{name}</h3>
    </div>
  );
};

export default ProductCard;
