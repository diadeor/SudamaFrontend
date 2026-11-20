import { fetchReq } from "@/components/functions/request";
import { Product } from "@/components/functions/types";
import { Sprout, TriangleExclamationPoint } from "lucide-react";
import { adminItem2 } from "@/components/ui/css";
import Image from "next/image";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import Actions from "@/components/Admin/Modules/Actions";
import Link from "next/link";
import ConfirmDialog from "@/components/Admin/Modules/Confirmation";

const Products = async () => {
  const prodFetchUrl = "/api/products";

  const { data, error } = await fetchReq(prodFetchUrl);
  if (!data && error) throw new Error(error);
  const products: Product[] = data.products;

  return (
    <AdminPage
      title="Products"
      Icon={<Sprout />}
      createLink="/admin/products/create"
      arrList={products}
    >
      {/* <hr className="mt-3 border border-outline-variant/50 " /> */}
      <ul className="user-data flex flex-col gap-3 xl:grid grid-cols-2">
        {products.map((prod, index) => {
          const {
            _id,
            name,
            nickname,
            thumbnail,
            primaryCategory,
            badge,
            regularPrice,
            salePrice,
            stock,
            slug,
          } = prod;
          const badgeBg = (badge: string) => {
            switch (badge) {
              case "sale":
                return "bg-green-200";
              case "featured":
                return "bg-yellow-200";
              case "new":
                return "bg-blue-200";
            }
          };

          const categoryPill =
            "px-2 py-0.5 rounded-sm text-[10px] sm:text-xs font-label uppercase tracking-widest font-semibold";
          const stickyBadge = `absolute text-xs px-2 font-bold py-0.5 rounded-full top-1 left-1 z-50 uppercase tracking-wide ${badgeBg(badge)}`;
          return (
            <li className={`${adminItem2} flex-row gap-3 md:gap-3`} key={_id || index}>
              <Link href={`/admin/products/edit/${_id}`}>
                <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-28 xl:h-28 bg-surface-container rounded-xl flex items-center justify-center overflow-hidden">
                  {badge !== "none" && <span className={stickyBadge}>{badge}</span>}
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
                <div className="flex flex-col grow justify-center min-w-50">
                  {/* Badges/Category Row */}
                  <div className="flex items-center gap-1 mb-1 flex-wrap">
                    <span
                      className={`${categoryPill} bg-primary-fixed-dim/50 text-on-surface-variant`}
                    >
                      {primaryCategory || "Uncategorized"}
                    </span>
                  </div>

                  {/* Name */}
                  <p className="font-extrabold text-primary text-base sm:text-lg truncate leading-tight mb-1">
                    {name} {nickname && <span className="text-sm font-normal">( {nickname} )</span>}
                  </p>

                  {/* Price Row */}
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="font-bold text-primary md:text-md">Rs. {salePrice}</span>
                    {regularPrice > salePrice && (
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
              <div className="absolute right-3 bottom-3 sm:static sm:shrink-0 flex flex-row items-center gap-2">
                <Actions link={`/admin/products/edit/${_id}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Products;
