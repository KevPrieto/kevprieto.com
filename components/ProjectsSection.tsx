"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Reveal, StaggerContainer, StaggerItem } from "./motion";
import { useMotion } from "./motion";
import { GitHubIcon, SmartphoneIcon } from "./Icons";

// ============================================================
// EYLA FLAGSHIP SHOWCASE
// ============================================================

function EylaShowcase() {
  const { shouldReduceMotion } = useMotion();

  return (
    <motion.article
      className="relative bg-[var(--color-surface)] border-2 border-[var(--color-accent)]/30 rounded-2xl overflow-hidden"
      style={{ boxShadow: "0 0 40px rgba(124, 58, 237, 0.1)" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              borderColor: "rgba(124, 58, 237, 0.5)",
              boxShadow: "0 0 60px rgba(124, 58, 237, 0.15)",
              transition: { duration: 0.3 },
            }
      }
    >
      {/* Banner Image */}
      <div className="aspect-[21/9] w-full overflow-hidden border-b border-[var(--color-border)]">
        <img
          src="/images/eyla-banner.png"
          alt="EYLA System Interface"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-[var(--space-xl)] lg:p-[var(--space-2xl)]">
        {/* Header with title and links */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-[var(--space-md)] mb-[var(--space-lg)]">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h3 className="text-[var(--font-size-3xl)] font-bold">EYLA</h3>
              <span className="text-[var(--font-size-xs)] text-[var(--color-accent)] bg-[var(--color-accent)]/10 px-3 py-1 rounded-full border border-[var(--color-accent)]/30 font-medium">
                Flagship Project
              </span>
            </div>
            <p className="text-[var(--font-size-lg)] text-[var(--color-muted-light)]">
              Long-term project management system built for clarity and continuity
            </p>
          </div>

          {/* GitHub Links */}
          <div className="flex gap-3">
            <a
              href="https://github.com/KevPrieto/eyla"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--font-size-sm)] font-medium hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors"
            >
              <GitHubIcon size={18} />
              <span>Web</span>
            </a>
            <a
              href="https://github.com/KevPrieto/eyla-mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-surface-2)] border border-[var(--color-border)] text-[var(--font-size-sm)] font-medium hover:border-[var(--color-accent)]/50 hover:text-[var(--color-accent)] transition-colors"
            >
              <SmartphoneIcon size={18} />
              <span>Mobile</span>
            </a>
          </div>
        </div>

        {/* Problem / Solution / Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-[var(--space-lg)] mb-[var(--space-lg)]">
          <div>
            <h4 className="text-[var(--font-size-sm)] font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-2">
              The Problem
            </h4>
            <p className="text-[var(--font-size-sm)] text-[var(--color-muted-light)] leading-relaxed">
              Most project tools optimize for speed and output. Over time, context is lost, decisions become opaque, and systems drift from their original intent. Teams end up managing artifacts instead of understanding what they&apos;re building.
            </p>
          </div>
          <div>
            <h4 className="text-[var(--font-size-sm)] font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-2">
              The Approach
            </h4>
            <p className="text-[var(--font-size-sm)] text-[var(--color-muted-light)] leading-relaxed">
              EYLA treats projects as first-class entities with persistent state, evolvable roadmaps, and explicit decision history. The system is designed around determinism, traceability, and long-term orientation rather than velocity.
            </p>
          </div>
          <div>
            <h4 className="text-[var(--font-size-sm)] font-semibold text-[var(--color-accent)] uppercase tracking-wider mb-2">
              Current State
            </h4>
            <p className="text-[var(--font-size-sm)] text-[var(--color-muted-light)] leading-relaxed">
              Active development across web and mobile platforms. The core architecture is stable, with ongoing work on state persistence, roadmap visualization, and cross-platform synchronization.
            </p>
          </div>
        </div>

        {/* Technical Stack */}
        <div className="flex flex-wrap gap-2">
          {["TypeScript", "Next.js", "React Native", "PostgreSQL", "System Design", "Clean Architecture"].map((tag) => (
            <span
              key={tag}
              className="text-[var(--font-size-xs)] text-[var(--color-fg)] bg-[var(--color-surface-2)] px-3 py-1.5 rounded-full border border-[var(--color-border)]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

// ============================================================
// SECONDARY PROJECT CARD
// ============================================================

type SecondaryProject = {
  id: number;
  title: string;
  description: string;
  problem: string;
  image: string;
  tags: string[];
  githubUrl: string;
};

const secondaryProjects: SecondaryProject[] = [
  {
    id: 2,
    title: "Flight Fare Optimizer",
    description:
      "Desktop application for finding optimal flight prices through intelligent filtering, ranking, and comparison algorithms.",
    problem: "Flight search results are overwhelming. This tool applies stream-based business logic to rank and filter options, generating clean PDF reports with the best matches.",
    image: "/images/FlightFare.png",
    tags: ["Java 17", "JavaFX", "JUnit", "Modular Architecture"],
    githubUrl: "https://github.com/KevPrieto/Flight-Fare-Optimizer",
  },
  {
    id: 3,
    title: "EYLA Mobile",
    description:
      "Cross-platform mobile companion for the EYLA system, bringing project context and roadmap visibility to mobile devices.",
    problem: "Project clarity shouldn't require a desktop. This app extends EYLA's core principles to mobile, maintaining the same emphasis on intent and structure.",
    image: "/images/eyla-mobile.png",
    tags: ["React Native", "TypeScript", "Expo", "Mobile"],
    githubUrl: "https://github.com/KevPrieto/eyla-mobile",
  },
];

function SecondaryProjectCard({ project }: { project: SecondaryProject }) {
  const { shouldReduceMotion } = useMotion();

  return (
    <motion.article
      className="group bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl p-[var(--space-lg)] flex flex-col h-full"
      style={{ boxShadow: "var(--shadow-soft)" }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -4,
              borderColor: "rgba(124, 58, 237, 0.3)",
              transition: { duration: 0.3 },
            }
      }
    >
      {/* Project Image */}
      <div className="mb-[var(--space-md)] rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] overflow-hidden aspect-square flex items-center justify-center">
        <img
          src={project.image}
          alt={`${project.title} preview`}
          className="w-full h-full object-contain p-4"
        />
      </div>

      {/* Header with GitHub link */}
      <div className="flex items-start justify-between gap-2 mb-[var(--space-xs)]">
        <h3 className="text-[var(--font-size-xl)] font-bold">{project.title}</h3>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-surface-2)] text-[var(--color-muted-light)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent)]/10 transition-colors"
          aria-label={`View ${project.title} on GitHub`}
        >
          <GitHubIcon size={18} />
        </a>
      </div>

      <p className="text-[var(--font-size-sm)] text-[var(--color-muted-light)] mb-[var(--space-sm)]">
        {project.description}
      </p>

      <p className="text-[var(--font-size-xs)] text-[var(--color-muted)] mb-[var(--space-md)] flex-1 italic">
        {project.problem}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[var(--font-size-xs)] text-[var(--color-fg)] bg-[var(--color-surface-2)] px-3 py-1 rounded-full border border-[var(--color-border)]"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.article>
  );
}

// ============================================================
// PROJECTS SECTION
// ============================================================

export function ProjectsSection() {
  return (
    <Section id="projects" title="Projects" subtitle="Systems I&apos;ve designed and built">
      <div className="flex flex-col gap-[var(--space-xl)]">
        {/* EYLA Flagship */}
        <Reveal>
          <EylaShowcase />
        </Reveal>

        {/* Secondary Projects */}
        <StaggerContainer
          staggerDelay={0.15}
          className="grid grid-cols-1 md:grid-cols-2 gap-[var(--space-md)]"
        >
          {secondaryProjects.map((project) => (
            <StaggerItem key={project.id}>
              <SecondaryProjectCard project={project} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </Section>
  );
}
