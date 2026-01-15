"use client";

import { motion } from "framer-motion";
import { Container } from "./Container";
import { WordReveal, Reveal } from "./motion";
import { useMotion } from "./motion";

export function CurrentlyWorkingSection() {
  const { shouldReduceMotion } = useMotion();

  const lines = [
    "I'm currently working as a coordinator in game development on project \"Moción\".",
    "My role focuses on designing and integrating modular systems in Unity using C#, ensuring that gameplay logic, tools, and architecture remain clean, scalable, and maintainable over time.",
    "I work closely with project's codebase, developing reusable prefabs, control scripts, and test scenes, while coordinating version control and collaborative workflows.",
  ];

  return (
    <section className="py-[clamp(6rem,15vh,10rem)]">
      <Container>
        <div className="max-w-[50rem] mx-auto">
          {/* Section Heading */}
          <WordReveal
            delay={0.1}
            stagger={0.1}
            className="text-[clamp(2.5rem,6vw,4.5rem)] font-extrabold tracking-tighter leading-[1.05] mb-[clamp(3rem,8vh,6rem)] text-[var(--color-fg)]"
          >
            What I'm currently working on
          </WordReveal>

          {/* Content Lines - Progressive reveal */}
          <div className="space-y-[clamp(2rem,4vh,3rem)]">
            {lines.map((line, index) => (
              <motion.p
                key={index}
                className="text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--color-muted-light)] leading-relaxed"
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.9,
                  delay: 0.4 + (index * 0.25),
                  ease: [0.25, 0.1, 0.25, 1]
                }}
                viewport={{ once: true, amount: 0.3 }}
              >
                {line}
              </motion.p>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
