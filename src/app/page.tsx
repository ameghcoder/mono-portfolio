import { Hero } from "@/components/Hero";
import { WhatIBuild } from "@/components/WhatIBuild";
import { SelectedSystems } from "@/components/SelectedSystems";
import { RecentWriting } from "@/components/RecentWriting";
import { OpenSource } from "@/components/OpenSource";
import { HowIThink, WhatMakesDifferent } from "@/components/Narrative";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/motion/Reveal";

// Homepage IA: identity -> strongest proof (selected work, led by the live
// product) -> capability scan -> writing -> open source -> approach ->
// contact. The hero renders without a reveal so the positioning is never
// hidden behind an animation.
export default function Home() {
  return (
    <div className="max-container pt-10 md:pt-16 pb-12 space-y-20">
      <Hero />
      <Reveal>
        <WhatIBuild />
      </Reveal>
      <Reveal>
        <SelectedSystems />
      </Reveal>
      <Reveal>
        <RecentWriting />
      </Reveal>
      <Reveal>
        <OpenSource />
      </Reveal>
      <Reveal>
        <HowIThink />
      </Reveal>
      <Reveal>
        <WhatMakesDifferent />
      </Reveal>
      <Reveal>
        <Contact />
      </Reveal>
      <Footer />
    </div>
  );
}
