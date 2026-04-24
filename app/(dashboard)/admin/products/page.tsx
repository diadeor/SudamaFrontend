import { childClass } from "@/components/ui/css";
import { fetchReq, postReq } from "@/components/functions/request";
import { Product } from "@/components/functions/types";
import { Sprout, Pencil, Trash2 } from "lucide-react";
import { adminItem, adminPageDataHeader } from "@/components/ui/css";
import Image from "next/image";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import Link from "next/link";
import { ActionButton } from "@/components/ui/Button";

const Products = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const prodFetchUrl = "http://localhost:5000/api/products";
  const tableColumns = "grid-cols-10";

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
        <p className={`col-span-2 ${tableHeadClass}`}>Stock</p>
        <p className={`col-span-2`}>Action</p>
      </div>
      <ul className="user-data mt-2 flex flex-col gap-2">
        {products.map((prod, index) => {
          const { _id, name, thumbnail, category, badge, regularPrice, salePrice, stock } = prod;
          return (
            <li className={`${adminItem} ${tableColumns}`} key={index}>
              <p className={`col-span-1 text-center font-bold ${tableHeadClass}`}>{index + 1}</p>
              {/* <Image src={thumbnail} width={50} height={50} alt="Image thumbnail"/> */}
              <p className={`col-span-3 font-bold ${tableHeadClass} pl-2`}>{name}</p>
              <p
                className={`col-span-2 text-lg ${tableHeadClass} pl-2 flex flex-row items-center gap-1`}
              >
                Rs. {salePrice}
                <sub className="">{regularPrice}</sub>
              </p>
              <p className={`${tableHeadClass} col-span-2 text-center`}>{stock}</p>
              <div className="action flex flex-row items-end justify-center gap-2 col-span-2">
                <Link href={`/admin/products/edit/${_id}`}>
                  <ActionButton bg="bg-green-500">
                    <Pencil color="white" size="1.1em" />
                  </ActionButton>
                </Link>
                <ActionButton bg="bg-red-400">
                  <Trash2 color="white" size="1.1em" />
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
