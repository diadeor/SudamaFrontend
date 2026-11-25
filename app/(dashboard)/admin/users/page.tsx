import { Users as UsersIcon } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { type User } from "@/components/functions/types";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import AdminUsers from "@/components/Admin/Pages/Users";

const Users = async () => {
  const usersFetchUrl = "/api/users";

  const { data, error } = await fetchReq(usersFetchUrl);
  if (!data && error) throw new Error(error);
  const users: User[] = data.users;

  return (
    <AdminPage title="Users" Icon={<UsersIcon />} createLink="/admin/users/create">
      <AdminUsers users={users} />
    </AdminPage>
  );
};

export default Users;
