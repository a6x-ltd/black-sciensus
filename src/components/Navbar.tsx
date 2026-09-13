"use client";

import { useState } from "react";
import Link from "next/link";
import { config } from "@/config";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Safely extract config properties inside the client runtime component execution block
  const title = config?.title || "Blog";
  // const logoUrl = config?.logoUrl || "/bc-logo.png"; // Falls back directly to public/bc-logo.png if config is empty

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/blog" },
    { label: "Subscribe", href: "#" },
    { label: "Ads", href: "#" },
    { label: "Contact", href: "#" },
  ];

  return (
    <nav className="w-full bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-zinc-950/90">
      <div className="container mx-auto max-w-6xl px-4 h-16 flex items-center justify-between">
        
        {/* Brand/Logo Area */}
        <Link href="/" className="flex items-center gap-3 group">
          {/* <Image
            src={logoUrl}
            alt={`${title} logo`}
            width={36}
            height={36}
            className="rounded-full border border-gray-100 dark:border-zinc-800 object-cover aspect-square transition group-hover:scale-105"
            priority // Forces immediate asset loading to prevent layout shifts on render
          /> */}
          <span className="font-sans font-bold tracking-tight text-lg text-primary">
            {title}
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-950 border-b border-gray-100 dark:border-zinc-800 px-4 pt-2 pb-4 flex flex-col gap-3 shadow-inner">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="text-base font-medium py-2 px-3 rounded-lg hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};
