"use client";
import { useState } from "react";
import { Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SearchItem } from "../functions/types";

const SearchBox = ({ prods }: { prods: SearchItem[] }) => {
  const [result, setResult] = useState<Array<SearchItem>>([]);
  const [query, setQuery] = useState<string>("");
  const filter = (value: string) => {
    setQuery(value);
    setResult(
      prods.filter((item) => {
        const lowerName = item.name.toLowerCase();
        const lowerNick = item.nickname?.toLowerCase();
        return lowerName.includes(value) || lowerNick?.includes(value);
      }),
    );
  };
  return (
    <div className="flex flex-col relative">
      <div className="flex items-center bg-slate-400/25 rounded-lg px-3 py-2 gap-2 h-11 w-65 lg:w-85 z-10">
        <Search size={`1.1em`} className="min-w-5" />
        <input
          className="w-full font-headline bg-transparent focus:ring-0 placeholder:text-secondary text-on-primary-fixed outline-none"
          placeholder="Search here..."
          type="text"
          onChange={(e) => filter(e.target.value.toLowerCase())}
        />
      </div>
      {query && (
        <ul
          role="listbox"
          className="absolute right-0 top-full z-50 mt-2 w-full max-h-80 overflow-y-auto rounded-lg border border-outline-variant bg-white p-2 shadow-lg"
        >
          {result.length ? (
            result.slice(0, 5).map((item, idx) => {
              const { slug, name, thumbnail, primaryCategory } = item;
              return (
                <li key={idx} role="option">
                  <Link
                    href={`/shop/${slug}`}
                    onClick={(_) => setQuery("")}
                    className="flex items-center gap-3 rounded-xl p-2 hover:bg-surface-container-low focus-visible:bg-surface-container-low"
                  >
                    <Image
                      src={thumbnail}
                      alt=""
                      width={48}
                      height={48}
                      className="size-12 rounded-lg bg-surface-container object-cover"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold text-on-surface">{name}</p>
                      <p className="text-sm text-on-surface-variant">{primaryCategory}</p>
                    </div>
                    {/* <span className="text-sm font-semibold text-primary">Rs. {regularPrice}</span> */}
                  </Link>
                </li>
              );
            })
          ) : (
            <li className="px-3 font-bold py-4 text-sm text-on-surface-variant">
              No matches for {query}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default SearchBox;
