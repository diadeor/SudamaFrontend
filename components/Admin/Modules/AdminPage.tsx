import { childClass } from "@/components/ui/css";
import { ReactNode } from "react";

interface AdminPageProps {
  title: string;
  children: ReactNode;
  Icon: ReactNode;
}

const AdminPage = async ({ title, Icon, children }: AdminPageProps) => {
  return (
    <div className={`${childClass}`}>
      <div className="users-list h-full flex flex-col p-5 rounded-xl bg-surface-container-lowest">
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
        <div className="second-row w-full ">{children}</div>
      </div>
    </div>
  );
};

export default AdminPage;
