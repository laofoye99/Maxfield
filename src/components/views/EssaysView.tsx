"use client";
import Link from 'next/link';
import { useLocale } from '@/components/providers/LocaleProvider';
import { PostCard } from '@/components/blog/PostCard';
import type { PostMeta } from '@/lib/markdown';
export function EssaysView({posts}:{posts:PostMeta[]}){const {locale}=useLocale();const zh=locale==='zh';return <div className="essays-shell"><header><p className="eyebrow">NOTES ON EVERYDAY LIFE</p><h1>{zh?'随笔':'Essays'}</h1><p>{zh?'技术之外，记录生活里的观察、阅读与思考。':'Beyond technology: observations, reading notes, and thoughts from everyday life.'}</p></header><section aria-label={zh?'随笔列表':'Essays list'}>{posts.length?posts.map(p=><PostCard key={p.slug} post={p}/>):<div className="essays-empty"><span aria-hidden="true">m.</span><h2>{zh?'留一点空间，给日常的想法。':'A little space for everyday thoughts.'}</h2><p>{zh?'第一篇随笔还在酝酿中，欢迎之后再来看看。':'The first essay is still taking shape. Come back soon.'}</p><Link href="/blog">{zh?'先去看看文章':'Explore the journal'} ↗</Link></div>}</section></div>}
