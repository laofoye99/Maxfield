import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link        from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tag       } from "@/components/ui/Tag";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { getPost, getAllPostSlugs } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};
  return {
    title:       post.title,
    description: post.summary,
  };
}

export default async function PostPage({ params }: Props) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">

      {/* Back link */}
      <Link
        href="/blog"
        className="text-sm text-gray-400 hover:text-brand transition-colors mb-8 inline-block"
      >
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1 className="text-4xl font-bold leading-tight mb-3">
          {post.title}
        </h1>
        <p className="text-sm text-gray-400 mb-4">
          {formatDate(post.date)} &middot; {post.readTime} min read
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}
      </header>

      {/* Article body */}
      <article
        className={[
          "prose prose-gray dark:prose-invert max-w-none",
          "prose-headings:font-bold prose-headings:tracking-tight",
          "prose-a:text-brand prose-a:no-underline hover:prose-a:underline",
          "prose-blockquote:border-l-brand prose-blockquote:not-italic",
          "prose-code:before:content-none prose-code:after:content-none",
          "prose-img:rounded-xl prose-img:shadow-sm",
        ].join(" ")}
      >
        <MDXRemote source={post.source} components={mdxComponents} />
      </article>
    </div>
  );
}