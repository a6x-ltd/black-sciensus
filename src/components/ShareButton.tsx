"use client";

import { useState } from "react";
import { Check, Share2 } from "lucide-react";

type Props = {
  url: string;
  title: string;
  className?: string;
};

export function ShareButton({ url, title, className = "" }: Props) {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    // Native share (mobile + modern desktop)
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // user cancelled — fall through to copy
      }
    }
    // Fallback: copy link to clipboard
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt("Copy this link:", url);
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share post"
      className={`inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-green-500" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" />
          <span>Share</span>
        </>
      )}
    </button>
  );
}