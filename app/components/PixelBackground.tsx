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
}

const PixelBackground = ({ theme }: PixelProps) => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  
  const colors = {
    red: "#ff4b4b",
    white: "#FFFFFF",
    black: theme === 'dark' ? "#202021" : "#202021"
  };
  
  useEffect(() => {
    if (pixels.length > 0) return;
    
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
      
      const patterns = [
        "wave",
        "alternate",
        "pulse",
        "radial",
      ];
      
      const chosenPattern = patterns[Math.floor(Math.random() * patterns.length)];
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          // Posición exacta de cada círculo
          const centerX = horizontalOffset + (x * spacing) + (spacing / 2);
          const centerY = verticalOffset + (y * spacing) + (spacing / 2);
          
          // Calculamos distancias para los patrones
          const centerDistX = x - (columns / 2);
          const centerDistY = y - (rows / 2);
          const distFromCenter = Math.sqrt(centerDistX * centerDistX + centerDistY * centerDistY);
          
          let delay = 0;
          
          switch (chosenPattern) {
            case "wave":
              delay = (x * 0.05) + (y * 0.05); // Delays más compactos
              break;
            case "alternate":
              delay = (x + y) % 2 === 0 ? 0 : 0.3; // Delays más cortos
              break;
            case "pulse":
              delay = distFromCenter * 0.1; // Delays más cortos
              break;
            case "radial":
              const cornerDist = Math.sqrt(x * x + y * y);
              delay = cornerDist * 0.1; // Delays más cortos
              break;
          }
          
          // Para no sobrecargar el rendimiento, aplicamos una probabilidad
          // de incluir cada círculo (esto reduce la densidad pero mantiene el patrón)
          if (Math.random() > 0.2) { // 80% de probabilidad de incluir cada círculo
            newPixels.push({
              left: centerX - (circleSize / 2),
              top: centerY - (circleSize / 2),
              size: circleSize,
              pattern: chosenPattern,
              delay: delay,
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
  }, [theme, colors]);
  
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      {pixels.map((pixel, index) => {
        // Animaciones simplificadas con solo colores plenos
        let animation;
        
        switch (pixel.pattern) {
          case "wave":
            animation = {
              backgroundColor: [colors.black, colors.red, colors.black],
            };
            break;
          case "alternate":
            animation = {
              backgroundColor: [colors.black, colors.white, colors.black],
            };
            break;
          case "pulse":
            animation = {
              backgroundColor: [colors.black, colors.red, colors.black],
              scale: [1, 1.2, 1],
            };
            break;
          case "radial":
            animation = {
              backgroundColor: [colors.red, colors.black, colors.red],
            };
            break;
          default:
            animation = {
              backgroundColor: [colors.black, colors.red, colors.black],
            };
        }
        
        return (
          <motion.div
            key={index}
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
            animate={animation}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 1.5,
              delay: pixel.delay,
              ease: "easeInOut",
            }}
          />
        );
      })}
    </div>
  );
};

export default PixelBackground;