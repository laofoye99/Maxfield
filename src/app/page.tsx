// Server Component — no "use client"
import { getAllPostMeta } from "@/lib/markdown";
import { HomeView       } from "@/components/views/HomeView";

export default function HomePage() {
  const recentPosts = getAllPostMeta().slice(0, 3);
  return <HomeView recentPosts={recentPosts} />;
}