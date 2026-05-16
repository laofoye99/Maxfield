import fs   from "fs";
import path from "path";
import matter                 from "gray-matter";
import remarkGfm              from "remark-gfm";
import remarkMath             from "remark-math";
import rehypeKatex            from "rehype-katex";
import rehypePrettyCode       from "rehype-pretty-code";
import rehypeSlug             from "rehype-slug";
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
  prev?:    string;  // optional slug of the previous post (overrides chronological order)
  next?:    string;  // optional slug of the next post (overrides chronological order)
}

export interface PostMeta extends PostFrontmatter {
  slug:     string;
  readTime: number;
  lang:     "en" | "zh";   // which language this post belongs to
}

export interface Post extends PostMeta {
  rawContent: string;
  // Matches next-mdx-remote SerializeOptions shape
  mdxOptions: {
    mdxOptions?: Record<string, unknown>;
    parseFrontmatter?: boolean;
    scope?: Record<string, unknown>;
  };
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

    const mdxOptions = {
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
    };

    return { ...fm, slug, readTime: estimateReadTime(content), lang: detectedLang, rawContent: content, mdxOptions };
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

/**
 * Get previous and next posts for a given slug.
 * Checks frontmatter `prev` / `next` fields first;
 * falls back to chronological order (newest → oldest).
 */
export function getAdjacentPosts(
  slug: string,
  lang: "en" | "zh" = "en",
): { prev: PostMeta | null; next: PostMeta | null } {
  const all = getPostsByLocale(lang);
  const idx = all.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };

  const current = all[idx];

  // Check explicit frontmatter links first
  let prev: PostMeta | null = null;
  let next: PostMeta | null = null;

  if (current.prev) {
    prev = all.find((p) => p.slug === current.prev) ?? null;
  }
  if (current.next) {
    next = all.find((p) => p.slug === current.next) ?? null;
  }

  // Fall back to chronological neighbors
  // Posts are sorted newest-first, so "prev" = older (idx+1), "next" = newer (idx-1)
  if (!prev && idx + 1 < all.length) prev = all[idx + 1];
  if (!next && idx - 1 >= 0)       next = all[idx - 1];

  return { prev, next };
}