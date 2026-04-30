export const locales       = ["en", "zh"] as const;
export type  Locale        = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const translations = {
  en: {
    nav: {
      blog:     "Blog",
      projects: "Projects",
      resume:   "Resume",
      toggle:   "中",
    },
    hero: {
      greeting:     "Hi, I'm",
      readBlog:     "Read my blog",
      viewProjects: "View projects",
    },
    blog: {
      title:       "Blog",
      empty:       "No posts yet.",
      readMore:    "Read more",
      minRead:     "min read",
      backToBlog:  "Back to Blog",
      publishedOn: "Published on",
    },
    projects: {
      title:     "Projects",
      empty:     "No projects yet.",
      viewRepo:  "Repository",
      viewSite:  "Visit",
    },
    resume: {
      title:      "Resume",
      download:   "Download PDF",
      experience: "Experience",
      education:  "Education",
      skills:     "Skills",
    },
    footer:           "Max",
    mottoLatin:       "Per Angusta Ad Augusta",
    mottoTranslation: "Through hardship to greatness.",
    avatarTip:        "View resume",
    recentStories:    "Recent Posts",
    featuredProjects: "Featured Projects",
    allPosts:         "All posts",
    allProjects:      "All projects",
  },

  zh: {
    nav: {
      blog:     "文章",
      projects: "项目",
      resume:   "简历",
      toggle:   "EN",
      readBlog:     "阅读文章",
      viewProjects: "查看项目",
    },
    blog: {
      title:       "文章",
      empty:       "暂无文章。",
      readMore:    "阅读更多",
      minRead:     "分钟阅读",
      backToBlog:  "返回文章列表",
      publishedOn: "发布于",
    },
    projects: {
      title:     "项目",
      empty:     "暂无项目。",
      viewRepo:  "代码仓库",
      viewSite:  "访问",
    },
    resume: {
      title:      "个人简历",
      download:   "下载 PDF",
      experience: "工作经历",
      education:  "教育背景",
      skills:     "技能",
    },
    footer:           "Max",
    mottoLatin:       "Per Angusta Ad Augusta",
    mottoTranslation: "经由狭窄，走向崇高。",
    avatarTip:        "查看简历",
    recentStories:    "最新文章",
    featuredProjects: "精选项目",
    allPosts:         "全部文章",
    allProjects:      "全部项目",
  },
} as const;

export type Translation = (typeof translations)["en"];

export function getTranslation(locale: Locale): Translation {
  return translations[locale] as unknown as Translation;
}