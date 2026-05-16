import fs       from "fs";
import path     from "path";
import readline from "readline";

const rl  = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// ── Tag lists ─────────────────────────────────────────────────────────────────
const CAT_TAGS   = ["math", "robotics", "vision", "slam", "ml", "ai", "physics", "quant"];
const SKILL_TAGS = ["python", "pytorch", "plotly", "opencv", "ros2", "threejs", "docker", "c++", "react", "typescript", "pandas", "numpy"];
const META_TAGS  = ["notes", "meta", "review", "draft"];

// ── Helpers ───────────────────────────────────────────────────────────────────
function showTags(tags) {
  tags.forEach((t, i) => console.log(`  \x1b[36m${String(i + 1).padStart(2)}\x1b[0m  ${t}`));
}

async function pickTags(label, list) {
  console.log(`\n\x1b[33m${label}\x1b[0m`);
  console.log("（输入编号，多个用逗号分隔，直接回车跳过）");
  showTags(list);
  const input = await ask("\x1b[90m> \x1b[0m");
  if (!input.trim()) return [];
  return input.split(",").map((n) => list[parseInt(n.trim()) - 1]).filter(Boolean);
}

function slugify(str) {
  return str.toLowerCase().trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log("\n\x1b[1m\x1b[34m✦ New Post\x1b[0m\n");

// Pick language
console.log("文章语言 / Post language:");
console.log("  \x1b[36m1\x1b[0m  English");
console.log("  \x1b[36m2\x1b[0m  中文");
const langInput = await ask("\x1b[90m> \x1b[0m");
const isZh      = langInput.trim() === "2";
const lang      = isZh ? "zh" : "en";
const postsDir  = isZh ? "content/blog-zh" : "content/blog";

const title   = await ask(isZh ? "标题（中文）：" : "Title (English): ");
const summary = await ask(isZh ? "简短描述：" : "Summary: ");

const cat   = await pickTags(
  isZh ? "一级标签 — 学科分类（绿色）" : "Category tags (green)",
  CAT_TAGS,
);
const skill = await pickTags(
  isZh ? "二级标签 — 技术工具（蓝色）" : "Skill tags (blue)",
  SKILL_TAGS,
);
const meta  = await pickTags(
  isZh ? "三级标签 — 元数据（灰色）" : "Meta tags (gray)",
  META_TAGS,
);

const tags     = [...cat, ...skill, ...meta];
const date     = new Date().toISOString().split("T")[0];
const slug     = slugify(title);
const fileName = `${date}-${slug}.mdx`;
const filePath = path.join(postsDir, fileName);

const tagStr = tags.map((t) => `"${t}"`).join(", ");
const lines  = [
  "---",
  `title: "${title}"`,
  `date: "${date}"`,
  `summary: "${summary}"`,
  `tags: [${tagStr}]`,
  "---",
  "",
  isZh ? "## 简介" : "## Introduction",
  "",
  "",
].join("\n");

fs.mkdirSync(postsDir, { recursive: true });
fs.writeFileSync(filePath, lines, "utf-8");

console.log(`\n\x1b[32m✓ Created (${lang}):\x1b[0m ${filePath}\n`);
rl.close();