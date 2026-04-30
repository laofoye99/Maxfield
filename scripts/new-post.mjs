import fs       from "fs";
import path     from "path";
import readline from "readline";

const rl  = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

// ── Tag lists ─────────────────────────────────────────────────────────────────
const CAT_TAGS   = ["math", "robotics", "vision", "slam", "ml", "ai", "physics"];
const SKILL_TAGS = ["python", "pytorch", "plotly", "opencv", "ros2", "threejs", "docker", "c++", "react", "typescript"];
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
  return input
    .split(",")
    .map((n) => list[parseInt(n.trim()) - 1])
    .filter(Boolean);
}

function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/--+/g, "-");
}

// ── Main ──────────────────────────────────────────────────────────────────────
console.log("\n\x1b[1m\x1b[34m✦ New Post\x1b[0m\n");

const title   = await ask("标题（英文）：");
const titleZh = await ask("标题（中文，回车跳过）：");
const summary = await ask("简短描述：");

const cat   = await pickTags("一级标签 — 学科分类（绿色）", CAT_TAGS);
const skill = await pickTags("二级标签 — 技术工具（蓝色）", SKILL_TAGS);
const meta  = await pickTags("三级标签 — 元数据（灰色）",  META_TAGS);

const tags     = [...cat, ...skill, ...meta];
const date     = new Date().toISOString().split("T")[0];
const slug     = slugify(title);
const fileName = `${date}-${slug}.mdx`;
const filePath = path.join("content", "blog", fileName);

// Build frontmatter
const tagStr   = tags.length ? tags.map((t) => `"${t}"`).join(", ") : "";
const lines    = [
  "---",
  `title: "${title}"`,
  titleZh.trim() ? `titleZh: "${titleZh}"` : null,
  `date: "${date}"`,
  `summary: "${summary}"`,
  `tags: [${tagStr}]`,
  "---",
  "",
  "## Introduction",
  "",
  "",
].filter((l) => l !== null);

fs.mkdirSync(path.dirname(filePath), { recursive: true });
fs.writeFileSync(filePath, lines.join("\n"), "utf-8");

console.log(`\n\x1b[32m✓ Created:\x1b[0m ${filePath}`);
console.log(`\x1b[90mOpen with: code ${filePath}\x1b[0m\n`);

rl.close();