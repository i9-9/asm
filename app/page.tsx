"use client";

import { useState, useEffect } from "react";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import HeroNew from "./components/HeroNew";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from './components/ContactSection';

export default function Home() {
  const [splashScreenFinished, setSplashScreenFinished] = useState(false);
  const [theme, setTheme] = useState('dark');

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

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className={`min-h-screen overflow-y-auto transition-colors duration-300 ${theme} scrollbar-hide`}>
      {!splashScreenFinished ? (
        <SplashScreen onFinish={() => setSplashScreenFinished(true)} />
      ) : (
        <>
          <Navbar theme={theme} />
          <HeroNew theme={theme} toggleTheme={toggleTheme} />
          <AboutSection theme={theme} />
          <ProjectsSection theme={theme} />
          <ContactSection theme={theme} />
        </>
      )}
    </div>
  );
}
