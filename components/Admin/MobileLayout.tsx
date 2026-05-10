"use server";
import Link from "next/link";
import { ReactNode } from "react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";

import Image from "next/image";
import AdminNavigation from "./Modules/AdminNav";

const MobileLayout = async ({ child }: { child: ReactNode }) => {
  return (
    <div className="min-h-screen pb-24 md:pb-0 bg-surface text-on-surface antialiased">
      {/* TopAppBar (Mobile Only) */}
      <header className="fixed border-b-2 border-b-outline-variant/50 top-0 w-full z-50 bg-surface/80 dark:bg-primary/80 backdrop-blur-xl md:hidden">
        <div className="flex justify-between items-center px-6 py-3.5 w-full">
          <Link href="/admin">
            <Image src="/sudama.png" alt="Sudama Logo" width="25" height="50" />
          </Link>
          <h1 className="font-headline tracking-tight text-lg font-bold text-primary dark:text-surface">
            Admin Portal
          </h1>
          <button className="text-primary dark:text-surface hover:bg-surface-container-low dark:hover:bg-primary-container transition-colors rounded-full p-2 -mr-2">
            <Search size={24} />
          </button>
        </div>
      </header>

      <div className="null h-18"></div>
      {child}

      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-3 pb-4 pt-3 bg-surface dark:bg-primary z-20 rounded-t-4xl shadow-[0_-8px_32px_rgba(22,29,26,0.04)] md:hidden">
        <ChevronLeft className="absolute left-0 z-25" size={15} />
        <ChevronRight className="absolute right-0 z-25" size={15} />
        <div className="flex w-full overflow-x-auto no-scrollbar items-center gap-2 px-0">
          <AdminNavigation desktop={false} />
        </div>
      </nav>
    </div>
  );
};
export default MobileLayout;
