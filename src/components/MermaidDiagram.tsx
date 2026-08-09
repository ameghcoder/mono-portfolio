"use client";

import { useEffect, useState } from "react";

interface MermaidDiagramProps {
  source: string;
  className?: string;
}

let initialized = false;

async function ensureMermaid() {
  const mermaid = (await import("mermaid")).default;
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "base",
      themeVariables: {
        darkMode: true,
        background: "#18181b", // zinc-900
        primaryColor: "#27272a", // zinc-800
        primaryBorderColor: "#3f3f46", // zinc-700
        primaryTextColor: "#f4f4f5", // zinc-100
        secondaryColor: "#27272a",
        secondaryBorderColor: "#3f3f46",
        secondaryTextColor: "#f4f4f5",
        tertiaryColor: "#18181b",
        tertiaryBorderColor: "#3f3f46",
        tertiaryTextColor: "#f4f4f5",
        lineColor: "#71717a", // zinc-500
        textColor: "#f4f4f5",
        mainBkg: "#27272a",
        secondBkg: "#27272a",
        edgeLabelBackground: "#18181b",
        clusterBkg: "rgba(255,255,255,0.02)",
        clusterBorder: "#3f3f46",
        defaultLinkColor: "#71717a",
        titleColor: "#f4f4f5",
        nodeBkg: "#27272a",
        nodeBorder: "#3f3f46",
        nodeTextColor: "#f4f4f5",
      },
      fontFamily: "var(--font-mono), ui-monospace, monospace",
      flowchart: {
        curve: "basis",
        padding: 12,
        useMaxWidth: true,
      },
      securityLevel: "loose",
    });
    initialized = true;
  }
  return mermaid;
}

export function MermaidDiagram({ source, className }: MermaidDiagramProps) {
  const [svg, setSvg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const mermaid = await ensureMermaid();
        const id = `mmd-${Math.random().toString(36).slice(2, 9)}`;
        const { svg: rendered } = await mermaid.render(id, source);
        if (!cancelled) {
          setSvg(rendered);
          setError(null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : String(err));
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [source]);

  if (error) {
    return (
      <div className="font-mono text-[11px] text-destructive p-4 whitespace-pre-wrap break-words">
        Failed to render diagram:{"\n"}
        {error}
      </div>
    );
  }

  if (!svg) {
    return (
      <div className="font-mono text-[10px] text-muted-foreground p-4 animate-pulse uppercase tracking-[0.12em]">
        rendering diagram…
      </div>
    );
  }

  return (
    <div
      className={`mermaid-host ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
