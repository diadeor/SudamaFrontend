import { childClass, customScrollbar } from "@/components/ui/css";
import { ReactNode } from "react";

import { CirclePlus } from "lucide-react";
import Link from "next/link";

interface AdminPageProps {
  title: string;
  children: ReactNode;
  Icon: ReactNode;
  createLink?: string;
}

const AdminPage = async ({ title, Icon, children, createLink }: AdminPageProps) => {
  return (
    <div className={`${childClass}`}>
      <div className="relative users-list h-full flex flex-col p-5 rounded-2xl bg-surface-container-lowest">
        <div className="top-row flex flex-row items-center justify-between">
          <h2 className="flex flex-row gap-2 text-xl font-bold uppercase tracking-widest ">
            {Icon}
            {title}
          </h2>
          <input
            type="text"
            name="search"
            placeholder={`Search ${title.toLowerCase()}`}
            className="bg-surface-container-low py-1 rounded-md px-3 focus:ring-2 focus:ring-surface-container-low outline-none"
          />
        </div>
        {createLink && (
          <Link
            href={createLink}
            className="fixed z-50 text-4xl h-11 w-11 bg-green-200 p-5 bottom-35 md:bottom-10 right-10 shadow-md hover:bottom-37 md:hover:bottom-12 hover:shadow-lg transition-all shadow-black/50 rounded-2xl text-primary flex flex-col items-center justify-center"
          >
            +
          </Link>
        )}
        <div className={`second-row w-full h-full overflow-y-auto pr-1 mt-3 ${customScrollbar}`}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
