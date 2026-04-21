import { ShoppingCart, Users, Sprout, Shapes } from "lucide-react";
import { Search, UserRoundCog } from "lucide-react";
import { ReactNode } from "react";
import DesktopDashboard from "./DesktopDashboard";

const DesktopLayout = ({ child }: { child: ReactNode }) => {
  const tabClass = "flex-1 py-3 rounded-xl px-4 flex flex-row items-center gap-2";
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
          <li className={tabClass}>
            <Users /> Users
          </li>
          <li className={tabClass}>
            <Sprout />
            Products
          </li>
          <li className={tabClass}>
            <Shapes /> Categories
          </li>
          <li className={`${tabClass} ${activeClass}`}>
            <ShoppingCart />
            Orders
          </li>
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
        <div className="left-bottom-container grow overflow-hidden">
          <DesktopDashboard />
        </div>
      </main>
    </div>
  );
};

export default DesktopLayout;
