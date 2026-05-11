import { childClass } from "@/components/ui/css";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import { Shapes, Pencil, Trash2, ImageIcon } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { Category } from "@/components/functions/types";
import Link from "next/link";
import { adminItem2 } from "@/components/ui/css";
import Actions from "@/components/Admin/Modules/Actions";
import Image from "next/image";

const Categories = async () => {
  const catFetchUrl = "/api/categories";

  const { data, error } = await fetchReq(catFetchUrl);
  if (!data && error) throw new Error(error);
  const categories: Category[] = data.categories;
  return (
    <AdminPage title="Categories" Icon={<Shapes />} createLink="/admin/categories/create">
      <ul className="user-data gap-2 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
        {categories.map((cat, index) => {
          const { _id, name, thumbnail } = cat;
          return (
            <li key={_id || index} className={`${adminItem2} flex-row items-center gap-3 md:gap-3`}>
              <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-surface-container rounded-xl flex items-center justify-center overflow-hidden border border-outline-variant/30 transition-all duration-300">
                <Image
                  src={thumbnail}
                  width={130}
                  height={50}
                  alt=""
                  loading="eager"
                  className="rounded-xl max-h-75 cursor-pointer"
                />
              </div>

              {/* 2. Main Info Block */}
              <div className="flex flex-col flex-1 justify-center min-w-0">
                <p className="font-extrabold text-primary text-base sm:text-lg md:text-xl truncate leading-tight mb-1">
                  {name}
                </p>

                <div className="flex flex-col gap-1 text-xs sm:text-sm text-on-surface-variant">
                  <p className="truncate font-mono bg-surface-container-high px-1.5 py-0.5 rounded w-fit">
                    /okay
                  </p>
                  <p className="font-medium">
                    <span className="font-bold text-primary">5</span> items
                  </p>
                </div>
              </div>

              <div className="absolute right-3 top-3 sm:static sm:shrink-0 flex flex-row items-center gap-2">
                <Actions link={`/admin/categories/edit/${_id}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Categories;
