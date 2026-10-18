"use client";
import Link from "next/link";
import { useLocale } from "@/components/providers/LocaleProvider";
import { formatDate } from "@/lib/utils";
import type { PostMeta } from "@/lib/markdown";
export function PostCard({post}:{post:PostMeta}) {
 const {locale}=useLocale();
 return <article className="journal-entry"><div className="entry-meta"><time dateTime={post.date}>{formatDate(post.date,locale==='zh'?'zh-CN':'en-US')}</time><span>{post.readTime} {locale==='zh'?'分钟阅读':'min read'}</span></div><Link href={`/blog/${post.slug}`} className="entry-title"><h2>{post.title}</h2><span aria-hidden="true">↗</span></Link>{post.summary && <p className="entry-summary">{post.summary}</p>}<div className="entry-tags">{post.tags?.map(t=><Link key={t} href={`/blog/tag/${encodeURIComponent(t)}`}># {t}</Link>)}</div></article>;
}
