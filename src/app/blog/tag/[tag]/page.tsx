import { getAllPostMeta } from "@/lib/markdown";
import { TagView } from "@/components/views/TagView";
import { notFound } from "next/navigation";

type Props = { params: { tag: string } };

// Generate all tag pages at build time
export async function generateStaticParams() {
  const posts = getAllPostMeta();
  const tags  = new Set(posts.flatMap((p) => p.tags ?? []));
  return Array.from(tags).map((tag) => ({ tag }));
}

export default function TagPage({ params }: Props) {
  const { tag }  = params;
  const allPosts = getAllPostMeta();
  const filtered = allPosts.filter((p) => p.tags?.includes(tag));

  if (filtered.length === 0) notFound();

  return <TagView tag={tag} posts={filtered} />;
}