import { PORTFOLIO_DATA } from "@/data/portfolio";

export function WhatIBuild() {
  return (
    <section className="border-y border-border py-8 md:py-9">
      <span className="label-mono block mb-6">What I Build</span>
      <ul className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
        {PORTFOLIO_DATA.capabilities.map((item) => (
          <li key={item} className="flex items-center gap-2.5">
            <span
              className="size-1.5 rounded-full bg-highlight shrink-0"
              aria-hidden="true"
            />
            <span className="text-sm text-foreground/90 leading-tight">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
