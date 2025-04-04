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
  const [isOverPixelBackground, setIsOverPixelBackground] = useState(false);
  
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

  // Detectar scroll y presencia sobre la sección de contacto
  useEffect(() => {
    const handleScroll = () => {
      // Detectar si hemos scrolleado lo suficiente para mostrar el logo
      const isScrolled = window.scrollY > 100;
      
      // Detectar específicamente si estamos sobre la sección de contacto
      const contactSection = document.getElementById('contact');
      let isOverContact = false;
      
      if (contactSection) {
        const contactRect = contactSection.getBoundingClientRect();
        const navbarHeight = 60; // Altura aproximada del navbar
        
        // Estamos sobre la sección de contacto cuando:
        // 1. La parte superior de la sección está por encima de la parte inferior del navbar
        // 2. La parte inferior de la sección está visible en la ventana
        isOverContact = contactRect.top < navbarHeight && contactRect.bottom > 0;
      }
      
      setScrolled(isScrolled);
      setIsOverPixelBackground(isOverContact);
    };

    window.addEventListener('scroll', handleScroll);
    // Inicializar estados
    handleScroll();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const menuItems = [
    { href: '#about-section', label: 'About' },
    { href: '#selected-works', label: 'Selected Works' },
    { href: '#contact', label: 'Contact' }
  ];
  
  // Para el botón del menú, necesitamos colores de fondo y texto específicos
  const menuButtonClasses = isOverPixelBackground
    ? `${theme === 'dark' ? 'bg-[#202021] text-white' : 'bg-[#F0F0F0] text-black'} border border-[#ff4b4b] px-4 py-2 rounded-[8px]`
    : 'text-[#ff4b4b] border border-[#ff4b4b] px-4 py-2 rounded-[8px]';

  return (
    <>
      <motion.nav
        className={`w-full px-[30px] py-3 fixed top-0 left-0 right-0 ${
          isMenuOpen ? 'z-50 bg-opacity-100' : 'z-40 bg-opacity-0'
        } ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F0F0F0]'} transition-colors transition-opacity duration-300`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px] items-center">
          {/* Reservamos siempre espacio para el logo para evitar layout shift */}
          <div className="col-span-1 md:col-span-2 min-h-[40px] relative">
            <AnimatePresence>
              {(scrolled || isMenuOpen) && (
                <motion.div 
                  className="absolute inset-0 origin-left"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ModulosLogo theme={theme} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Espacio flexible */}
          <div className="hidden md:block md:col-span-6"></div>
          
          {/* Contact Information - ocupa 2 columnas en mobile, 3 en desktop */}
          <div className="col-span-2 md:col-span-3">
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1 md:gap-2">
                <div className="relative w-2 h-2 mt-[2px]">
                  <div className={`absolute w-2 h-2 bg-[#DB4C40] rounded-full transition-colors duration-300`}></div>
                  <div className={`absolute w-2 h-2 bg-[#DB4C40] rounded-full animate-ping opacity-75 transition-colors duration-300`}></div>
                </div>
                <span className={`text-xs md:text-[17px] text-[#ff4b4b] transition-colors duration-300 truncate`}>+ Buenos Aires, Argentina</span>
              </div>
              <div className={`text-xs md:text-[17px] text-[#ff4b4b] ml-4 transition-colors duration-300`}>
                {currentTime}
              </div>
            </div>
          </div>
          
          {/* Botón de menú - 1 columna en ambos */}
          <div className="col-span-1 flex justify-end">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${menuButtonClasses} text-sm md:text-base whitespace-nowrap hover:bg-[#ff4b4b] hover:text-[${theme === 'dark' ? '#202021' : '#F0F0F0'}] transition-colors duration-300`}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mega Menu - actualizado para usar 4 columnas en mobile */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className={`fixed inset-0 z-30 ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F0F0F0]'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="px-[30px] pt-40 pb-20">
              {/* Grid de 4 columnas para mobile, 12 para desktop */}
              <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px]">
                {/* Navegación - todas las columnas en mobile, 6 en desktop */}
                <div className="col-span-4 md:col-span-6 mb-8 md:mb-0">
                  <h2 className="text-[#ff4b4b] text-2xl md:text-3xl font-bold mb-6 transition-colors duration-300">Menu</h2>
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
                            if (item.href.startsWith('#')) {
                              e.preventDefault();
                              setIsMenuOpen(false);
                              document.body.style.overflow = 'unset';
                              setTimeout(() => {    
                                const section = document.getElementById(item.href.substring(1));
                                if (section) {
                                  section.scrollIntoView({ 
                                    behavior: 'smooth',
                                    block: 'start'
                                  });
                                }
                              }, 300);
                            }
                          }}
                          className="text-xl md:text-2xl text-[#ff4b4b] hover:opacity-80 transition-opacity transition-colors duration-300"
                        >
                          {item.label}
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Contact section in mega menu */}
                <div className="col-span-4 md:col-span-6">
                  <h2 className="text-[#ff4b4b] text-2xl md:text-3xl font-bold mb-6 transition-colors duration-300">Contact</h2>
                  <ul className="space-y-3">
                    <motion.li 
                      className="text-lg md:text-xl text-[#ff4b4b] transition-colors duration-300"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <Link href="mailto:INFO@ASM.STUDIO" className="hover:opacity-80 transition-opacity">
                        INFO@ASM.STUDIO
                      </Link>
                    </motion.li>
                    <motion.li 
                      className="text-lg md:text-xl text-[#ff4b4b] transition-colors duration-300"
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