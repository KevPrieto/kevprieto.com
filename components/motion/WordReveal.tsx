'use client';

import { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { useMotion } from './MotionProvider';

interface WordRevealProps {
  children: string;
  delay?: number;
  duration?: number;
  stagger?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}

const wordVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1],
    },
  },
};

export function WordReveal({
  children,
  delay = 0,
  duration = 0.6,
  stagger = 0.1,
  className,
  once = true,
  amount = 0.2,
}: WordRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });
  const { shouldReduceMotion } = useMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const words = children.split(' ').filter(w => w.length > 0);

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
      {words.map((word, index) => (
        <span key={index} className="inline-block">
          <motion.span
            variants={wordVariants}
            className="inline-block"
          >
            {word}
          </motion.span>
          {index < words.length - 1 && <span className="inline-block" style={{ width: '0.25em' }} />}
        </span>
      ))}
    </motion.div>
  );
}
