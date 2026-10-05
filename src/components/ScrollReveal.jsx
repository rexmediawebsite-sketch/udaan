import React from 'react';
import { motion } from 'framer-motion';

/**
 * Award-Level Luxury Scroll Reveal Component
 * Uses Framer Motion with custom cubic-bezier luxury curve
 */
export default function ScrollReveal({
  children,
  delay = 0,
  y = 35,
  scale = 1,
  duration = 0.85,
  className = "",
  threshold = 0.15,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y, scale: scale !== 1 ? scale : 1 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: threshold }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({
  children,
  staggerDelay = 0.1,
  className = "",
  threshold = 0.15,
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: threshold }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren: 0.05,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  y = 30,
  duration = 0.8,
  className = "",
}) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration,
            ease: [0.16, 1, 0.3, 1],
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Editorial Masked Split-Text Slide-Up Reveal
 * Each word gracefully emerges from an invisible bottom mask
 */
export function SplitTextReveal({
  text,
  className = "",
  delay = 0,
}) {
  const words = text.split(" ");

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.24em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "115%", opacity: 0, rotate: 2 }}
            whileInView={{ y: "0%", opacity: 1, rotate: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              delay: delay + i * 0.045,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

