import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPinned, MessageCircleQuestionMark } from "lucide-react";

export default function Footer() {
  return (
    <footer className="flex flex-col items-center w-full px-8 py-16 bg-primary-fixed rounded-t-[3rem] mt-10 font-label tracking-wider text-primary">
      <div className="max-w-304 w-full grid grid-cols-1 md:grid-cols-5 gap-10 items-center justify-around mb-8">
        <div className="logo flex flex-col items-center col-span-1 md:col-span-2 gap-1 ">
          <div className="logo w-65 flex flex-col items-center">
            <Image alt="Sudama Logo" src="/sudama.png" width="60" height={`10`} />
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
        <div className="h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 md:col-span-3 items-center justify-around gap-8">
          <div className="contact h-full grow flex flex-col items-center text-center lg:text-left lg:items-start text-on-primary-fixed gap-2">
            <h3 className="font-black text-lg font-headline uppercase text-primary/75 w-54">
              Contact Us
            </h3>
            <div className="flex flex-col text-md md:text-left gap-2">
              <div className="flex flex-row items-center gap-2 p-1 px-3 rounded-lg bg-surface-container-low shadow-md">
                <Phone size={`0.9em`} />
                <p className="text-sm font-semibold">+977 9847440395</p>
              </div>
              <div className="flex flex-row items-center gap-2 p-1 px-3 rounded-lg bg-surface-container-low shadow-md">
                <Mail size={`0.9em`} />
                <p className="text-sm font-semibold">sudamaplants@gmail.com</p>
              </div>
              <div className="flex flex-row items-center gap-2 p-1 px-3 rounded-lg bg-surface-container-low shadow-md">
                <MapPinned size={`0.9em`} />
                <p className="text-sm font-semibold">Kalika Chowk, Butwal</p>
              </div>
            </div>
          </div>
          <div className="contact h-full grow flex flex-col items-center text-center lg:text-left lg:items-start text-on-primary-fixed gap-2">
            <h3 className="font-black text-lg font-headline uppercase text-primary/75 w-54">
              Support
            </h3>
            <div className="flex flex-col text-md lg:text-left gap-2">
              <div className="flex flex-row items-center gap-2 p-1 px-3 rounded-lg bg-surface-container-low shadow-md">
                <MessageCircleQuestionMark size={`0.9em`} />
                <p className="text-sm font-semibold">support@sudamaplants.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-5 text-sm col-span-full mb-2">
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
