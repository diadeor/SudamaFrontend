import { fetchReq } from "@/components/functions/request";
import { Product } from "@/components/functions/types";
import { Sprout, ImageIcon } from "lucide-react";
import { adminItem2 } from "@/components/ui/css";
import Image from "next/image";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import Actions from "@/components/Admin/Modules/Actions";

const Products = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const prodFetchUrl = "/api/products";
  const tableColumns = "grid-cols-9";

  const { data, error } = await fetchReq(prodFetchUrl);
  if (!data && error) throw new Error(error);
  const products: Product[] = data.products;

  return (
    <AdminPage title="Products" Icon={<Sprout />} createLink="/admin/products/create">
      {/* <hr className="mt-3 border border-outline-variant/50 " /> */}
      <ul className="user-data flex flex-col gap-2 xl:grid grid-cols-2">
        {products.map((prod, index) => {
          const { _id, name, thumbnail, category, badge, regularPrice, salePrice, stock } = prod;
          const badgeBg =
            badge === "sale"
              ? "bg-green-100"
              : badge === "featured"
                ? "bg-yellow-100"
                : "bg-blue-100";
          const pillClass =
            "px-2 py-0.5 rounded-sm text-[10px] sm:text-xs font-label uppercase tracking-widest font-semibold";
          return (
            <li key={_id || index} className={`${adminItem2} flex-row gap-3 md:gap-3`}>
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-28 xl:h-28 bg-surface-container rounded-xl flex items-center justify-center overflow-hidden">
                <Image
                  src={thumbnail}
                  width={130}
                  height={50}
                  alt=""
                  loading="eager"
                  className="rounded-xl max-h-75 cursor-pointer"
                />
              </div>

              {/* first : surface-container-high, text-on-surface-variant; second: bg-error-container, text-on-error-container */}
              <div className="flex flex-col grow justify-center min-w-50">
                {/* Badges/Category Row */}
                <div className="flex items-center gap-1 mb-1 flex-wrap">
                  <span
                    className={`${pillClass} bg-surface-container-high text-on-surface-variant`}
                  >
                    {category || "Uncategorized"}
                  </span>

                  {stock < 10 ? (
                    <span className={`${pillClass} bg-error-container text-on-error-container`}>
                      Low Stock
                    </span>
                  ) : (
                    <span className={`${pillClass} ${badgeBg}`}>{badge}</span>
                  )}
                </div>

                {/* Name */}
                <p className="font-extrabold text-primary text-base sm:text-lg md:text-xl truncate leading-tight mb-1">
                  {name}
                </p>

                {/* Price Row */}
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="font-bold text-primary md:text-lg">Rs. {salePrice}</span>
                  {regularPrice > salePrice && (
                    <span className="text-xs md:text-sm line-through text-outline">
                      Rs. {regularPrice}
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-on-surface-variant font-medium">
                  Stock: <span className="font-bold text-primary">{stock}</span>
                </p>
              </div>

              <div className="absolute right-3 top-3 sm:static sm:shrink-0 flex flex-row items-center gap-2">
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
