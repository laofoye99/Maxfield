"use client";

import Link          from "next/link";
import { Tag       } from "@/components/ui/Tag";
import { useLocale } from "@/components/providers/LocaleProvider";
import { formatDate  } from "@/lib/utils";
import type { PostMeta } from "@/lib/markdown";

// ── Tag variant rules ─────────────────────────────────────────────────────────
// green  (cat)   — subject category: math, robotics, vision …
// blue   (skill) — tech tool: python, pytorch, plotly …
// gray   (gray)  — meta / auxiliary: meta, notes, draft …

const CAT_TAGS  = new Set(["math","robotics","vision","3d","ml","ai","slam","physics","biology","chemistry"]);
const GRAY_TAGS = new Set(["meta","notes","draft","misc","tip","log","review"]);

function tagVariant(tag: string): "cat" | "skill" | "gray" {
  const t = tag.toLowerCase();
  if (GRAY_TAGS.has(t)) return "gray";
  if (CAT_TAGS.has(t))  return "cat";
  return "skill";
}

// ── Icons ─────────────────────────────────────────────────────────────────────

function EyeIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  );
}

function ShareBtn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <button
      title={title}
      onClick={(e) => e.preventDefault()}
      style={{ background: "var(--tag-gray-bg)", color: "var(--muted)" }}
      className="w-[26px] h-[26px] flex items-center justify-center rounded-md border-none cursor-pointer
        transition-colors duration-300 hover:bg-[var(--primary)] hover:text-white"
    >
      {children}
    </button>
  );
}

// ── PostCard ──────────────────────────────────────────────────────────────────

interface PostCardProps {
  post: PostMeta;
}

export function PostCard({ post }: PostCardProps) {
  const { locale, tr } = useLocale();

  const title = locale === "zh" && post.titleZh ? post.titleZh : post.title;
  const date  = formatDate(post.date, locale === "zh" ? "zh-CN" : "en-US");
  const tags  = post.tags ?? [];

  return (
    <Link
      href={`/blog/${post.slug}`}
      style={{ background: "var(--card-bg)", borderColor: "transparent", color: "inherit", boxShadow: "var(--card-shadow)" }}
      className="block rounded-[10px] px-6 py-5 mb-4 border no-underline
        transition-all duration-300 ease-in-out
        hover:-translate-y-0.5
        hover:shadow-[0_8px_24px_rgba(160,216,239,0.18),0_2px_8px_rgba(0,0,0,0.06)]
        hover:border-[rgba(160,216,239,0.4)]"
    >
      {/* Header: title + view count */}
      <div className="flex items-start justify-between gap-4 mb-1.5">
        <h2 style={{ color: "var(--text)" }} className="text-[1.05rem] font-bold leading-snug flex-1">
          {title}
        </h2>
        <span style={{ color: "var(--muted)" }}
          className="flex items-center gap-1 text-[0.68rem] pt-0.5 shrink-0 opacity-60">
          <EyeIcon />
          —
        </span>
      </div>

      {/* Meta: date · read time */}
      <p style={{ color: "var(--muted)" }} className="text-[0.75rem] mb-2">
        {date} · {post.readTime} {tr.blog.minRead}
      </p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex gap-1.5 flex-wrap mb-3">
          {tags.map((tag) => (
            <Tag
              key={tag}
              text={tag}
              variant={tagVariant(tag)}
              onClick={(e?: React.MouseEvent) => e?.preventDefault()}
            />
          ))}
        </div>
      )}

      {/* Summary */}
      {post.summary && (
        <p style={{ color: "var(--muted)" }} className="text-sm leading-relaxed mb-4 line-clamp-2">
          {post.summary}
        </p>
      )}

      {/* Footer: share buttons */}
      <div
        style={{ borderTop: "1px solid var(--border)" }}
        className="flex items-center justify-end gap-2 pt-2.5"
        onClick={(e) => e.preventDefault()}
      >
        <span style={{ color: "var(--muted)" }} className="text-[0.68rem] mr-1">Share</span>

        <ShareBtn title="Twitter / X">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </ShareBtn>

        <ShareBtn title="LinkedIn">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
            <circle cx="4" cy="4" r="2"/>
          </svg>
        </ShareBtn>

        <ShareBtn title="WeChat">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8.5 3C4.36 3 1 5.92 1 9.5c0 2.04 1.06 3.86 2.73 5.07L3 17l2.64-1.32A8.2 8.2 0 0 0 8.5 16c.17 0 .34 0 .51-.01A5.5 5.5 0 0 1 9 14.5C9 11.46 11.91 9 15.5 9c.17 0 .34 0 .51.01C15.17 5.59 12.17 3 8.5 3zM6 8a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm5 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
            <path d="M15.5 10C12.46 10 10 12.01 10 14.5S12.46 19 15.5 19c.78 0 1.52-.15 2.19-.43L20 20l-.73-2.19A4.4 4.4 0 0 0 21 14.5C21 12.01 18.54 10 15.5 10zm-2 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2zm4 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/>
          </svg>
        </ShareBtn>
      </div>
    </Link>
  );
}