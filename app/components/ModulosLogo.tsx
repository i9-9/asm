"use client";

import * as React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { logoPathsData } from "./logoPathsData";

interface ModulosLogoProps {
  theme: string;
}

export default function ModulosLogo({ theme }: ModulosLogoProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  
  // Color para los módulos adaptado al tema
  const moduleColor = theme === 'light' ? "#C43931" : "#DB4C40";

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="w-full h-full"
        viewBox="0 0 10201 1962"
        preserveAspectRatio="xMidYMid meet"
      >
        <g clipPath="url(#clip0_519_279)">
          {logoPathsData.map((pathData) => (
            <motion.path
              key={pathData.id}
              d={pathData.path}
              fill={hoveredModule === pathData.id ? "#FFFFFF" : moduleColor}
              onMouseEnter={() => setHoveredModule(pathData.id)}
              onMouseLeave={() => setHoveredModule(null)}
              style={{
                transition: `fill 0.05s ease-in, fill 2s ease-out`,
              }}
              className="cursor-pointer"
            />
          ))}
          
          <defs>
            <clipPath id="clip0_519_279">
              <path fill="#fff" d="M0 0h10201v1962H0z" />
            </clipPath>
          </defs>
        </g>
      </motion.svg>

      {/* Añadimos un estilo global para tener un control más preciso */}
      <style jsx global>{`
        path {
          transition-property: fill;
          transition-duration: 2s; /* Duración del fade out */
          transition-timing-function: ease-out;
        }
        
        path:hover {
          transition-duration: 0.05s; /* Duración del fade in más rápida */
          transition-timing-function: ease-in;
        }
      `}</style>
    </div>
  );
} 