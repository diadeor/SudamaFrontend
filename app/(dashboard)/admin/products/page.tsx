import { fetchReq } from "@/components/functions/request";
import { Category, Featured, Product } from "@/components/functions/types";
import { Sprout } from "lucide-react";
import AdminPage from "@/components/Admin/Modules/AdminPage";
import AdminProducts from "@/components/Admin/Pages/Products";

const Products = async () => {
  const prodFetchReq = fetchReq("/api/products", true);
  const catFetchReq = fetchReq("/api/categories", true);
  const featuredFetchReq = fetchReq("/api/featured", true);

  const [
    {
      data: { products },
      error,
    },
    {
      data: { categories },
      error: err,
    },
    {
      data: { products: featuredProducts },
      error: featuredErr,
    },
  ] = await Promise.all([prodFetchReq, catFetchReq, featuredFetchReq]);
  if (!products && error) throw new Error(error);
  return (
    <AdminPage title="Products" Icon={<Sprout />} createLink="/admin/products/create">
      <AdminProducts
        products={products}
        categories={categories}
        featured={featuredProducts.map((f: Featured) => f.value)}
      />
    </AdminPage>
  );
};

export default Products;
