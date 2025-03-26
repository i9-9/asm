"use client";

import { motion } from "framer-motion";
import ModulosLogo from "./ModulosLogo";
import Image from "next/image";

interface HeroProps {
  theme: string;
  toggleTheme: () => void;
}

export default function Hero({ theme, toggleTheme }: HeroProps) {
  // Usando la misma lógica de color que en ModulosLogo
  const textColor = theme === 'light' ? "#C43931" : "#DB4C40";

  return (
    <motion.div 
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Logo centrado y posicionado mucho más arriba */}
      <div className="absolute inset-0 flex items-start justify-center pt-[10vh]">
        <div className="w-[80%] max-w-[700px] h-[60vh]">
          <ModulosLogo theme={theme} />
        </div>
      </div>
      
      {/* Texto en la esquina inferior izquierda - en inglés */}
      <motion.div 
        className="absolute bottom-8 left-8 text-lg md:text-xl uppercase text-left"
        style={{ color: textColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        THE <span className="font-bold">DESIGN & DEVELOPMENT</span> STUDIO
      </motion.div>
      
      {/* Theme toggle button */}
      <motion.div
        onClick={toggleTheme}
        className="absolute bottom-8 right-8 cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <div className="relative w-[43px] h-[22px]">
          <svg width="43" height="22" viewBox="0 0 43 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect 
              x="0.5" 
              y="0.5" 
              width="42" 
              height="21" 
              rx="7.5" 
              fill={theme === 'light' ? "#FFFFFF" : "#202021"} 
              stroke={theme === 'light' ? "#C43931" : "#DB4C40"}
            />
            <motion.circle
              cx={theme === 'light' ? "32.5" : "10.5"}
              cy="10.5"
              r="7.5"
              fill={theme === 'light' ? "#C43931" : "#DB4C40"}
              initial={false}
              animate={{ cx: theme === 'light' ? 32.5 : 10.5 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </svg>
        </div>
      </motion.div>

      {/* Scroll Down Icon */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          y: [0, 10, 0]
        }}
        transition={{ 
          delay: 0.7, 
          duration: 2,
          repeat: Infinity,
          repeatType: "loop"
        }}
      >
        <Image 
          src="/misc/scrolldown.svg" 
          alt="Scroll Down" 
          width={22} 
          height={33}
          priority
          className={`cursor-pointer ${theme === 'light' ? 'opacity-70' : 'opacity-90'}`}
        />
      </motion.div>
    </motion.div>
  );
} 