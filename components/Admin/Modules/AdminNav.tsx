"use client";
import Link from "next/link";
import { ShoppingCart, Users, Sprout, Shapes, PanelsTopLeft, Newspaper } from "lucide-react";
import { tabClass } from "@/components/ui/css";
import { usePathname } from "next/navigation";

const AdminNavigation = () => {
  const activeClass = "bg-surface-container-lowest shadow-md text-primary";
  const path = usePathname();
  const tabs = [
    {
      title: "Overview",
      Icon: PanelsTopLeft,
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
        return (
          <li key={index}>
            <Link href={link} className={`${tabClass} ${isActive ? activeClass : ""}`}>
              <Icon /> {title}
            </Link>
          </li>
        );
      })}
    </>
  );
};

export default AdminNavigation;
