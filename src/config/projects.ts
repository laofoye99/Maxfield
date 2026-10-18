export interface Project {
  id:       string;
  nameEn:   string;
  nameZh:   string;
  descEn:   string;
  descZh:   string;
  url:      string;
  repoUrl?: string;
  tech:     string[];
  featured: boolean;
}

export const projects: Project[] = [
  {
    id:       "project-1",
    nameEn:   "maxge.dev",
    nameZh:   "maxge.dev 个人博客",
    descEn:   "A bilingual journal built with Next.js, MDX, and static publishing.",
    descZh:   "使用 Next.js 与 MDX 构建的双语个人博客，支持代码高亮、数学公式和 Mermaid 图表。",
    url:      "https://github.com/laofoye99",
    repoUrl:  "https://github.com/laofoye99",
    tech:     ["Next.js", "MDX", "TypeScript"],
    featured: true,
  },
];
