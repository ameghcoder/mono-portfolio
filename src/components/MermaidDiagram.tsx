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
        background: "#292929",
        primaryColor: "#333333",
        primaryBorderColor: "#545454",
        primaryTextColor: "#f5f5f5",
        secondaryColor: "#3d3d3d",
        secondaryBorderColor: "#545454",
        secondaryTextColor: "#f5f5f5",
        tertiaryColor: "#292929",
        tertiaryBorderColor: "#545454",
        tertiaryTextColor: "#f5f5f5",
        lineColor: "#8c8c8c",
        textColor: "#f5f5f5",
        mainBkg: "#333333",
        secondBkg: "#3d3d3d",
        edgeLabelBackground: "#292929",
        clusterBkg: "rgba(255,255,255,0.02)",
        clusterBorder: "#545454",
        defaultLinkColor: "#8c8c8c",
        titleColor: "#f5f5f5",
        nodeBkg: "#333333",
        nodeBorder: "#545454",
        nodeTextColor: "#f5f5f5",
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
