import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="pt-12 pb-10">
      <div className="divider mb-10" />
      <div className="flex items-center justify-between text-[10px] font-mono text-muted-foreground uppercase tracking-[0.18em]">
        <span>© 2026 {PORTFOLIO_DATA.profile.name}</span>
        <a
          href={PORTFOLIO_DATA.profile.repoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground transition-colors duration-200"
        >
          Use this template
        </a>
      </div>
    </footer>
  );
}
