"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-types";

export function Toc({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (observed) => {
        const visible = observed.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const topMost = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b
        );
        setActiveId(topMost.target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [entries]);

  if (entries.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="space-y-3">
      <p className="label-mono">On this page</p>
      <ul className="space-y-2 border-l border-border">
        {entries.map((entry) => {
          const isActive = activeId === entry.id;
          return (
            <li key={entry.id} style={{ paddingLeft: entry.depth === 3 ? 16 : 0 }}>
              <a
                href={`#${entry.id}`}
                aria-current={isActive ? "location" : undefined}
                className={[
                  "block -ml-px border-l pl-3 py-0.5 text-[13px] leading-snug transition-colors duration-200",
                  isActive
                    ? "border-highlight text-highlight"
                    : "border-transparent text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                {entry.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
