import { PORTFOLIO_DATA } from "@/data/portfolio";

export function Experience() {
  return (
    <section id="experience" className="space-y-8 scroll-mt-20">
      <div className="flex items-center gap-4">
        <span className="section-index">[03]</span>
        <span className="label-mono">Experience</span>
      </div>

      <div className="space-y-px border border-border bg-border">
        {PORTFOLIO_DATA.experience.map((exp) => (
          <div
            key={exp.company}
            className="bg-background hover:bg-card p-6 grid md:grid-cols-[180px_1fr] gap-4 transition-colors duration-200"
          >
            <div className="space-y-1">
              <span className="label-mono block">{exp.period}</span>
              <span className="text-sm font-medium text-foreground">
                {exp.company}
              </span>
            </div>

            <div className="space-y-2">
              <span className="text-sm font-medium text-foreground">
                {exp.role}
              </span>
              <p className="text-sm text-muted-foreground leading-relaxed">
                → {exp.metric}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
