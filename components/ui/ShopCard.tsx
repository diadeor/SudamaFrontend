import { BadgePlus } from "lucide-react";
import { SmallBtn } from "./Button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../functions/types";

const ShopCard = ({ data }: { data: Product }) => {
  const { _id, name, category, salePrice, regularPrice, thumbnail, badge } = data;
  const badgeCss =
    "absolute tracking-widest font-semibold backdrop-blur-lg top-3 right-3 p-1 rounded-md text-[12px] px-2 uppercase";
  const badgeBG =
    badge === "new"
      ? "bg-blue-100/70"
      : badge === "featured"
        ? "bg-yellow-100/70"
        : "bg-green-100/70";
  return (
    <div className="group max-w-55">
      <Link href={`/shop/${_id}`}>
        <div className="relative bg-surface-container-lowest rounded-[20px] overflow-hidden mb-3 transition-transform duration-500 group-hover:-translate-y-3">
          <Image
            src={thumbnail}
            alt="Plant specimen"
            width={400}
            height={500}
            className="w-full bg-on-primary-container/80 aspect-4/5 object-cover mix-blend-multiply opacity-95 group-hover:opacity-100 transition-opacity"
          />
          <p className={`${badgeCss} ${badgeBG}`}>{badge}</p>
        </div>
      </Link>
      <div className="px-2">
        <div className="flex flex-col justify-between items-start mb-1 ">
          <Link href={`/shop/${_id}`}>
            <h3 className="text-md font-bold text-primary">{name}</h3>
            <p className="text-[0.65rem] uppercase tracking-widest text-outline font-bold mb-1">
              {category}
            </p>
          </Link>
          <div className="third-row flex flex-col gap-2 justify-between w-full ">
            {salePrice && (
              <span className="text-md font-medium text-secondary ">
                Rs. {salePrice} <sub className="line-through text-sm">{regularPrice}</sub>
              </span>
            )}
            {!salePrice && (
              <span className="text-lg font-medium text-secondary">Rs. {regularPrice}</span>
            )}
            <SmallBtn
              link="okay"
              extraClass="hover:animate-bounce justify-center ease-in-out text-sm font-bold tracking-widest"
            >
              <BadgePlus size={`1.3em`} />
              Add to cart
            </SmallBtn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopCard;
