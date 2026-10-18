"use client";

import { cn } from "@/lib/utils";

interface PaginationProps {
  total:    number;   // total pages
  current:  number;   // 1-based
  onChange: (page: number) => void;
}

export function Pagination({ total, current, onChange }: PaginationProps) {
  if (total <= 1) return null;

  // Build page list with ellipsis
  const pages: (number | "...")[] = [];
  if (total <= 7) {
    for (let i = 1; i <= total; i++) pages.push(i);
  } else {
    pages.push(1);
    if (current > 3)             pages.push("...");
    for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) pages.push(i);
    if (current < total - 2)     pages.push("...");
    pages.push(total);
  }

  const btn = (content: React.ReactNode, page: number, active = false, disabled = false) => (
    <button
      key={`${page}-${content}`}
      onClick={() => !disabled && onChange(page)}
      disabled={disabled}
      style={{
        border:     "1px solid var(--border)",
        background: active ? "var(--primary)"      : "var(--card-bg)",
        color:      active ? "#fff"                : "var(--text-section)",
        fontWeight: active ? "700"                 : "500",
        cursor:     disabled ? "not-allowed"       : "pointer",
        opacity:    disabled ? 0.4                 : 1,
      }}
      className={cn(
        "min-w-[32px] h-8 px-1.5 flex items-center justify-center rounded-md text-[0.82rem]",
        "transition-all duration-300",
        !active && !disabled && "hover:border-[var(--primary)] hover:text-[var(--primary-dark)] hover:bg-[#EBF8FF]",
      )}
    >
      {content}
    </button>
  );

  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      {btn("‹", current - 1, false, current === 1)}
      {pages.map((p, i) =>
        p === "..."
          ? <span key={`ellipsis-${i}`} style={{ color: "var(--muted)" }} className="px-1 text-sm select-none">…</span>
          : btn(p, p, p === current),
      )}
      {btn("›", current + 1, false, current === total)}
    </div>
  );
}