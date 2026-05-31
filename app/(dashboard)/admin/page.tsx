import AdminCard from "@/components/Admin/Modules/AdminCard";
import { Users, Sprout, ShoppingCart, Shapes, UserRound } from "lucide-react";
import { childClass } from "@/components/ui/css";
import { fetchReq, validateUser } from "@/components/functions/request";
import { Stats } from "@/components/functions/types";
import Link from "next/link";

const Overview = async () => {
  const iconClass = "absolute -right-10 top-0 opacity-20";
  const statsURL = "/api/stats";

  const user = await validateUser();
  const { name, id } = user;

  const { data, error } = await fetchReq(statsURL);
  if (!data && error) throw new Error(error);
  const stats: Stats = data;
  const { userCount, productCount, orderCount, catCount } = stats;

  return (
    <div className={`${childClass}`}>
      <div className="flex flex-row justify-between">
        <p className="text-4xl font-extrabold tracking-tight">
          Howdy,{" "}
          <span className=" bg-linear-to-r from-on-primary-container to-on-surface-variant bg-clip-text text-transparent">
            {name.split(" ")[0]}.
          </span>
        </p>
        <Link
          href="/profile"
          className="flex flex-row items-center justify-center rounded-xl bg-primary py-2.5 px-4 text-on-primary hover:-translate-y-2 transition-all gap-2 font-headline text-lg"
        >
          <UserRound />
          View Profile
        </Link>
      </div>
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
