import { Hero } from "@/components/Hero";
import { WhatIDoSection } from "@/components/WhatIDoSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { MocionSection } from "@/components/MocionSection";
import { CurrentlyWorkingSection } from "@/components/CurrentlyWorkingSection";
import { ToolsSection } from "@/components/ToolsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <WhatIDoSection />
      <ProjectsSection />
      <MocionSection />
      <CurrentlyWorkingSection />
      <ToolsSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
