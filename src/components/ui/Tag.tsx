"use client";

import Link      from "next/link";
import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type TagVariant = "cat" | "skill" | "gray";

interface TagProps {
  text:       string;
  variant?:   TagVariant;
  className?: string;
  onClick?:   (e?: React.MouseEvent) => void;
  href?:      string;   // if provided, renders as a link
}

export function Tag({ text, variant = "gray", className, onClick, href }: TagProps) {
  const { isDark } = useTheme();

  const light: Record<TagVariant, { bg: string; color: string }> = {
    cat:   { bg: "#C6F6D5", color: "#276749" },
    skill: { bg: "#EBF8FF", color: "#2B6CB0" },
    gray:  { bg: "#F7FAFC", color: "#4A5568" },
  };

  const dark: Record<TagVariant, { bg: string; color: string }> = {
    cat:   { bg: "#1C3A2A", color: "#68D391" },
    skill: { bg: "#1A2A3A", color: "#7EC8E3" },
    gray:  { bg: "#1E2330", color: "#90A4AE" },
  };

  const { bg, color } = (isDark ? dark : light)[variant];

  const base = cn(
    "inline-block text-[0.65rem] font-medium px-2.5 py-0.5 rounded-full",
    "select-none transition-opacity duration-200 hover:opacity-75",
    href ? "cursor-pointer" : "cursor-default",
    className,
  );

  if (href) {
    return (
      <Link href={href} style={{ background: bg, color }} className={base}>
        {text}
      </Link>
    );
  }

  return (
    <span
      onClick={onClick}
      style={{ background: bg, color }}
      className={base}
    >
      {text}
    </span>
  );
}