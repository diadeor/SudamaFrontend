"use client";
import Link from "next/link";
import { leftSideClass } from "../layout";
import { clientPost } from "@/components/functions/clientReq";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { GoogleLogin } from "@react-oauth/google";
import { inputClass } from "@/components/ui/css";
import PasswordInput from "@/components/ui/PasswordInput";
import Image from "next/image";
import { Mail, ArrowRight, IdCard } from "lucide-react";
import AdminPopup from "@/components/Admin/Modules/AdminMsgPopup";
import { Info } from "@/components/functions/types";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<Info>({ type: "warn", message: "" });
  const loginReq = clientPost("/api/auth/login");
  const signUpReq = clientPost("/api/auth/register");
  const googleLoginReq = clientPost("/api/auth/google");
  // const [isLoginPage, setIsLoginPage] = useState(true);
  const params = useSearchParams();
  const isLoginPage = params.get("mode") === "login" ? true : false;

  const loginUser = async (e: any) => {
    e.preventDefault();
    setMessage({ type: "loading", message: "Logging In..." });
    const reqBody = {
      email,
      pass: password,
    };
    const { data, error } = await loginReq(reqBody);
    if (!error && data.success) {
      setMessage({ type: "success", message: data.message });
    } else {
      setMessage({ type: "error", message: error });
    }
  };
  const googleLoginSuccess = async (resp: any) => {
    const token = resp.credential;

    const { data, error } = await googleLoginReq({ token });
    if (error) {
      setMessage({ type: "error", message: error });
    }
  };
  const googleLoginError = async () => {
    setMessage({ type: "error", message: "Google Login Error" });
  };

  return (
    <div className={`${leftSideClass} w-full flex flex-col justify-center px-5 py-12 relative`}>
      <div className="max-w-md w-full mx-auto">
        {message.message && <AdminPopup info={message} setInfo={setMessage} />}
        <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(22,29,26,0.04)] relative">
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
            {/* Name Input */}
            {!isLoginPage && (
              <div>
                <label
                  className="block font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold mb-2"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <div className="relative">
                  <input
                    autoComplete="name"
                    className={inputClass}
                    id="name"
                    name="name"
                    placeholder="John Doe"
                    required={true}
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                  <div className="absolute inset-y-0 left-3 pr-4 flex items-center pointer-events-none text-outline">
                    <IdCard size={`1.3em`} />
                  </div>
                </div>
              </div>
            )}
            {/* Email Input */}
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
            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className="block font-label text-xs uppercase tracking-[0.05em] text-on-surface-variant font-semibold"
                  htmlFor="password"
                >
                  Password
                </label>
                {isLoginPage && (
                  <div className="text-sm">
                    <a
                      className="font-label text-xs uppercase tracking-[0.05em] text-primary hover:text-primary-container font-semibold transition-colors"
                      href="#"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}
              </div>
              <PasswordInput className={inputClass} pass={password} setPass={setPassword} />
            </div>
            {/* Submit Button */}
            <div className="pt-4">
              <button
                className="w-full flex justify-center items-center gap-2 py-3 px-6 border border-transparent rounded-xl shadow-sm font-label text-md uppercase tracking-widest font-bold text-on-primary bg-primary hover:bg-primary-container focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all duration-300"
                type="submit"
              >
                {isLoginPage ? "Sign In" : "Sign Up"}
                <ArrowRight />
              </button>
            </div>
            <GoogleLogin
              theme="outline"
              size="large"
              shape="circle"
              type="standard"
              text="continue_with"
              onSuccess={googleLoginSuccess}
              onError={googleLoginError}
              useOneTap
            />
          </form>
        </div>
        {/* <!-- Footer Link --> */}
        <div className="mt-10 text-center">
          <p className="font-body text-on-surface-variant">
            {isLoginPage ? "Don't have an account yet?" : "Already have an account?"}&nbsp;
            <Link
              href={`/auth?mode=${isLoginPage ? "register" : "login"}`}
              className="font-bold text-primary hover:text-primary-container transition-colors underline underline-offset-4 decoration-primary/30 hover:decoration-primary"
            >
              Sign {isLoginPage ? "Up" : "In"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
