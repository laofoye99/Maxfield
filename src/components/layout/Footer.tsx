"use client";

import { useLocale }  from "@/components/providers/LocaleProvider";
import { siteConfig } from "@/config/site";

function GithubIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482
        0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462
        -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
        .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
        -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844a9.59 9.59 0
        0 1 2.504.337c1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028
        1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012
        2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.021C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}

const footerNav = [
  { labelEn: "Home",     labelZh: "主页",   href: "/" },
  { labelEn: "Projects", labelZh: "项目",   href: "/projects" },
  { labelEn: "Archive",  labelZh: "归档",   href: "/blog" },
  { labelEn: "Resume",   labelZh: "简历",   href: "/resume" },
];

export function Footer() {
  const { locale, tr } = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer
      style={{ background: "var(--footer-bg)", borderTop: "1px solid var(--border)" }}
      className="pt-16 pb-8 text-center"
    >
      {/* Layer 1: motto */}
      <div className="inline-block cursor-default mb-10 group">
        <span
          style={{
            letterSpacing: "0.4em",
            color:         "var(--primary-dark)",
            fontFamily:    "'Georgia', serif",
          }}
          className="block text-xs uppercase group-hover:opacity-30"
        >
          {tr.mottoLatin}
        </span>
        <span
          style={{ color: "var(--muted)", letterSpacing: "0.08em" }}
          className="block text-[0.68rem] mt-1.5 opacity-0 group-hover:opacity-100"
        >
          {tr.mottoTranslation}
        </span>
      </div>

      {/* Layer 2: nav links */}
      <div className="flex items-center justify-center flex-wrap gap-0 mb-7">
        {footerNav.map((item, i) => (
          <span key={item.href} className="flex items-center">
            <a
              href={item.href}
              style={{ color: "var(--muted)" }}
              className="text-[0.8rem] px-1.5 hover:text-[var(--text)]"
            >
              {locale === "zh" ? item.labelZh : item.labelEn}
            </a>
            {i < footerNav.length - 1 && (
              <span style={{ color: "var(--border)" }} className="text-[0.7rem] px-1 select-none">·</span>
            )}
          </span>
        ))}
        <span style={{ color: "var(--border)" }} className="text-[0.7rem] px-1 select-none">·</span>
        <a
          href="mailto:max@example.com"
          style={{ color: "var(--muted)" }}
          className="text-[0.8rem] px-1.5 hover:text-[var(--text)]"
        >
          {locale === "zh" ? "邮箱" : "Email"}
        </a>
      </div>

      {/* Layer 3: copyright */}
      <div className="flex items-center justify-center gap-4">
        <p style={{ color: "var(--muted)", opacity: 0.6 }} className="text-[0.7rem] tracking-wide">
          © {year} Max Ge · Built with Next.js &amp; Cloudflare Pages
        </p>
        <a
          href={siteConfig.owner.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          style={{ color: "var(--muted)", opacity: 0.6 }}
          className="hover:opacity-100"
        >
          <GithubIcon />
        </a>
      </div>
    </footer>
  );
}