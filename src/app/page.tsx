import { Hero } from "@/components/Hero";
import { ProofStrip } from "@/components/ProofStrip";
import { RecentShips } from "@/components/RecentShips";
import { Architecture } from "@/components/Architecture";
import { SelectedSystems } from "@/components/SelectedSystems";
import { OpenSource } from "@/components/OpenSource";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { Skills } from "@/components/Skills";
import { Experience } from "@/components/Experience";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-container pt-4 pb-12 space-y-20">
      <Hero />
      <ProofStrip />
      <div className="divider" />
      <RecentShips />
      <div className="divider" />
      <Architecture />
      <div className="divider" />
      <SelectedSystems />
      <div className="divider" />
      <OpenSource />
      <div className="divider" />
      <CurrentlyBuilding />
      <div className="divider" />
      <Skills />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Contact />
      <Footer />
    </div>
  );
}
