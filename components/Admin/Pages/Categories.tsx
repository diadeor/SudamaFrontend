"use client";
import { Category, Info } from "@/components/functions/types";
import Link from "next/link";
import Image from "next/image";
import { adminItem2, badgeStyles, stickyBadge } from "@/components/ui/css";
import { useState, useMemo } from "react";
import AdminSearch from "../ui/AdminSearch";
import Actions from "../Modules/Actions";
import ConfirmDialog from "../Modules/Confirmation";
import AdminPopup from "../Modules/AdminMsgPopup";
import { clientGet, clientPost } from "@/components/functions/clientReq";

const AdminCategories = ({
  categories,
  featured,
}: {
  categories: Category[];
  featured: String[];
}) => {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [current, setCurrent] = useState("");
  const [info, setInfo] = useState<Info>({ type: "success", message: "" });

  const openDialog = (name: string, id: string, type: string) => {
    setCurrent(id);
    setName(name);
    setType(type);
    setOpen(true);
  };

  const featureCategory = async () => {
    const isFeatured = featured.includes(current);
    const featureReq = clientPost(`/api/featured/categories/${isFeatured ? "remove" : "add"}`);
    const { error } = await featureReq({ id: current });
    if (error) return setInfo({ type: "error", message: error });

    return setInfo({
      type: "success",
      message: `Category ${isFeatured ? "removed from" : ""} featured`,
    });
  };
  const deleteCategory = async () => {
    const { error } = await clientGet(`/api/categories/${current}`, "delete");
    if (error) setInfo({ type: "error", message: error });
    return setInfo({ type: "success", message: "Category deleted." });
  };

  const visible = useMemo(() => {
    return categories.filter((c) => c.name.trim().toLowerCase().includes(query));
  }, [query, categories]);
  return (
    <div className="user-data gap-3 grid grid-cols-[repeat(auto-fit,minmax(400px,1fr))]">
      <ConfirmDialog
        open={open}
        title={`${type === "delete" ? "Delete" : "Feature"} Category`}
        description={`Do you really want to ${type === "delete" ? "delete" : "feature"} ${name}`}
        onConfirm={type === "delete" ? deleteCategory : featureCategory}
        toDelete={type === "delete" ? true : false}
        onClose={() => setOpen(false)}
      />
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      <AdminSearch query={query} onQueryChange={setQuery} />
      {visible.length === 0 && (
        <p className="col-span-full py-10 text-center text-on-surface-variant">
          No categories found.
        </p>
      )}
      {visible.map((cat, index) => {
        const { _id, name, thumbnail, slug } = cat;
        const isFeatured = featured.includes(_id);
        return (
          <div className={`${adminItem2} group flex-row items-center gap-3 md:gap-3`} key={index}>
            {isFeatured && (
              <span
                className={`absolute top-2 left-2 z-50 font-bold font-headline text-[14px] px-1 py-0.5 rounded-full ${badgeStyles["featured"]}`}
              >
                Featured
              </span>
            )}
            <Link href={`/admin/categories/edit/${_id}`} className="outline-none after:absolute">
              <div className="relative shrink-0 w-16 h-16 sm:w-20 sm:h-20 bg-surface-container rounded-xl flex items-center justify-center overflow-hidden border border-outline-variant/30 transition-all duration-300">
                {thumbnail && (
                  <Image
                    src={thumbnail}
                    width={130}
                    height={50}
                    alt=""
                    loading="eager"
                    className="rounded-xl max-h-75 cursor-pointer"
                  />
                )}
              </div>
            </Link>

            {/* 2. Main Info Block */}
            <Link
              href={`/admin/categories/edit/${_id}`}
              className="outline-none after:absolute flex-1"
            >
              <div className="flex flex-col flex-1 min-w-0">
                <p className="font-extrabold text-primary text-base sm:text-lg md:text-xl truncate leading-tight mb-1">
                  {name}
                </p>

                <div className="flex flex-col gap-1 text-xs sm:text-sm text-on-surface-variant">
                  <p className="truncate tracking-tight font-mono bg-surface-container-high px-2 py-0.5 rounded w-fit">
                    /{slug}
                  </p>
                </div>
              </div>
            </Link>

            <Actions onOpenChange={openDialog} name={name} id={_id} isFeatured={isFeatured} />
          </div>
        );
      })}
    </div>
  );
};

export default AdminCategories;
