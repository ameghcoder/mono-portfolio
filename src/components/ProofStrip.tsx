import { PORTFOLIO_DATA } from "@/data/portfolio";
import { ArrowBigDown } from "lucide-react";
import Link from "next/link";

export function ProofStrip() {
  return (
    <>
      <section className="border-y border-border py-10 md:py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-8">
          {PORTFOLIO_DATA.proofStrip.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <span className="block text-4xl md:text-5xl font-medium tracking-tight text-highlight leading-none">
                {stat.value}
              </span>
              <span className="label-mono block">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>
      <Link href="/#recent-ships" className="flex items-center justify-center gap-2 text-highlight"> <ArrowBigDown className="size-3 animate-bounce" /><span>Scroll Down</span> <ArrowBigDown className="size-3 animate-bounce" /> </Link>
    </>
  );
}
