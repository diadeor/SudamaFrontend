import { childClass, customScrollbar } from "@/components/ui/css";
import { ReactNode } from "react";

import { Search, Plus } from "lucide-react";
import Link from "next/link";

interface AdminPageProps {
  title: string;
  children: ReactNode;
  Icon: ReactNode;
  createLink?: string;
  arrList?: Array<Object>;
}

const AdminPage = async ({ title, Icon, children, createLink }: AdminPageProps) => {
  return (
    <div className={`${childClass}`}>
      <div className="relative users-list h-full flex flex-col p-4 rounded-2xl bg-surface-container-lowest">
        <div className="top-row flex flex-row items-center justify-between">
          <h2 className="flex flex-row gap-2 text-xl font-bold uppercase tracking-widest ">
            {Icon}
            {title}
          </h2>
        </div>
        {createLink && (
          <Link
            href={createLink}
            className="fixed z-50 bg-green-200 p-4 bottom-35 md:bottom-10 right-10 shadow-md hover:bottom-37 md:hover:bottom-12 hover:shadow-lg transition-all shadow-black/50 rounded-2xl text-primary flex flex-col items-center justify-center"
          >
            <Plus />
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
