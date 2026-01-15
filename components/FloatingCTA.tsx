"use client";

import { motion } from "framer-motion";
import { useMotion } from "./motion";

export function FloatingCTA() {
  const { shouldReduceMotion } = useMotion();

  return (
    <motion.a
      href="https://calendly.com/kgps1003/30min"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 md:bottom-10 md:right-10 z-50 group relative px-8 py-4 rounded-full bg-[var(--color-fg)] text-[var(--color-bg)] font-semibold text-[var(--font-size-lg)] border-2 border-[var(--color-accent)] inline-flex items-center gap-3 overflow-hidden"
      style={{ boxShadow: "var(--shadow-elevated)" }}
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              y: -4,
              scale: 1.02,
              boxShadow: "0 8px 20px rgba(0, 122, 255, 0.3)",
              transition: { duration: 0.3 },
            }
      }
      whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
      aria-label="Get in touch via Calendly"
    >
      {/* iOS-style shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
      
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-full bg-[var(--color-accent)] opacity-0 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      
      {/* Border glow effect */}
      <div className="absolute inset-0 rounded-full border-2 border-[var(--color-accent)] opacity-50 group-hover:opacity-100 transition-opacity duration-300 animate-pulse pointer-events-none" />
      
      {/* Button content */}
      <span className="relative z-10">Get in touch</span>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        className="relative z-10 transition-transform duration-200 group-hover:translate-x-1"
      >
        <path
          d="M7 17L17 7M17 7H7M17 7V17"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.a>
  );
}
