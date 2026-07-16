"use client";

import { useState } from "react";
import { Maximize2 } from "lucide-react";
import { ZoomModal } from "@/components/ZoomModal";

/**
 * Blog image with click-to-zoom. Renders the image inline (with a hover expand
 * affordance) and opens it in the shared pan/zoom lightbox for a close look.
 */
export function BlogImage({ src, alt }: { src?: string; alt?: string }) {
  const [open, setOpen] = useState(false);
  if (!src) return null;

  return (
    <span className="not-prose my-6 block">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={alt ? `Zoom image: ${alt}` : "Zoom image"}
        className="group relative block w-full cursor-zoom-in overflow-hidden rounded-lg border border-border"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} className="block w-full h-auto" />
        <span className="absolute top-2 right-2 inline-flex items-center gap-1.5 rounded-md border border-border bg-card/80 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100">
          <Maximize2 size={11} /> Zoom
        </span>
      </button>

      {alt && (
        <span className="mt-2 block text-center text-xs text-muted-foreground">
          {alt}
        </span>
      )}

      <ZoomModal isOpen={open} onClose={() => setOpen(false)} title={alt || "Image"}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt ?? ""} className="max-w-none rounded-lg" />
      </ZoomModal>
    </span>
  );
}
