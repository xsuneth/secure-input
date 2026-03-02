"use client";

import { motion, Variants } from "framer-motion";

export function FileCodeIcon({ className, isHovered }: { className?: string; isHovered?: boolean }) {
  const pathVariants: Variants = {
    normal: { pathLength: 1, strokeOpacity: 0.4 },
    hover: { 
      pathLength: [0, 1],
      strokeOpacity: 1,
      transition: { duration: 1, ease: "easeInOut" }
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
        d="M4 22h14a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v4" 
        variants={pathVariants}
      />
      <motion.path 
        d="M14 2v4a2 2 0 0 0 2 2h4" 
        variants={pathVariants}
      />
      <motion.path 
        d="m5 12-3 3 3 3" 
        variants={{
          normal: { pathLength: 1, strokeOpacity: 0.4, x: 0 },
          hover: { 
            pathLength: [0, 1],
            strokeOpacity: 1,
            x: [0, -2, 0],
            transition: { duration: 0.6, ease: "easeInOut" }
          }
        }}
      />
      <motion.path 
        d="m9 18 3-3-3-3" 
        variants={{
          normal: { pathLength: 1, strokeOpacity: 0.4, x: 0 },
          hover: { 
            pathLength: [0, 1],
            strokeOpacity: 1,
            x: [0, 2, 0],
            transition: { duration: 0.6, ease: "easeInOut", delay: 0.2 }
          }
        }}
      />
    </motion.svg>
  );
}
