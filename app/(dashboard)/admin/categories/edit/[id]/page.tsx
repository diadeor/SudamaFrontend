"use client";
import { useParams } from "next/navigation";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { useState, useEffect } from "react";
import { clientGet } from "@/components/functions/clientReq";
import { Category, Info } from "@/components/functions/types";
import CategoryForm from "@/components/Admin/Actions/CategoryForm";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";

const CategoryEditor = () => {
  const { id } = useParams();
  const [category, setCategory] = useState<Category>();

  // Message
  const [info, setInfo] = useState<Info>({ type: "error", message: "" });

  useEffect(() => {
    const fetchCat = async () => {
      try {
        const { data, error } = await clientGet(`/api/categories/${id}`);
        if (data && data.success) {
          setCategory(data.category);
        } else {
          setInfo({ type: "error", message: error });
        }
      } catch (error) {
        setInfo({ type: "error", message: error as string });
      }
    };
    fetchCat();
  }, []);

  return (
    <AdminActionPage title="Edit a category" navBack="/admin/categories">
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      {category && (
        <CategoryForm
          submitURL={`/api/categories/update/${id}`}
          isPut={true}
          setMessage={setInfo}
          initialData={category}
        />
      )}
    </AdminActionPage>
  );
};

export default CategoryEditor;
