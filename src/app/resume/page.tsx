"use client";

import { Tag          } from "@/components/ui/Tag";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { useLocale    } from "@/components/providers/LocaleProvider";
import { siteConfig   } from "@/config/site";
import { experience, education, skills } from "@/config/resume";

export default function ResumePage() {
  const { locale, tr } = useLocale();

  const sections = [
    { label: tr.resume.experience, items: experience },
    { label: tr.resume.education,  items: education  },
  ];

  return (
    <div className="max-w-2xl mx-auto px-6 py-14">

      {/* Header */}
      <div className="flex items-center justify-between mb-12">
        <h1 className="text-3xl font-bold">{tr.resume.title}</h1>
      </div>

      {/* Experience + Education */}
      {sections.map(({ label, items }) => (
        <div key={label} className="mb-12">
          <SectionLabel>{label}</SectionLabel>
          <div className="space-y-6">
            {items.map((item, i) => (
              <div
                key={i}
                className="pb-6 border-b border-gray-200 dark:border-gray-800 last:border-0"
              >
                <div className="flex items-start justify-between gap-4 mb-1">
                  <p className="font-semibold text-gray-900 dark:text-gray-100">
                    {locale === "zh" ? item.titleZh : item.titleEn}
                  </p>
                  <span className="text-xs text-gray-400 shrink-0">{item.period}</span>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {locale === "zh" ? item.detailZh : item.detailEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Skills */}
      <div>
        <SectionLabel>{tr.resume.skills}</SectionLabel>
        <div className="flex flex-wrap gap-2">
          {skills.map((s) => (
            <Tag key={s} text={s} />
          ))}
        </div>
      </div>
    </div>
  );
}