"use client";
import { useEffect } from "react";
import { DefinedError } from "@/components/functions/types";
import { childClass } from "@/components/Admin/DesktopLayout";
import { SmallBtn } from "@/components/ui/Button";
import { RotateCcw } from "lucide-react";

const AdminError = ({ error, reset }: DefinedError) => {
  useEffect(() => {
    console.log(error.message);
  }, [error]);
  return (
    <div className={`${childClass} flex flex-col items-center justify-center font-bold text-xl`}>
      {error.message}
      <SmallBtn link="#" onClickFunc={() => reset()}>
        <RotateCcw />
        Retry
      </SmallBtn>
    </div>
  );
};

export default AdminError;
