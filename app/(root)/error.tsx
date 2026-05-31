"use client";
import { DefinedError } from "@/components/functions/types";

const NormalError = ({ error, reset }: DefinedError) => {
  console.log(error);
  return <div className="max-w-screen-2xl mx-auto ">{error.message}</div>;
};

export default NormalError;
