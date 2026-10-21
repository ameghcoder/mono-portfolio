import { getAllPostMeta } from "@/lib/blog";
import { PORTFOLIO_DATA } from "@/data/portfolio";
import { SITE_URL } from "@/lib/site";

/**
 * /llms.txt — a curated, plain-text index for LLMs (the emerging llmstxt.org
 * convention). Gives models a clean map of who this is and what's worth citing,
 * without parsing HTML. Regenerated from content on each build.
 */
export function GET(): Response {
  const { profile } = PORTFOLIO_DATA;
  const posts = getAllPostMeta();

  const lines = [
    `# ${profile.name}`,
    "",
    `> ${profile.role}. ${profile.headline}`,
    "",
    "## About",
    `- [About ${profile.name}](${SITE_URL}/about): background, what I build, and my stack.`,
    "",
    "## Writing",
    ...posts.map(
      (p) =>
        `- [${p.title}](${SITE_URL}/blog/${p.slug}): ${p.summary} (${p.category}, ${p.publishedAt})`
    ),
    "",
    "## Projects",
    ...PORTFOLIO_DATA.projects.map(
      (p) => `- [${p.title}](${SITE_URL}/projects/${p.slug}): ${p.description}`
    ),
    "",
  ];

  return new Response(lines.join("\n"), {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
