"use client";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const PasswordInput = ({ className }: { className: string }) => {
  const [passVisible, setPassVisible] = useState(false);
  return (
    <div className="relative">
      <input
        autoComplete="current-password"
        className={className}
        id="password"
        name="password"
        placeholder="••••••••"
        required={true}
        type={passVisible ? "text" : "password"}
      />
      <div className="absolute inset-y-0 left-3 pr-4 flex items-center pointer-events-none text-outline">
        <Lock size={`1.3em`} />
      </div>
      <div
        onClick={() => setPassVisible((prev) => !prev)}
        className="absolute cursor-pointer inset-y-0 right-0 pr-4 flex items-center text-outline"
      >
        {passVisible ? <Eye size={`1.3em`} /> : <EyeOff size={`1.3em`} />}
      </div>
    </div>
  );
};

export default PasswordInput;
