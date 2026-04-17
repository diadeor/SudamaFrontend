import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const clg = "sm:bg-red-500 md:bg-blue-500 lg:bg-pink-500 xl:bg-purple-500 2xl:bg-amber-500";
  return (
    <footer className="w-full px-8 py-8 grid grid-cols-1 md:grid-cols-2 items-center justify-around gap-8 bg-primary-fixed rounded-t-[3rem] mt-10 font-label tracking-[0.05em] text-primary">
      <div className="logo flex flex-col items-center md:items-end md:mr-5 gap-1 ">
        <div className="logo w-62 flex flex-col items-center">
          <Image alt="Sudama Logo" src="/sudama.png" width="55" height={`10`} />
        </div>
        <Image
          src={`/sudama.svg`}
          alt="Sudama Name in Nepali"
          width={250}
          height={50}
          className="contain"
          priority
        />
      </div>
      <div className="contact flex flex-col items-center md:items-start md:ml-5 text-on-primary-fixed gap-3">
        <h3 className="font-black text-xl font-headline uppercase text-title w-54 text-center">
          Contact Us
        </h3>
        <div className="flex flex-col text-center text-md">
          <p>+977 9847440395</p>
          <p>sudamaplants@gmail.com</p>
          <p>Kalika Chowk, Butwal</p>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 text-sm col-span-full">
        <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">
          Shipping
        </Link>
        <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">
          Contact
        </Link>
        <Link href="#" className="opacity-60 hover:opacity-100 transition-opacity">
          Privacy
        </Link>
      </div>
      <p className="opacity-50 text-center col-span-full text-xs">
        © 2026 Sudama Plant Store. All rights reserved.
      </p>
    </footer>
  );
}
