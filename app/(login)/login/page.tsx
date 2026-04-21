import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { leftSideClass } from "../layout";
import PasswordInput from "@/components/ui/PasswordInput";

const Login = () => {
  const inputClass =
    "block w-full font-body text-on-surface text-md bg-surface-container-high border-0 rounded-xl py-3.5 pl-10 pr-10 focus:ring-1 focus:ring-primary/20 focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-outline/70";
  return (
    <div className={`${leftSideClass} w-full flex flex-col justify-center px-5 py-12 relative`}>
      <div className="max-w-md w-full mx-auto">
        <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(22,29,26,0.04)] relative">
          <form action="#" className="space-y-6" method="POST">
            <div className="mb-10">
              <div className="logo flex flex-col items-center gap-1 mb-3">
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
            </div>
            {/* <!-- Email Input --> */}
            {/* <p className="text-center font-bold text-xl tracking-wider text-secondary">SIGN IN</p> */}
            <div>
              <label
                className="block font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  autoComplete="email"
                  className={inputClass}
                  id="email"
                  name="email"
                  placeholder="john@doe.com"
                  required={true}
                  type="email"
                />
                <div className="absolute inset-y-0 left-3 pr-4 flex items-center pointer-events-none text-outline">
                  <Mail size={`1.3em`} />
                </div>
              </div>
            </div>
            {/* <!-- Password Input --> */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    className="font-label text-xs uppercase tracking-[0.05em] text-primary hover:text-primary-container font-semibold transition-colors"
                    href="#"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <PasswordInput className={inputClass} />
            </div>
            {/* <!-- Submit Button --> */}
            <div className="pt-4">
              <button
                className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-xl shadow-sm font-label text-sm uppercase tracking-[0.05em] font-bold text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                type="submit"
              >
                Sign In
                <ArrowRight />
              </button>
            </div>
          </form>
        </div>
        {/* <!-- Footer Link --> */}
        <div className="mt-10 text-center">
          <p className="font-body text-on-surface-variant">
            Don't have an account yet?&nbsp;
            <a
              className="font-bold text-primary hover:text-primary-container transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
              href="#"
            >
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
