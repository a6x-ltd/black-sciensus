export const revalidate = 60; // 1 minute

import Image from "next/image";
import { BlogPostList } from "@/components/BlogPostList";
import { PostPagination } from "@/components/PostPagination";
import { getOgImageUrl } from "@/lib/ogImage";
import { wisp } from "@/lib/wisp";
import { Metadata } from "next";
import { FilterBar } from "../components/FilterBar";
import { FullWidthHeader } from "../components/FullWidthHeader";
import { config } from "../config";

const { title, description } = config;

export const metadata: Metadata = {
  title: `${title} - Blog`,
  description,
  openGraph: {
    title: `${title} - Blog`,
    description,
    images: [getOgImageUrl(title)],
  },
};

export default async function Page(
  props: {
    searchParams?: Promise<{ query: string; page: string }>;
  }
) {
  const searchParams = await props.searchParams;
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const result = await wisp.getPosts({
    limit: 6,
    query: searchParams?.query,
    page,
  });

  return (
    <>
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex justify-center pt-8 pb-0">
          <Image
            src="/bc-logo.png"
            alt={`${title} logo`}
            width={200}
            height={200}
            className="rounded-full object-cover"
            priority
          />
        </div>
      </div>
      <FullWidthHeader
        title={title}
        description={description}
        className="pt-0 lg:pt-0 pb-8 lg:pb-12"
      />
      <div className="container mx-auto max-w-6xl">
        <FilterBar active="latest" className="my-8" />
        <BlogPostList posts={result.posts} />
        <PostPagination
          pagination={result.pagination}
          className="my-16"
          query={searchParams?.query}
        />
      </div>
    </>
  );
}