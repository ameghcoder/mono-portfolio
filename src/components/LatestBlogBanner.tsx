"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, X } from "lucide-react";

const DISMISS_KEY = "latest-blog-banner-dismissed";

/**
 * "Latest post" pill. Rendered inside the Dock's fixed column (not fixed
 * itself) so the two move as one: `shiftY` drops it into the dock's place
 * while the dock is hidden, instead of leaving a gap under it.
 */
export function LatestBlogBanner({
  slug,
  title,
  shiftY = 0,
}: {
  slug: string;
  title: string;
  shiftY?: number;
}) {
  const pathname = usePathname();
  const [dismissed, setDismissed] = useState(true); // hidden until confirmed not-dismissed, avoids a flash

  useEffect(() => {
    try {
      setDismissed(sessionStorage.getItem(DISMISS_KEY) === slug);
    } catch {
      setDismissed(false);
    }
  }, [slug]);

  function dismiss() {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, slug);
    } catch {
      // ignore — private mode / storage disabled
    }
  }

  // Homepage only — every other page (blog, projects, about) is dense
  // reading/reference content where a floating promo competes with it.
  if (pathname !== "/" || dismissed) return null;

  return (
    <motion.div
      className="mb-2 flex w-full justify-center px-4 md:px-0"
      animate={{ y: shiftY }}
      transition={{ type: "spring", stiffness: 380, damping: 32 }}
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-border bg-popover/95 backdrop-blur-sm py-2 pl-4 pr-2 shadow-lg max-w-[calc(100vw-2rem)]">
        <Sparkles size={14} className="text-highlight shrink-0" aria-hidden="true" />
        <Link
          href={`/blog/${slug}`}
          className="flex items-center gap-1.5 min-w-0 group"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-muted-foreground shrink-0">
            Latest
          </span>
          <span className="text-sm text-foreground truncate group-hover:text-highlight transition-colors duration-200">
            {title}
          </span>
          <ArrowRight
            size={13}
            className="shrink-0 text-muted-foreground group-hover:text-highlight group-hover:translate-x-0.5 transition-all duration-200"
            aria-hidden="true"
          />
        </Link>
        <button
          type="button"
          onClick={dismiss}
          aria-label="Dismiss"
          className="shrink-0 inline-flex items-center justify-center size-6 rounded-full text-muted-foreground hover:text-foreground hover:bg-card transition-colors duration-200"
        >
          <X size={13} />
        </button>
      </div>
    </motion.div>
  );
}
