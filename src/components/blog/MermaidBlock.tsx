"use client";

import { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

let initialized = false;

if (!initialized) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    securityLevel: "loose",
  });
  initialized = true;
}

type Props = { chart: string };

export function MermaidBlock({ chart }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>("");

  useEffect(() => {
    let cancelled = false;
    const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    mermaid
      .render(id, chart)
      .then(({ svg: rendered }) => {
        if (!cancelled) setSvg(rendered);
      })
      .catch(() => {
        if (!cancelled) setSvg(`<pre style="color:var(--muted)">${chart}</pre>`);
      });
    return () => { cancelled = true; };
  }, [chart]);

  return (
    <div
      ref={ref}
      className="mermaid my-6 flex justify-center overflow-x-auto"
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
