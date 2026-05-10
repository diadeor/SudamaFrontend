import { Users as UsersIcon } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { type User } from "@/components/functions/types";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import { adminItem, adminPageDataHeader } from "@/components/ui/css";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { ActionButton } from "@/components/ui/Button";
import Actions from "@/components/Admin/Modules/Actions";

const Users = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const usersFetchUrl = "/api/users";
  const tableColumns = "grid-cols-10";

  const { data, error } = await fetchReq(usersFetchUrl);
  if (!data && error) throw new Error(error);
  const users: User[] = data.users;

  console.log(process.env.NEXT_PUBLIC_API_URL);
  return (
    <AdminPage title="Users" Icon={<UsersIcon />}>
      <div className={`${adminPageDataHeader} grid-cols-10`}>
        <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
        <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
        <p className={`col-span-4 ${tableHeadClass}`}>Email</p>
        <p className={`col-span-2 `}>Actions</p>
      </div>
      {/* <hr className="mt-3 border border-outline-variant/50 md:hidden" /> */}
      <ul className="user-data mt-3 flex flex-col gap-2">
        {users.map((user, index) => {
          const { _id, name, email, role } = user;
          const isAdmin = role === "admin";
          return (
            <li
              key={_id || index}
              className={`${adminItem} flex-col items-start gap-1 md:grid-cols-10 md:items-center md:px-0`}
            >
              <p className={`hidden md:block col-span-1 text-center font-bold ${tableHeadClass}`}>
                {index + 1}
              </p>

              {isAdmin && (
                <span className="h-4 w-2 absolute rounded-full bg-blue-400 top-1 left-1"></span>
              )}
              <div className="flex flex-col md:contents relative">
                <p
                  className={`font-extrabold md:col-span-3 md:pl-2 md:border-r border-outline-variant/50`}
                >
                  {name}
                </p>
                <p
                  className={`text-sm md:text-base md:col-span-4 md:pl-2 md:border-r border-outline-variant/50`}
                >
                  {email}
                </p>
              </div>

              <div className="absolute right-4 top-1/2 -translate-y-1/2 md:static md:translate-y-0 md:col-span-2 flex flex-row items-center justify-center gap-2">
                <Actions link={`/admin/users/edit/${_id}`} />
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Users;
