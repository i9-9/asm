"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Añadir esta interfaz de props
interface NavbarProps {
  theme: string;
}

export default function Navbar({ theme }: Omit<NavbarProps, 'setTheme'>) {
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Actualizar el reloj en tiempo real - Lógica mejorada y corregida para TypeScript
  useEffect(() => {
    const updateClock = () => {
      // Obtener la hora actual directamente con el locale de Argentina
      const options = { 
        timeZone: 'America/Argentina/Buenos_Aires',
        hour12: false,
        hour: "2-digit" as const,
        minute: "2-digit" as const,
        second: "2-digit" as const
      };
      
      const formatter = new Intl.DateTimeFormat('en-US', options);
      const parts = formatter.formatToParts(new Date());
      
      const hour = parts.find(part => part.type === 'hour')?.value || '00';
      const minute = parts.find(part => part.type === 'minute')?.value || '00';
      const second = parts.find(part => part.type === 'second')?.value || '00';
      
      setCurrentTime(`${hour}:${minute}:${second}`);
    };
    
    // Actualizar inmediatamente al montar
    updateClock();
    
    // Actualizar cada segundo
    const intervalId = setInterval(updateClock, 1000);
    
    // Limpiar intervalo al desmontar
    return () => clearInterval(intervalId);
  }, []);

  // Prevenir scroll cuando el menú está abierto
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.nav
        className={`w-full px-[30px] py-4 md:py-6 fixed top-0 left-0 right-0 ${
          isMenuOpen ? 'z-50' : 'z-40'
        } bg-transparent`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-12 gap-[20px] items-center">
          {/* Logo */}
          <div className="col-span-4 md:col-span-2">
            <Link href="/" className="block">
              <Image 
                src="/logo/modulos.svg"
                alt="Módulos Logo"
                width={200}
                height={41}
                className="w-full"
                priority
              />
            </Link>
          </div>
          
          {/* Espacio vacío */}
          <div className="col-span-3 md:col-span-5"></div>
          
          {/* Buenos Aires Information - Ajustado para mobile con mejor espaciado */}
          <div className="col-span-3">
            <div className="flex items-start md:items-center gap-2">
              {/* LED indicator alineado con la primera línea */}
              <div className="relative w-2 h-2 mt-[5px] md:mt-0">
                <div className="absolute w-2 h-2 bg-[#DB4C40] rounded-full"></div>
                <div className="absolute w-2 h-2 bg-[#DB4C40] rounded-full animate-ping opacity-75"></div>
              </div>
              <div className="text-xs md:text-[17px] text-left text-[#DB4C40] leading-normal md:leading-tight">
                + Buenos Aires, Argentina<br />
                {currentTime}
              </div>
            </div>
          </div>
          
          {/* Botón de menú */}
          <div className="col-span-2 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`
                px-4 py-2 
                ${theme === 'dark' 
                  ? 'bg-[#2E2E2E] text-[#DB4C40]' 
                  : 'bg-[#DB4C40] text-[#F7F7F7]'
                }
                rounded-[4px] 
                text-base 
                font-normal 
                transition-colors
                hover:bg-opacity-90
                focus:outline-none
              `}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mega Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={`fixed inset-0 z-30 ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F7F7F7]'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="px-[30px] py-20">
              {/* Menú simplificado con items en rojo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Navegación */}
                <div>
                  <h2 className="text-[#DB4C40] text-2xl md:text-3xl font-bold mb-6">Menu</h2>
                  <ul className="space-y-4">
                    {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link 
                          href="#" 
                          className="text-xl md:text-2xl text-[#DB4C40] hover:opacity-80 transition-opacity"
                        >
                          {item}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Contacto */}
                <div>
                  <h2 className="text-[#DB4C40] text-2xl md:text-3xl font-bold mb-6">Contact</h2>
                  <ul className="space-y-3">
                    <motion.li 
                      className="text-lg md:text-xl text-[#DB4C40]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      info@modulos.com
                    </motion.li>
                    <motion.li 
                      className="text-lg md:text-xl text-[#DB4C40]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      +54 11 1234-5678
                    </motion.li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 