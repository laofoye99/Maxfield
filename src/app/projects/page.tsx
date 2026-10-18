"use client";

import { Tag       } from "@/components/ui/Tag";
import { useLocale } from "@/components/providers/LocaleProvider";
import { projects  } from "@/config/projects";

export default function ProjectsPage() {
  const { locale, tr } = useLocale();

  return (
    <div className="max-w-4xl mx-auto px-6 py-14">
      <h1 className="text-3xl font-bold mb-10">{tr.projects.title}</h1>

      {projects.length === 0 ? (
        <p className="text-gray-400">{tr.projects.empty}</p>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 hover:border-brand transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <h2 className="text-base font-bold">
                  {locale === "zh" ? proj.nameZh : proj.nameEn}
                </h2>
                <div className="flex gap-3 text-sm text-gray-400">
                  {proj.repoUrl && (
                    <a
                      href={proj.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-brand transition-colors"
                    >
                      {tr.projects.viewRepo}
                    </a>
                  )}
                  <a
                    href={proj.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand transition-colors"
                  >
                    {tr.projects.viewSite}
                  </a>
                </div>
              </div>

              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 leading-relaxed">
                {locale === "zh" ? proj.descZh : proj.descEn}
              </p>

              <div className="flex gap-2 flex-wrap">
                {proj.tech.map((t) => (
                  <Tag key={t} text={t} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}