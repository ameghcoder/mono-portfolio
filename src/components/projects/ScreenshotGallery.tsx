"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import type { Screenshot } from "@/data/portfolio";
import { ZoomModal } from "@/components/ZoomModal";
import { cn } from "@/lib/utils";

/** Project screenshots: first one full-width, the rest in pairs. Click to open
 * the shared pan/zoom lightbox. */
export function ScreenshotGallery({ shots }: { shots: Screenshot[] }) {
  const [open, setOpen] = useState<Screenshot | null>(null);

  return (
    <>
      <div className="grid sm:grid-cols-2 gap-3">
        {shots.map((shot, i) => {
          // Very wide captures (e.g. analytics strips) read better full-width too.
          const wide = i === 0 || shot.width / shot.height > 2.5;
          return (
            <motion.figure
              key={shot.src}
              className={cn("space-y-2", wide && "sm:col-span-2")}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.4, delay: Math.min(i, 3) * 0.06 }}
              data-reveal
            >
              <motion.button
                type="button"
                onClick={() => setOpen(shot)}
                aria-label={`Zoom screenshot: ${shot.alt}`}
                className="group relative block w-full cursor-zoom-in overflow-hidden rounded-2xl border border-border bg-card"
                // Never upscale a small capture past its real pixel width.
                style={{ maxWidth: shot.width }}
                whileHover="hover"
                whileTap={{ scale: 0.99 }}
              >
                <motion.span
                  className="block"
                  variants={{ hover: { scale: 1.02 } }}
                  transition={{ duration: 0.4, ease: [0.2, 0, 0, 1] }}
                >
                  <Image
                    src={shot.src}
                    alt={shot.alt}
                    width={shot.width}
                    height={shot.height}
                    sizes={wide ? "(min-width: 768px) 720px, 100vw" : "(min-width: 768px) 360px, 100vw"}
                    className="block w-full h-auto"
                  />
                </motion.span>
                <span className="absolute top-3 right-3 inline-flex items-center gap-1.5 rounded-lg border border-border bg-card/85 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground opacity-0 backdrop-blur-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 size={11} aria-hidden="true" /> Zoom
                </span>
              </motion.button>
              {shot.caption && (
                <figcaption className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground px-1">
                  {shot.caption}
                </figcaption>
              )}
            </motion.figure>
          );
        })}
      </div>

      <ZoomModal isOpen={open !== null} onClose={() => setOpen(null)} title={open?.caption ?? "Screenshot"}>
        {open && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={open.src} alt={open.alt} className="max-w-none rounded-xl" />
        )}
      </ZoomModal>
    </>
  );
}
