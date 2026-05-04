"use client";
import Link from "next/link";
import { tabClass } from "@/components/ui/css";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Sprout, Shapes, ShoppingCart, Newspaper } from "lucide-react";

const AdminNavigation = ({ desktop = true }) => {
  const activeClass = "bg-surface-container-lowest shadow-md text-primary";
  const activeMobileMenuClass =
    "flex grow flex-col min-w-30 items-center justify-center dark:bg-primary-container text-on-primary-fixed dark:text-surface-bright rounded-2xl px-5 py-3 scale-95 duration-200 shrink-0";
  const path = usePathname();
  const tabs = [
    {
      title: "Overview",
      Icon: LayoutDashboard,
      link: "/admin",
      isActive: path === "/admin",
    },
    {
      title: "Users",
      Icon: Users,
      link: "/admin/users",
      isActive: path.startsWith("/admin/users"),
    },
    {
      title: "Products",
      Icon: Sprout,
      link: "/admin/products",
      isActive: path.startsWith("/admin/products"),
    },
    {
      title: "Categories",
      Icon: Shapes,
      link: "/admin/categories",
      isActive: path.startsWith("/admin/categories"),
    },
    {
      title: "Orders",
      Icon: ShoppingCart,
      link: "/admin/orders",
      isActive: path.startsWith("/admin/orders"),
    },
    {
      title: "Journals",
      Icon: Newspaper,
      link: "/admin/journals",
      isActive: path.startsWith("/admin/journals"),
    },
  ];

  return (
    <>
      {tabs.map((tab, index) => {
        const { title, Icon, isActive, link } = tab;
        return desktop ? (
          <li key={index}>
            <Link href={link} className={`${tabClass} ${isActive ? activeClass : ""}`}>
              <Icon size={18} /> {title}
            </Link>
          </li>
        ) : (
          <Link
            href={link}
            key={index}
            className={`${activeMobileMenuClass} ${isActive ? "bg-primary-fixed" : ""}`}
          >
            <Icon size={24} className="mb-1" />
            <span className="font-manrope text-xs uppercase tracking-widest font-semibold">
              {title}
            </span>
          </Link>
        );
      })}
    </>
  );
};

export default AdminNavigation;
