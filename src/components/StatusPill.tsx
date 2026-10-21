import type { ProjectStatus } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const DOT: Record<ProjectStatus, string> = {
  Live: "bg-success animate-[pulse-dot_2.5s_ease-in-out_infinite]",
  Beta: "bg-warning",
  Closed: "bg-muted-foreground/60",
};

export function StatusPill({
  status,
  note,
  className,
}: {
  status: ProjectStatus;
  note?: string;
  className?: string;
}) {
  return (
    <span className={cn("status-pill", className)}>
      <span className={cn("size-1.5 rounded-full shrink-0", DOT[status])} aria-hidden="true" />
      {status}
      {note && <span className="opacity-70">· {note}</span>}
    </span>
  );
}
