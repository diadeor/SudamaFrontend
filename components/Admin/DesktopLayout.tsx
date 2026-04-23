import { ShoppingCart, Users, Sprout, Shapes, PanelsTopLeft } from "lucide-react";
import { UserRoundCog } from "lucide-react";
import { ReactNode } from "react";
import Link from "next/link";

export const childClass = "flex flex-col gap-5 p-7 h-full";

const DesktopLayout = ({ child }: { child: ReactNode }) => {
  const hoverClass =
    "hover:scale-105 hover:bg-surface-container-lowest/40 transition-all hover:text-primary/75";
  const tabClass = `flex-1 py-3 rounded-xl px-4 flex flex-row items-center gap-2 ${hoverClass}`;
  const activeClass = "bg-surface-container-lowest shadow-md text-primary";

  return (
    <div className="flex flex-row min-h-svh">
      <aside className="h-svh w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col p-5 border-r border-outline-variant/15 z-40">
        <div className="mb-10">
          <h1 className="text-xl font-extrabold text-primary font-headline tracking-tight">
            Sudama
          </h1>
          <p className="font-manrope text-xs tracking-widest uppercase text-on-surface-variant mt-1">
            Admin Portal
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-outline tracking-wider uppercase font-semibold">
          <Link href={`/admin`}>
            <li className={`${tabClass} ${activeClass}`}>
              <PanelsTopLeft /> Overview
            </li>
          </Link>
          <Link href={`/admin/users`}>
            <li className={tabClass}>
              <Users /> Users
            </li>
          </Link>
          <Link href={`/admin/products`}>
            <li className={tabClass}>
              <Sprout />
              Products
            </li>
          </Link>
          <Link href={`/admin/categories`}>
            <li className={tabClass}>
              <Shapes /> Categories
            </li>
          </Link>
          <Link href={`/admin/orders`}>
            <li className={`${tabClass}`}>
              <ShoppingCart />
              Orders
            </li>
          </Link>
        </ul>
      </aside>
      <main className=" bg-surface flex-1 ml-64 flex flex-col">
        <header className="fixed flex flex-row items-center justify-between bg-surface-bright z-40 top-0 h-17 right-0 left-64 p-7">
          <h2 className="text-headline text-xl lg:text-2xl tracking-tight text-primary font-bold">
            Dashboard Overview
          </h2>
          <UserRoundCog />
        </header>
        <div className="null h-17"></div>
        <div className="left-bottom-container grow bg-surface-bright">{child}</div>
      </main>
    </div>
  );
};

export default DesktopLayout;
