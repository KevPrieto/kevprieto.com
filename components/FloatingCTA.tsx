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
      className="glass fixed top-2 right-2 sm:top-4 sm:right-4 z-[60] group px-3 py-2 sm:px-4 sm:py-2.5 rounded-full text-[var(--color-fg)] font-semibold text-[0.75rem] sm:text-[0.875rem] inline-flex items-center gap-1.5 sm:gap-2 overflow-hidden transition-all duration-300 pointer-events-auto"
      style={{
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
      }}
      initial={shouldReduceMotion ? {} : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={
        shouldReduceMotion
          ? {}
          : {
              scale: 1.05,
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3)",
              transition: { duration: 0.2 },
            }
      }
      whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
      aria-label="Get in touch via Calendly"
    >
      {/* iOS-style shine effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none rounded-full" />

      {/* Inner glow highlight */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Button content */}
      <span className="relative z-10 whitespace-nowrap">Get in touch</span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        className="relative z-10 transition-transform duration-200 group-hover:translate-x-0.5 w-3 h-3 sm:w-3.5 sm:h-3.5"
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
