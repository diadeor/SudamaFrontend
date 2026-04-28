import { ReactNode } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const NormalLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Navbar />
      <main className="pt-25 px-5 md:px-10 bg-surface-container-low">{children}</main>
      <Footer />
    </div>
  );
};

export default NormalLayout;
