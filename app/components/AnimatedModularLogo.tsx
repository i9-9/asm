"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AnimatedModularLogoProps {
  pathData: string[];
  width?: string;
  height?: string;
  color?: string;
  hoverColor?: string;
}

export default function AnimatedModularLogo({
  pathData,
  width = "500px",
  height = "500px",
  color = "#DB4C40",
  hoverColor = "#FFFFFF"
}: AnimatedModularLogoProps) {
  const [hoveredPath, setHoveredPath] = useState<number | null>(null);
  const [activePaths, setActivePaths] = useState<number[]>([]);

  // Animation effect
  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    
    const animate = () => {
      const randomPathIndices = Array.from(
        { length: Math.floor(Math.random() * 5) + 3 },
        () => Math.floor(Math.random() * pathData.length)
      );
      
      setActivePaths(randomPathIndices);
      
      setTimeout(() => {
        setActivePaths([]);
      }, 300);
    };
    
    intervalId = setInterval(animate, 1000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [pathData]);

  return (
    <motion.svg
      width={width}
      height={height}
      viewBox="0 0 500 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {pathData.map((path, index) => (
        <motion.path
          key={index}
          d={path}
          fill={hoveredPath === index || activePaths.includes(index) ? hoverColor : color}
          onMouseEnter={() => setHoveredPath(index)}
          onMouseLeave={() => setHoveredPath(null)}
          transition={{ duration: 0.3 }}
        />
      ))}
    </motion.svg>
  );
} 