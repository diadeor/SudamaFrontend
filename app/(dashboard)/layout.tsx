import { ReactNode } from "react";
import DesktopLayout from "@/components/Admin/DesktopLayout";
import MobileLayout from "@/components/Admin/MobileLayout";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <main className=" bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed">
      <div className="hidden md:block">
        <DesktopLayout child={children} />
      </div>
      <div className=" md:hidden">
        <MobileLayout child={children} />
      </div>
    </main>
  );
};

export default AdminLayout;
