"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { MermaidDiagram } from "./MermaidDiagram";
import { ArchitectureModal } from "./ArchitectureModal";

interface ArchitectureViewerProps {
  source: string;
  title: string;
  caption?: React.ReactNode;
}

export function ArchitectureViewer({ source, title, caption }: ArchitectureViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="border border-border bg-card rounded-2xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center justify-between gap-3 px-4 py-2.5 border-b border-border-dim bg-background/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex gap-1.5" aria-hidden="true">
              <span className="block w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="block w-2.5 h-2.5 rounded-full bg-foreground/15" />
              <span className="block w-2.5 h-2.5 rounded-full bg-foreground/15" />
            </div>
            <span className="font-mono text-[10px] text-muted-foreground tracking-[0.08em] truncate">
              {title}
            </span>
          </div>
          <button
            onClick={() => setIsOpen(true)}
            className="shrink-0 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground hover:text-highlight transition-colors duration-200"
            aria-label="Expand diagram"
          >
            <Maximize2 size={11} />
            View full
          </button>
        </div>

        {/* Inline Mermaid render */}
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          aria-label="Expand architecture diagram"
          className="block w-full text-left p-5 md:p-6 cursor-zoom-in focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-highlight"
        >
          <MermaidDiagram source={source} className="w-full overflow-x-auto" />
        </button>

        {/* Caption */}
        {caption && (
          <div className="px-5 md:px-6 py-3 border-t border-border-dim">
            {caption}
          </div>
        )}
      </div>

      <ArchitectureModal
        source={source}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={title}
      />
    </>
  );
}
