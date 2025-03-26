"use client";

import { motion } from "framer-motion";
import ModulosLogo from "./ModulosLogo";
import Image from "next/image";

interface HeroProps {
  theme: string;
  toggleTheme: () => void;
}

export default function HeroNew({ theme, toggleTheme }: HeroProps) {
  const textColor = theme === "light" ? "#FF4136" : "#FF725C";
  
  return (
    <motion.section 
      className="flex flex-col items-center justify-center relative min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo animado (centrado y más grande) */}
      <div className="mb-16 scale-125 -mt-16">
        <ModulosLogo theme={theme} />
      </div>
      
      {/* Título en la esquina inferior izquierda */}
      <div className="absolute bottom-8 left-8">
        <h1 className="text-xl font-bold uppercase">
          The <span className="font-bold" style={{ color: textColor }}>
            DESIGN & DEVELOPMENT
          </span> STUDIO
        </h1>
      </div>
      
      {/* Ícono de scroll down (centro inferior) */}
      <div className="absolute bottom-8">
        <Image 
          src="/misc/scrolldown.svg" 
          alt="Scroll Down" 
          width={22} 
          height={33}
          className="animate-bounce"
        />
      </div>
      
      {/* Toggle de tema (esquina inferior derecha) */}
      <button
        onClick={toggleTheme}
        className="absolute bottom-8 right-8 focus:outline-none"
        aria-label={theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
      >
        <Image 
          src="/misc/themetoggle.svg" 
          alt="Toggle Theme" 
          width={43} 
          height={22}
          className={`transition-transform duration-300 ${theme === 'light' ? 'rotate-180' : ''}`}
        />
      </button>
    </motion.section>
  );
} 