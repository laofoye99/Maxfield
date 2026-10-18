// Server Component — no "use client"
import { getAllPostMeta, getAllPostMetaZh } from "@/lib/markdown";
import { HomeView                         } from "@/components/views/HomeView";

export default function HomePage() {
  const recentPostsEn = getAllPostMeta();
  const recentPostsZh = getAllPostMetaZh();
  return <HomeView recentPostsEn={recentPostsEn} recentPostsZh={recentPostsZh} />;
}
