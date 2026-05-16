// Server Component — no "use client"
import { getAllPostMeta, getAllPostMetaZh } from "@/lib/markdown";
import { HomeView } from "@/components/views/HomeView";

export default function HomePage() {
  const recentPostsEn = getAllPostMeta().slice(0, 10);
  const recentPostsZh = getAllPostMetaZh().slice(0, 10);
  return <HomeView recentPostsEn={recentPostsEn} recentPostsZh={recentPostsZh} />;
}