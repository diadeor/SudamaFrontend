"use client";
import { useRef, useState, useEffect } from "react";
import { UploadCloud, Save, ChevronDown } from "lucide-react";
import { LargeBtn } from "@/components/ui/Button";
import { Product } from "@/components/functions/types";
import Image from "next/image";
import { clientPost } from "@/components/functions/clientReq";
import { adminFormInputClass } from "@/components/ui/css";

interface ProductFormComponent {
  initialData?: Product;
  cats: string[] | undefined;
  submitURL: string;
  isPut?: boolean;
  setMessage: Function;
}

export default function ProductForm({
  initialData,
  cats,
  submitURL,
  isPut = false,
  setMessage,
}: ProductFormComponent) {
  const form = useRef<HTMLFormElement>(null);
  const submitReq = clientPost(submitURL, isPut ? "put" : "post");
  const [previewURL, setPreviewURL] = useState<string | undefined>(initialData?.thumbnail);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setMessage({
      type: "loading",
      message: `Please wait while the product is being ${isPut ? "modified" : "created"}.`,
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

  useEffect(() => {
    console.log(previewURL);
  }, [previewURL]);
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
          <h2 className="text-lg font-headline font-bold text-primary">General Details</h2>

          <div className="space-y-0.5">
            <p className="text-sm font-label font-bold text-on-surface-variant">Product Image</p>
            <label htmlFor="thumbnail">
              {previewURL ? (
                <div className="aspect-square h-75 relative rounded-xl overflow-hidden flex flex-col items-center justify-center bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer group">
                  <Image
                    src={previewURL}
                    fill
                    alt="Product image"
                    loading="eager"
                    className="object-cover mix-blend-multiply"
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
              className="hidden"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-label font-bold text-on-surface-variant">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              defaultValue={initialData?.name}
              placeholder="e.g. Monstera Deliciosa"
              className={adminFormInputClass}
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
              placeholder="Describe the plant's care needs and origin..."
              className={adminFormInputClass}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Column (Right side on desktop) */}
      <div className="space-y-6 md:col-span-2">
        {/* Pricing box */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-6">
          <h2 className="text-lg font-headline font-bold text-primary">Pricing & Inventory</h2>

          <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Regular Price (Rs.)
              </label>
              <input
                type="number"
                name="regularPrice"
                defaultValue={initialData?.regularPrice}
                placeholder="0.00"
                className={adminFormInputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Sale Price (Rs.)
              </label>
              <input
                type="number"
                name="salePrice"
                defaultValue={initialData?.salePrice}
                placeholder="0.00"
                className={adminFormInputClass}
              />
            </div>
            <div className="space-y-2 sm:col-span-full">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                defaultValue={initialData?.stock}
                placeholder="e.g. 50"
                className={adminFormInputClass}
              />
            </div>
          </div>
        </div>
        {/* Organization Card */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
          <h2 className="text-lg font-headline font-bold text-primary">Organization</h2>

          <div className="relative">
            <label className="text-sm font-label font-bold text-on-surface-variant">Category</label>
            <select
              name="category"
              key={initialData?.category || "loading"}
              defaultValue={initialData?.category.toLowerCase()}
              // onChange={(e) => setRelatedStatus({ ...relatedStatus, category: e.target.value })}
              className={`${adminFormInputClass} appearance-none`}
            >
              {cats?.map((cat, index) => {
                return (
                  <option value={cat.toLowerCase()} key={index}>
                    {cat}
                  </option>
                );
              })}
            </select>
            <div className="absolute top-10.5 right-2">
              <ChevronDown size={"1em"} />
            </div>
          </div>

          <div className="relative">
            <label className="text-sm font-label font-bold text-on-surface-variant">Status</label>
            <select
              name="status"
              defaultValue="active"
              className={`${adminFormInputClass} appearance-none`}
            >
              <option value="active">Active</option>
              <option value="draft">Draft</option>
            </select>
            <div className="absolute top-10.5 right-2">
              <ChevronDown size={"1em"} />
            </div>
          </div>
          <div className="relative">
            <label className="text-sm font-label font-bold text-on-surface-variant">Badge</label>
            <select
              name="badge"
              key={initialData?.badge || "loading"}
              defaultValue={initialData?.badge.toLowerCase()}
              className={`${adminFormInputClass} appearance-none`}
            >
              <option value="sale">On Sale</option>
              <option value="featured">Featured</option>
              <option value="new">New</option>
            </select>
            <div className="absolute top-10.5 right-2">
              <ChevronDown size={"1em"} />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:hidden gap-2 px-2">
          <LargeBtn extraClass=" text-on-surface-variant bg-surface-container-highest">
            Cancel
          </LargeBtn>
          <button
            type="submit"
            form="edit-or-create-form"
            className="px-6 py-2.5 rounded-xl font-label font-bold bg-primary text-on-primary hover:bg-primary-container hover:text-on-primary-container transition-colors flex items-center justify-center gap-2"
          >
            <Save size={18} />
            Save
          </button>
        </div>
      </div>
    </form>
  );
}
