"use client";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 1. Next.js hydration fix: Ensure we only portal on the client-side
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Prevent scrolling on the background page when the menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Shop", href: "/shop" },
    { name: "Plant Care", href: "/care" },
    { name: "Journal", href: "/journal" },
  ];

  // The overlay markup extracted into a variable
  const menuOverlay = (
    <div
      className={`fixed inset-0 z-60 bg-surface/95 dark:bg-stone-950/95 backdrop-blur-xl flex flex-col transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        isOpen
          ? "opacity-100 pointer-events-auto translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-4"
      }`}
    >
      {/* Top Bar for Close Button */}
      <div className="flex justify-end px-6 md:px-8 py-4">
        <button
          onClick={() => setIsOpen(false)}
          className="text-primary dark:text-emerald-50 hover:opacity-80 transition-all duration-300 active:scale-95 p-1 pt-2 -mr-1"
          aria-label="Close Menu"
        >
          <X size={24} />
        </button>
      </div>

      {/* Centered Navigation Links */}
      <div className="flex flex-col gap-8 text-center flex-1 justify-center pb-20">
        {navLinks.map((link, index) => (
          <Link
            key={link.name}
            href={link.href}
            onClick={() => setIsOpen(false)}
            style={{ transitionDelay: isOpen ? `${index * 75}ms` : "0ms" }}
            className={`text-3xl font-body text-primary dark:text-emerald-50 tracking-wide transition-all duration-500 ${
              isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Bottom Editorial Footer */}
      <div
        className={`absolute bottom-12 left-0 w-full text-center flex flex-col gap-4 transition-all duration-700 delay-300 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-row justify-center gap-6 text-sm font-label uppercase tracking-widest text-on-surface-variant">
          <Link href="/profile" onClick={() => setIsOpen(false)}>
            Account
          </Link>
          <p>|</p>
          <Link href="/admin" onClick={() => setIsOpen(false)}>
            Admin
          </Link>
        </div>
        <p className="text-xs text-outline font-body mt-4">© 2026 Sudama Plant Store</p>
      </div>
    </div>
  );

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-primary dark:text-emerald-50 hover:opacity-80 transition-all duration-300 active:scale-95 p-1 -mr-1"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* The Overlay is teleported to the body tag so it escapes the fixed navbar! */}
      {mounted && createPortal(menuOverlay, document.body)}
    </>
  );
}
