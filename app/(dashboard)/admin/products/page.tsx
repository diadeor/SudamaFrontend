import { childClass } from "@/components/ui/css";
import { fetchReq, postReq } from "@/components/functions/request";
import { Product } from "@/components/functions/types";
import { Sprout, Pencil, Trash2, ImageIcon } from "lucide-react";
import { adminItem, adminPageDataHeader } from "@/components/ui/css";
import Image from "next/image";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import Link from "next/link";
import { ActionButton } from "@/components/ui/Button";

const Products = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const prodFetchUrl = "http://localhost:5000/api/products";
  const tableColumns = "grid-cols-9";

  const { data, error } = await fetchReq(prodFetchUrl);
  if (!data && error) throw new Error(error);
  const products: Product[] = data.products;

  return (
    <AdminPage title="Products" Icon={<Sprout />}>
      <div className={`${adminPageDataHeader} ${tableColumns}`}>
        <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
        <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
        <p
          className={`col-span-2 flex flex-row items-center justify-center gap-1 ${tableHeadClass}`}
        >
          Price<sub>reg</sub>
        </p>
        <p className={`col-span-1 ${tableHeadClass}`}>Stock</p>
        <p className={`col-span-2`}>Action</p>
      </div>

      <hr className="mt-3 border border-outline-variant/50 md:hidden" />
      <ul className="user-data mt-2 flex flex-col gap-2">
        {products.map((prod, index) => {
          const { _id, name, thumbnail, category, badge, regularPrice, salePrice, stock } = prod;
          return (
            <li
              key={_id || index}
              className={`${adminItem} flex-row items-center gap-4 md:grid-cols-12 md:py-2`}
            >
              {/* 1. Number (Hidden on mobile, 1 col on desktop) */}
              <p className="hidden md:block col-span-1 font-bold text-on-surface-variant text-sm">
                {index + 1}
              </p>

              {/* 2. Image (Shared, 1 col on desktop) */}
              <div className="shrink-0 w-15 h-15 md:w-10 md:h-10 md:col-span-1 bg-surface-container rounded-xl flex items-center justify-center overflow-hidden border border-outline-variant/30">
                {/* Replace ImageIcon with real <Image /> when ready */}
                <ImageIcon className="text-outline-variant/70" size={20} />
              </div>

              {/* 3. Info Wrapper (Mobile Stack -> Desktop Grid Flattening) */}
              <div className="flex flex-col flex-1 gap-1 md:contents">
                {/* Name (3 cols on desktop) */}
                <p className="font-extrabold text-primary md:col-span-3 md:pl-4 truncate">{name}</p>

                {/* Price Group (3 cols on desktop) */}
                <div className="flex items-baseline gap-2 md:col-span-3 md:pl-2">
                  <span className="font-bold text-primary md:text-lg">Rs. {salePrice}</span>
                  <span className="text-xs line-through text-outline">Rs. {regularPrice}</span>
                </div>

                {/* Stock (2 cols on desktop) */}
                <p className="text-sm text-on-surface-variant md:col-span-2 md:text-center">
                  <span className="md:hidden font-semibold">Stock: </span>
                  {stock}
                </p>
              </div>

              {/* 4. Actions (Absolute on mobile, 2 cols on desktop) */}
              <div className="absolute right-4 top-4 md:static md:col-span-2 flex flex-row items-center justify-center gap-2">
                <Link href={`/admin/products/edit/${_id}`}>
                  <ActionButton bg="bg-[#10b981]">
                    {" "}
                    {/* Emerald-500 equivalent */}
                    <Pencil color="white" size={16} />
                  </ActionButton>
                </Link>
                <ActionButton bg="bg-[#f87171]">
                  {" "}
                  {/* Red-400 equivalent */}
                  <Trash2 color="white" size={16} />
                </ActionButton>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Products;
