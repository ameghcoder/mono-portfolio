import { Hero } from "@/components/Hero";
import { WhatIBuild } from "@/components/WhatIBuild";
import { SelectedSystems } from "@/components/SelectedSystems";
import { OpenSource } from "@/components/OpenSource";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { HowIThink, WhatMakesDifferent } from "@/components/Narrative";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="max-container pt-4 pb-12 space-y-20">
      <Hero />
      <WhatIBuild />
      <div className="divider" />
      <CurrentlyBuilding />
      <div className="divider" />
      <SelectedSystems />
      <div className="divider" />
      <OpenSource />
      <div className="divider" />
      <HowIThink />
      <div className="divider" />
      <WhatMakesDifferent />
      <div className="divider" />
      <Contact />
      <Footer />
    </div>
  );
}
