import "server-only";

import type {
  ContributionCalendar,
  ContributionDay,
  ContributionLevel,
} from "./github-types";

const ONE_DAY = 60 * 60 * 24;

function attr(tag: string, name: string): string | undefined {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`))?.[1];
}

/**
 * Parses the public calendar fragment GitHub serves at
 * `/users/<user>/contributions` (the same HTML the profile page embeds).
 * Each day is a `<td data-date data-level id>`, and its count lives in the
 * `<tool-tip for="<td id>">` text ("5 contributions on …" / "No contributions …").
 */
export function parseContributions(html: string): ContributionCalendar {
  const counts = new Map<string, number>();
  for (const [, id, text] of html.matchAll(/<tool-tip\b[^>]*\bfor="([^"]+)"[^>]*>([^<]*)<\/tool-tip>/g)) {
    const n = text.match(/^\s*([\d,]+) contribution/);
    counts.set(id, n ? Number(n[1].replace(/,/g, "")) : 0);
  }

  const days: ContributionDay[] = [];
  for (const [tag] of html.matchAll(/<td\b[^>]*\bdata-date="[^"]+"[^>]*>/g)) {
    const date = attr(tag, "data-date");
    const id = attr(tag, "id");
    const level = Number(attr(tag, "data-level") ?? 0);
    if (!date) continue;
    days.push({
      date,
      count: (id && counts.get(id)) || 0,
      level: (level >= 0 && level <= 4 ? level : 0) as ContributionLevel,
    });
  }
  days.sort((a, b) => a.date.localeCompare(b.date));

  // Lay days out into Sunday-first week columns, padding the first week.
  const weeks: (ContributionDay | null)[][] = [];
  const firstWeekday = days.length ? new Date(`${days[0].date}T00:00:00Z`).getUTCDay() : 0;
  let week: (ContributionDay | null)[] = Array(firstWeekday).fill(null);
  for (const day of days) {
    week.push(day);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }
  if (week.length) weeks.push(week);

  return { total: days.reduce((sum, d) => sum + d.count, 0), weeks };
}

/** Last year of contributions, cached for a day. Returns `null` on any
 * failure so the hero can simply omit the graph. */
export async function getContributions(user: string): Promise<ContributionCalendar | null> {
  try {
    const res = await fetch(`https://github.com/users/${encodeURIComponent(user)}/contributions`, {
      next: { revalidate: ONE_DAY },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return null;
    const calendar = parseContributions(await res.text());
    return calendar.weeks.length ? calendar : null;
  } catch {
    return null;
  }
}
