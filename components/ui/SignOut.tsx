"use client";
import { LogOut } from "lucide-react";
import { useState } from "react";
import { clientGet } from "../functions/clientReq";

const SignOutButton = () => {
  const signOutURL = "/api/auth/logout";

  const handleSignOut = async () => {
    const { data, error } = await clientGet(signOutURL);
    console.log(data);
  };
  return (
    <button
      className="flex flex-row justify-center gap-3 bg-error-container text-on-error-container px-8 py-3 rounded-lg font-medium hover:bg-error-container/80 hover:-translate-y-2 cursor-pointer transition-all w-full sm:w-60 shadow-sm"
      type="button"
      onClick={handleSignOut}
    >
      <LogOut />
      Sign Out
    </button>
  );
};

export default SignOutButton;
