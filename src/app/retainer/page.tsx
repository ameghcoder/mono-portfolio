import type { Metadata } from "next";
import { RetainerHero } from "@/components/retainer/RetainerHero";
import { RetainerProblems } from "@/components/retainer/RetainerProblems";
import { RetainerWhatIHandle } from "@/components/retainer/RetainerWhatIHandle";
import { RetainerProof } from "@/components/retainer/RetainerProof";
import { RetainerPricing } from "@/components/retainer/RetainerPricing";
import { RetainerProcess } from "@/components/retainer/RetainerProcess";
import { RetainerAvailability } from "@/components/retainer/RetainerAvailability";
import { RetainerCTA } from "@/components/retainer/RetainerCTA";
import { PORTFOLIO_DATA } from "@/data/portfolio";

export const metadata: Metadata = {
  title: `Retainer — ${PORTFOLIO_DATA.profile.name}`,
  description:
    "Monthly technical retainer — full-stack development, AI integration, and infrastructure support for SaaS teams.",
};

export default function RetainerPage() {
  return (
    <div className="max-container py-12 space-y-20">
      <RetainerHero />
      <div className="divider" />
      <RetainerProblems />
      <div className="divider" />
      <RetainerWhatIHandle />
      <div className="divider" />
      <RetainerProof />
      <div className="divider" />
      <RetainerPricing />
      <div className="divider" />
      <RetainerProcess />
      <div className="divider" />
      <RetainerAvailability />
      <RetainerCTA />
    </div>
  );
}
