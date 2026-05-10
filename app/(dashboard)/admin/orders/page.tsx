import AdminPage from "@/components/Admin/Modules/AdminPage";
import { ShoppingCart, Pencil, Trash2, Receipt, Eye } from "lucide-react";
import { ActionButton } from "@/components/ui/Button";
import Link from "next/link";
import { fetchReq } from "@/components/functions/request";
import { type Orders } from "@/components/functions/types";

const Orders = async () => {
  const ordersFetchUrl = "/api/orders";
  const tableColumns = "grid-cols-8";

  const { data, error } = await fetchReq(ordersFetchUrl);
  if (!data && error) throw new Error(error);
  const orders: Orders[] = data.orders;
  return (
    <AdminPage title="Orders" Icon={<ShoppingCart />}>
      {/* <div className={`${adminPageDataHeader} ${tableColumns}`}>
        <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
        <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
        <p className={`col-span-4`}>Email</p>
      </div> */}
      <ul className="user-data mt-2 flex flex-col gap-2">
        {orders.map((order, index) => {
          const { _id, tx, status, user, total, amount, discount, createdAt } = order;
          return (
            <li
              key={_id || index}
              className="relative flex flex-row items-center p-4 gap-4 md:gap-6 bg-surface-container-lowest rounded-2xl mb-2 shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 hover:border-outline-variant/50 transition-colors"
            >
              {/* 1. Order Icon */}
              <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-surface-container-high rounded-xl flex items-center justify-center border border-outline-variant/30 transition-all duration-300">
                <Receipt className="text-primary/70 w-5 h-5 sm:w-7 sm:h-7" />
              </div>

              {/* 2. Main Info Block (Uses internal flex to split left/right on desktop) */}
              <div className="flex flex-col md:flex-row md:items-center flex-1 justify-between min-w-0 gap-2 md:gap-4">
                {/* Left Side: Order Identity */}
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {/* Order ID */}
                    <p className="font-headline font-extrabold text-primary text-base sm:text-lg truncate">
                      #{tx}
                    </p>
                    <span className="text-xs text-secondary font-label tracking-wide">
                      {createdAt} {/* e.g., "May 12, 2026" */}
                    </span>
                  </div>

                  {/* Customer Name */}
                  <p className="text-sm sm:text-base text-on-surface-variant font-medium truncate">
                    {user}
                  </p>
                </div>

                {/* Right Side: Financials & Status */}
                <div className="flex flex-row md:flex-col items-center md:items-end justify-between md:justify-center gap-3 md:gap-1 mt-1 md:mt-0">
                  {/* Total Amount */}
                  <p className="font-bold text-primary sm:text-lg">Rs. {amount}</p>

                  {/* Dynamic Status Badge */}
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-label uppercase tracking-widest font-bold
        ${status === "Delivered" ? "bg-primary-fixed text-on-primary-fixed" : ""} 
        ${status === "Pending" ? "bg-error-container text-on-error-container" : ""}
        ${status === "Processing" ? "bg-secondary-fixed text-on-secondary-fixed" : ""}
      `}
                  >
                    {status}
                  </span>
                </div>
              </div>

              {/* 3. Actions (Usually 'View' and 'Edit' for Orders) */}
              <div className="absolute right-4 top-4 sm:static sm:shrink-0 flex flex-row items-center gap-2">
                <Link href={`/admin/orders/view/${_id}`}>
                  <ActionButton bg="bg-secondary">
                    {" "}
                    {/* A neutral color for viewing */}
                    <Eye color="white" size={16} />
                  </ActionButton>
                </Link>
                <Link href={`/admin/orders/edit/${_id}`}>
                  <ActionButton bg="bg-[#10b981]">
                    <Pencil color="white" size={16} />
                  </ActionButton>
                </Link>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Orders;
