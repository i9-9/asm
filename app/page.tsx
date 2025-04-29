"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import HeroNew from "./components/HeroNew";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from './components/ContactSection';
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const [splashScreenFinished, setSplashScreenFinished] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [visibleSections, setVisibleSections] = useState({
    navbar: false,
    hero: false,
    about: false,
    projects: false,
    contact: false
  });

  useEffect(() => {
    // Recuperar theme al inicio
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
    
    // Aplicar el theme inmediatamente
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    document.body.style.backgroundColor = savedTheme === 'dark' ? '#202021' : '#F3F1E4';
    document.body.style.color = savedTheme === 'dark' ? '#F3F1E4' : '#202021';
  }, []);

  useEffect(() => {
    // Sincronizar cambios de theme
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('theme', theme);
    document.body.style.backgroundColor = theme === 'dark' ? '#202021' : '#F3F1E4';
    document.body.style.color = theme === 'dark' ? '#F3F1E4' : '#202021';
  }, [theme]);

  useEffect(() => {
    // Sequence appearance of sections after splash screen finishes
    if (splashScreenFinished) {
      // Show navbar immediately
      setVisibleSections(prev => ({ ...prev, navbar: true }));
      
      // Sequence the appearance of other sections
      const timings = {
        hero: 300,
        about: 800,
        projects: 1200,
        contact: 1600
      };
      
      Object.entries(timings).forEach(([section, delay]) => {
        setTimeout(() => {
          setVisibleSections(prev => ({ ...prev, [section]: true }));
        }, delay);
      });
    }
  }, [splashScreenFinished]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen overflow-y-auto transition-colors duration-300 ${theme} scrollbar-hide`}>
      {!splashScreenFinished ? (
        <SplashScreen onFinish={() => setSplashScreenFinished(true)} />
      ) : (
        <>
          <AnimatePresence>
            {visibleSections.navbar && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Navbar theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {visibleSections.hero && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
              >
                <HeroNew theme={theme} toggleTheme={toggleTheme} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {visibleSections.about && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <AboutSection theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {visibleSections.projects && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ProjectsSection theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {visibleSections.contact && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <ContactSection theme={theme} />
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  );
}
