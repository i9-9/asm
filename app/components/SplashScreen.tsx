"use client";

import Image from "next/image";
import Tira from "../../public/splash/tira.svg";
import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [isLoading, setIsLoading] = useState(true);
  const [hidden, setHidden] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Efecto para detectar cuando la página está completamente cargada
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsLoading(false);
        setTimeout(() => {
          setHidden(true);
          setTimeout(onFinish, 500);
        }, 800);
      }, 800);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, [onFinish]);

  // Constante para el número de imágenes por columna
  const imagesPerColumn = 10;
  
  // Función para renderizar imágenes en una columna
  const renderColumnImages = () => {
    return Array.from({ length: imagesPerColumn }).map((_, index) => (
      <div key={index} className="mb-2">
        <Image 
          alt="assembly line" 
          src={Tira} 
          width={344} 
          height={80} 
          className="w-full"
          priority={true} // Cargar las imágenes con prioridad
        />
      </div>
    ));
  };

  // Configuración de las columnas con velocidades MÁS LENTAS
  const columns = isMobile 
    ? [
        { direction: "down", duration: 60 },  // Columna 1: hacia abajo - más lento
        { direction: "up", duration: 65 },    // Columna 2: hacia arriba - más lento
      ]
    : [
        { direction: "down", duration: 60 },  // Columna 1: hacia abajo - más lento
        { direction: "up", duration: 65 },    // Columna 2: hacia arriba - más lento
        { direction: "down", duration: 70 },  // Columna 3: hacia abajo - más lento
        { direction: "up", duration: 75 }     // Columna 4: hacia arriba - más lento
      ];

  return (
    <m.div
      className="fixed inset-0 flex flex-col items-center justify-center bg-[#202021] z-50 px-2 md:px-4"
      animate={hidden ? { opacity: 0, y: "-100%" } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Responsive Columns */}
      <m.div className="flex w-full h-screen gap-2 md:gap-3">
        {columns.map((column, columnIndex) => (
          <m.div 
            key={columnIndex} 
            className={`${isMobile ? 'w-1/2' : 'w-1/4'} h-full flex flex-col overflow-hidden`}
          >
            <div className="flex-1 relative overflow-hidden">
              {/* Contenedor principal que se anima */}
              <div className="absolute inset-0 flex flex-col">
                {/* Primera copia */}
                <m.div
                  className="flex flex-col"
                  initial={{ 
                    y: column.direction === "down" ? "-50%" : "-50%" 
                  }}
                  animate={{ 
                    y: column.direction === "down" ? "-150%" : "50%" 
                  }}
                  transition={{
                    duration: isLoading ? column.duration : 3,
                    repeat: Infinity,
                    repeatType: "loop", 
                    ease: "linear"
                  }}
                >
                  {renderColumnImages()}
                  {renderColumnImages()}
                </m.div>

                {/* Segunda copia para continuidad */}
                <m.div
                  className="flex flex-col"
                  initial={{ 
                    y: column.direction === "down" ? "50%" : "-150%" 
                  }}
                  animate={{ 
                    y: column.direction === "down" ? "-50%" : "-50%"
                  }}
                  transition={{
                    duration: isLoading ? column.duration : 3,
                    repeat: Infinity,
                    repeatType: "loop",
                    ease: "linear"
                  }}
                >
                  {renderColumnImages()}
                  {renderColumnImages()}
                </m.div>
              </div>
            </div>
          </m.div>
        ))}
      </m.div>
    </m.div>
  );
}
