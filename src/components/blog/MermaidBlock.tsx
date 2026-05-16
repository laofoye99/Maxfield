"use client";

import { useEffect, useRef } from "react";
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

  useEffect(() => {
    if (ref.current) {
      // Clear previous content and re-render
      ref.current.innerHTML = chart;
      // Use unique ID to avoid conflicts
      const id = `mermaid-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      ref.current.setAttribute("data-mermaid-id", id);
      try {
        mermaid.run({ nodes: [ref.current] });
      } catch {
        // If rendering fails, keep the raw text
        ref.current.textContent = chart;
      }
    }
  }, [chart]);

  return <div ref={ref} className="mermaid my-6 flex justify-center" />;
}
