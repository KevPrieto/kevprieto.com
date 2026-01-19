"use client";

import { motion } from "framer-motion";
import { Section } from "./Section";
import { Reveal, WordReveal } from "./motion";
import { useMotion } from "./motion";

export function AboutSection() {
  const { shouldReduceMotion } = useMotion();

  return (
    <Section id="about" title="About" subtitle="Background and approach">
      {/* Editorial Layout: Text Left, Vertical Video Right */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-[var(--space-xl)] items-start">
        {/* Text Content Column */}
        <div className="space-y-[var(--space-lg)] lg:max-w-[600px]">
          <Reveal delay={0.1}>
            <motion.div
              className="text-[clamp(1.75rem,4vw,2.5rem)] leading-[1.2] font-medium"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <WordReveal stagger={0.05} delay={0}>
                I build systems where structure matters.
              </WordReveal>
            </motion.div>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.p
              className="text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--color-muted-light)] leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              My background is backend development, but my work goes beyond code:
              I develop games, design interactive experiences, and explore how systems
              behave when pushed to their limits.
            </motion.p>
          </Reveal>

          <Reveal delay={0.3}>
            <motion.p
              className="text-[clamp(1.125rem,2vw,1.5rem)] text-[var(--color-muted-light)] leading-relaxed"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              I also create content where I share tools, workflows, and technical ideas
              across platforms like LinkedIn, Instagram, and YouTube.
            </motion.p>
          </Reveal>

          <Reveal delay={0.4}>
            <motion.div
              className="text-[clamp(1.5rem,3vw,2rem)] font-medium leading-relaxed pt-[var(--space-md)]"
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
              viewport={{ once: true }}
            >
              <WordReveal stagger={0.05} delay={0}>
                Curiosity drives everything I build.
              </WordReveal>
            </motion.div>
          </Reveal>
        </div>

        {/* Vertical Video Column - Large, Editorial, Premium */}
        <Reveal delay={0.2}>
          <motion.div
            className="relative w-full max-w-[360px] sm:max-w-[420px] lg:max-w-[520px] aspect-[9/16] bg-[var(--color-surface-2)] border border-[var(--color-border)] rounded-3xl overflow-hidden mx-auto lg:mx-0 group"
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            style={{ boxShadow: "0 24px 80px rgba(0, 0, 0, 0.25), 0 12px 32px rgba(0, 0, 0, 0.15)" }}
          >
            {/* Loading skeleton placeholder */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-surface-2)] via-[var(--color-surface)] to-[var(--color-surface-2)] animate-pulse" />
            
            <video
              className="absolute inset-0 w-full h-full object-cover object-top"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            >
              <source src="/content/desktop-video/VIDEO-DESKTOP.mp4" type="video/mp4" />
            </video>
            
            {/* Subtle inner border glow */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />
            
            {/* Subtle gradient overlay for depth */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        </Reveal>
      </div>
    </Section>
  );
}
