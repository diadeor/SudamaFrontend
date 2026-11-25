"use client";
import { useMemo, useState } from "react";
import { Product, Category, Info, Featured } from "@/components/functions/types";
import AdminSearch, { FilterOnProduct, SortKey } from "../ui/AdminSearch";
import AdminProductCard from "../ui/AdminProd";
import ConfirmDialog from "../Modules/Confirmation";
import { clientGet, clientPost } from "@/components/functions/clientReq";
import AdminPopup from "../Modules/AdminMsgPopup";

const BADGE_PRIORITY: Record<Product["badge"], number> = {
  featured: 0,
  sale: 1,
  new: 2,
  none: 3,
};

const AdminProducts = ({
  products,
  categories,
  featured,
}: {
  products: Product[];
  categories: Category[];
  featured: string[];
}) => {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState<SortKey>("badge");
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

  const featureProduct = async () => {
    const isFeatured = featured.includes(current);
    const featureReq = clientPost(`/api/featured/products/${isFeatured ? "remove" : "add"}`);
    const { error } = await featureReq({ id: current });
    if (error) return setInfo({ type: "error", message: error });

    return setInfo({
      type: "success",
      message: `Product ${isFeatured ? "removed from" : ""} featured`,
    });
  };
  const deleteProduct = async () => {
    const { error } = await clientGet(`/api/products/${current}`, "delete");
    if (error) return setInfo({ type: "error", message: error });

    return setInfo({ type: "success", message: "Product deleted." });
  };

  const visible = useMemo(() => {
    return products
      .filter((p) => {
        const sameCategory = p.primaryCategory === category;
        return category === "all" || sameCategory || p.categories?.includes(category);
      })
      .filter((p) => {
        const lowerName = p.name.toLowerCase();
        const lowerNick = p.nickname?.toLowerCase();
        return !query || lowerName.includes(query) || lowerNick?.includes(query);
      })
      .sort((a, b) => {
        if (sort === "price") {
          return a.salePrice - b.salePrice;
        } else if (sort === "date") {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else {
          return (BADGE_PRIORITY[a.badge] ?? 99) - (BADGE_PRIORITY[b.badge] ?? 99);
        }
      });
  }, [products, query, category, sort]);

  return (
    <div className="user-data flex flex-col gap-3 xl:grid grid-cols-2">
      <ConfirmDialog
        open={open}
        title={`${type === "delete" ? "Delete" : "Feature"} Product`}
        description={`Do you really want to ${type === "delete" ? "delete" : "feature"} ${name}`}
        onConfirm={type === "delete" ? deleteProduct : featureProduct}
        toDelete={type === "delete" ? true : false}
        onClose={() => setOpen(false)}
      />
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      <AdminSearch query={query} onQueryChange={setQuery}>
        <FilterOnProduct
          cats={categories}
          category={category}
          onCategoryChange={setCategory}
          sort={sort}
          onSortChange={setSort}
        />
      </AdminSearch>

      {visible.length === 0 && (
        <p className="col-span-full py-10 text-center text-on-surface-variant">
          No products found.
        </p>
      )}
      {visible.map((prod) => {
        const isFeatured = featured.includes(prod._id);
        return (
          <AdminProductCard
            data={prod}
            key={prod._id}
            onOpenChange={openDialog}
            featured={isFeatured ? true : false}
          />
        );
      })}
    </div>
  );
};
export default AdminProducts;
