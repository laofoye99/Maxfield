# 验证记录

- Next.js 14.2.35 / React 18 / TypeScript / npm lockfile
- node node_modules/next/dist/bin/next build：成功，含编译、lint、类型检查、静态导出
- node scripts/verify-export.mjs：成功，18 个 HTML 页面，内部链接及资源、域名、sitemap、robots 检查通过
- 浏览器：中英文切换、深浅主题、390px 宽度无横向溢出、文章导航通过；Hello World 页面渲染 3 个 KaTeX 公式与 4 个代码块
- 修正：空文章读取、标签数据漏中文、无功能分享按钮、占位项目及邮箱、空教育条目、暗色变量覆盖和响应式布局
- 环境：npm 启动脚本异常且 npm ci 失败，复用 D:/project/my-blog/node_modules 的已有依赖完成验证
- 未完成：Sites 源码上传与发布被自动审批拒绝，需用户明确授权目标。maxge.dev DNS 未修改。
- 警告：Browserslist 数据较旧，未更新依赖锁文件。
