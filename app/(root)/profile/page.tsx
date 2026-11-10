import Image from "next/image";
import { User } from "@/components/functions/types";
import { validateUser } from "@/components/functions/request";
import { redirect } from "next/navigation";
import { ArrowRight, ShieldUser, UserRound, UserRoundKey } from "lucide-react";
import { adminFormInputClass } from "@/components/ui/css";
import PurchaseCard from "@/components/ui/PurchaseCard";
import { UserUpdateForm, UserPasswordForm } from "@/components/Admin/Actions/UserDetailsForm";
import SignOutButton from "@/components/ui/SignOut";
import Link from "next/link";

const Profile = async () => {
  const user: User = await validateUser();
  if (!user) redirect("/auth?mode=login");
  const { id, name } = user;
  const { role } = user;
  const isAdmin = role === "admin";

  return (
    <main className="flex-1 w-full mx-auto flex flex-col gap-8 max-w-304 mb-5">
      {/* Header Section */}
      <header className="w-full h-70 md:h-60 overflow-hidden text-center md:text-left relative flex flex-col justify-center">
        <div className="absolute -top-2 -right-3 opacity-50 pointer-events-none">
          <Image src={"/top-right.png"} width={150} height={500} alt="okay" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
          <img
            alt="user profile picture"
            className="w-20 h-20 rounded-full object-cover shadow-sm"
            src={`https://ui-avatars.com/api/?name=${name.replace(" ", "+")}&background=ccead3&color=173021`}
          />
          <div className="flex flex-col gap-3">
            <h1 className="text-4xl md:text-5xl font-display text-primary font-bold tracking-tight leading-none mb-2">
              {name}
            </h1>
            {isAdmin ? (
              <Link
                href="/admin"
                className="flex flex-row items-center justify-center rounded-xl bg-primary py-2.5 text-on-primary hover:-translate-y-2 transition-all gap-2 font-headline text-lg"
              >
                <ShieldUser />
                Go to admin panel
              </Link>
            ) : (
              <span className="font-bold">User</span>
            )}
          </div>
        </div>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed mx-auto md:mx-0">
          Manage your purchased plants, view order history, and update your account preferences.
        </p>
      </header>

      {/* My Collection (Main Feature) */}
      <div className="grid gap-8 grid-cols-1 xl:grid-cols-2">
        {/* Account Settings Section */}
        <section className="w-full bg-surface-container-lowest rounded-2xl p-5 md:p-7 pb-7 shadow-sm">
          <div className="mb-4 border-b border-outline-variant/20 pb-4">
            <h2 className="text-2xl font-display text-primary font-bold">Account Settings</h2>
            <p className="text-on-surface-variant text-sm mt-1">
              Manage your personal information and security
            </p>
          </div>

          <div className=" grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-6">
            {/* Personal Information */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <UserRound />
                Personal Information
              </h3>
              <UserUpdateForm initialData={user} />
            </div>

            {/* Security */}
            <div>
              <h3 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                <UserRoundKey />
                Security
              </h3>
              <UserPasswordForm />
            </div>
          </div>
        </section>
      </div>
      <SignOutButton />
    </main>
  );
};

export default Profile;
