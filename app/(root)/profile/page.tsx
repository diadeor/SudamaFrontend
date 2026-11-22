import Image from "next/image";
import { User } from "@/components/functions/types";
import { validateUser } from "@/components/functions/request";
import { redirect } from "next/navigation";
import { ArrowRight, ShieldUser, UserRound, UserRoundKey } from "lucide-react";
import { UserUpdateForm, UserPasswordForm } from "@/components/Admin/Actions/UserDetailsForm";
import SignOutButton from "@/components/ui/SignOut";
import Link from "next/link";

const Profile = async () => {
  const user: User = await validateUser();
  if (!user) redirect("/auth?mode=login");
  const { id, name } = user;
  const { role } = user;
  const isAdmin = role === "admin";
  const sectionCSS =
    "bg-surface-container-lowest min-w-85 p-5 rounded-2xl shadow-sm w-1/2 flex-1 grow flex flex-col";

  return (
    <main className="flex-1 w-full mx-auto flex flex-col gap-5 max-w-304 mb-5">
      {/* Header Section */}
      <header className="w-full h-75 md:h-60 overflow-hidden text-center md:text-left relative flex flex-col justify-center">
        <div className="absolute -top-2 -right-3 opacity-50 pointer-events-none">
          <Image src={"/top-right.png"} width={150} height={500} alt="okay" />
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 mb-0">
          <img
            alt="user profile picture"
            className="w-30 h-30 rounded-full object-cover shadow-sm md:h-40 md:w-40"
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
            <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed mx-auto md:mx-0">
              Manage your account.
            </p>
          </div>
        </div>
      </header>

      <hr className="border border-secondary/40" />

      <section className="w-full h-full flex flex-row flex-wrap items-center justify-between gap-5 pb-7">
        <div className={sectionCSS}>
          <h2 className="text-xl pb-4 mb-4 border-b-2 border-outline-variant/20 font-bold text-primary flex items-center gap-2">
            <UserRound size={`1.1em`} />
            Personal Information
          </h2>
          <UserUpdateForm initialData={user} />
        </div>
        <div className={sectionCSS}>
          <h3 className="text-xl pb-4 mb-4 border-b-2 border-outline-variant/20 font-bold text-primary flex items-center gap-2">
            <UserRoundKey size={`1.1em`} />
            Security
          </h3>
          <UserPasswordForm />
        </div>
      </section>
      <SignOutButton />
    </main>
  );
};

export default Profile;
