/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState } from "react";
import Link from "next/link";
import { config } from "@/config";

export const Footer = () => {
  const title = config?.title || "Blog";
  const currentYear = new Date().getFullYear();
  
  // State for handling form submission
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const footerLinks = {
    explore: [
      { label: "Home", href: "/" },
      { label: "Blog Articles", href: "/blog" },
      { label: "Categories", href: "#" },
    ],
    legal: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
    ],
  };

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // TODO: Replace this timeout with your actual newsletter API endpoint 
      // (e.g., fetch("/api/subscribe", { method: "POST", body: JSON.stringify({ email }) }))
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      setStatus("success");
      setEmail("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <footer className="w-full bg-zinc-50 dark:bg-zinc-950 border-t border-gray-100 dark:border-zinc-900 mt-20">
      <div className="container mx-auto max-w-6xl px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 mb-12">
          
          {/* Brand & Newsletter Column (Spans 2 columns on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="font-sans font-extrabold tracking-tight text-xl text-primary block mb-2">
                {title}
              </span>
              <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
                Sharing thoughts, insights, and modern technical knowledge with our community.
              </p>
            </div>

            {/* Email Subscription Box */}
            <div className="max-w-md">
              <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-3">
                Subscribe to our Newsletter
              </h4>
              
              {status === "success" ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium border border-emerald-100 dark:border-emerald-900/50">
                  🎉 Thanks for subscribing! Please check your inbox.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <div className="flex gap-2">
                    <input
                      type="email"
                      required
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "loading"}
                      className="w-full h-10 px-3 text-sm rounded-lg bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary disabled:opacity-50 transition"
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="h-10 px-4 bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900 text-sm font-semibold rounded-lg shadow-sm hover:shadow transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center whitespace-nowrap"
                    >
                      {status === "loading" ? "Joining..." : "Subscribe"}
                    </button>
                  </div>
                  {status === "error" && (
                    <p className="text-xs text-rose-500 font-medium pl-1">
                      Something went wrong. Please try again.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Navigation Links Column */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.explore.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-xs font-bold text-foreground uppercase tracking-widest mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Bottom Attribution Section */}
        <div className="pt-8 border-t border-gray-200/50 dark:border-zinc-900/50 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <div>
            &copy; {currentYear} {title} CIC. All rights reserved.
          </div>
          
          {/* A6X LLC Attribution Link */}
          <div className="font-medium tracking-tight">
            Powered by{" "}
            <Link 
              href="https://a6x.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground hover:text-primary underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary font-semibold transition"
            >
              A6X LLC
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
