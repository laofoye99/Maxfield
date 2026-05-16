"use client";

import Link          from "next/link";
import { PostCard  } from "@/components/blog/PostCard";
import { Sidebar   } from "@/components/layout/Sidebar";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { PostMeta } from "@/lib/markdown";

interface TagViewProps {
  tag:   string;
  posts: PostMeta[];
}

export function TagView({ tag, posts }: TagViewProps) {
  const { tr } = useLocale();

  return (
    <>
      <style>{`.tag-grid { display: grid; grid-template-columns: 1fr 300px; }`}</style>
      <div className="tag-grid" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>

        <main
          style={{ borderRight: "1px solid var(--border)" }}
          className="px-8 py-10 min-h-[calc(100vh-56px)]"
        >
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <Link
              href="/blog"
              style={{ color: "var(--muted)" }}
              className="text-[0.82rem] hover:text-[var(--text)] transition-colors"
            >
              {tr.blog.backToBlog}
            </Link>
            <span style={{ color: "var(--border)" }}>·</span>
            <span
              style={{ color: "#38A169", letterSpacing: "0.15em" }}
              className="text-[0.72rem] font-bold uppercase"
            >
              #{tag}
            </span>
            <span style={{ color: "var(--muted)" }} className="text-[0.78rem]">
              {posts.length} {posts.length === 1 ? "post" : "posts"}
            </span>
          </div>

          {/* Post list */}
          {posts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </main>

        <Sidebar />
      </div>
    </>
  );
}