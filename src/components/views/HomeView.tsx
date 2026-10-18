"use client";
import Link from "next/link";
import { PostCard } from "@/components/blog/PostCard";
import { Sidebar } from "@/components/layout/Sidebar";
import { useLocale } from "@/components/providers/LocaleProvider";
import type { PostMeta } from "@/lib/markdown";
export function HomeView({ recentPostsEn, recentPostsZh }: {recentPostsEn: PostMeta[]; recentPostsZh: PostMeta[]}) {
 const { locale } = useLocale();
 const zh = locale === "zh";
 const posts = [...recentPostsZh, ...recentPostsEn.filter(p => !recentPostsZh.some(z => z.slug === p.slug))].sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
 return <div className="journal-shell">
 <section className="journal-hero">
 <div><p className="eyebrow">MAX GE / PERSONAL JOURNAL</p><h1>{zh ? <>保持好奇，<br/>把想法变成<span>现实。</span></> : <>Stay curious.<br/>Make ideas <span>real.</span></>}</h1><p className="hero-description">{zh ? "我是 Max。这里记录我的技术探索、工程实践，以及从问题到理解的过程。" : "I'm Max. I write about engineering, experiments, and the journey from questions to understanding."}</p><div className="hero-links"><Link href="/blog">{zh ? "阅读文章" : "Explore the journal"} ↗</Link><a href="https://github.com/laofoye99" target="_blank" rel="noreferrer">GitHub ↗</a></div></div>
 <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="orbit orbit-three"/><span className="orbit-core">m.</span><p>IDEAS → EXPERIMENTS → INSIGHTS</p></div>
 </section>
 <div className="journal-grid"><section id="blog" className="journal-posts"><div className="section-heading"><div><p className="eyebrow">THE JOURNAL</p><h2>{zh ? "最近的记录" : "Latest writing"}</h2></div><Link href="/blog">{zh ? "全部文章" : "All posts"} ↗</Link></div>{posts.slice(0,5).map(p=><PostCard key={p.slug} post={p}/>)}<div id="projects" className="project-note"><p className="eyebrow">BUILDING IN PUBLIC</p><h2>{zh ? "从一个想法，到可以运行的作品。" : "From an idea to something that works."}</h2><p>{zh ? "这个博客本身也是一次持续的工程实践：Markdown 写作、交互式图表与静态部署。" : "This journal is an ongoing engineering project: Markdown publishing, interactive diagrams, and static deployment."}</p><Link href="/projects">{zh ? "探索项目" : "Explore projects"} ↗</Link></div></section><Sidebar/></div>
 </div>;
}
