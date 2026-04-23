import AdminCard from "@/components/Admin/Modules/AdminCard";
import { Users, Sprout, ShoppingCart, Shapes } from "lucide-react";
import { childClass } from "@/components/Admin/DesktopLayout";

const Overview = () => {
  const iconClass = "absolute -right-10 top-0 opacity-20";

  return (
    <div className={`${childClass}`}>
      <div className="top-row grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 items-center justify-between">
        <AdminCard
          title="Total users"
          value="5"
          change="+25%"
          Icon={<Users size={`10em`} className={iconClass} />}
        />
        <AdminCard
          title="Total products"
          value="5"
          change="+25%"
          Icon={<Sprout size={`10em`} className={iconClass} />}
        />
        <AdminCard
          title="Total categories"
          value="5"
          change="+25%"
          Icon={<Shapes size={`10em`} className={iconClass} />}
        />
        <AdminCard
          title="Total orders"
          value="5"
          change="+25%"
          Icon={<ShoppingCart size={`10em`} className={iconClass} />}
        />
      </div>
      <div className="main-area grid grid-cols-2 bg-surface-container-lowest rounded-xl p-5"></div>
    </div>
  );
};

export default Overview;
