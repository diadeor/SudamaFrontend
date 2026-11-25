import AdminPage from "@/components/Admin/Modules/AdminPage";
import { Shapes } from "lucide-react";
import { fetchReq } from "@/components/functions/request";
import { Category, Featured } from "@/components/functions/types";
import AdminCategories from "@/components/Admin/Pages/Categories";

const Categories = async () => {
  const catFetchUrl = fetchReq("/api/categories");
  const featuredFetchUrl = fetchReq("/api/featured");

  const [
    {
      data: { categories },
      error,
    },
    {
      data: { categories: featuredCategories },
      error: featuredErr,
    },
  ] = await Promise.all([catFetchUrl, featuredFetchUrl]);
  if (!categories && error) throw new Error(error);
  return (
    <AdminPage title="Categories" Icon={<Shapes />} createLink="/admin/categories/create">
      <AdminCategories
        categories={categories}
        featured={featuredCategories.map((f: Featured) => f.value)}
      />
    </AdminPage>
  );
};

export default Categories;
