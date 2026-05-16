import { cn } from "@/lib/utils";
import { MermaidBlock } from "./MermaidBlock";

// ── Callout ───────────────────────────────────────────────────────────────────

type CalloutType = "info" | "warning" | "tip" | "danger";

const calloutStyles: Record<CalloutType, string> = {
  info:    "border-blue-400   bg-blue-50   dark:bg-blue-950   text-blue-900   dark:text-blue-100",
  warning: "border-yellow-400 bg-yellow-50 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100",
  tip:     "border-brand      bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-100",
  danger:  "border-red-400    bg-red-50    dark:bg-red-950    text-red-900    dark:text-red-100",
};

const calloutLabels: Record<CalloutType, string> = {
  info:    "Note",
  warning: "Warning",
  tip:     "Tip",
  danger:  "Important",
};

interface CalloutProps {
  type?:      CalloutType;
  children:   React.ReactNode;
  className?: string;
}

export function Callout({ type = "info", children, className }: CalloutProps) {
  return (
    <div
      className={cn(
        "my-6 rounded-xl border-l-4 px-5 py-4 text-sm leading-relaxed",
        calloutStyles[type],
        className,
      )}
    >
      <span className="font-semibold mr-2">{calloutLabels[type]}:</span>
      {children}
    </div>
  );
}

// ── Steps ─────────────────────────────────────────────────────────────────────

export function Steps({ children }: { children: React.ReactNode }) {
  return <ol className="my-6 space-y-4 list-none pl-0">{children}</ol>;
}

interface StepProps {
  n:          number;
  title?:     string;
  children:   React.ReactNode;
}

export function Step({ n, title, children }: StepProps) {
  return (
    <li className="flex gap-4">
      <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand text-white text-sm font-bold flex items-center justify-center mt-0.5">
        {n}
      </span>
      <div>
        {title && <p className="font-semibold mb-1">{title}</p>}
        <div className="text-sm text-gray-600 dark:text-gray-400">{children}</div>
      </div>
    </li>
  );
}

// ── Details ───────────────────────────────────────────────────────────────────

interface DetailsProps {
  summary:  string;
  children: React.ReactNode;
}

export function Details({ summary, children }: DetailsProps) {
  return (
    <details className="my-4 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
      <summary className="px-5 py-3 font-medium cursor-pointer select-none bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">
        {summary}
      </summary>
      <div className="px-5 py-4 text-sm text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </details>
  );
}

// ── Mermaid detection ─────────────────────────────────────────────────────────

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function Pre({ children, ...props }: any) {
  const code = children?.props;
  // rehype-pretty-code adds data-language attribute
  const lang = code?.["data-language"] || "";
  // Also check className as fallback
  const className: string = code?.className || "";
  if (lang === "mermaid" || className.includes("language-mermaid")) {
    // Extract raw text from code children (handles both string and spanned content)
    let chart = "";
    const cc = code?.children;
    if (typeof cc === "string") {
      chart = cc;
    } else if (Array.isArray(cc)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      chart = cc.map((c: any) => (typeof c === "string" ? c : c?.props?.children ?? "")).join("\n");
    }
    return <MermaidBlock chart={chart} />;
  }
  return <pre {...props}>{children}</pre>;
}

// ── Component map (passed to MDXRemote) ───────────────────────────────────────

export const mdxComponents = {
  Callout,
  Steps,
  Step,
  Details,
  pre: Pre,
};