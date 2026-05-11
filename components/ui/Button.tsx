"use client";
import Link from "next/link";
import { ReactNode } from "react";

interface Button {
  children: ReactNode;
  link?: string;
  extraClass?: string;
  onClickFunc?: Function;
  form?: string;
  submit?: boolean;
}

export const LargeBtn = ({
  children,
  link,
  extraClass,
  onClickFunc,
  form,
  submit = false,
}: Button) => {
  const buttonClass =
    "w-full px-5 py-3 cursor-pointer hover:scale-95 transition-all rounded-xl font-bold bg-primary text-on-primary text-md flex flex-row items-center justify-center gap-2";
  return (
    <Link href={link ?? "#"} className="font-headline">
      <button
        form={form}
        type={submit ? "submit" : "button"}
        onClick={() => (onClickFunc ? onClickFunc() : null)}
        className={` ${extraClass} ${buttonClass}`}
      >
        {children}
      </button>
    </Link>
  );
};

export const SmallBtn = ({ children, link, extraClass, onClickFunc }: Button) => {
  const buttonClass =
    "px-6 py-2 rounded-lg flex flex-row gap-2 w-full items-center bg-surface-tint text-white cursor-pointer hover:scale-105 transition-all";
  return (
    <Link href={link ?? "#"}>
      <button
        onClick={() => (onClickFunc ? onClickFunc() : null)}
        className={`${buttonClass} ${extraClass}`}
      >
        {children}
      </button>
    </Link>
  );
};

export const ActionButton = ({
  children,
  onclick,
  bg,
}: {
  children: any;
  onclick?: Function;
  bg: string;
}) => {
  return (
    <button
      onClick={onclick ? (e) => onclick(e) : undefined}
      className={`edit ${bg} min-h-8 min-w-10 flex items-center justify-center rounded-lg cursor-pointer hover:border border-outline-variant duration-200 transition hover:scale-110`}
    >
      {children}
    </button>
  );
};
