// Server Component — no "use client"
import { getAllPostMeta } from "@/lib/markdown";
import { BlogView       } from "@/components/views/BlogView";

export default function BlogPage() {
  const posts = getAllPostMeta();
  return <BlogView posts={posts} />;
}