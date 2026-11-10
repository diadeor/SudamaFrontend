"use client";
import { LogOut } from "lucide-react";
import { clientGet } from "../functions/clientReq";
import { redirect } from "next/navigation";
import { useAuth } from "../providers/AuthContext";

const SignOutButton = () => {
  const signOutURL = "/api/auth/logout";
  const { user, setUser } = useAuth();

  const handleSignOut = async () => {
    const { data, error } = await clientGet(signOutURL);
    if (!error && data.success) {
      setUser(null);
      redirect("/auth?mode=login");
    }
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
