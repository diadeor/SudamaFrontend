"use client";
import { User } from "@/components/functions/types";
import { adminItem, adminPageDataHeader } from "@/components/ui/css";
import { useState, useMemo } from "react";
import AdminSearch from "../ui/AdminSearch";

const tableHeadClass = "border-r border-outline-variant/50";

const AdminUsers = ({ users }: { users: User[] }) => {
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    return users.filter((c) => c.name.trim().toLowerCase().includes(query));
  }, [query, users]);
  return (
    <div>
      {visible.length === 0 ? (
        <p className="col-span-full py-10 text-center text-on-surface-variant">
          No categories found.
        </p>
      ) : (
        <div>
          <div className={`${adminPageDataHeader} grid-cols-8 mb-1`}>
            <p className={`col-span-1 ${tableHeadClass}`}>No.</p>
            <p className={`col-span-3 ${tableHeadClass}`}>Name</p>
            <p className={`col-span-4`}>Email</p>
          </div>

          <AdminSearch query={query} onQueryChange={setQuery} />
          <ul className="user-data mt-1 flex flex-col gap-2">
            {visible.map((user, index) => {
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
        </div>
      )}
    </div>
  );
};

export default AdminUsers;
