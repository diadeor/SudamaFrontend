import { childClass } from "@/components/ui/css";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import { adminPageDataHeader, adminItem } from "@/components/ui/css";
import { Shapes } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { Category } from "@/components/functions/types";

const Categories = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const catFetchUrl = "http://localhost:5000/api/categories";
  const tableColumns = "grid-cols-8";

  const { data, error } = await fetchReq(catFetchUrl);
  if (!data && error) throw new Error(error);
  const categories: Category[] = data.categories;
  return (
    <AdminPage title="Categories" Icon={<Shapes />}>
      <div className={`${adminPageDataHeader} ${tableColumns}`}>
        <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
        <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
        <p className={`col-span-4`}>Email</p>
      </div>
      <ul className="user-data mt-2 flex flex-col gap-2">
        {categories.map((cat, index) => {
          const { name, thumbnail } = cat;
          return (
            <li className={`${adminItem} ${tableColumns}`} key={index}>
              <p className={`col-span-1 text-center font-bold ${tableHeadClass}`}>{index + 1}</p>
              <p className={`col-span-3 font-bold ${tableHeadClass} pl-2`}>{name}</p>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Categories;
