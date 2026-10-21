"use client";

import { useMemo, useState } from "react";
import { CATEGORIES, type Category, type PostMeta } from "@/lib/blog-types";
import { PostCard } from "./PostCard";

type Filter = "All" | Category;

export function BlogIndex({
  posts,
  counts,
}: {
  posts: PostMeta[];
  counts: Record<Category, number>;
}) {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeTag, setActiveTag] = useState<string | null>(null);

  // Only surface category tabs that actually have posts.
  const tabs: { label: Filter; count: number }[] = [
    { label: "All", count: posts.length },
    ...CATEGORIES.filter((c) => counts[c] > 0).map((c) => ({
      label: c as Filter,
      count: counts[c],
    })),
  ];

  const visible = useMemo(() => {
    return posts.filter((p) => {
      const matchesCategory = filter === "All" || p.category === filter;
      const matchesTag = !activeTag || p.tags.includes(activeTag);
      return matchesCategory && matchesTag;
    });
  }, [posts, filter, activeTag]);

  return (
    <div className="space-y-8">
      {/* Category tabs */}
      <div
        className="flex items-center gap-5 flex-wrap border-b border-border pb-3"
        role="tablist"
        aria-label="Filter posts by category"
      >
        {tabs.map(({ label, count }) => {
          const isActive = filter === label;
          return (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setFilter(label)}
              className={[
                "font-mono text-[11px] uppercase tracking-[0.1em] transition-colors duration-200 pb-1 -mb-[calc(0.75rem+1px)] border-b",
                isActive
                  ? "text-highlight border-highlight"
                  : "text-muted-foreground hover:text-foreground border-transparent",
              ].join(" ")}
            >
              {label}
              <span className="ml-1.5 opacity-50">{count}</span>
            </button>
          );
        })}
      </div>

      {/* Active tag filter chip */}
      {activeTag && (
        <div className="flex items-center gap-2 text-[11px] font-mono text-muted-foreground">
          <span>Filtered by tag:</span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className="tag hover:border-highlight hover:text-foreground"
          >
            {activeTag} ✕
          </button>
        </div>
      )}

      {/* Post list */}
      {visible.length === 0 ? (
        <p className="text-sm text-muted-foreground py-12 text-center">
          No posts here yet — check back soon.
        </p>
      ) : (
        <div className="space-y-px border border-border bg-border rounded-2xl overflow-hidden">
          {visible.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
