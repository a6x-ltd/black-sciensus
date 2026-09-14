"use client";

import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

type Props = {
  postId: string;
  initialLikes?: number;
  className?: string;
};

const STORAGE_KEY = "liked-posts";

function getLikedPosts(): string[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function LikeButton({ postId, initialLikes = 0, className = "" }: Props) {
  const [likes, setLikes] = useState(initialLikes);
  const [liked, setLiked] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setLiked(getLikedPosts().includes(postId));
  }, [postId]);

  const toggleLike = () => {
    const likedPosts = getLikedPosts();
    let next: string[];
    if (liked) {
      next = likedPosts.filter((id) => id !== postId);
      setLikes((n) => Math.max(0, n - 1));
    } else {
      next = [...likedPosts, postId];
      setLikes((n) => n + 1);
      // Optional: persist to your API
      // fetch(`/api/likes/${postId}`, { method: "POST" });
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setLiked(!liked);
  };

  // Avoid hydration mismatch — render a static placeholder on first paint
  if (!mounted) {
    return (
      <button
        disabled
        className={`inline-flex items-center gap-1.5 text-sm text-muted-foreground ${className}`}
      >
        <Heart className="h-4 w-4" />
        <span>{initialLikes}</span>
      </button>
    );
  }

  return (
    <button
      onClick={toggleLike}
      aria-pressed={liked}
      aria-label={liked ? "Unlike post" : "Like post"}
      className={`inline-flex items-center gap-1.5 text-sm transition-colors ${
        liked
          ? "text-red-500 hover:text-red-600"
          : "text-muted-foreground hover:text-red-500"
      } ${className}`}
    >
      <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
      <span>{likes}</span>
    </button>
  );
}