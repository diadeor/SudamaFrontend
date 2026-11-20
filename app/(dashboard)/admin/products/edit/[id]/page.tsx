"use client";
import ProductForm from "@/components/Admin/Actions/ProductForm";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { useParams } from "next/navigation";
import { clientGet } from "@/components/functions/clientReq";
import { useEffect, useState } from "react";
import { Category, Info, Product } from "@/components/functions/types";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";

const ProductEditor = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<Category[]>();

  // Message variables
  const [info, setInfo] = useState<Info>({ type: "error", message: "" });

  useEffect(() => {
    const fetchVals = async () => {
      const { data, error } = await clientGet(`/api/products/${id}`);
      const { data: category, error: err } = await clientGet(`/api/categories`);
      !error ? setProduct(data.product) : setInfo({ type: "error", message: error });
      err ? setInfo({ type: "error", message: err }) : setCategories(category.categories);
    };
    fetchVals();
  }, []);

  return (
    <AdminActionPage title="Edit a product" navBack="/admin/products">
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      {product && categories && (
        <ProductForm
          cats={categories}
          initialData={product}
          isPut={true}
          setMessage={setInfo}
          submitURL={`/api/products/update/${id}`}
        />
      )}
    </AdminActionPage>
  );
};

export default ProductEditor;
