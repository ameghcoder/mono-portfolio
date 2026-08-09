import { Hero } from "@/components/Hero";
import { WhatIBuild } from "@/components/WhatIBuild";
import { SelectedSystems } from "@/components/SelectedSystems";
import { RecentWriting } from "@/components/RecentWriting";
import { OpenSource } from "@/components/OpenSource";
import { CurrentlyBuilding } from "@/components/CurrentlyBuilding";
import { HowIThink, WhatMakesDifferent } from "@/components/Narrative";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

// Homepage IA: identity -> strongest proof (selected work) -> capability
// scan -> writing -> supporting sections -> approach -> contact. Projects
// come right after the hero because they're the strongest proof of how this
// person builds, per the portfolio-design skill's content hierarchy.
export default function Home() {
  return (
    <div className="max-container pt-4 pb-12 space-y-20">
      <Hero />
      <WhatIBuild />
      <SelectedSystems />
      <RecentWriting />
      <CurrentlyBuilding />
      <OpenSource />
      <HowIThink />
      <WhatMakesDifferent />
      <Contact />
      <Footer />
    </div>
  );
}
