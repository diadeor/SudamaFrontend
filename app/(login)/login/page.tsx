import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { leftSideClass } from "../layout";
import PasswordInput from "@/components/ui/PasswordInput";
import LoginForm from "@/components/Admin/Modules/LoginForm";

const Login = () => {
  return (
    <div className={`${leftSideClass} w-full flex flex-col justify-center px-5 py-12 relative`}>
      <div className="max-w-md w-full mx-auto">
        <div className="bg-surface-container-lowest rounded-3xl p-8 sm:p-10 shadow-[0_32px_64px_rgba(22,29,26,0.04)] relative">
          <LoginForm />
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
