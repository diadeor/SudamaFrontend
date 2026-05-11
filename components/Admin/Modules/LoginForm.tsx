"use client";
import { useState } from "react";
import PasswordInput from "@/components/ui/PasswordInput";
import Image from "next/image";
import { Mail, ArrowRight } from "lucide-react";
import { postReq } from "@/components/functions/request";
import validateUser from "@/components/functions/validateUser";
import { clientPost } from "@/components/functions/clientReq";
import { inputClass } from "@/components/ui/css";

const LoginForm = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const loginReq = clientPost("/api/auth/login");

  const loginUser = async (e: any) => {
    e.preventDefault();
    const reqBody = {
      email,
      pass: password,
    };
    const login = await loginReq(reqBody);
    console.log(login);
  };

  return (
    <form action="#" className="space-y-6" method="POST" onSubmit={(e) => loginUser(e)}>
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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
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
        <PasswordInput className={inputClass} pass={password} setPass={setPassword} />
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
  );
};

export default LoginForm;
