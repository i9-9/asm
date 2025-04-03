"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface PixelProps {
  theme: string;
}

interface Pixel {
  left: number;
  top: number;
  size: number;
  pattern: string;
  delay: number;
  colorMode: string;
  colorDelay: number;
}

const PixelBackground = ({ theme }: PixelProps) => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [currentPattern, setCurrentPattern] = useState<string>("");
  
  const colors = {
    red: "#ff4b4b",
    white: "#FFFFFF",
    black: theme === 'dark' ? "#202021" : "#202021"
  };
  
  useEffect(() => {
    const patterns = [
      "wave",
      "alternate",
      "pulse",
      "radial",
    ];
    
    // Iniciar con un patrón aleatorio
    if (!currentPattern) {
      setCurrentPattern(patterns[Math.floor(Math.random() * patterns.length)]);
    }
    
    // Cambiar el patrón cada 20 segundos
    const patternInterval = setInterval(() => {
      const newPattern = patterns[Math.floor(Math.random() * patterns.length)];
      setCurrentPattern(newPattern);
      // Regeneramos los círculos para el nuevo patrón
      setPixels([]);
    }, 20000); // 20 segundos
    
    return () => clearInterval(patternInterval);
  }, []);
  
  useEffect(() => {
    if (pixels.length > 0 || !currentPattern) return;
    
    const generateCircles = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      // Drásticamente reducimos el tamaño y espaciado para muchos más círculos
      const circleSize = 12; // Círculos aún más pequeños
      const spacing = 25;   // Espaciado mucho menor
      
      // Calculamos el área disponible
      const availableWidth = windowWidth;
      const availableHeight = windowHeight;
      
      // Calculamos cuántas columnas y filas caben (ahora muchas más)
      const columns = Math.floor(availableWidth / spacing);
      const rows = Math.floor(availableHeight / spacing);
      
      // Calculamos el centrado exacto
      const totalPatternWidth = columns * spacing;
      const totalPatternHeight = rows * spacing;
      
      // Offset para centrar perfectamente el patrón en la pantalla
      const horizontalOffset = (windowWidth - totalPatternWidth) / 2;
      const verticalOffset = (windowHeight - totalPatternHeight) / 2;
      
      const newPixels: Pixel[] = [];
      
      // Modos de color para los círculos individuales
      const colorModes = ["redWhite", "blackWhite", "redBlack"];
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          // Posición exacta de cada círculo
          const centerX = horizontalOffset + (x * spacing) + (spacing / 2);
          const centerY = verticalOffset + (y * spacing) + (spacing / 2);
          
          // Calculamos distancias para los patrones
          const centerDistX = x - (columns / 2);
          const centerDistY = y - (rows / 2);
          const distFromCenter = Math.sqrt(centerDistX * centerDistX + centerDistY * centerDistY);
          
          // Delay para el patrón principal
          let delay = 0;
          
          switch (currentPattern) {
            case "wave":
              delay = (x * 0.05) + (y * 0.05);
              break;
            case "alternate":
              delay = (x + y) % 2 === 0 ? 0 : 0.3;
              break;
            case "pulse":
              delay = distFromCenter * 0.1;
              break;
            case "radial":
              const cornerDist = Math.sqrt(x * x + y * y);
              delay = cornerDist * 0.1;
              break;
          }
          
          // Para no sobrecargar el rendimiento
          if (Math.random() > 0.2) {
            // Asignar un modo de color aleatorio a cada círculo
            const colorMode = colorModes[Math.floor(Math.random() * colorModes.length)];
            
            // Delay independiente para el cambio de color
            // Más largo para que sea independiente del patrón principal
            const colorDelay = Math.random() * 10; // Entre 0 y 10 segundos
            
            newPixels.push({
              left: centerX - (circleSize / 2),
              top: centerY - (circleSize / 2),
              size: circleSize,
              pattern: currentPattern,
              delay: delay,
              colorMode: colorMode,
              colorDelay: colorDelay
            });
          }
        }
      }
      
      setPixels(newPixels);
    };
    
    generateCircles();
    
    const handleResize = () => setPixels([]);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [theme, colors, currentPattern]);
  
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      {pixels.map((pixel, index) => {
        // Animación del patrón principal
        let patternAnimation;
        
        switch (pixel.pattern) {
          case "wave":
            patternAnimation = {
              scale: [1, 1.1, 1],
            };
            break;
          case "alternate":
            patternAnimation = {
              scale: [1, 1.05, 1],
            };
            break;
          case "pulse":
            patternAnimation = {
              scale: [1, 1.2, 1],
            };
            break;
          case "radial":
            patternAnimation = {
              scale: [1, 1.15, 1],
            };
            break;
          default:
            patternAnimation = {
              scale: [1, 1.1, 1],
            };
        }
        
        // Colores independientes por círculo
        let colorAnimation;
        switch (pixel.colorMode) {
          case "redWhite":
            colorAnimation = {
              backgroundColor: [colors.red, colors.white, colors.red],
            };
            break;
          case "blackWhite":
            colorAnimation = {
              backgroundColor: [colors.black, colors.white, colors.black],
            };
            break;
          case "redBlack":
            colorAnimation = {
              backgroundColor: [colors.red, colors.black, colors.red],
            };
            break;
          default:
            colorAnimation = {
              backgroundColor: [colors.black, colors.red, colors.black],
            };
        }
        
        return (
          <motion.div
            key={`${pixel.pattern}-${index}`}
            style={{
              position: 'absolute',
              left: `${pixel.left}px`,
              top: `${pixel.top}px`,
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              borderRadius: '50%',
              backgroundColor: colors.black,
              aspectRatio: '1/1',
              display: 'block',
              overflow: 'hidden'
            }}
            // Combinamos ambas animaciones
            animate={{
              ...patternAnimation,
              ...colorAnimation
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
              delay: pixel.pattern === "alternate" ? pixel.delay : pixel.colorDelay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default PixelBackground;