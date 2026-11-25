"use client";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { adminFormInputClass } from "@/components/ui/css";
import { Category } from "@/components/functions/types";

export type SortKey = "badge" | "date" | "price";

const AdminSearch = ({
  query,
  onQueryChange,
  children,
}: {
  query: string;
  onQueryChange: (q: string) => void;
  children?: ReactNode;
}) => (
  <div className="w-full col-span-full flex flex-col sm:flex-row md:flex-col lg:flex-row items-center gap-3 xl:gap-5 py-1 px-0.5">
    {children}
    <input
      type="search"
      name="search"
      value={query}
      onChange={(e) => onQueryChange(e.target.value.trim().toLowerCase())}
      className={`${adminFormInputClass} flex-1 grow`}
      placeholder="Search items..."
    />
  </div>
);

export const FilterOnProduct = ({
  cats,
  category,
  onCategoryChange,
  sort,
  onSortChange,
}: {
  cats: Category[];
  category: string;
  onCategoryChange: (c: string) => void;
  sort: SortKey;
  onSortChange: (s: SortKey) => void;
}) => (
  <div className="w-full sm:w-2/5 md:w-full lg:w-2/5 flex flex-row gap-3">
    <div className="relative w-1/3">
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortKey)}
        className={`${adminFormInputClass} appearance-none`}
      >
        <option value="badge">Featured</option>
        <option value="date">Date</option>
        <option value="price">Price</option>
      </select>
      <ChevronDown
        size="1em"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
      />
    </div>
    <div className="relative flex-1 grow">
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={`${adminFormInputClass} appearance-none`}
      >
        <option value="all">All categories</option>
        {cats.map((cat) => (
          <option value={cat.slug} key={cat.slug}>
            {cat.name}
          </option>
        ))}
      </select>
      <ChevronDown
        size="1em"
        className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2"
      />
    </div>
  </div>
);

export default AdminSearch;
