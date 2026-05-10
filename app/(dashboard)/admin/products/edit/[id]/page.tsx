"use client";
import ProductForm from "@/components/Admin/Actions/ProductForm";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { useParams } from "next/navigation";
import { clientGet } from "@/components/functions/clientReq";
import { useEffect, useState } from "react";
import { Info, Product } from "@/components/functions/types";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";

const ProductEditor = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<string[]>();

  // Message variables
  const [info, setInfo] = useState<Info>({ type: "error", message: "" });

  useEffect(() => {
    const fetchVals = async () => {
      const { data, error } = await clientGet(`/api/products/${id}`);
      const { data: cats, error: err } = await clientGet(`/api/categories`);
      !error ? setProduct(data.product) : setInfo({ type: "error", message: error });
      if (err) {
        setInfo({ type: "error", message: err });
      } else {
        const categories = cats.categories.map((item: any) => item.name);
        setCategories(categories);
      }
    };
    fetchVals();
  }, []);
  return (
    <AdminActionPage title="Edit a product" navBack="/admin/products">
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      {product && (
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
