"use client";

import { useTheme } from "@/components/providers/ThemeProvider";
import { cn } from "@/lib/utils";

type TagVariant = "cat" | "skill" | "gray";

interface TagProps {
  text:       string;
  variant?:   TagVariant;
  className?: string;
  onClick?:   (e?: React.MouseEvent) => void;
}

export function Tag({ text, variant = "gray", className, onClick }: TagProps) {
  const { isDark } = useTheme();

  // Light mode colors
  const light: Record<TagVariant, { bg: string; color: string; hoverBg: string; hoverColor: string }> = {
    cat:   { bg: "#C6F6D5", color: "#276749", hoverBg: "#48BB78", hoverColor: "#fff" },
    skill: { bg: "#EBF8FF", color: "#2B6CB0", hoverBg: "#A0D8EF", hoverColor: "#fff" },
    gray:  { bg: "#F7FAFC", color: "#4A5568", hoverBg: "#A0D8EF", hoverColor: "#fff" },
  };

  // Dark mode colors (Option C)
  const dark: Record<TagVariant, { bg: string; color: string; hoverBg: string; hoverColor: string }> = {
    cat:   { bg: "#1C3A2A", color: "#68D391", hoverBg: "#68D391", hoverColor: "#0F1117" },
    skill: { bg: "#1A2A3A", color: "#7EC8E3", hoverBg: "#7EC8E3", hoverColor: "#0F1117" },
    gray:  { bg: "#1E2330", color: "#90A4AE", hoverBg: "#2D3748", hoverColor: "#CBD5E0" },
  };

  const palette = isDark ? dark : light;
  const { bg, color } = palette[variant];

  return (
    <span
      onClick={onClick}
      style={{ background: bg, color }}
      className={cn(
        "inline-block text-[0.65rem] font-medium px-2.5 py-0.5 rounded-full",
        "cursor-pointer select-none",
        className,
      )}
    >
      {text}
    </span>
  );
}