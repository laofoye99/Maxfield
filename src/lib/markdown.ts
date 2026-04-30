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

const POSTS_DIR = path.join(process.cwd(), "content", "blog");

export interface PostFrontmatter {
  title:    string;
  titleZh?: string;
  date:     string;
  summary?: string;
  tags?:    string[];
  draft?:   boolean;
}

export interface PostMeta extends PostFrontmatter {
  slug:     string;
  readTime: number;
}

export interface Post extends PostMeta {
  // serialized MDX source stored as any to avoid next-mdx-remote type mismatch
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  source: any;
}

const prettyCodeOptions = {
  theme:          { dark: "github-dark", light: "github-light" },
  keepBackground: false,
  defaultLang:    "plaintext",
};

export function getAllPostMeta(): PostMeta[] {
  if (!fs.existsSync(POSTS_DIR)) return [];

  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((filename) => {
      const slug              = filename.replace(/\.(mdx|md)$/, "");
      const raw               = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
      const { data, content } = matter(raw);
      const fm                = data as PostFrontmatter;
      return { ...fm, slug, readTime: estimateReadTime(content) };
    })
    .filter((p) => !p.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<Post | null> {
  const candidates = [
    path.join(POSTS_DIR, `${slug}.mdx`),
    path.join(POSTS_DIR, `${slug}.md`),
  ];
  const filePath = candidates.find((p) => fs.existsSync(p));
  if (!filePath) return null;

  const raw               = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(raw);
  const fm                = data as PostFrontmatter;

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

  return { ...fm, slug, readTime: estimateReadTime(content), source };
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((f) => f.endsWith(".mdx") || f.endsWith(".md"))
    .map((f) => f.replace(/\.(mdx|md)$/, ""));
}