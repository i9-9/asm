"use client";

import { motion } from "framer-motion";
import Link from 'next/link';
import PixelBackground from "./PixelBackground";
import { useEffect, useState } from "react";

interface ContactSectionProps {
  theme: string;
}

// Caracteres aleatorios para el efecto hacker
const baseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Usado para la generación aleatoria

// Componente para una sola letra con efecto hacker
const HackerLetter = ({ letter }: { letter: string }) => {
  const [isAnimating, setIsAnimating] = useState(true);
  const [displayChar, setDisplayChar] = useState(letter);
  
  useEffect(() => {
    if (letter === " ") {
      setIsAnimating(false);
      return;
    }
    
    let interval: NodeJS.Timeout;
    let counter = 0;
    // Menos iteraciones para un efecto más sutil
    const maxIterations = 8 + Math.floor(Math.random() * 7); // Entre 8-14 iteraciones
    
    if (isAnimating) {
      interval = setInterval(() => {
        counter++;
        if (counter >= maxIterations) {
          setDisplayChar(letter);
          setIsAnimating(false);
          clearInterval(interval);
        } else {
          // Solo caracteres del mismo tipo (letras o números)
          const isLetter = /[A-Z]/.test(letter);
          const isNumber = /[0-9]/.test(letter);
          
          let randomChars;
          if (isLetter) {
            randomChars = baseChars.slice(0, 26); // Solo letras
          } else if (isNumber) {
            randomChars = baseChars.slice(26); // Solo números
          } else {
            randomChars = letter; // Mantener caracteres especiales sin cambios
          }
          
          // A medida que avanzamos, aumenta la probabilidad de mostrar la letra correcta
          const showCorrectChar = Math.random() < (counter / maxIterations);
          setDisplayChar(showCorrectChar ? letter : randomChars[Math.floor(Math.random() * randomChars.length)]);
        }
      }, 45); // Más rápido para un efecto más sutil
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [letter, isAnimating]);
  
  return <span>{letter === " " ? "\u00A0" : displayChar}</span>;
};

// Componente para una línea de texto con efecto hacker
const HackerText = ({ text, className }: { text: string; className: string }) => {
  const [key, setKey] = useState(0);
  
  // Reiniciar la animación con menos frecuencia
  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prev => prev + 1);
    }, 20000); // Cada 20 segundos (antes 10 segundos)
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className={className}>
      {text.split("").map((char, i) => (
        <HackerLetter 
          key={`${key}-${i}`} 
          letter={char} 
        />
      ))}
    </div>
  );
};

export default function ContactSection({ theme }: ContactSectionProps) {
  return (
    <section 
      id="contact" 
      className={`w-full h-screen ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F7F7F7]'} relative overflow-hidden`}
    >
      {/* Fondo de píxeles */}
      <PixelBackground theme={theme} />
      
      {/* Contenedor para el texto y botones - posicionado abajo a la izquierda */}
      <div className="absolute bottom-0 left-0 w-full px-[30px] pb-[60px] z-10">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px] w-full">
          {/* Contenedor de texto - 8 columnas */}
          <div className="col-span-4 md:col-span-8">
            <div className={`space-y-4 p-6 md:p-12 rounded-lg ${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-md w-full h-full`}>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <HackerText 
                  text="ASSEMBLY BS.AS"
                  className="text-[32px] md:text-[96px] leading-[0.75] tracking-[-0.03em] text-[#ff4b4b] whitespace-nowrap scotch-display"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Link href="mailto:INFO@ASM.STUDIO">
                  <HackerText 
                    text="INFO@ASM.STUDIO"
                    className="block text-[32px] md:text-[96px] leading-[0.75] tracking-[-0.03em] text-[#ff4b4b] hover:opacity-80 transition-opacity whitespace-nowrap scotch-display"
                  />
                </Link>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <Link 
                  href="https://wa.me/5491140753025"
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <HackerText 
                    text="+54 911 4075 3025"
                    className="block text-[32px] md:text-[96px] leading-[0.75] tracking-[-0.03em] text-[#ff4b4b] hover:opacity-80 transition-opacity whitespace-nowrap scotch-display"
                  />
                </Link>
              </motion.div>
            </div>
          </div>
          
          {/* Botones - 4 columnas restantes */}
          <div className="hidden md:flex md:col-span-4 flex-col gap-4 h-full">
            <motion.button
              className={`flex-1 rounded-lg ${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-md hover:bg-[#ff4b4b]/20 flex items-center justify-center transition-colors duration-300`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#ff4b4b] text-[32px] font-normal scotch-display">GET IN TOUCH</span>
            </motion.button>
            
            <motion.button
              className={`flex-1 rounded-lg ${theme === 'dark' ? 'bg-black/30' : 'bg-white/30'} backdrop-blur-md hover:bg-[#ff4b4b]/20 flex items-center justify-center transition-colors duration-300`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-[#ff4b4b] text-[32px] font-normal scotch-display">VIEW PROJECTS</span>
            </motion.button>
          </div>
        </div>
      </div>
    </section>
  );
} 