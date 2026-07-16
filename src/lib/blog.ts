import "server-only";

import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import GithubSlugger from "github-slugger";
import {
  CATEGORIES,
  type Category,
  type Post,
  type PostFrontmatter,
  type PostMeta,
  type TocEntry,
} from "./blog-types";

/**
 * Blog content lives as MDX files in `content/blog/*.mdx`, one file per post,
 * with YAML frontmatter validated (loosely) at read time. Everything the UI
 * needs — listing, category/tag filters, TOC, reading time, series nav — is
 * derived here so pages stay thin. Pure/client-safe types and helpers live in
 * `blog-types.ts` and are re-exported below for convenience.
 */

export * from "./blog-types";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");
const isProd = process.env.NODE_ENV === "production";

function readRawFiles(): { slug: string; raw: string }[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(
      (f) => f.endsWith(".mdx") && !f.startsWith("_") && !f.startsWith("."),
    )
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
      raw: fs.readFileSync(path.join(CONTENT_DIR, file), "utf8"),
    }));
}

function validate(
  slug: string,
  data: Record<string, unknown>,
): PostFrontmatter {
  const missing = (
    ["title", "summary", "category", "publishedAt"] as const
  ).filter((k) => data[k] == null || data[k] === "");
  if (missing.length) {
    throw new Error(
      `Blog post "${slug}.mdx" is missing required frontmatter: ${missing.join(", ")}`,
    );
  }
  if (!CATEGORIES.includes(data.category as Category)) {
    throw new Error(
      `Blog post "${slug}.mdx" has invalid category "${String(
        data.category,
      )}". Expected one of: ${CATEGORIES.join(", ")}`,
    );
  }
  return {
    title: String(data.title),
    summary: String(data.summary),
    category: data.category as Category,
    tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
    publishedAt: String(data.publishedAt),
    coverImage: data.coverImage ? String(data.coverImage) : undefined,
    coverImageW: data.coverImageW ? Number(data.coverImageW) : undefined,
    coverImageCaption: data.coverImageCaption
      ? String(data.coverImageCaption)
      : undefined,
    coverImageH: data.coverImageH ? Number(data.coverImageH) : undefined,
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    series: data.series ? String(data.series) : undefined,
    seriesOrder:
      typeof data.seriesOrder === "number" ? data.seriesOrder : undefined,
    draft: Boolean(data.draft),
  };
}

/**
 * Extract H2/H3 headings for the table of contents. Fenced code blocks are
 * skipped so `## comment` lines inside code don't leak into the TOC. Slugs are
 * generated with the same GithubSlugger that `rehype-slug` uses, so anchors
 * match the ids rendered into the DOM.
 */
function buildToc(content: string): TocEntry[] {
  const slugger = new GithubSlugger();
  const entries: TocEntry[] = [];
  let inFence = false;

  for (const line of content.split("\n")) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length as 2 | 3;
    const text = match[2].replace(/[*_`]/g, "").trim();
    entries.push({ depth, text, id: slugger.slug(text) });
  }

  return entries;
}

function toPost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const fm = validate(slug, data);
  return {
    ...fm,
    slug,
    content,
    toc: buildToc(content),
    readingTimeMinutes: Math.max(1, Math.round(readingTime(content).minutes)),
  };
}

function byNewest(a: PostMeta, b: PostMeta): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

/** All published posts (drafts hidden in production), newest first. */
export function getAllPosts(): Post[] {
  return readRawFiles()
    .map(({ slug, raw }) => toPost(slug, raw))
    .filter((p) => !(isProd && p.draft))
    .sort(byNewest);
}

export function getAllPostMeta(): PostMeta[] {
  // Strip heavy fields (content, toc) so listing payloads sent to client
  // components stay small.
  return getAllPosts().map(({ content, toc, ...meta }) => {
    void content;
    void toc;
    return meta;
  });
}

export function getPostBySlug(slug: string): Post | undefined {
  const file = readRawFiles().find((f) => f.slug === slug);
  if (!file) return undefined;
  const post = toPost(slug, file.raw);
  if (isProd && post.draft) return undefined;
  return post;
}

export function getPostsByCategory(category: Category): PostMeta[] {
  return getAllPostMeta().filter((p) => p.category === category);
}

/** Distinct tags with post counts, most-used first. */
export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();
  for (const post of getAllPostMeta()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
}

export function getCategoryCounts(): Record<Category, number> {
  const counts = Object.fromEntries(CATEGORIES.map((c) => [c, 0])) as Record<
    Category,
    number
  >;
  for (const post of getAllPostMeta()) counts[post.category] += 1;
  return counts;
}

/** Ordered siblings of a post's series (by seriesOrder), or [] if none. */
export function getSeriesPosts(seriesName: string): PostMeta[] {
  return getAllPostMeta()
    .filter((p) => p.series === seriesName)
    .sort((a, b) => (a.seriesOrder ?? 0) - (b.seriesOrder ?? 0));
}

export interface SeriesNav {
  name: string;
  index: number; // 1-based position of current post
  total: number;
  prev?: PostMeta;
  next?: PostMeta;
  siblings: PostMeta[];
}

export function getSeriesNav(post: Post): SeriesNav | undefined {
  if (!post.series) return undefined;
  const siblings = getSeriesPosts(post.series);
  const i = siblings.findIndex((p) => p.slug === post.slug);
  if (i === -1) return undefined;
  return {
    name: post.series,
    index: i + 1,
    total: siblings.length,
    prev: siblings[i - 1],
    next: siblings[i + 1],
    siblings,
  };
}
