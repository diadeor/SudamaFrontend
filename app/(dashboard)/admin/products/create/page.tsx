"use client";
import ProductForm from "@/components/Admin/Actions/ProductForm";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { clientGet } from "@/components/functions/clientReq";
import { X, CircleCheck, XCircle } from "lucide-react";
import { useEffect, useState } from "react";

const CreateProduct = () => {
  const [categories, setCategories] = useState<string[]>();

  // Message variables
  const [info, setInfo] = useState({
    error: true,
    message: "",
  });

  useEffect(() => {
    const fetchVals = async () => {
      const { data, error } = await clientGet(`/api/categories`);
      if (error) {
        setInfo({ error: true, message: "Error fetching categories" });
      } else {
        const categories = data.categories.map((item: any) => item.name);
        setCategories(categories);
      }
    };
    fetchVals();
  }, []);

  return (
    <AdminActionPage title="Add new product" navBack="/admin/products">
      {info.message && (
        <div className="absolute bg-primary/15 top-0 right-0 flex flex-col items-center justify-center w-full h-full">
          <div className="z-50 p-5 bg-surface-container-low/75 backdrop-blur-sm border-2 border-outline-variant/50 shadow-xl  text-primary rounded-2xl w-[30%] min-w-90 min-h-50 flex flex-col items-center justify-center">
            <X
              onClick={() => setInfo({ error: false, message: "" })}
              className="absolute cursor-pointer top-4 right-4 hover:scale-110 transition-all"
              size={20}
            />
            <div className="content flex flex-col items-center gap-5">
              {info.error ? (
                <XCircle size={50} className="text-primary" />
              ) : (
                <CircleCheck size={50} className="text-primary" />
              )}
              <p className="text-center text-lg tracking-wide">{info.message}</p>
            </div>
          </div>
        </div>
      )}
      {categories && (
        <ProductForm setMessage={setInfo} cats={categories} submitURL={`/api/products/create`} />
      )}
    </AdminActionPage>
  );
};

export default CreateProduct;
