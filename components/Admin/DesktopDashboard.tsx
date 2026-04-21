import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Users, Sprout, Shapes, TrendingUp, Flower } from "lucide-react";
import AdminCard from "./Modules/AdminCard";

const DesktopDashboard = () => {
  const tabClass = "flex-1 py-3 rounded-xl px-4 flex flex-row items-center gap-2";
  const activeClass = "bg-surface-container-lowest shadow-md text-primary";

  return (
    <div className=" p-7 h-full bg-surface-bright">
      <div className="top-row flex flex-row items-center justify-between">
        <AdminCard />
        <AdminCard />
        <AdminCard />
      </div>
    </div>
  );
};

export default DesktopDashboard;
