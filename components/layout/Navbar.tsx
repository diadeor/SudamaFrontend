import Link from "next/link";
import Image from "next/image";
import { Search, ShoppingBag, TextAlignJustify, UserRound } from "lucide-react";
import { validateUser, fetchReq } from "../functions/request";
import MobileMenu from "./MobileMenu";
import { Product } from "../functions/types";
import DesktopMenu from "./DesktopMenu";
import SearchBox from "./SearchBox";

export default async function Navbar() {
  let loggedIn = false;
  const user = await validateUser();
  if (user) loggedIn = true;
  const { data, error } = await fetchReq("/api/products", false, 60, "products");
  const { products }: { products: Product[] } = data;

  return (
    <header className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-sm">
      <nav className="flex justify-between items-center px-5 md:px-10 py-2 max-w-7xl mx-auto">
        <Link href="/">
          <Image src="/sudama.png" alt="Sudama Logo" width="35" height="50" />
        </Link>

        <DesktopMenu css="hidden font-headline text-md min-[54rem]:flex gap-3 items-center font-semibold tracking-wide" />

        <div className="flex items-center gap-3 text-primary">
          <SearchBox prods={products} />
          {!loggedIn ? (
            <Link
              href="/auth?mode=login"
              className="hidden sm:block  bg-primary text-on-primary font-headline font-bold text-sm px-6 py-2.5 rounded-lg hover:bg-primary-container hover:text-on-primary-container transition-colors"
            >
              Log in
            </Link>
          ) : (
            <Link
              href={"/profile"}
              className="hidden md:block bg-primary text-on-primary p-2.5 rounded-full"
            >
              <UserRound size={`1.2em`} className="hover:scale-110 transition-all" />
            </Link>
          )}
          <div className="min-[54rem]:hidden hover:opacity-70 transition-opacity flex items-center cursor-pointer">
            <MobileMenu />
          </div>
        </div>
      </nav>
    </header>
  );
}
