"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Author, GetRelatedPostsResult, TagInPost } from "@wisp-cms/client";
import Image from "next/image";
import Link from "next/link";
import { FullWidthHeader } from "./FullWidthHeader";
import { RelatedPosts } from "./RelatedPosts";
import { processTableOfContents, TableOfContents } from "./TOC";
import { ContentWithCustomComponents } from "@wisp-cms/react-custom-component";
import { FAQ } from "./WispComponents/FAQ";
import { formatFullDate } from "@/lib/date";
import { CommentSection } from "./CommentSection";

export const BlogContent = ({
  post: { title, content, author, publishedAt, tags, slug },
  relatedPosts,
}: {
  post: {
    id: string;
    createdAt: Date;
    teamId: string;
    description: string | null;
    title: string;
    content: string;
    slug: string;
    image: string | null;
    authorId: string;
    updatedAt: Date;
    publishedAt: Date | null;
    tags: TagInPost[];
    author: Author;
  };
  relatedPosts: GetRelatedPostsResult["posts"];
}) => {
  const { modifiedHtml, tableOfContents } = processTableOfContents(content, {
    h1: true,
    h2: true,
    h3: true,
    h4: true,
    h5: true,
    h6: true,
  });

  // Split multiple author names if they are written like "John Doe, Jane Smith"
  const authorNames = author && author.name 
    ? author.name.split(",").map((name) => name.trim()) 
    : [];

  return (
    <>
      <FullWidthHeader
        title={title}
        description=""
        breadcrumb={[
          { label: "Home", href: "/" },
          { label: title, href: "" },
        ]}
      />
      <div className="container mx-auto mt-8 px-4 max-w-6xl">
        <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
          {/* Top header meta area */}
          <div className="flex items-center gap-2">
            {author.image && (
              <Image
                src={author.image}
                alt={author.name || "Author image"}
                width={30}
                height={30}
                className="rounded-full"
              />
            )}
            
            <div className="font-medium text-foreground">
              {authorNames.length > 0 ? (
                authorNames.map((name, index) => (
                  <span key={name}>
                    {name}
                    {index < authorNames.length - 2 && ", "}
                    {index === authorNames.length - 2 && " & "}
                  </span>
                ))
              ) : (
                author.name
              )}
            </div>
          </div>
          
          <span className="text-gray-300">|</span>
          
          <div>
            Published on {publishedAt ? formatFullDate(publishedAt) : "N/A"}
          </div>
        </div>
        
        <div className="flex">
          <div className="lg:w-3/4 prose prose-lg max-w-none w-full break-words blog-content">
            <Accordion
              type="single"
              collapsible
              className="w-full not-prose my-6 block lg:hidden"
            >
              <AccordionItem value="toc" className="border-none">
                <AccordionTrigger>Table of Content</AccordionTrigger>
                <AccordionContent>
                  <TableOfContents items={tableOfContents} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <ContentWithCustomComponents
              content={modifiedHtml}
              customComponents={{
                FAQ,
              }}
            />
          </div>
          {/* <div className="w-1/4 hidden lg:block">
            <div className="sticky top-0 mt-4 p-4 max-h-screen overflow-y-auto">
              <div className="text-lg font-semibold">Table of Contents</div>
              <TableOfContents items={tableOfContents} />
            </div>
          </div> */}
        </div>
        
        <div className="my-8 space-x-2">
          {tags.map((tag) => (
            <Link href={`/category/${tag.name}`} key={tag.id} className="text-sm font-medium hover:underline">
              #{tag.name}
            </Link>
          ))}
        </div>

        {/* Dynamic Multi-Author Bio Section */}
        <div className="my-12 border-t border-b border-gray-100 py-8">
          <h3 className="text-xl font-semibold mb-6">About the Authors</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {authorNames.map((name) => (
              <div key={name} className="flex gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
                <div className="flex-shrink-0">
                  <Image
                    src={author.image || "/fallback-avatar.png"}
                    alt={name}
                    width={50}
                    height={50}
                    className="rounded-full bg-gray-200"
                  />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{name}</h4>
                  <p className="text-sm text-gray-500 mt-1">
                    Co-author and contributor to this post. Sharing insights and industry expertise.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <CommentSection slug={slug} />
        <RelatedPosts posts={relatedPosts} />
      </div>
    </>
  );
};
