"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Reveal, WordReveal } from "./motion";
import { useMotion } from "./motion";

export function AboutSection() {
  const { shouldReduceMotion } = useMotion();

  return (
    <Section id="about" title="About" subtitle="Background and approach">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[var(--space-xl)]">
        {/* Text Column */}
        <Reveal>
          <div className="space-y-[var(--space-xl)]">
            <motion.p
              className="text-[clamp(1.5rem,3vw,2rem)] leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <WordReveal stagger={0.05} delay={0}>
                I build systems where structure matters.
              </WordReveal>
            </motion.p>

            <motion.p
              className="text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--color-muted-light)] leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              My background is backend development, but my work goes beyond code:
              I develop games, design interactive experiences, and explore how systems
              behave when pushed to their limits.
            </motion.p>

            <motion.p
              className="text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--color-muted-light)] leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              I also create content where I share tools, workflows, and technical ideas
              across platforms like LinkedIn, Instagram, and YouTube.
            </motion.p>

            <motion.p
              className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-medium leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <WordReveal stagger={0.05} delay={0}>
                Curiosity drives everything I build.
              </WordReveal>
            </motion.p>
          </div>
        </Reveal>

        {/* Video Placeholder */}
        <Reveal delay={0.3}>
          <motion.div
            className="relative aspect-video bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-2xl overflow-hidden"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            viewport={{ once: true }}
            style={{ boxShadow: "var(--shadow-soft)" }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <p className="text-[var(--color-muted)] text-[var(--font-size-lg)] text-center px-8">
                Video placeholder — setup & content creation
              </p>
            </div>
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
