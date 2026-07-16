/**
 * Pure, client-safe blog types and helpers (no filesystem / `server-only`),
 * so client components — filter tabs, cards, TOC — can import them freely.
 * Filesystem-backed data loading lives in `blog.ts`.
 */

export const CATEGORIES = [
  "AI Engineering",
  "Engineering",
  "Database",
  "System Design",
] as const;
export type Category = (typeof CATEGORIES)[number];

// Explicit URL slugs (not derived) so "AI Engineering" → "ai", etc.
const CATEGORY_SLUGS: Record<Category, string> = {
  "AI Engineering": "ai",
  Engineering: "engineering",
  Database: "database",
  "System Design": "system-design",
};

export function categorySlug(category: Category): string {
  return CATEGORY_SLUGS[category];
}

export function categoryFromSlug(slug: string): Category | undefined {
  return CATEGORIES.find((c) => categorySlug(c) === slug);
}

export interface PostFrontmatter {
  title: string;
  summary: string;
  category: Category;
  tags: string[];
  publishedAt: string; // ISO date (YYYY-MM-DD)
  updatedAt?: string;
  /** Optional series membership for multi-part posts. */
  coverImageCaption?: string;
  coverImageW?: number;
  coverImageH?: number;
  coverImage?: string;
  series?: string;
  seriesOrder?: number;
  draft?: boolean;
}

export interface TocEntry {
  depth: 2 | 3;
  text: string;
  id: string;
}

export interface PostMeta extends PostFrontmatter {
  slug: string;
  readingTimeMinutes: number;
}

export interface Post extends PostMeta {
  content: string;
  toc: TocEntry[];
}

const dateFmt = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? iso : dateFmt.format(d);
}
