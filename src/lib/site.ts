import { PORTFOLIO_DATA } from "@/data/portfolio";

/**
 * Single source of truth for absolute URLs and author identity — shared by
 * page metadata, JSON-LD structured data, the sitemap, and llms.txt so SEO and
 * LLM-citation signals stay consistent.
 *
 * Set NEXT_PUBLIC_SITE_URL in the environment for production (e.g.
 * https://yrjdev.dev). Falls back to localhost for local dev.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
).replace(/\/$/, "");

export function absoluteUrl(path = ""): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Author identity for metadata + schema.org Person (with social sameAs). */
export const AUTHOR = {
  name: PORTFOLIO_DATA.profile.name,
  url: SITE_URL,
  sameAs: PORTFOLIO_DATA.socials.map((s) => s.url),
};

/** schema.org Person node, reused across JSON-LD graphs. */
export const personSchema = {
  "@type": "Person",
  name: AUTHOR.name,
  url: AUTHOR.url,
  sameAs: AUTHOR.sameAs,
} as const;
