"use client";

import { motion } from "framer-motion";
import {
  Boxes,
  Clapperboard,
  Component,
  Images,
  MessagesSquare,
  PanelTop,
  Puzzle,
  Table2,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import type { ProjectIcon } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const GLYPHS: Record<ProjectIcon, LucideIcon> = {
  support: MessagesSquare,
  video: Clapperboard,
  gallery: Images,
  workflow: Workflow,
  topbar: PanelTop,
  registry: Boxes,
  table: Table2,
  plugin: Puzzle,
  components: Component,
};

/**
 * Card wrapper that owns the hover state. Children with `variants` (e.g.
 * CornerGlyph) pick up the "rest"/"hover" labels through variant propagation,
 * so the card lift and the glyph drift stay in sync.
 */
export function HoverCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn("card card-interactive isolate overflow-hidden", className)}
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{ rest: { y: 0 }, hover: { y: -3 } }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
    >
      {children}
    </motion.div>
  );
}

/** Oversized, faint line icon tucked into a card corner — background art only.
 * Inside a HoverCard it follows the card's hover; pass `standalone` anywhere
 * else so it settles into its resting state on its own. */
export function CornerGlyph({
  icon,
  size = 132,
  className,
  standalone = false,
}: {
  icon: ProjectIcon;
  size?: number;
  className?: string;
  standalone?: boolean;
}) {
  const Icon = GLYPHS[icon];
  return (
    <motion.span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute -z-10 -right-7 -bottom-8 text-foreground",
        className
      )}
      {...(standalone && { initial: "rest", animate: "rest" })}
      variants={{
        rest: { opacity: 0.06, rotate: 0, scale: 1 },
        hover: { opacity: 0.12, rotate: -8, scale: 1.06 },
      }}
      transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
    >
      <Icon size={size} strokeWidth={1} />
    </motion.span>
  );
}
