import { Heart, Sun, CircleFadingPlus } from "lucide-react";
import { SmallBtn } from "./Button";
import Image from "next/image";
import Link from "next/link";

interface Shop {
  name: string;
  category: string;
  salePrice?: number;
  regularPrice: number;
  goTo: string;
}

const ShopCard = ({ name, category, salePrice, regularPrice, goTo }: Shop) => {
  return (
    <div className="group">
      <Link href={`/shop/${goTo}`}>
        <div className="relative bg-surface-container-lowest rounded-3xl overflow-hidden mb-3 transition-transform duration-500 group-hover:-translate-y-3">
          <Image
            src="/dummy3.png"
            alt="Plant specimen"
            width={400}
            height={500}
            className="w-full bg-on-primary-container/80 aspect-4/5 object-cover mix-blend-multiply opacity-90 group-hover:opacity-100 transition-opacity"
          />
          <Sun
            size={`1.3em`}
            className="absolute backdrop-blur-lg top-3 right-3 bg-surface-container-lowest/40 p-1.5 rounded-full w-8 h-8"
          />
        </div>
      </Link>
      <div className="px-2">
        <div className="flex flex-col justify-between items-start mb-1 ">
          <h3 className="text-lg font-bold text-primary">{name}</h3>
          <p className="text-[0.70rem] uppercase tracking-widest text-outline font-bold mb-1">
            {category}
          </p>
          <div className="third-row flex flex-row items-center justify-between w-full ">
            {salePrice && (
              <span className="text-xl font-medium text-secondary ">
                Rs. {salePrice} <sub className="line-through text-xs">{regularPrice}</sub>
              </span>
            )}
            {!salePrice && (
              <span className="text-xl font-medium text-secondary">Rs. {regularPrice}</span>
            )}
            <SmallBtn link="okay" extraClass="hover:animate-bounce ease-in-out">
              <CircleFadingPlus />
              Add to basket
            </SmallBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
