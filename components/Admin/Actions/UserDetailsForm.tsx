"use client";
import { useRef, useState } from "react";
import { adminFormInputClass } from "@/components/ui/css";
import { Info, User } from "@/components/functions/types";
import { clientPost } from "@/components/functions/clientReq";
import AdminPopup from "../Modules/AdminMsgPopup";

interface DetailsInput {
  type: "email" | "text" | "password";
  name: string;
  defaultVal?: string;
  placeholder?: string;
}

const UpdateInput = ({ type, name, defaultVal, placeholder }: DetailsInput) => {
  return (
    <input
      type={type}
      name={name}
      defaultValue={defaultVal}
      placeholder={placeholder}
      className={adminFormInputClass}
    />
  );
};

export const UserUpdateForm = ({ initialData }: { initialData: User }) => {
  const { id, name, email } = initialData;
  const [info, setInfo] = useState<Info>({ type: "warn", message: "" });
  const detailsUpdateURL = `/api/users/update/${id}`;
  const detailsUpdateReq = clientPost(detailsUpdateURL, "put");
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    setInfo({ type: "loading", message: "Updating user data..." });
    const formData = new FormData(form.current);
    const formObj = Object.fromEntries(formData);
    const { data, error } = await detailsUpdateReq(formObj);
    if (!error && data.success) {
      setInfo({ type: "success", message: data.message });
    } else {
      console.log("object");
      setInfo({ type: "error", message: error });
    }
  };
  return (
    <form className="relative space-y-5" ref={form} onSubmit={(e) => handleSubmit(e)}>
      {info.message && <AdminPopup info={info} setInfo={setInfo} bg={false} />}
      <label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="name">
        Full Name
      </label>
      <UpdateInput name="name" type="text" defaultVal={name} placeholder="e.g. John Doe" />

      <label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="email">
        Email Address
      </label>
      <UpdateInput
        name="email"
        type="email"
        defaultVal={email}
        placeholder="e.g. johndoe@gmail.com"
      />

      <button
        className="bg-primary text-on-primary px-8 py-3 rounded-lg font-medium hover:bg-primary/90 hover:-translate-y-2 cursor-pointer transition-all mt-4 w-full sm:w-auto shadow-sm"
        type="submit"
      >
        Save Changes
      </button>
    </form>
  );
};

export const UserPasswordForm = () => {
  const [info, setInfo] = useState<Info>({ type: "warn", message: "" });
  const passUpdateURL = `/api/auth/pass`;
  const passUpdateReq = clientPost(passUpdateURL);
  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!form.current) return;
    setInfo({ type: "loading", message: "Changing user pass..." });
    const formData = new FormData(form.current);
    const formObj = Object.fromEntries(formData);
    const { data, error } = await passUpdateReq(formObj);
    if (!error && data.success) {
      setInfo({ type: "success", message: data.message });
    } else {
      setInfo({ type: "error", message: error });
    }
  };
  return (
    <form className="space-y-5 relative" ref={form} onSubmit={(e) => handleSubmit(e)}>
      {info.message && <AdminPopup info={info} setInfo={setInfo} bg={false} />}
      <div>
        <label className="block text-sm font-medium text-on-surface-variant mb-1" htmlFor="old">
          Current Password
        </label>
        <input
          type="text"
          name="old"
          placeholder="Password goes here"
          className={adminFormInputClass}
        />
      </div>
      <div>
        <label
          className="block text-sm font-medium text-on-surface-variant mb-1"
          htmlFor="newPassword"
        >
          New Password
        </label>
        <input
          type="text"
          name="newPass"
          placeholder="Password goes here"
          className={adminFormInputClass}
        />
      </div>
      <button
        className="bg-surface-container-highest text-on-surface px-8 py-3 rounded-lg font-medium hover:bg-surface-container-highest/80 hover:-translate-y-2 cursor-pointer transition-all mt-4 w-full sm:w-auto shadow-sm"
        type="submit"
      >
        Update Password
      </button>
    </form>
  );
};
