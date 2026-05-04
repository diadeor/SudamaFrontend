import AdminCard from "@/components/Admin/Modules/AdminCard";
import { Users, Sprout, ShoppingCart, Shapes } from "lucide-react";
import { childClass } from "@/components/ui/css";
import { fetchReq } from "@/components/functions/request";
import { Stats } from "@/components/functions/types";
import validateUser from "@/components/functions/validateUser";

const Overview = async () => {
  const iconClass = "absolute -right-10 top-0 opacity-20";
  const statsURL = "http://localhost:5000/api/stats";

  const user = await validateUser();
  const { name, id } = user;

  const { data, error } = await fetchReq(statsURL);
  if (!data && error) throw new Error(error);
  const stats: Stats = data;
  const { userCount, productCount, orderCount, catCount } = stats;

  return (
    <div className={`${childClass}`}>
      <p className="text-4xl font-extrabold tracking-tight">
        Howdy,{" "}
        <span className=" bg-linear-to-r from-on-primary-container to-on-surface-variant bg-clip-text text-transparent">
          {name.split(" ")[0]}.
        </span>
      </p>
      <div className="top-row grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-5 items-center justify-between">
        <AdminCard
          title="Total users"
          value={userCount}
          change="+25%"
          Icon={<Users size={`10em`} className={iconClass} />}
        />
        <AdminCard
          title="Total products"
          value={productCount}
          change="+25%"
          Icon={<Sprout size={`10em`} className={iconClass} />}
        />
        <AdminCard
          title="Total categories"
          value={catCount}
          change="+25%"
          Icon={<Shapes size={`10em`} className={iconClass} />}
        />
        <AdminCard
          title="Total orders"
          value={orderCount}
          change="+25%"
          Icon={<ShoppingCart size={`10em`} className={iconClass} />}
        />
      </div>
      <div className="main-area grid grid-cols-2 bg-surface-container-lowest rounded-xl p-5"></div>
    </div>
  );
};

export default Overview;
