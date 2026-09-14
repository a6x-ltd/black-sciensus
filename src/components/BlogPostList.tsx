import Image from "next/image";
import Link from "next/link";
import type { GetPostsResult } from "@wisp-cms/client";
import { formatFullDate } from "@/lib/date";
import { LikeButton } from "@/components/LikeButton";
import { ShareButton } from "@/components/ShareButton";
import { config } from "@/config";

export const BlogPostList = ({ posts }: { posts: GetPostsResult["posts"] }) => {
  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2 px-4">
      {posts.map((post) => {
        // Split multiple author names if they are written like "John Doe, Jane Smith"
        const authorNames = post.author && post.author.name 
          ? post.author.name.split(",").map((name) => name.trim()) 
          : [];

        const postUrl = `${config.baseUrl}/post/${post.slug}`;

        return (
          <div className="break-words" key={post.id}>
            <Link href={`/post/${post.slug}`}>
              <div className="aspect-[16/9] relative">
                {post.image ? (
                  <Image
                    alt={post.title}
                    className="object-cover"
                    src={post.image}
                    fill
                  />
                ) : (
                  <Image src="/placeholder.jpg" alt="placeholder" fill />
                )}
              </div>
            </Link>
            <div className="grid grid-cols-1 gap-3 md:col-span-2 mt-4">
              <h2 className="font-sans font-semibold tracking-tighter text-primary text-2xl md:text-3xl">
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h2>
              <div className="prose lg:prose-lg leading-relaxed md:text-lg line-clamp-4 text-muted-foreground">
                {post.description}
              </div>

              {/* Meta row: author/date on the left, like/share on the right */}
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-2">
                  {post.author.image && (
                    <Image
                      src={post.author.image}
                      alt={post.author.name || "Author image"}
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  )}
                  <div className="font-medium text-sm md:text-base">
                    {authorNames.length > 0 ? (
                      authorNames.map((name, index) => (
                        <span key={name}>
                          {name}
                          {index < authorNames.length - 2 && ", "}
                          {index === authorNames.length - 2 && " & "}
                        </span>
                      ))
                    ) : (
                      post.author.name
                    )}
                    <span className="text-muted-foreground mx-1">|</span> Published on{" "}
                    {formatFullDate(post.publishedAt || post.createdAt)}
                  </div>
                </div>

                {/* Like + Share buttons — outside the <Link> so clicks don't navigate */}
                <div className="flex items-center gap-4">
                  <LikeButton postId={post.id} initialLikes={0} />
                  <ShareButton url={postUrl} title={post.title} />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};