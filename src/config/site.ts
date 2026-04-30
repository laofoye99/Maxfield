export const siteConfig = {
  owner: {
    nameZh:        "Max",
    nameEn:        "Max",
    avatarUrl:     "/image/avatar.jpg",
    avatarInitial: "M",
    github:        "https://github.com/laofoye99",
    bioEn:         "Engineer and researcher. I build systems, visualize ideas, and write about what I learn.",
    bioZh:         "工程师与研究者。我构建系统，可视化想法，并记录所学。",
  },

  meta: {
    title:       "Maxfield",
    description: "Personal blog and portfolio of Max Ge.",
    url:         "https://maxfield.dev", // 改成你的实际域名
  },

  nav: [
    { href: "/blog",     labelEn: "Blog",     labelZh: "文章" },
    { href: "/projects", labelEn: "Projects", labelZh: "项目" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;