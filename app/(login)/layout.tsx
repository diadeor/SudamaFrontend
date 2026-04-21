import { ReactNode } from "react";
import Image from "next/image";

export const leftSideClass = "left md:col-span-3 lg:col-span-1";

const LoginFlow = ({ children }: { children: ReactNode }) => {
  return (
    <div className="min-h-svh grid grid-cols-1 md:grid-cols-5 lg:grid-cols-2">
      <div className="hidden md:block md:col-span-2 lg:col-span-1 relative bg-primary-container">
        <Image
          src="/nature5.jpg"
          alt="Birds flying over a mountain"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-linear-to-t from-primary/60 to-transparent"></div>

        <div className="absolute bottom-15 left-15 right-15 text-on-primary">
          <p className=" gap-5 text-5xl mb-8 font-bold bg-clip-text bg-linear-to-r text-transparent from-title to-surface-container-low ">
            Step Into The Sanctuary
          </p>
          <p className="font-body italic text-2xl leading-snug">
            "The right plant transforms a room from merely decorated to truly alive."
          </p>
        </div>
      </div>
      {children}
    </div>
  );
};

export default LoginFlow;
