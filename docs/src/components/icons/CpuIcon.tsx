"use client";

import { motion, Variants } from "framer-motion";

export function CpuIcon({ className, isHovered }: { className?: string; isHovered?: boolean }) {
  const pathVariants: Variants = {
    normal: { pathLength: 1, strokeOpacity: 0.4 },
    hover: { 
      pathLength: [0, 1],
      strokeOpacity: 1,
      transition: { duration: 0.8, ease: "easeInOut" }
    }
  };

  const glowVariants: Variants = {
    normal: { filter: "drop-shadow(0 0 0px rgba(0, 0, 0, 0))" },
    hover: { 
      filter: "drop-shadow(0 0 8px oklch(0.85 0.15 150 / 0.6))",
      transition: { duration: 0.4 }
    }
  };

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      initial="normal"
      animate={isHovered ? "hover" : "normal"}
      variants={glowVariants}
    >
      <motion.rect 
        x="4" y="4" width="16" height="16" rx="2"
        variants={pathVariants}
      />
      <motion.rect 
        x="9" y="9" width="6" height="6" rx="1"
        variants={pathVariants}
      />
      <motion.path d="M15 2v2" variants={pathVariants} />
      <motion.path d="M15 20v2" variants={pathVariants} />
      <motion.path d="M2 15h2" variants={pathVariants} />
      <motion.path d="M2 9h2" variants={pathVariants} />
      <motion.path d="M20 15h2" variants={pathVariants} />
      <motion.path d="M20 9h2" variants={pathVariants} />
      <motion.path d="M9 2v2" variants={pathVariants} />
      <motion.path d="M9 20v2" variants={pathVariants} />
    </motion.svg>
  );
}
