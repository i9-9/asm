"use client";

import { motion } from "framer-motion";
import ModulosLogo from "./ModulosLogo";
import Image from "next/image";

interface HeroProps {
  theme: string;
  toggleTheme: () => void;
}

export default function HeroNew({ theme, toggleTheme }: HeroProps) {
  return (
    <motion.section 
      className="flex flex-col items-center w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenedor principal con padding-top */}
      <div className="flex-1 flex flex-col items-center pt-[320px]">
        {/* Logo animado */}
        <div className="mb-16 scale-100 md:scale-[1.35] w-[75vw] md:w-[65vw] lg:w-[55vw]">
          <ModulosLogo theme={theme} />
        </div>
      </div>
      
      {/* Footer con elementos alineados */}
      <div className="w-full px-8 py-6">
        {/* Grid para mejor control del espacio */}
        <div className="grid grid-cols-2 md:grid-cols-3 items-center gap-4">
          {/* Título */}
          <h1 className="text-base md:text-xl uppercase text-[#DB4C40]">
            <span className="font-bold">DESIGN & DEVELOPMENT</span> STUDIO
          </h1>

          {/* Scroll down - solo en desktop */}
          <div className="hidden md:flex justify-center">
            <button
              onClick={() => {
                document.getElementById('about-section')?.scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className="cursor-pointer"
              aria-label="Scroll to about section"
            >
              <Image 
                src="/misc/scrolldown.svg" 
                alt="Scroll Down" 
                width={22} 
                height={33}
                className="animate-bounce"
              />
            </button>
          </div>

          {/* Toggle theme */}
          <div className="flex justify-end">
            <button
              onClick={toggleTheme}
              className="focus:outline-none"
              aria-label="Toggle theme"
            >
              <svg 
                width="43" 
                height="22" 
                viewBox="0 0 43 22" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect 
                  x="0.5" 
                  y="0.5" 
                  width="42" 
                  height="21" 
                  rx="7.5" 
                  fill={theme === 'dark' ? '#202021' : '#F7F7F7'}
                  stroke="#DB4C40"
                />
                <motion.circle
                  cx={theme === 'dark' ? 10.5 : 32.5}
                  cy="10.5"
                  r="7.5"
                  fill="#DB4C40"
                  initial={false}
                  animate={{ cx: theme === 'dark' ? 10.5 : 32.5 }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.section>
  );
} 