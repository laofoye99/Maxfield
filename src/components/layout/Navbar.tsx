"use client";

import Link            from "next/link";
import { usePathname } from "next/navigation";
import { useTheme  }   from "@/components/providers/ThemeProvider";
import { useLocale }   from "@/components/providers/LocaleProvider";
import { siteConfig }  from "@/config/site";

function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="4"/>
      <line x1="12" y1="2"  x2="12" y2="6"/>
      <line x1="12" y1="18" x2="12" y2="22"/>
      <line x1="4.93" y1="4.93"   x2="7.76" y2="7.76"/>
      <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/>
      <line x1="2"  y1="12" x2="6"  y2="12"/>
      <line x1="18" y1="12" x2="22" y2="12"/>
      <line x1="4.93" y1="19.07"  x2="7.76" y2="16.24"/>
      <line x1="16.24" y1="7.76"  x2="19.07" y2="4.93"/>
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  );
}

// Logo reads CSS variables directly — works in both light and dark mode
function SiteLogo() {
  return (
    <div className="flex items-center gap-2">
      <svg width="22" height="22" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="17" stroke="var(--primary)"  strokeWidth="2.5"/>
        <circle cx="20" cy="20" r="7"  fill="var(--primary)"/>
        <line x1="3"  y1="20" x2="13" y2="20" stroke="#68D391" strokeWidth="2.5" strokeLinecap="round"/>
        <line x1="27" y1="20" x2="37" y2="20" stroke="#68D391" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
      <span style={{
        fontFamily:    "var(--font-syne), 'Syne', sans-serif",
        fontWeight:    800,
        fontSize:      "0.92rem",
        letterSpacing: "-0.025em",
        color:         "var(--text)",
        lineHeight:    1,
      }}>
        Max<span style={{ color: "var(--primary)" }}>field</span>
      </span>
    </div>
  );
}

export function Navbar() {
  const { theme, toggle: toggleTheme }       = useTheme();
  const { locale, tr, toggle: toggleLocale } = useLocale();
  const pathname = usePathname();
  const isHome   = pathname === "/";

  function handleNavClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (isHome) {
      const sectionId = href.replace("/", "");
      const el = document.getElementById(sectionId);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  }

  return (
    <nav
      style={{
        background:        "var(--nav-bg)",
        borderBottomColor: "var(--border)",
      }}
      className="sticky top-0 z-50 border-b backdrop-blur"
    >
      <div className="max-w-[1100px] mx-auto px-6 h-14 flex items-center justify-between">

        {/* Left: site logo + title (always links to home) */}
        <Link href="/" className="flex items-center gap-2 group">
          <SiteLogo />
        </Link>

        {/* Right: nav links + controls */}
        <div className="flex items-center gap-1">

          {/* Blog + Projects — hidden on homepage since homepage already has both */}
          {!isHome && siteConfig.nav.map(({ href, labelEn, labelZh }) => {
            const active = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                style={{
                  color:      active ? "var(--text)"        : "var(--text-section)",
                  fontWeight: active ? "700"                : "500",
                }}
                className="px-3 py-1.5 rounded-full text-sm nav-hoverable"
              >
                {locale === "zh" ? labelZh : labelEn}
              </Link>
            );
          })}

          {/* Language toggle */}
          <button
            onClick={toggleLocale}
            style={{ color: "var(--text-section)" }}
            className="px-3 py-1.5 rounded-full text-sm font-medium nav-hoverable border-none bg-transparent cursor-pointer"
          >
            {tr.nav.toggle}
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            style={{ color: "var(--text-section)" }}
            className="p-2 rounded-full nav-hoverable border-none bg-transparent cursor-pointer"
          >
            {theme === "dark" ? <SunIcon /> : <MoonIcon />}
          </button>
        </div>
      </div>
    </nav>
  );
}