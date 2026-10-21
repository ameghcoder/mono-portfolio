/** Pure types for the GitHub contribution graph — safe to import from client
 * components (the fetch/parse lives in the server-only `github.ts`). */

export type ContributionLevel = 0 | 1 | 2 | 3 | 4;

export interface ContributionDay {
  /** ISO date, `YYYY-MM-DD` (UTC). */
  date: string;
  count: number;
  level: ContributionLevel;
}

export interface ContributionCalendar {
  total: number;
  /** Sunday-first weeks, oldest first. Leading days before the range are `null`. */
  weeks: (ContributionDay | null)[][];
}
