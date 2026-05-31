"use client";
import ProductForm from "@/components/Admin/Actions/ProductForm";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";
import { clientGet } from "@/components/functions/clientReq";
import { Info } from "@/components/functions/types";
import { X, CircleCheck, XCircle } from "lucide-react";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

const CreateProduct = () => {
  const [categories, setCategories] = useState<string[]>();

  // Message variables
  const [info, setInfo] = useState<Info>({
    type: "error",
    message: "",
  });

  useEffect(() => {
    const fetchVals = async () => {
      const { data, error } = await clientGet(`/api/categories`);
      if (error) {
        setInfo({ type: "error", message: "Error fetching categories" });
      } else {
        const categories = data.categories.map((item: any) => item.name);
        setCategories(categories);
        if (!categories.length) {
          setInfo({ type: "error", message: "Add a category first. Redirecting..." });
          setTimeout(() => {
            redirect("/admin/categories/create");
          }, 1000);
        }
      }
    };
    fetchVals();
  }, []);

  return (
    <AdminActionPage title="Add new product" navBack="/admin/products">
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      {categories && (
        <ProductForm setMessage={setInfo} cats={categories} submitURL={`/api/products/create`} />
      )}
    </AdminActionPage>
  );
};

export default CreateProduct;
