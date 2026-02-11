"use client";

import { ResumeButton } from "@/components/ResumeButton";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Experience } from "@/components/Experience";
import { Achievements } from "@/components/Achievements";
import { Footer } from "@/components/Footer";
import Booker from "@/components/book-meeting";

export default function Home() {
  return (
    <div className="max-container py-24 space-y-24">
      <ResumeButton />
      <Hero />
      <div className="divider" />
      <TechStack />
      <div className="divider" />
      <Projects />
      <div className="divider" />
      <Experience />
      <div className="divider" />
      <Booker />
      <div className="divider" />
      <Achievements />
      <div className="divider" />
      <Footer />
    </div>
  );
}
