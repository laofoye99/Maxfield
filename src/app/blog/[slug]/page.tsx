import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link        from "next/link";
import { MDXRemote } from "next-mdx-remote";
import { Tag       } from "@/components/ui/Tag";
import { mdxComponents } from "@/components/blog/MdxComponents";
import { getPost, getAllPostSlugs } from "@/lib/markdown";
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
        <MDXRemote {...post.source} components={mdxComponents} />
      </article>
    </div>
  );
}