# maxge.dev

基于原有 Next.js 博客制作的个人站点。原参考目录没有修改。

## 开发

npm ci
npm run dev
npm run build

构建结果位于 out/，可部署至支持静态文件的主机。

## 内容

- content/blog/：现有文章（中英文均可）
- content/blog-zh/：中文文章
- src/config/site.ts：个人介绍与域名
- src/config/projects.ts：项目
- src/config/resume.ts：经历与教育；未填写的条目不会展示

## 域名

站点元信息、sitemap、robots 使用 https://maxge.dev。实际域名生效还需在托管平台添加 maxge.dev，并按平台提供的记录配置 DNS 和 HTTPS。本项目没有修改 DNS。
