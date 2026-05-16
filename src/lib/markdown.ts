import fs   from "fs";
import path from "path";
import matter            from "gray-matter";
import { serialize }     from "next-mdx-remote/serialize";
import remarkGfm         from "remark-gfm";
import remarkMath        from "remark-math";
import rehypeKatex       from "rehype-katex";
import rehypePrettyCode  from "rehype-pretty-code";
import rehypeSlug        from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { estimateReadTime }   from "./utils";

// ── Directories ───────────────────────────────────────────────────────────────
const POSTS_DIR    = path.join(process.cwd(), "content", "blog");
const POSTS_DIR_ZH = path.join(process.cwd(), "content", "blog-zh");

// ── Types ─────────────────────────────────────────────────────────────────────
export interface PostFrontmatter {
  title:    string;
  date:     string;
  summary?: string;
  tags?:    string[];
  draft?:   boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug:     string;
  readTime: number;
  lang:     "en" | "zh";   // which language this post belongs to
}

export interface Post extends PostMeta {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
}

// ── rehype-pretty-code config ─────────────────────────────────────────────────
const prettyCodeOptions = {
  theme:          { dark: "github-dark", light: "github-light" },
  keepBackground: false,
  defaultLang:    "plaintext",
};

// ── Internal helpers ──────────────────────────────────────────────────────────
function readDir(dir: string, lang: "en" | "zh"): PostMeta[] {
  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const slug              = filename.replace(/\.(mdx|md)$/, "");
      const raw               = fs.readFileSync(path.join(dir, filename), "utf-8");
      const { data, content } = matter(raw);
      const fm                = data as PostFrontmatter;
      return { ...fm, slug, readTime: estimateReadTime(content), lang };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

// ── Public API ────────────────────────────────────────────────────────────────

/** All English posts */
export function getAllPostMeta(): PostMeta[] {
  return readDir(POSTS_DIR, "en");
}

/** All Chinese posts */
export function getAllPostMetaZh(): PostMeta[] {
  return readDir(POSTS_DIR_ZH, "zh");
}

/** Posts for current locale */
export function getPostsByLocale(locale: "en" | "zh"): PostMeta[] {
  return locale === "zh" ? getAllPostMetaZh() : getAllPostMeta();
}

/** Single post — tries en dir first, then zh */
export async function getPost(slug: string, lang?: "en" | "zh"): Promise<Post | null> {
  const dirs =
    lang === "zh" ? [POSTS_DIR_ZH] :
    lang === "en" ? [POSTS_DIR]    :
    [POSTS_DIR, POSTS_DIR_ZH];

  for (const dir of dirs) {
    const candidates = [
      path.join(dir, `${slug}.mdx`),
      path.join(dir, `${slug}.md`),
    ];
    const filePath = candidates.find((p) => fs.existsSync(p));
    if (!filePath) continue;

    const raw               = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(raw);
    const fm                = data as PostFrontmatter;
    const detectedLang: "en" | "zh" = dir === POSTS_DIR_ZH ? "zh" : "en";

    const source = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [
          rehypeSlug,
          [rehypeAutolinkHeadings, { behavior: "wrap" }],
          rehypeKatex,
          [rehypePrettyCode, prettyCodeOptions],
        ],
        format: filePath.endsWith(".mdx") ? "mdx" : "md",
      },
      parseFrontmatter: false,
    });

    return { ...fm, slug, readTime: estimateReadTime(content), lang: detectedLang, source };
  }

  return null;
}

/** All slugs for static generation (both languages) */
export function getAllPostSlugs(): { slug: string; lang: "en" | "zh" }[] {
  const en = fs.existsSync(POSTS_DIR)
    ? fs.readdirSync(POSTS_DIR)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
        .map((f) => ({ slug: f.replace(/\.(mdx|md)$/, ""), lang: "en" as const }))
    : [];

  const zh = fs.existsSync(POSTS_DIR_ZH)
    ? fs.readdirSync(POSTS_DIR_ZH)
        .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
        .map((f) => ({ slug: f.replace(/\.(mdx|md)$/, ""), lang: "zh" as const }))
    : [];

  return [...en, ...zh];
}