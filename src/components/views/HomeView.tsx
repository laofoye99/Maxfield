"use client";

import Link               from "next/link";
import { useRef, useState } from "react";
import { PostCard        } from "@/components/blog/PostCard";
import { ProjectCard     } from "@/components/projects/ProjectCard";
import { Sidebar         } from "@/components/layout/Sidebar";
import { Pagination      } from "@/components/ui/Pagination";
import { useLocale       } from "@/components/providers/LocaleProvider";
import { projects        } from "@/config/projects";
import type { PostMeta   } from "@/lib/markdown";

const PAGE_SIZE = 5;

interface HomeViewProps {
  recentPosts: PostMeta[];
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ color: "#38A169", letterSpacing: "0.18em" }}
      className="text-[0.72rem] font-bold uppercase mb-5"
    >
      {children}
    </p>
  );
}

export function HomeView({ recentPosts }: HomeViewProps) {
  const { tr } = useLocale();
  const [page, setPage] = useState(1);

  const blogRef    = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(recentPosts.length / PAGE_SIZE);
  const visible    = recentPosts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const featured   = projects.filter((p) => p.featured);

  return (
    <>
      <style>{`.home-grid { display: grid; grid-template-columns: 1fr 300px; }`}</style>
      <div className="home-grid" style={{ maxWidth: 1100, margin: "0 auto", width: "100%" }}>

        {/* ── Left: main content ── */}
        <main
          style={{ borderRight: "1px solid var(--border)" }}
          className="px-8 py-10 min-h-[calc(100vh-56px)]"
        >
          {/* Blog section */}
          <div ref={blogRef} id="blog">
            <SectionLabel>{tr.recentStories}</SectionLabel>

            {visible.length === 0 ? (
              <p style={{ color: "var(--muted)" }} className="text-sm mb-10">
                {tr.blog.empty}
              </p>
            ) : (
              visible.map((post) => <PostCard key={post.slug} post={post} />)
            )}

            {totalPages > 1 && (
              <Pagination total={totalPages} current={page} onChange={setPage} />
            )}

            <div className="mt-5 mb-14">
              <Link
                href="/blog"
                style={{ color: "var(--muted)" }}
                className="text-[0.82rem] font-medium transition-colors duration-300 hover:text-[var(--text)]"
              >
                {tr.allPosts} →
              </Link>
            </div>
          </div>

          {/* Divider */}
          <div
            style={{ borderTop: "1px solid var(--border)" }}
            className="mb-10"
          />

          {/* Projects section */}
          <div ref={projectRef} id="projects">
            <SectionLabel>{tr.featuredProjects}</SectionLabel>

            {featured.length === 0 ? (
              <p style={{ color: "var(--muted)" }} className="text-sm">
                {tr.projects.empty}
              </p>
            ) : (
              <div
                style={{
                  display:             "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap:                 "1rem",
                }}
              >
                {featured.map((proj) => (
                  <ProjectCard key={proj.id} project={proj} />
                ))}
              </div>
            )}

            <div className="mt-5">
              <Link
                href="/projects"
                style={{ color: "var(--muted)" }}
                className="text-[0.82rem] font-medium transition-colors duration-300 hover:text-[var(--text)]"
              >
                {tr.allProjects} →
              </Link>
            </div>
          </div>
        </main>

        {/* ── Right: sidebar ── */}
        <Sidebar />
      </div>
    </>
  );
}