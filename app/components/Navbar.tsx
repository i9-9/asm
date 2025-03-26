"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

// Añadir esta interfaz de props
interface NavbarProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

export default function Navbar({ theme, setTheme }: NavbarProps) {
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Elementos de contacto para animación secuencial
  const contactItems = [
    "+ info@modulos.com",
    "+ 54 11 1234-5678",
    "+ Buenos Aires, Argentina"
  ];

  return (
    <>
      <motion.nav
        className="w-full px-[30px] py-6 z-50 relative"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid grid-cols-12 gap-[20px] items-center">
          {/* Logo en primera columna - tamaño aumentado significativamente */}
          <div className="col-span-2">
            <Link href="/" className="block">
              <Image 
                src="/logo/modulos.svg"
                alt="Módulos Logo"
                width={160}
                height={33}
                priority
              />
            </Link>
          </div>
          
          {/* Espacio vacío */}
          <div className="col-span-5"></div>
          
          {/* Buenos Aires Information - Alineado a la izquierda */}
          <div className="col-span-3">
            <div 
              className="text-[17px] leading-tight text-left"
              style={{ color: theme }}
            >
              + Buenos Aires, Argentina<br />
              <span className="text-left">{currentTime}</span>
            </div>
          </div>
          
          {/* Botón de menú */}
          <div className="col-span-2 flex justify-end">
            <button
              onClick={toggleMenu}
              className="relative w-[30px] h-[20px] focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {/* Línea superior */}
              <motion.span
                className="absolute block h-[2px] w-full rounded-sm"
                style={{ backgroundColor: theme }}
                initial={{ top: 0 }}
                animate={{ 
                  top: isMenuOpen ? "50%" : 0,
                  rotate: isMenuOpen ? 45 : 0,
                  translateY: isMenuOpen ? "-50%" : 0
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Línea central */}
              <motion.span
                className="absolute block h-[2px] w-full rounded-sm"
                style={{ 
                  backgroundColor: theme,
                  top: "50%",
                  transform: "translateY(-50%)" 
                }}
                initial={{ opacity: 1 }}
                animate={{ opacity: isMenuOpen ? 0 : 1 }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Línea inferior */}
              <motion.span
                className="absolute block h-[2px] w-full rounded-sm"
                style={{ backgroundColor: theme }}
                initial={{ bottom: 0 }}
                animate={{ 
                  bottom: isMenuOpen ? "50%" : 0,
                  rotate: isMenuOpen ? -45 : 0,
                  translateY: isMenuOpen ? "50%" : 0
                }}
                transition={{ duration: 0.2 }}
              />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mega Menu - Cambiado a inglés */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="fixed inset-0 bg-[#202021] z-40 overflow-y-auto"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-[30px] py-6 grid grid-cols-12 gap-[20px] min-h-screen">
              {/* Navegación principal en inglés */}
              <div className="col-span-4 pt-24">
                <h2 className="text-2xl font-bold mb-8" style={{ color: theme }}>NAVIGATION</h2>
                <ul className="space-y-4">
                  {['Home', 'About', 'Services', 'Portfolio', 'Contact'].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.1 }}
                    >
                      <Link 
                        href="#" 
                        className="text-3xl font-medium text-white hover:text-opacity-80 transition-colors"
                        style={{ color: theme }}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Servicios destacados en inglés */}
              <div className="col-span-4 pt-24">
                <h2 className="text-2xl font-bold mb-8" style={{ color: theme }}>SERVICES</h2>
                <ul className="space-y-3">
                  {['UX/UI Design', 'Web Development', 'Branding', 'Consulting', 'Digital Marketing'].map((item, i) => (
                    <motion.li 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                    >
                      <Link 
                        href="#" 
                        className="text-xl transition-colors hover:opacity-80"
                        style={{ color: theme, opacity: 0.8 }}
                      >
                        {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
              
              {/* Información de contacto en inglés - Con animación secuencial */}
              <div className="col-span-4 pt-24">
                <h2 className="text-2xl font-bold mb-8" style={{ color: theme }}>CONTACT</h2>
                <ul className="space-y-4">
                  {contactItems.map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.5 }}
                      style={{ color: theme, opacity: 0.8 }}
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
                
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="flex space-x-4 mt-8"
                >
                  {[
                    { icon: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z", delay: 0.9 },
                    { icon: "M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z", delay: 1.0 },
                    { icon: "M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84", delay: 1.1 },
                  ].map((social, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: social.delay }}
                    >
                      <Link href="#" style={{ color: theme }} className="hover:opacity-80 transition-opacity">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                          <path fillRule="evenodd" d={social.icon} clipRule="evenodd"></path>
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 