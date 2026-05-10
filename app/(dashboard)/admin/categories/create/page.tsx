"use client";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { useState, useEffect } from "react";
import { clientGet } from "@/components/functions/clientReq";
import { Category, Info } from "@/components/functions/types";
import CategoryForm from "@/components/Admin/Actions/CategoryForm";
import { X, XCircle, CircleCheck } from "lucide-react";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";

const CategoryCreate = () => {
  // Message
  const [info, setInfo] = useState<Info>({ type: "error", message: "" });

  return (
    <AdminActionPage title="Add new category" navBack="/admin/categories">
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      <CategoryForm submitURL="/api/categories/create" setMessage={setInfo} />
    </AdminActionPage>
  );
};

export default CategoryCreate;
