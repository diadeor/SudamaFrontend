import { BadgePlus } from "lucide-react";
import { SmallBtn } from "./Button";
import Image from "next/image";
import Link from "next/link";
import { Product } from "../functions/types";

const PurchaseCard = ({ data }: { data: Product }) => {
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
    <div className="group">
      <Link href={`/shop/${_id}`}>
        <div className="relative bg-surface-container-lowest rounded-3xl overflow-hidden mb-3 transition-transform duration-500 group-hover:-translate-y-3">
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
    </div>
  );
};

export default PurchaseCard;
