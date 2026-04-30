"use client";

import Image         from "next/image";
import Link          from "next/link";
import { usePathname } from "next/navigation";
import { Tag       } from "@/components/ui/Tag";
import { useLocale } from "@/components/providers/LocaleProvider";
import { siteConfig  } from "@/config/site";
import { skills, education } from "@/config/resume";

const interests = [
  { title: "Robotics",       detail: "motion planning, SLAM"          },
  { title: "3D Vision",      detail: "point clouds, depth estimation"  },
  { title: "ML",             detail: "perception models, RL"           },
  { title: "Visualization",  detail: "Plotly, Three.js, WebGL"         },
];

function Divider() {
  return <div style={{ background: "var(--border)" }} className="w-full h-px" />;
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      style={{ color: "var(--muted)", letterSpacing: "0.22em" }}
      className="text-[0.58rem] font-bold uppercase mb-2.5"
    >
      {children}
    </p>
  );
}

export function Sidebar() {
  const { locale, tr } = useLocale();
  const pathname       = usePathname();
  const isHome         = pathname === "/";
  const { owner }      = siteConfig;

  return (
    <aside
      style={{ background: "transparent", borderLeft: "1px solid var(--border)", top: "56px" }}
      className="sticky flex flex-col items-center gap-5 px-6 py-10 border-l"
    >
      {/* Avatar — only links to resume on homepage */}
      {isHome ? (
        <Link href="/resume" title={tr.avatarTip} className="group shrink-0">
          <div
            style={{ border: "2.5px solid var(--primary)", boxShadow: "0 0 0 4px rgba(160,216,239,0.18)" }}
            className="w-20 h-20 rounded-full overflow-hidden transition-all duration-300 group-hover:shadow-md"
          >
            <Image src={owner.avatarUrl} alt={owner.nameEn} width={80} height={80} className="object-cover w-full h-full" />
          </div>
        </Link>
      ) : (
        <div
          style={{ border: "2.5px solid var(--primary)", boxShadow: "0 0 0 4px rgba(160,216,239,0.18)" }}
          className="w-20 h-20 rounded-full overflow-hidden shrink-0"
        >
          <Image src={owner.avatarUrl} alt={owner.nameEn} width={80} height={80} className="object-cover w-full h-full" />
        </div>
      )}

      <p style={{ color: "var(--text)" }} className="text-[0.95rem] font-bold">
        {locale === "zh" ? owner.nameZh : owner.nameEn}
      </p>

      <Divider />

      {/* About */}
      <div className="w-full">
        <InfoLabel>About</InfoLabel>
        <p style={{ color: "var(--muted)" }} className="text-[0.78rem] leading-[1.75]">
          {locale === "zh" ? owner.bioZh : owner.bioEn}
        </p>
      </div>

      <Divider />

      {/* Interests */}
      <div className="w-full">
        <InfoLabel>Interests</InfoLabel>
        <ul className="flex flex-col gap-0.5 list-none">
          {interests.map((item) => (
            <li
              key={item.title}
              style={{ borderLeft: "2px solid transparent", color: "var(--muted)" }}
              className="text-[0.78rem] py-1.5 pl-2.5 leading-snug cursor-default
                transition-all duration-300
                hover:border-l-[var(--primary)] hover:text-[var(--text)]"
            >
              <span style={{ color: "var(--text-section)" }} className="font-semibold">
                {item.title}
              </span>{" "}
              — {item.detail}
            </li>
          ))}
        </ul>
      </div>

      <Divider />

      {/* Skills */}
      <div className="w-full">
        <InfoLabel>Skills</InfoLabel>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {skills.map((s) => (
            <Tag key={s} text={s} variant="skill" />
          ))}
        </div>
      </div>

      <Divider />

      {/* Education */}
      <div className="w-full">
        <InfoLabel>Education</InfoLabel>
        {education.map((ed, i) => (
          <div key={i} style={{ color: "var(--muted)" }} className="text-[0.78rem] leading-[1.75]">
            <span style={{ color: "var(--text-section)" }} className="font-semibold">
              {locale === "zh" ? ed.titleZh : ed.titleEn}
            </span>
            <br />
            <span style={{ fontSize: "0.72rem" }}>{ed.period}</span>
          </div>
        ))}
      </div>

      <Divider />

      {/* Resume button */}
      <Link
        href="/resume"
        style={{ border: "1.5px solid var(--primary)", color: "var(--primary-dark)" }}
        className="block w-full text-center py-2 rounded-full text-[0.8rem] font-semibold
          bg-transparent transition-all duration-300
          hover:bg-[var(--primary)] hover:text-white hover:border-[var(--primary)]"
      >
        {tr.resume.title}
      </Link>
    </aside>
  );
}