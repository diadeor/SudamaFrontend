"use server";
import Link from "next/link";
import Image from "next/image";
import { ReactNode } from "react";
import { Search, ChevronLeft, ChevronRight, UserRoundCog } from "lucide-react";
import AdminNavigation from "@/components/Admin/Modules/AdminNav";

const AdminLayout = async ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-screen bg-surface text-on-surface selection:bg-primary-fixed selection:text-on-primary-fixed antialiased flex">
      <aside className="hidden md:flex h-svh w-40 lg:w-64 fixed left-0 top-0 bg-surface-container-low flex-col p-3 lg:p-5 border-r border-outline-variant/15 z-40">
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
      {/* Main content area */}
      <main className="flex-1 flex flex-col w-full md:ml-40 lg:ml-64">
        {/* Mobile header */}
        <header className="md:hidden fixed border-b-2 border-b-outline-variant/50 top-0 w-full z-50 bg-surface/80 dark:bg-primary/80 backdrop-blur-xl">
          <div className="flex justify-between items-center px-6 py-3.5 w-full">
            <Link href="/admin">
              <Image src="/sudama.png" alt="Sudama Logo" width={25} height={50} />
            </Link>
            <h1 className="font-headline tracking-tight text-lg font-bold text-primary dark:text-surface">
              Admin Portal
            </h1>
            <button className="text-primary dark:text-surface hover:bg-surface-container-low dark:hover:bg-primary-container transition-colors rounded-full p-2 -mr-2">
              <Search size={24} />
            </button>
          </div>
        </header>
        {/* Desktop header */}
        <header className="hidden md:flex fixed border-b-2 border-outline-variant/50 flex-row items-center justify-between bg-surface-bright z-40 top-0 h-17 right-0 left-40 lg:left-64 p-7">
          <h2 className="uppercase tracking-tight text-headline text-xl lg:text-2xl text-primary font-bold">
            Dashboard
          </h2>
          <UserRoundCog />
        </header>
        {/* Space */}
        <div className="h-18 md:hidden"></div>
        <div className="h-17 hidden md:block"></div>

        {/* Child */}
        <div className="grow bg-surface md:bg-surface-bright pb-24 md:pb-0 left-bottom-container">
          {children}
        </div>
      </main>
      {/* Mobile Bottom Nav, Hidden on desktop */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center px-3 pb-4 pt-3 bg-surface dark:bg-primary z-20 rounded-t-4xl shadow-[0_-8px_32px_rgba(22,29,26,0.04)]">
        <ChevronLeft className="absolute left-0 z-25" size={15} />
        <ChevronRight className="absolute right-0 z-25" size={15} />
        <div className="flex w-full overflow-x-auto no-scrollbar items-center gap-2 px-0">
          <AdminNavigation desktop={false} />
        </div>
      </nav>
    </div>
  );
};

export default AdminLayout;
