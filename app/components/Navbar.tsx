"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import ModulosLogo from './ModulosLogo';

// Añadir esta interfaz de props
interface NavbarProps {
  theme: string;
}

export default function Navbar({ theme }: NavbarProps) {
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
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

  useEffect(() => {
    const handleScroll = () => {
      // Podemos ajustar este valor (100) según cuando queremos que aparezca el logo
      const isScrolled = window.scrollY > window.innerHeight;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#about-section', label: 'About' },
    { href: '#selected-works', label: 'Selected Works' },
    { href: '#contact', label: 'Contact' }
  ];

  return (
    <>
      <motion.nav
        className={`w-full px-[30px] py-3 fixed top-0 left-0 right-0 ${
          isMenuOpen ? 'z-50' : 'z-40'
        } ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F7F7F7]'} transition-colors duration-300`}
      >
        <div className="grid grid-cols-12 gap-[20px] items-center">
          {/* Logo */}
          <AnimatePresence>
            {(scrolled || isMenuOpen) && (
              <motion.div 
                className="col-span-3 md:col-span-2 scale-125 md:scale-100 origin-left"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ModulosLogo theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Espacio flexible */}
          <div className={`${(scrolled || isMenuOpen) ? 'col-span-2 md:col-span-7' : 'col-span-5 md:col-span-9'} transition-all duration-300`}></div>
          
          {/* Contact Information */}
          <div className="col-span-6 md:col-span-2">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2">
                <div className="relative w-2 h-2 mt-[2px]">
                  <div className="absolute w-2 h-2 bg-[#DB4C40] rounded-full"></div>
                  <div className="absolute w-2 h-2 bg-[#DB4C40] rounded-full animate-ping opacity-75"></div>
                </div>
                <span className="text-xs md:text-[17px] text-[#DB4C40]">+ Buenos Aires, Argentina</span>
              </div>
              <div className="text-xs md:text-[17px] text-[#DB4C40] ml-4">
                {currentTime}
              </div>
            </div>
          </div>
          
          {/* Botón de menú */}
          <div className="col-span-1 flex justify-end">
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
            <div className="px-[30px] pt-40 pb-20">
              {/* Menú simplificado con items en rojo */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Navegación */}
                <div>
                  <h2 className="text-[#DB4C40] text-2xl md:text-3xl font-bold mb-6">Menu</h2>
                  <ul className="space-y-4">
                    {menuItems.map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link 
                          href={item.href}
                          onClick={(e) => {
                            if (item.href === '#selected-works') {
                              e.preventDefault();
                              setIsMenuOpen(false); // Primero cerramos el menú
                              document.body.style.overflow = 'unset'; // Aseguramos que el scroll esté habilitado
                              setTimeout(() => {    
                                const section = document.getElementById('selected-works');
                                if (section) {
                                  section.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              }, 300); // Aumentamos el delay a 300ms
                            }
                          }}
                          className="text-xl md:text-2xl text-[#DB4C40] hover:opacity-80 transition-opacity"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Contact section in mega menu */}
                <div>
                  <h2 className="text-[#DB4C40] text-2xl md:text-3xl font-bold mb-6">Contact</h2>
                  <ul className="space-y-3">
                    <motion.li 
                      className="text-lg md:text-xl text-[#DB4C40]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link href="mailto:INFO@ASM.STUDIO" className="hover:opacity-80 transition-opacity">
                        INFO@ASM.STUDIO
                      </Link>
                    </motion.li>
                    <motion.li 
                      className="text-lg md:text-xl text-[#DB4C40]"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <Link 
                        href="https://wa.me/5491140753025" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="hover:opacity-80 transition-opacity"
                      >
                        +54 911 4075 3025
                      </Link>
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