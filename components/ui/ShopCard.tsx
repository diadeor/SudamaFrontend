import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "../functions/types";
import { badgeStyles } from "./css";

const pill =
  "absolute right-3 top-3 rounded-lg px-2 py-0.5 text-[12px] font-bold uppercase tracking-wider";
const fmt = (n: number) => n.toLocaleString("en-IN");

const ShopCard = ({ data, cat }: { data: ProductCard; cat?: string }) => {
  const { slug, name, salePrice, regularPrice, thumbnail, badge, stock } = data;

  const inStock = stock > 0;
  const original = regularPrice != null && regularPrice > salePrice ? regularPrice : null;
  const showBadge = badge && badge !== "none";
  const discount =
    regularPrice && regularPrice > salePrice ? Math.round((1 - salePrice / regularPrice) * 100) : 0;

  return (
    <article className="group relative flex h-full min-w-0 flex-col">
      <div className="relative mb-3 aspect-square overflow-hidden rounded-[20px] bg-surface-container transition-transform duration-300 motion-safe:group-hover:-translate-y-2">
        <Image
          src={thumbnail}
          alt={name}
          fill
          sizes="(min-width: 1280px) 16vw, (min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className={`object-cover bg-on-secondary-container/40 ${inStock ? "" : "opacity-70 grayscale"}`}
        />
        {!inStock ? (
          <span className={`${pill} bg-error-container text-on-error-container`}>Out of stock</span>
        ) : (
          showBadge && (
            <span className={`${pill} ${badgeStyles[badge] ?? "bg-surface-container-high"}`}>
              {badge}
            </span>
          )
        )}
        {discount > 0 ? (
          <span className="absolute bottom-3 left-3 rounded-lg text-xs px-3 py-1 font-bold bg-tertiary-fixed text-on-tertiary-fixed">
            {discount}% off
          </span>
        ) : (
          <></>
        )}
      </div>

      <div className="flex flex-1 flex-col px-2">
        <h3 className="line-clamp-2 font-bold leading-tight text-primary">
          <Link
            href={`/shop/${slug}`}
            className="outline-none after:absolute after:inset-0 after:rounded-xl focus-visible:after:ring-2 focus-visible:after:ring-primary"
          >
            {name}
          </Link>
        </h3>

        {cat && (
          <p className="mt-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-on-surface-variant">
            {cat}
          </p>
        )}

        <p className="mt-auto flex flex-wrap items-baseline gap-x-1 pt-2">
          <span className="font-semibold text-on-secondary-fixed">Rs. {fmt(salePrice)}</span>
          {original && <s className="text-sm text-on-surface-variant">Rs. {fmt(original)}</s>}
        </p>
      </div>
    </article>
  );
};

export default ShopCard;
