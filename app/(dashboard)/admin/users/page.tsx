import { Users as UsersIcon } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { type User } from "@/components/functions/types";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import { adminItem, adminPageDataHeader } from "@/components/ui/css";
import Actions from "@/components/Admin/Modules/Actions";

const Users = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const usersFetchUrl = "/api/users";

  const { data, error } = await fetchReq(usersFetchUrl);
  if (!data && error) throw new Error(error);
  const users: User[] = data.users;

  return (
    <AdminPage title="Users" Icon={<UsersIcon />} createLink="/admin/users/create">
      <div className={`${adminPageDataHeader} grid-cols-8`}>
        <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
        <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
        <p className={`col-span-4`}>Email</p>
      </div>
      {/* <hr className="mt-3 border border-outline-variant/50 md:hidden" /> */}
      <ul className="user-data mt-3 flex flex-col gap-2">
        {users.map((user, index) => {
          const { _id, name, email, role } = user;
          const isAdmin = role === "admin";
          return (
            <li
              key={_id || index}
              className={`${adminItem} flex-row items-center gap-2 md:grid-cols-8 md:items-center md:px-0`}
            >
              <p
                className={`border-r pr-4 col-span-1 text-center font-bold border-outline-variant/50`}
              >
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
                <p className={`text-sm md:text-base md:col-span-4 md:pl-2`}>{email}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Users;
