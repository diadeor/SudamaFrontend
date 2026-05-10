"use client";
import { Category } from "@/components/functions/types";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Save } from "lucide-react";
import { clientPost } from "@/components/functions/clientReq";
import { LargeBtn } from "@/components/ui/Button";
import { useRouter } from "next/router";

interface ProductFormComponent {
  initialData?: Category;
  submitURL: string;
  isPut?: boolean;
  setMessage: Function;
}

const CategoryForm = ({
  initialData,
  submitURL,
  isPut = false,
  setMessage,
}: ProductFormComponent) => {
  const form = useRef<HTMLFormElement>(null);
  const submitReq = clientPost(submitURL, isPut ? "put" : "post");
  const [previewURL, setPreviewURL] = useState<string | undefined>(initialData?.thumbnail);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage({
      type: "loading",
      message: `Please wait while the category is being ${isPut ? "modified" : "created"}.`,
    });
    if (!form.current) return;
    const formData = new FormData(form.current);

    // Frontend validation before making a request
    if (!previewURL) return setMessage({ type: "warn", message: "Thumbnail is missing." });
    for (const [k, v] of formData) {
      if (!v) {
        return setMessage({ type: "warn", message: `${k} is missing.` });
      }
      if (k === "stock") {
        if (Number(v) < 0) setMessage({ type: "warn", message: `Stock cannot be less than 0` });
      }
    }
    const { data, error } = await submitReq(formData);
    if (data && data.success) {
      setMessage({ type: "success", message: data.message });
    }

    if (error) setMessage({ type: "error", message: error });
  };

  const handleFile = (e: any) => {
    const file = e.target.files?.[0];

    if (file) {
      if (previewURL && previewURL.startsWith("blob:")) {
        URL.revokeObjectURL(previewURL);
      }
      const objURL = URL.createObjectURL(file);
      setPreviewURL(objURL);
    }
  };
  return (
    <form
      className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-5 -mt-2"
      encType="multipart/form-data"
      id="edit-or-create-form"
      ref={form}
      onSubmit={(e) => handleSubmit(e)}
    >
      {/* Main Column (Left side on desktop) */}
      <div className="md:col-span-3 space-y-5">
        {/* General Details Card */}
        <div className=" bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
          <h2 className="text-lg font-headline font-bold text-primary">Thumbnail</h2>

          <div className="space-y-0.5">
            <label htmlFor="thumbnail">
              {previewURL ? (
                <div className="aspect-square relative rounded-xl overflow-hidden h-75 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
                  <Image
                    src={previewURL}
                    fill
                    alt=""
                    loading="eager"
                    className=" object-contain bg-blend-multiply"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              ) : (
                <div className="border-2 border-dashed border-outline-variant/50 rounded-xl h-48 flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
                  <div className="bg-surface-container-highest p-3 rounded-full mb-3 group-hover:scale-110 transition-transform">
                    <UploadCloud className="text-primary" size={24} />
                  </div>
                  <p className="text-sm font-bold text-primary">Click to upload image</p>
                  <p className="text-xs text-outline mt-1">PNG, JPG up to 5MB</p>
                </div>
              )}
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              accept="image/*"
              onChange={(e) => handleFile(e)}
              className=" rounded-lg text-white text-center cursor-pointer mb-5 hidden"
            />
          </div>
        </div>
      </div>

      {/* Sidebar Column (Right side on desktop) */}
      <div className="space-y-6 md:col-span-2">
        {/* Organization Card */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
          <h2 className="text-lg font-headline font-bold text-primary">General Details</h2>

          <div className="space-y-2">
            <label className="text-sm font-label font-bold text-on-surface-variant">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={initialData?.name}
              placeholder="e.g. Indoor"
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-label font-bold text-on-surface-variant">
              Description
            </label>
            <textarea
              name="description"
              defaultValue={initialData?.description}
              rows={5}
              placeholder="Describe what types of plants/items are in this category..."
              className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 md:hidden gap-2 px-2">
          <LargeBtn extraClass=" text-on-surface-variant bg-surface-container-highest">
            Cancel
          </LargeBtn>
          <LargeBtn form="edit-or-create-form">
            <Save size={18} />
            Save
          </LargeBtn>
        </div>
      </div>
    </form>
  );
};

export default CategoryForm;
