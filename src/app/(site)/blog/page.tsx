// Server Component — no "use client"
import { getAllPostMeta, getAllPostMetaZh } from "@/lib/markdown";
import { BlogView } from "@/components/views/BlogView";

export default function BlogPage() {
  const postsEn = getAllPostMeta();
  const postsZh = getAllPostMetaZh();
  return <BlogView postsEn={postsEn} postsZh={postsZh} />;
}