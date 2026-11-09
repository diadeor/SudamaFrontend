import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NormalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-dvh flex flex-col">
      <Navbar />
      <main className="flex-1 pt-25 px-5 md:px-10 bg-surface-container-low">{children}</main>
      <Footer />
    </div>
  );
};

export default NormalLayout;
