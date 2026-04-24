import { Users as UsersIcon } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { type User } from "@/components/functions/types";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import { adminItem, adminPageDataHeader } from "@/components/ui/css";
import Link from "next/link";
import { Trash2, Pencil } from "lucide-react";
import { ActionButton } from "@/components/ui/Button";

const Users = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const usersFetchUrl = "http://localhost:5000/api/users";
  const tableColumns = "grid-cols-10";

  const { data, error } = await fetchReq(usersFetchUrl);
  if (!data && error) throw new Error(error);
  const users: User[] = data.users;

  return (
    <AdminPage title="Users" Icon={<UsersIcon />}>
      <div className={`${adminPageDataHeader} ${tableColumns}`}>
        <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
        <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
        <p className={`col-span-4 ${tableHeadClass}`}>Email</p>
        <p className={`col-span-2`}>Actions</p>
      </div>
      <ul className="user-data mt-2 flex flex-col gap-2">
        {users.map((user, index) => {
          const { _id, name, email, role } = user;
          const isAdmin = role === "admin";
          return (
            <li
              className={`${adminItem} ${tableColumns} ${isAdmin ? "bg-linear-to-r from-teal-500/60 to-blue-500 text-white" : ""}`}
              key={index}
            >
              <p className={`col-span-1 text-center font-bold ${tableHeadClass}`}>{index + 1}</p>
              <p className={`col-span-3 font-bold ${tableHeadClass} pl-2`}>{name}</p>
              <p className={`col-span-4 pl-2 ${tableHeadClass}`}>{email}</p>
              <div className="action flex flex-row items-end justify-center gap-2 col-span-2">
                <Link href={`/admin/products/edit/${_id}`}>
                  <ActionButton bg="bg-green-500">
                    <Pencil color="white" size="1.1em" />
                  </ActionButton>
                </Link>
                <ActionButton bg="bg-red-400">
                  <Trash2 color="white" size="1.1em" />
                </ActionButton>
              </div>
            </li>
          );
        })}
      </ul>
    </AdminPage>
  );
};

export default Users;
