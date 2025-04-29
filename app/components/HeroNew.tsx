"use client";

import { motion } from "framer-motion";
import ModulosLogo from "./ModulosLogo";
import Image from "next/image";
import { useState, useEffect } from "react";

interface HeroProps {
  theme: string;
  toggleTheme: () => void;
}

export default function HeroNew({ theme, toggleTheme }: HeroProps) {
  const [visibleElements, setVisibleElements] = useState({
    title: false,
    scrollButton: false,
    themeToggle: false
  });

  useEffect(() => {
    // Sequence the appearance of hero elements
    const sequence = [
      { element: 'title', delay: 800 },
      { element: 'scrollButton', delay: 1000 },
      { element: 'themeToggle', delay: 1200 }
    ];
    
    sequence.forEach(({ element, delay }) => {
      setTimeout(() => {
        setVisibleElements(prev => ({ ...prev, [element]: true }));
      }, delay);
    });
  }, []);

  return (
    <motion.section 
      className="flex flex-col items-center w-full h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Contenedor principal con padding-top */}
      <div className="flex-1 w-full flex flex-col items-center pt-[320px] px-4 md:px-8">
        {/* Logo container with 12-column grid */}
        <div className="w-full grid grid-cols-12">
          {/* Logo centered in mobile, 8 columns and centered in larger screens */}
          <div className="col-span-12 md:col-span-8 md:col-start-3 flex justify-center">
            <div className="scale-100 md:scale-[1.35] w-full max-w-[90%] md:max-w-full">
              <ModulosLogo theme={theme} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer con elementos alineados */}
      <div className="w-full px-8 py-6">
        {/* Grid para mejor control del espacio */}
        <div className="grid grid-cols-2 md:grid-cols-12 items-center gap-4">
          {/* Título - 4 columns */}
          <motion.h1 
            className="text-base md:text-xl uppercase text-[#DB4C40] col-span-1 md:col-span-4 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={visibleElements.title ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <motion.span 
              className="font-bold inline-block"
              initial={{ x: -20, filter: "blur(8px)" }}
              animate={visibleElements.title ? { x: 0, filter: "blur(0px)" } : { x: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              DESIGN & DEVELOPMENT
            </motion.span>{" "}
            <motion.span
              className="inline-block"
              initial={{ x: -20, filter: "blur(8px)" }}
              animate={visibleElements.title ? { x: 0, filter: "blur(0px)" } : { x: -20, filter: "blur(8px)" }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              STUDIO
            </motion.span>
          </motion.h1>

          {/* Scroll down - 4 columns centered */}
          <motion.div 
            className="hidden md:flex justify-center col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={visibleElements.scrollButton ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
          </motion.div>

          {/* Toggle theme - 4 columns, right aligned */}
          <motion.div 
            className="flex justify-end col-span-1 md:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={visibleElements.themeToggle ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
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
                  fill={theme === 'dark' ? '#202021' : '#F3F1E4'}
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
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
} 