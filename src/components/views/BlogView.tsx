"use client";

import { useState     } from "react";
import { PostCard     } from "@/components/blog/PostCard";
import { Sidebar      } from "@/components/layout/Sidebar";
import { Pagination   } from "@/components/ui/Pagination";
import { useLocale    } from "@/components/providers/LocaleProvider";
import type { PostMeta } from "@/lib/markdown";

const PAGE_SIZE = 8;

interface BlogViewProps {
  postsEn: PostMeta[];
  postsZh: PostMeta[];
}

export function BlogView({ postsEn, postsZh }: BlogViewProps) {
  const { locale, tr } = useLocale();
  const [page, setPage] = useState(1);

  const posts      = locale === "zh" ? postsZh : postsEn;
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);
  const visible    = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      <style>{`.blog-grid{display:grid;grid-template-columns:1fr 300px;}`}</style>
      <div className="blog-grid" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>

        <main
          style={{ borderRight: "1px solid var(--border)" }}
          className="px-8 py-10 min-h-[calc(100vh-56px)]"
        >
          <p
            style={{ color: "#38A169", letterSpacing: "0.18em" }}
            className="text-[0.75rem] font-bold uppercase mb-6"
          >
            {tr.blog.title}
          </p>

          {posts.length === 0 ? (
            <p style={{ color: "var(--muted)" }}>{tr.blog.empty}</p>
          ) : (
            visible.map((post) => <PostCard key={post.slug} post={post} />)
          )}

          {totalPages > 1 && (
            <Pagination total={totalPages} current={page} onChange={setPage} />
          )}
        </main>

        <Sidebar />
      </div>
    </>
  );
}