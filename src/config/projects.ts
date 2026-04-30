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
    nameEn:   "Project Name",
    nameZh:   "项目名称",
    descEn:   "A brief description of what this project does and what problems it solves.",
    descZh:   "项目的简短描述，说明它的功能以及解决的问题。",
    url:      "https://github.com/laofoye99",
    repoUrl:  "https://github.com/laofoye99",
    tech:     ["Python", "React", "TypeScript"],
    featured: true,
  },
];