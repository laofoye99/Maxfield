"use client";

import { Tag       } from "@/components/ui/Tag";
import { useLocale } from "@/components/providers/LocaleProvider";
import { useTheme  } from "@/components/providers/ThemeProvider";
import type { Project } from "@/config/projects";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { locale, tr } = useLocale();
  const { isDark }     = useTheme();

  const bg     = isDark ? "#141B2D" : "#F0F9FF";
  const border = isDark ? "#1E2D45" : "#EDF2F7";

  return (
    <div
      style={{ background: bg, border: `1px solid ${border}`, borderRadius: 10 }}
      className="p-5 flex flex-col gap-3 transition-all duration-300 ease-in-out
        hover:-translate-y-0.5
        hover:shadow-[0_8px_24px_rgba(160,216,239,0.18),0_2px_8px_rgba(0,0,0,0.12)]"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <h3
          style={{ color: "var(--text)" }}
          className="text-[0.95rem] font-bold leading-snug"
        >
          {locale === "zh" ? project.nameZh : project.nameEn}
        </h3>
        <div className="flex items-center gap-3 shrink-0 pt-0.5">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--muted)" }}
              className="text-[0.72rem] font-medium hover:text-[var(--accent)] transition-colors"
            >
              {tr.projects.viewRepo}
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--muted)" }}
            className="text-[0.72rem] font-medium hover:text-[var(--accent)] transition-colors"
          >
            {tr.projects.viewSite} ↗
          </a>
        </div>
      </div>

      {/* Description */}
      <p style={{ color: "var(--muted)" }} className="text-[0.82rem] leading-relaxed">
        {locale === "zh" ? project.descZh : project.descEn}
      </p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto">
        {project.tech.map((t) => (
          <Tag key={t} text={t} variant="skill" />
        ))}
      </div>
    </div>
  );
}