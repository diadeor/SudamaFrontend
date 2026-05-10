"use client";
import ProductForm from "@/components/Admin/Actions/ProductForm";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { useParams } from "next/navigation";
import { clientGet } from "@/components/functions/clientReq";
import { useEffect, useState } from "react";
import { Product } from "@/components/functions/types";
import { X, XCircle, CircleCheck } from "lucide-react";

const ProductEditor = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();
  const [categories, setCategories] = useState<string[]>();

  // Message variables
  const [info, setInfo] = useState({ error: false, message: "" });

  useEffect(() => {
    const fetchVals = async () => {
      const { data, error } = await clientGet(`/api/products/${id}`);
      const { data: cats, error: err } = await clientGet(`/api/categories`);
      !error ? setProduct(data.product) : setInfo({ error: true, message: error });
      if (err) {
        setInfo({ error: true, message: err });
      } else {
        const categories = cats.categories.map((item: any) => item.name);
        setCategories(categories);
      }
    };
    fetchVals();
  }, []);
  return (
    <AdminActionPage title="Edit a product" navBack="/admin/products">
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
