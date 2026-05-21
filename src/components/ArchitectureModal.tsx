"use client";

import { useEffect } from "react";
import { X, Maximize2, Minus, Plus, RotateCcw } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { MermaidDiagram } from "./MermaidDiagram";

interface ArchitectureModalProps {
  source: string;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
}

export function ArchitectureModal({
  source,
  isOpen,
  onClose,
  title = "Architecture",
}: ArchitectureModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-md flex flex-col"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-5 md:px-6 py-3 border-b border-border-dim shrink-0"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="block w-2.5 h-2.5 rounded-full bg-foreground/15" />
            <span className="block w-2.5 h-2.5 rounded-full bg-foreground/15" />
            <span className="block w-2.5 h-2.5 rounded-full bg-foreground/15" />
          </div>
          <span className="font-mono text-[11px] text-muted-foreground tracking-[0.08em] truncate">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close diagram"
          className="text-muted-foreground hover:text-foreground transition-colors duration-200 p-1 shrink-0"
        >
          <X size={18} />
        </button>
      </div>

      {/* Pan/zoom canvas */}
      <div
        className="flex-1 min-h-0 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        <TransformWrapper
          initialScale={1}
          minScale={0.25}
          maxScale={5}
          centerOnInit
          centerZoomedOut
          wheel={{ step: 0.08 }}
          doubleClick={{ mode: "reset" }}
          panning={{ velocityDisabled: true }}
        >
          {({ zoomIn, zoomOut, resetTransform }) => (
            <>
              <TransformComponent
                wrapperStyle={{ width: "100%", height: "100%" }}
                contentStyle={{
                  width: "100%",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div className="p-6 md:p-12">
                  <MermaidDiagram source={source} />
                </div>
              </TransformComponent>

              {/* Zoom controls */}
              <div className="absolute bottom-4 right-4 flex flex-col gap-1 border border-border bg-card/80 backdrop-blur-sm">
                <button
                  onClick={() => zoomIn()}
                  aria-label="Zoom in"
                  className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-card transition-colors border-b border-border-dim"
                >
                  <Plus size={14} />
                </button>
                <button
                  onClick={() => zoomOut()}
                  aria-label="Zoom out"
                  className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-card transition-colors border-b border-border-dim"
                >
                  <Minus size={14} />
                </button>
                <button
                  onClick={() => resetTransform()}
                  aria-label="Reset zoom"
                  className="p-2.5 text-muted-foreground hover:text-foreground hover:bg-card transition-colors"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </>
          )}
        </TransformWrapper>
      </div>

      {/* Hint footer */}
      <div
        className="px-5 md:px-6 py-2.5 border-t border-border-dim font-mono text-[10px] text-muted-foreground tracking-[0.1em] uppercase text-center shrink-0 flex items-center justify-center gap-3 flex-wrap"
        onClick={(e) => e.stopPropagation()}
      >
        <span className="inline-flex items-center gap-1.5">
          <Maximize2 size={10} /> Scroll · Pinch to zoom
        </span>
        <span className="opacity-40">·</span>
        <span>Drag to pan</span>
        <span className="opacity-40">·</span>
        <span>ESC to close</span>
      </div>
    </div>
  );
}
