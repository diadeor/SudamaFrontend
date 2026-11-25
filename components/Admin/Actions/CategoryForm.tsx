"use client";
import { Category } from "@/components/functions/types";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { UploadCloud, Save, ChevronDown, CircleExclamationPoint } from "lucide-react";
import { clientPost } from "@/components/functions/clientReq";
import { LargeBtn } from "@/components/ui/Button";
import { adminFormInputClass } from "@/components/ui/css";

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
      className="grid grid-cols-1 gap-5 -mt-2"
      encType="multipart/form-data"
      id="edit-or-create-form"
      ref={form}
      onSubmit={(e) => handleSubmit(e)}
    >
      {/* Main Column (Left side on desktop) */}
      <div className="flex flex-col grow space-y-5">
        {/* General Details Card */}
        <div className="flex flex-col h-full bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
          <h2 className="text-lg font-headline font-bold text-primary">General Details</h2>

          <div className="grid gap-5 sm:grid-cols-[200px_1fr]">
            <div className="w-40 space-y-0.5 sm:w-auto">
              <p className="text-sm font-label font-bold text-on-surface-variant">
                Category Image *
              </p>
              <label
                htmlFor="thumbnail"
                className={`group relative flex aspect-square w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-xl bg-surface-container-low transition-colors hover:bg-surface-container ${
                  previewURL ? "" : "border-2 border-dashed border-outline-variant/50"
                }`}
              >
                {previewURL ? (
                  <>
                    <Image
                      src={previewURL}
                      fill
                      alt="Product image"
                      loading="eager"
                      className="object-cover mix-blend-multiply"
                      sizes="200px"
                    />
                    <span className="absolute inset-x-0 bottom-0 bg-black/50 py-1 text-center text-xs font-bold text-white opacity-0 transition-opacity group-hover:opacity-100">
                      Change
                    </span>
                  </>
                ) : (
                  <>
                    <div className="mb-2 rounded-full bg-surface-container-highest p-2.5 transition-transform group-hover:scale-110">
                      <UploadCloud className="text-primary" size={22} />
                    </div>
                    <p className="px-2 text-center text-xs font-bold text-primary">Upload image</p>
                    <p className="mt-0.5 px-2 text-center text-[11px] text-outline">
                      PNG, JPG up to 5MB
                    </p>
                  </>
                )}
              </label>
              <input
                type="file"
                name="thumbnail"
                id="thumbnail"
                accept="image/*"
                onChange={(e) => handleFile(e)}
                className="sr-only"
              />
            </div>
            <div className="flex flex-col content-start gap-3">
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
                <div className="flex flex-row items-center gap-2">
                  <label className="text-sm font-label font-bold text-on-surface-variant">
                    Slug
                  </label>
                  <p className="flex flex-row items-center gap-2 bg-error-container text-on-error-container px-3 py-1 rounded-lg">
                    <CircleExclamationPoint size={`1em`} />
                    <p className="font-bold text-xs">
                      Slug can't be modified {!initialData ? "once set" : ""}
                    </p>
                  </p>
                </div>
                <input
                  type="text"
                  name="slug"
                  defaultValue={initialData?.slug}
                  placeholder="Slug to uniquely identify this category"
                  className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                  disabled={initialData ? true : false}
                  readOnly={initialData ? true : false}
                />
              </div>
              <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5">
                <div className="relative">
                  <label className="text-sm font-label font-bold text-on-surface-variant">
                    Group
                  </label>
                  <select
                    name="category"
                    defaultValue={initialData?.group}
                    className={`${adminFormInputClass} appearance-none`}
                  >
                    <option value={"Plants"}>Plants </option>
                    <option value={"Supplies"}>Supplies </option>
                  </select>
                  <div className="absolute top-10.5 right-2">
                    <ChevronDown size={"1em"} />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-label font-bold text-on-surface-variant">
                    Order
                  </label>
                  <input
                    type="number"
                    name="order"
                    defaultValue={initialData?.order}
                    placeholder="Order number for sorting"
                    className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
                  />
                </div>
              </div>
            </div>
          </div>
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
    </form>
  );
};

export default CategoryForm;
