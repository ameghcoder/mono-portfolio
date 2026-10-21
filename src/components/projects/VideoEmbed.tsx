"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Play } from "lucide-react";
import type { Video } from "@/data/portfolio";
import { cn } from "@/lib/utils";

/**
 * Click-to-load YouTube player. Renders the self-hosted poster as a plain link
 * to YouTube (so it still works without JS); on click it swaps in a
 * youtube-nocookie iframe that autoplays, so no third-party script loads
 * until the visitor actually asks for the video.
 */
export function VideoEmbed({
  video,
  className,
  sizes = "(min-width: 768px) 720px, 100vw",
}: {
  video: Video;
  className?: string;
  sizes?: string;
}) {
  const [playing, setPlaying] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-video overflow-hidden rounded-xl border border-border bg-card",
        className
      )}
    >
      {playing ? (
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${video.youtubeId}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="absolute inset-0 size-full"
        />
      ) : (
        <motion.a
          href={`https://youtu.be/${video.youtubeId}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => {
            e.preventDefault();
            setPlaying(true);
          }}
          aria-label={`Play video: ${video.title}`}
          className="absolute inset-0 block"
          initial="rest"
          animate="rest"
          whileHover="hover"
          whileTap="tap"
        >
          <motion.span
            className="absolute inset-0"
            variants={{ rest: { scale: 1 }, hover: { scale: 1.03 } }}
            transition={{ duration: 0.5, ease: [0.2, 0, 0, 1] }}
          >
            <Image
              src={video.poster.src}
              alt={video.poster.alt}
              fill
              sizes={sizes}
              className="object-cover"
            />
          </motion.span>
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/15 to-transparent"
          />
          <span className="absolute inset-0 grid place-items-center">
            <motion.span
              variants={{ rest: { scale: 1 }, hover: { scale: 1.08 }, tap: { scale: 0.94 } }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              className="grid place-items-center size-12 md:size-14 rounded-full bg-white/90 text-black"
            >
              <Play size={18} className="translate-x-px" fill="currentColor" aria-hidden="true" />
            </motion.span>
          </span>
          <span className="absolute inset-x-3 bottom-3 flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-[0.1em] text-white/90">
            <span>Watch the launch video</span>
            {video.duration && (
              <span className="rounded-full bg-black/55 px-2 py-0.5">{video.duration}</span>
            )}
          </span>
        </motion.a>
      )}
    </div>
  );
}
