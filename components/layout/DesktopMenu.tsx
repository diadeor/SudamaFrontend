"use client";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
const DesktopMenu = ({ css }: { css: string }) => {
  const current = useSelectedLayoutSegment();
  const active = current == null ? "/" : `/${current}`;
  const inactiveClass =
    "hover:text-primary hover:scale-105 transition-all duration-200 py-2 px-5 rounded-full";
  const activeClass = "text-black bg-primary-fixed tracking-widest";
  const links = [
    { href: "/", title: "Home" },
    { href: "/shop", title: "Shop" },
    { href: "/care", title: "Care" },
  ];
  return (
    <div className={`${css}`}>
      {links.map((item) => {
        const { href, title } = item;
        return (
          <Link
            href={href}
            key={href}
            aria-current={active ? "page" : undefined}
            className={`${inactiveClass} ${active == href ? activeClass : "text-surface-tint"}`}
          >
            {title}
          </Link>
        );
      })}
    </div>
  );
};

export default DesktopMenu;
