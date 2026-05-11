"use client";
import AdminActionPage from "@/components/Admin/Modules/AdminActionPage";
import { useRef, useState } from "react";
import { Info } from "@/components/functions/types";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";
import { clientPost } from "@/components/functions/clientReq";
import { LargeBtn } from "@/components/ui/Button";
import { ChevronDown, Save } from "lucide-react";

const CreateUser = () => {
  const form = useRef<HTMLFormElement>(null);
  const [info, setInfo] = useState<Info>({ type: "error", message: "" });
  const addUserReq = clientPost("/api/users/create");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setInfo({
      type: "loading",
      message: `Please wait while a user account is being created.`,
    });
    if (!form.current) return;
    const formData = new FormData(form.current);

    // Frontend validation before making a request
    for (const [k, v] of formData) {
      if (!v) {
        return setInfo({ type: "warn", message: `${k} is missing.` });
      }
    }
    const formObj = Object.fromEntries(formData);
    const { data, error } = await addUserReq(formObj);
    if (data && data.success) {
      setInfo({ type: "success", message: data.message });
    }
    if (error) setInfo({ type: "error", message: error });
  };
  return (
    <AdminActionPage title="Add new user" navBack="/admin/users">
      {info.message && <AdminPopup info={info} setInfo={setInfo} />}
      <form
        className="grid grid-cols-1 md:grid-cols-5 gap-5 md:gap-5 -mt-2"
        id="edit-or-create-form"
        ref={form}
        onSubmit={(e) => handleSubmit(e)}
      >
        {/* Main Column (Left side on desktop) */}
        <div className="md:col-span-3 space-y-5">
          {/* General Details Card */}
          <div className=" bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
            <h2 className="text-lg font-headline font-bold text-primary">General Details</h2>

            <div>
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Full Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="e.g. John Doe"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-label font-bold text-on-surface-variant">Email</label>
              <input
                name="email"
                type="email"
                placeholder="e.g. johndoe@gmail.com"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
              />
            </div>
          </div>
        </div>
        {/* Side Column on desktop */}
        <div className="md:col-span-2 space-y-5">
          {/* General Details Card */}
          <div className=" bg-surface-container-lowest p-5 rounded-3xl shadow-[0_4px_16px_rgba(22,29,26,0.02)] border border-outline-variant/20 space-y-5">
            <h2 className="text-lg font-headline font-bold text-primary">Authentication</h2>

            <div className="space-y-2">
              <label className="text-sm font-label font-bold text-on-surface-variant">
                Password
              </label>
              <input
                name="pass"
                type="text"
                placeholder="Enter a strong password"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary placeholder:text-outline focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all resize-y"
              />
            </div>

            <div className="relative">
              <label className="text-sm font-label font-bold text-on-surface-variant">Role</label>
              <select
                name="role"
                defaultValue="active"
                className="w-full bg-surface-container-low border border-outline-variant/50 rounded-xl px-4 py-3 text-primary focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all appearance-none"
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
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
            <LargeBtn form="edit-or-create-form">
              <Save size={18} />
              Save
            </LargeBtn>
          </div>
        </div>
      </form>
    </AdminActionPage>
  );
};

export default CreateUser;
