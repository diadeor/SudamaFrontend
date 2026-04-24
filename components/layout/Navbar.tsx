import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, TextAlignJustify, UserRound } from "lucide-react";
import validateUser from "../functions/validateUser";

export default async function Navbar() {
  let loggedIn = false;
  const activeClass = "text-primary border-b-2";
  const inactiveClass =
    "text-surface-tint hover:text-primary hover:scale-120 transition-all duration-250";
  const user = await validateUser();
  if (user) loggedIn = true;

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-sm">
      <nav className="flex justify-between items-center px-5 py-2 max-w-screen-2xl mx-auto ">
        <Link href="/">
          <Image src="/sudama.png" alt="Sudama Logo" width="35" height="50" />
        </Link>

        <div className="hidden text-md md:flex gap-8 items-center font-bold tracking-tight">
          <Link href="/" className={activeClass}>
            Home
          </Link>
          <Link href="/shop" className={inactiveClass}>
            Shop
          </Link>
          <Link href="/care" className={`${inactiveClass}`}>
            Plant Care
          </Link>
          <Link href="/journal" className={`${inactiveClass}`}>
            Journal
          </Link>
        </div>

        <div className="flex items-center gap-6 text-primary">
          <div className="hidden lg:flex items-center bg-surface-container-high rounded-lg px-3 py-3 gap-2 h-10 w-60">
            <Search size={`1.1em`} />
            <input
              className="bg-transparent border-none grow focus:ring-0 text-sm placeholder:text-secondary placeholder:font-semibold text-on-surface-variant outline-none"
              placeholder="Search here..."
              type="text"
            />
          </div>
          <button className="text-primary hover:opacity-70 transition-opacity flex items-center cursor-pointer">
            <ShoppingBag size={`1.1em`} />
          </button>
          {!loggedIn ? (
            <Link
              href="/login"
              className="hidden md:block bg-primary text-on-primary font-headline font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Log in
            </Link>
          ) : (
            <Link
              href={"/admin"}
              className="hidden md:block bg-primary text-on-primary p-2.5 rounded-full"
            >
              <UserRound size={`1.2em`} className="hover:scale-110 transition-all" />
            </Link>
          )}
          <div className="md:hidden hover:opacity-70 transition-opacity flex items-center cursor-pointer">
            <TextAlignJustify size={`1.3em`} />
          </div>
        </div>
      </nav>
    </header>
  );
}
