"use client";
import { useRef, useState } from "react";
import { UploadCloud, Save, ChevronDown, WandSparkles } from "lucide-react";
import { LargeBtn, SmallBtn } from "@/components/ui/Button";
import { Category, Product } from "@/components/functions/types";
import Image from "next/image";
import { clientPost } from "@/components/functions/clientReq";
import { adminFormInputClass } from "@/components/ui/css";
import MultiSelect from "@/components/ui/MultiSelect";
import AdditionalPD from "./AdditionalPD";

interface ProductFormComponent {
  initialData?: Product;
  cats: Category[];
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
  const [selectedCat, setSelectedCat] = useState<string | undefined>(
    initialData ? initialData.primaryCategory : cats[0].slug,
  );
  const required = ["name", "salePrice", "primaryCategory", "slug"];
  const [name, setName] = useState<string | undefined>(initialData ? initialData.name : "");
  const [slug, setSlug] = useState<string | undefined>(initialData ? initialData.slug : "");

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
      if (k in required && !v) {
        return setMessage({ type: "warn", message: `${k} is missing.` });
      }
      if (k == "stock" && Number(v) < 0)
        return setMessage({ type: "warn", message: `Stock cannot be less than 0` });
    }
    const price = (key: string) => Number(formData.get(key));
    const regular = price("regularPrice");
    const sale = price("salePrice");
    if (regular && regular < sale) {
      return setMessage({
        type: "warn",
        message: `Sale price cannot be higher than regular price`,
      });
    }
    // Making the db request
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
  const generateSlug = () => {
    if (!name) {
      setMessage({ type: "error", message: "Enter a name first" });
      return;
    }
    setMessage({ type: "loading", message: "Generating a slug" });
    setSlug(() => name.replaceAll(" ", "-").toLowerCase());
    setMessage({ type: "success", message: "Slug Generated" });
  };
  return (
    <form
      className="grid grid-cols-1 min-[69rem]:grid-cols-[2fr_1fr] gap-5 -mt-2"
      encType="multipart/form-data"
      id="edit-or-create-form"
      ref={form}
      onSubmit={(e) => handleSubmit(e)}
    >
      {/* Main Column (Left side on desktop) */}
      <div className="flex flex-col space-y-5 grow">
        {/* General Details Card */}
        <div className="flex flex-col h-full bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
          <h2 className="text-lg font-headline font-bold text-primary">General Details</h2>

          <div className="grid gap-5 sm:grid-cols-[200px_1fr]">
            {/* Thumbnail */}
            <div className="w-40 space-y-0.5 sm:w-auto">
              <p className="text-sm font-label font-bold text-on-surface-variant">
                Product Image *
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

            {/* Fields */}
            <div className="flex flex-col content-start gap-3">
              <div className="col-span-full space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-label font-bold text-on-surface-variant"
                >
                  Product Name *
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  defaultValue={initialData?.name}
                  placeholder="e.g. Monstera Deliciosa"
                  onChange={(e) => setName(e.target.value)}
                  className={adminFormInputClass}
                />
              </div>

              <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-5">
                <div className="space-y-2">
                  <label
                    htmlFor="nickname"
                    className="text-sm font-label font-bold text-on-surface-variant"
                  >
                    Nickname
                  </label>
                  <input
                    id="nickname"
                    type="text"
                    name="nickname"
                    defaultValue={initialData?.nickname}
                    placeholder="e.g. Bagambeli"
                    className={adminFormInputClass}
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="status"
                    className="text-sm font-label font-bold text-on-surface-variant"
                  >
                    Status *
                  </label>
                  <select
                    id="status"
                    name="status"
                    defaultValue={initialData?.status ?? "active"}
                    className={`${adminFormInputClass} appearance-none`}
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                  <div className="pointer-events-none absolute top-10.5 right-2">
                    <ChevronDown size={"1em"} />
                  </div>
                </div>
              </div>

              <div className="col-span-full space-y-2">
                <label
                  htmlFor="slug"
                  className="text-sm font-label font-bold text-on-surface-variant"
                >
                  Slug *
                </label>
                <div className="flex flex-row items-center justify-center gap-3 w-full">
                  <input
                    id="slug"
                    type="text"
                    name="slug"
                    placeholder="e.g. monstera-deliciosa"
                    className={adminFormInputClass}
                    value={slug}
                    onChange={(e) => setSlug((prev) => e.target.value)}
                  />
                  <LargeBtn onClickFunc={generateSlug}>
                    Generate <WandSparkles size={"1em"} />
                  </LargeBtn>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col flex-1">
            <label
              htmlFor="description"
              className="text-sm font-label font-bold text-on-surface-variant mb-0.5"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={initialData?.description}
              placeholder="Describe the plant's care needs and origin..."
              className={`${adminFormInputClass} h-full resize-y grow`}
            />
          </div>
        </div>
      </div>

      {/* Sidebar Column (Right side on desktop) */}
      <div className="flex flex-col space-y-6">
        {/* Pricing box */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-6">
          <h2 className="text-lg font-headline font-bold text-primary">Pricing & Inventory</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] gap-3">
            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Regular Price
              </label>
              <input
                type="number"
                name="regularPrice"
                defaultValue={initialData?.regularPrice}
                placeholder="0.00"
                min={0}
                className={adminFormInputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Sale Price *
              </label>
              <input
                type="number"
                name="salePrice"
                defaultValue={initialData?.salePrice}
                placeholder="0.00"
                min={0}
                className={adminFormInputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Bargain Price
              </label>
              <input
                type="number"
                name="bargainPrice"
                defaultValue={initialData?.bargainPrice}
                placeholder="0.00"
                className={adminFormInputClass}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Stock *
              </label>
              <input
                type="number"
                name="stock"
                min={0}
                defaultValue={initialData ? initialData.stock : 0}
                placeholder="e.g. 50"
                className={adminFormInputClass}
              />
            </div>
          </div>
        </div>
        {/* Organization Card */}
        <div className="bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
          <h2 className="text-lg font-headline font-bold text-primary">Organization</h2>

          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
            <div className="relative">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Primary Category *
              </label>
              <select
                name="primaryCategory"
                key={initialData?.primaryCategory || "loading"}
                defaultValue={initialData?.primaryCategory.toLowerCase()}
                onChange={(e) => setSelectedCat(e.target.value)}
                className={`${adminFormInputClass} appearance-none`}
              >
                {cats?.map((cat, index) => {
                  return (
                    <option value={cat.slug} key={index}>
                      {cat.name}
                    </option>
                  );
                })}
              </select>
              <div className="absolute top-10.5 right-2">
                <ChevronDown size={"1em"} />
              </div>
            </div>
            <div className="relative">
              <MultiSelect
                key={initialData?._id ?? "new"}
                label="Categories"
                name="categories"
                className={adminFormInputClass}
                options={cats?.map((c) => ({ value: c.slug, label: c.name })) ?? []}
                defaultValue={initialData?.categories ?? []}
              />
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
                <option value="none">None</option>
              </select>
              <div className="absolute top-10.5 right-2">
                <ChevronDown size={"1em"} />
              </div>
            </div>
          </div>
        </div>
      </div>
      {cats?.find((item) => item.slug === selectedCat)?.group == "Plants" ? (
        <AdditionalPD initial={initialData} />
      ) : (
        <></>
      )}
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
    </form>
  );
}
