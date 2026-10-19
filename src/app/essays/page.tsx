import type { Metadata } from 'next';
import { getAllPostMeta, getAllPostMetaZh } from '@/lib/markdown';
import { EssaysView } from '@/components/views/EssaysView';
export const metadata:Metadata={title:'随笔 · Essays',description:'生活观察、阅读札记与日常思考。',alternates:{canonical:'https://maxge.dev/essays/'}};
export default function EssaysPage(){
 const posts=[...getAllPostMetaZh(),...getAllPostMeta()].filter((p,i,all)=>all.findIndex(q=>q.slug===p.slug)===i).filter(p=>p.tags?.some(t=>['随笔','essay','essays'].includes(t.toLowerCase()))).sort((a,b)=>Date.parse(b.date)-Date.parse(a.date));
 return <EssaysView posts={posts}/>;
}
