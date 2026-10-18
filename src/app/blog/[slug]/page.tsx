import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link        from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Tag       } from "@/components/ui/Tag";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { getPost, getAllPostSlugs, getAdjacentPosts } from "@/lib/markdown";
import { formatDate } from "@/lib/utils";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map(({ slug }) => ({ slug }));
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

  const { prev, next } = getAdjacentPosts(params.slug, post.lang);

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">

      {/* Back */}
      <Link
        href="/blog"
        style={{ color: "var(--muted)" }}
        className="text-sm hover:text-[var(--primary-dark)] transition-colors mb-8 inline-block"
      >
        Back to Blog
      </Link>

      {/* Header */}
      <header className="mb-10">
        <h1
          style={{ color: "var(--text)" }}
          className="text-4xl font-bold leading-tight mb-3"
        >
          {post.title}
        </h1>
        <p style={{ color: "var(--muted)" }} className="text-sm mb-4">
          {formatDate(post.date)} · {post.readTime} min read
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {post.tags.map((tag) => (
              <Tag key={tag} text={tag} href={`/blog/tag/${tag}`} />
            ))}
          </div>
        )}
      </header>

      {/* Body */}
      <article
        style={{ color: "var(--text)", lineHeight: 1.85 }}
        className="prose prose-gray dark:prose-invert max-w-none
          prose-headings:font-bold prose-headings:tracking-tight
          prose-a:no-underline hover:prose-a:underline
          prose-blockquote:not-italic
          prose-code:before:content-none prose-code:after:content-none
          prose-img:rounded-xl prose-img:shadow-sm"
      >
        <MDXRemote source={post.rawContent} options={post.mdxOptions} components={mdxComponents} />
      </article>

      {/* Previous / Next navigation */}
      {(prev || next) && (
        <nav
          style={{ borderColor: "var(--border)" }}
          className="mt-16 pt-8 border-t grid grid-cols-2 gap-4"
        >
          {prev ? (
            <Link
              href={`/blog/${prev.slug}`}
              className="group text-left"
            >
              <span style={{ color: "var(--muted)" }} className="text-xs uppercase tracking-wider">
                ← Previous
              </span>
              <p
                style={{ color: "var(--text)" }}
                className="text-sm font-medium mt-1 group-hover:text-[var(--primary-dark)] transition-colors line-clamp-1"
              >
                {prev.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              href={`/blog/${next.slug}`}
              className="group text-right"
            >
              <span style={{ color: "var(--muted)" }} className="text-xs uppercase tracking-wider">
                Next →
              </span>
              <p
                style={{ color: "var(--text)" }}
                className="text-sm font-medium mt-1 group-hover:text-[var(--primary-dark)] transition-colors line-clamp-1"
              >
                {next.title}
              </p>
            </Link>
          ) : (
            <div />
          )}
        </nav>
      )}
    </div>
  );
}