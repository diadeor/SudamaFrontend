import { Product } from "@/components/functions/types";
import Link from "next/link";
import Image from "next/image";
import { adminItem2, badgeStyles, stickyBadge } from "@/components/ui/css";
import { Star, TriangleExclamationPoint, Trash2 } from "lucide-react";
import Actions from "../Modules/Actions";

const AdminProductCard = ({
  data,
  onOpenChange,
  featured,
}: {
  data: Product;
  onOpenChange: Function;
  featured: boolean;
}) => {
  const {
    _id,
    name,
    slug,
    badge,
    thumbnail,
    primaryCategory,
    nickname,
    regularPrice,
    salePrice,
    stock,
  } = data;

  const badges = ["sale", "new", "featured"];
  const categoryPill =
    "px-2 py-0.5 rounded-sm text-[10px] sm:text-xs font-label uppercase tracking-widest font-semibold";

  return (
    <div className={`${adminItem2} flex-row gap-3 md:gap-3`} key={_id}>
      <Link href={`/admin/products/edit/${_id}`}>
        <div className="relative shrink-0 w-20 h-20 sm:w-24 sm:h-24 md:w-24 md:h-24 lg:w-24 lg:h-24 xl:w-28 xl:h-28 bg-surface-container rounded-xl flex items-center justify-center overflow-hidden">
          {badges.includes(badge) && (
            <span className={`${stickyBadge} ${badgeStyles[badge]}`}>{badge}</span>
          )}
          <Image
            src={thumbnail}
            fill
            alt="Product Image"
            loading="eager"
            className="rounded-xl max-h-75 cursor-pointer object-cover mix-blend-multiply"
          />
        </div>
      </Link>
      {/* first : surface-container-high, text-on-surface-variant; second: bg-error-container, text-on-error-container */}
      <Link href={`/admin/products/edit/${_id}`} className="flex grow min-w-50">
        <div className="flex flex-col gap-1 grow justify-center min-w-50">
          {/* Badges/Category Row */}
          <div className="flex items-center gap-1 flex-wrap">
            <span className={`${categoryPill} bg-primary-fixed-dim/50 text-on-surface-variant`}>
              {primaryCategory || "Uncategorized"}
            </span>
          </div>

          {/* Name */}
          <p className="font-extrabold text-primary text-base sm:text-lg truncate leading-tight">
            {name}
          </p>
          {nickname && (
            <span className="text-sm font-normal">
              Also known as <span className="font-bold">{nickname}</span>{" "}
            </span>
          )}

          {/* Price Row */}
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-primary md:text-md">Rs. {salePrice}</span>
            {regularPrice && regularPrice > salePrice && (
              <span className="text-xs md:text-sm line-through text-outline">
                Rs. {regularPrice}
              </span>
            )}
          </div>

          <p className="flex flex-row gap-1 items-center text-xs sm:text-sm text-on-surface-variant font-medium">
            Stock:
            <span
              className={`flex flex-row items-center gap-1 font-bold ${stock < 10 ? "text-on-error-container" : "text-primary"}`}
            >
              {stock}
              {stock < 10 && <TriangleExclamationPoint size={`1em`} />}
            </span>
          </p>
        </div>
      </Link>
      <Actions onOpenChange={onOpenChange} name={name} id={_id} isFeatured={featured} />
    </div>
  );
};

export default AdminProductCard;
