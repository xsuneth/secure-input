"use client";

import { motion, Variants } from "framer-motion";

export function ShieldIcon({ className, isHovered }: { className?: string; isHovered?: boolean }) {
  const pathVariants: Variants = {
    normal: { pathLength: 1, strokeOpacity: 0.4 },
    hover: { 
      pathLength: [0, 1],
      strokeOpacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" }
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
      <motion.path 
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        variants={pathVariants}
      />
    </motion.svg>
  );
}
