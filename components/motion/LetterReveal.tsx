'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useMotion } from './MotionProvider';

interface LetterRevealProps {
  children: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const letterVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 15,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function LetterReveal({
  children,
  delay = 0,
  duration = 0.4,
  stagger = 0.03,
  className,
  once = true,
  amount = 0.2,
}: LetterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const { shouldReduceMotion } = useMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const letters = children.split('');

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren: delay,
          },
        },
      }}
      className={className}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={letterVariants}
          className="inline-block"
          style={{
            display: 'inline-block',
            whiteSpace: letter === ' ' ? 'pre' : 'normal',
          }}
        >
          {letter}
        </motion.span>
      ))}
    </motion.div>
  );
}
