import urlJoin from "url-join";
interface Category {
  label: string;
  tag: string;
  description: string;
}

const categories: Category[] = [
  {
    label: "Community",
    tag: "community",
    description: "Join our vibrant community of people that value health",
  },
  {
    label: "Health Topics",
    tag: "health-topics",
    description: "View our archives of health-related topics",
  },
  {
    label: "Events",
    tag: "events",
    description: "Spotlight on our latest events",
  },
  {
    label: "Professionals",
    tag: "professionals",
    description: "Promoting professionals within our community",
  },
  {
    label: "Browse by Category",
    tag: "Category",
    description: "Promoting professionals within our community",
  },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const config = {
  blogId: process.env.NEXT_PUBLIC_BLOG_ID || "a41e3933-a7ef-4400-842d-32ebae7e73b8",
  baseUrl,
  logoUrl: urlJoin(baseUrl, "bc-logo.png"),
  organization: process.env.NEXT_PUBLIC_BLOG_ORGANIZATION || "Black Sciensus CIC",
  title: process.env.NEXT_PUBLIC_BLOG_TITLE || "Black Sciensus",
  description:
    process.env.NEXT_PUBLIC_BLOG_DESCRIPTION ||
    "Black & African Health, Empowering Through Knowledge",
  categories,
};
