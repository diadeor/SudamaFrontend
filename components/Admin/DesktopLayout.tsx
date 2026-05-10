"use server";
import { UserRoundCog } from "lucide-react";
import { ReactNode } from "react";
import AdminNavigation from "./Modules/AdminNav";

const DesktopLayout = async ({ child }: { child: ReactNode }) => {
  const mediumWidth = "w-40";
  return (
    <div className="flex flex-row min-h-svh">
      <aside className="h-svh w-40 lg:w-64 fixed left-0 top-0 bg-surface-container-low flex flex-col p-3 lg:p-5 border-r border-outline-variant/15 z-40">
        <div className="mb-10 text-center lg:text-left">
          <h1 className="text-xl font-extrabold text-primary font-headline tracking-tight">
            Sudama
          </h1>
          <p className="font-manrope text-xs tracking-widest uppercase text-on-surface-variant mt-1">
            Admin Portal
          </p>
        </div>
        <ul className="flex flex-col gap-3 text-outline tracking-wider uppercase font-semibold">
          <AdminNavigation />
        </ul>
      </aside>
      <main className=" bg-surface flex-1 ml-40 lg:ml-64 flex flex-col">
        <header className="fixed border-b-2 border-outline-variant/50 flex flex-row items-center justify-between bg-surface-bright z-40 top-0 h-17 right-0 left-40 lg:left-64 p-7">
          <h2 className="uppercase tracking-tight text-headline text-xl lg:text-2xl text-primary font-bold">
            Dashboard
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
