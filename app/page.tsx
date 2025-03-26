"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import HeroNew from "./components/HeroNew";

export default function Home() {
  const [splashScreenFinished, setSplashScreenFinished] = useState(false);
  const [theme, setTheme] = useState('dark');

  // Función para alternar el tema
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Guardar la preferencia en localStorage
    localStorage.setItem('theme', newTheme);
    // Aplicar clase al elemento html/body para cambios globales
    document.documentElement.className = newTheme;
  };

  // Efecto para recuperar el tema del localStorage al cargar
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.className = savedTheme;
    }
  }, []);

  return (
    <div className={`h-screen overflow-hidden transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#212122] text-white' : 'bg-[#f4f4f5] text-[#212122]'
    }`}>
      {!splashScreenFinished && (
        <SplashScreen onFinish={() => setSplashScreenFinished(true)} />
      )}

      <AnimatePresence>
        {splashScreenFinished && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col h-screen"
          >
            {/* Navbar Component */}
            <Navbar theme={theme} setTheme={setTheme} />

            {/* Hero Section - ahora ocupa el resto de la pantalla correctamente */}
            <div className="flex-1">
              <HeroNew theme={theme} toggleTheme={toggleTheme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
