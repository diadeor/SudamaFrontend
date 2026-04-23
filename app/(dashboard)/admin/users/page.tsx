import { childClass } from "@/components/Admin/DesktopLayout";
import { ChessKing, Users as UsersIcon } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { type User } from "@/components/functions/types";
import { cookies } from "next/headers";

const Users = async () => {
  const tableHeadClass = "border-r border-outline-variant/50";
  const usersFetchUrl = "http://localhost:5000/api/users";

  const { data, error } = await fetchReq(usersFetchUrl);
  console.log(data, error);
  // if (!data.success) throw new Error("Hi there");

  // const users: User[] = data.users;
  const userItemClass = "grid grid-cols-8 py-2 bg-surface-container-low/40 rounded-md";
  const userHoverClass = "hover:scale-99 transition-all";

  return (
    <div className={`${childClass}`}>
      <div className="users-list h-full flex flex-col p-5 rounded-xl bg-surface-container-lowest">
        <div className="top-row flex flex-row items-center justify-between">
          <h2 className="flex flex-row gap-2 text-xl font-bold uppercase tracking-tight ">
            <UsersIcon />
            Users
          </h2>
          <input
            type="text"
            name="search"
            placeholder="Search for users"
            className="bg-surface-container-low py-1 rounded-md px-3 focus:ring-2 focus:ring-surface-container-low outline-none"
          />
        </div>
        <div className="second-row w-full ">
          <div className="grid grid-cols-8 font-headline tracking-tight border-b border-outline-variant/50 text-center font-bold w-full mt-5">
            <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
            <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
            <p className={`col-span-4`}>Email</p>
          </div>
          <ul className="user-data mt-2 flex flex-col gap-2">
            {/* {users.map((user, index) => {
              const { name, email, role } = user;
              const isAdmin = role === "admin";
              return (
                <li
                  className={`${userItemClass} ${userHoverClass} ${isAdmin ? "bg-linear-to-r from-teal-500 to-blue-500 text-white" : ""}`}
                  key={index}
                >
                  <p className={`col-span-1 text-center font-bold ${tableHeadClass}`}>
                    {index + 1}
                  </p>
                  <p className={`col-span-3 font-bold ${tableHeadClass} pl-2`}>{name}</p>
                  <p className={`col-span-4 pl-2`}>{email}</p>
                </li>
              );
            })} */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Users;
