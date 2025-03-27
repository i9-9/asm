"use client";

import { motion } from 'framer-motion';

interface AnimatedSVGLogoProps {
  svgPath: string;
  width?: string;
  height?: string;
  color?: string;
}

export default function AnimatedSVGLogo({
  svgPath,
  width = "500px",
  height = "500px",
  color = "#DB4C40"
}: AnimatedSVGLogoProps) {
  return (
    <motion.div
      className="svg-container"
      style={{ width, height }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 500 500"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={svgPath}
          fill={color}
          stroke="none"
        />
      </svg>
    </motion.div>
  );
} 