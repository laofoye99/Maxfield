import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  darkMode: "class",
  content:  ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans:  ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
        mono:  ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      colors: {
        brand:    { DEFAULT: "#A0D8EF", dark: "#6bbfe0" },
        accent:   { DEFAULT: "#48BB78" },
        "tag-cat":   { bg: "#C6F6D5", text: "#276749" },
        "tag-skill": { bg: "#EBF8FF", text: "#2B6CB0" },
        "tag-gray":  { bg: "#F7FAFC", text: "#4A5568" },
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth:           "none",
            "--tw-prose-links": "#6bbfe0",
            color:              "#1A202C",
            a: { textDecoration: "none", "&:hover": { textDecoration: "underline" } },
            "code::before": { content: '""' },
            "code::after":  { content: '""' },
            blockquote: { borderLeftColor: "#A0D8EF", fontStyle: "normal" },
          },
        },
      }),
    },
  },
  plugins: [typography],
};

export default config;