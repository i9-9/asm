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
  colorDelay: number;
  distFromCenter: number;
}

const PixelBackground = ({ theme }: PixelProps) => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [currentPattern, setCurrentPattern] = useState<string>("");
  
  const colors = {
    red: "#ff4b4b",
    black: theme === 'dark' ? "#202021" : "#202021",
  };
  
  useEffect(() => {
    const patterns = [
      "radar",
      "wave",
      "ripple",
      "sweep",
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
  }, [currentPattern]);
  
  useEffect(() => {
    if (pixels.length > 0 || !currentPattern) return;
    
    const generateCircles = () => {
      const windowHeight = window.innerHeight;
      const windowWidth = window.innerWidth;
      
      const circleSize = 12;
      const spacing = 25;
      
      // Calculamos el área disponible
      const availableWidth = windowWidth;
      const availableHeight = windowHeight;
      
      // Calculamos cuántas columnas y filas caben
      const columns = Math.floor(availableWidth / spacing);
      const rows = Math.floor(availableHeight / spacing);
      
      // Calculamos el centrado exacto
      const totalPatternWidth = columns * spacing;
      const totalPatternHeight = rows * spacing;
      
      // Offset para centrar perfectamente el patrón en la pantalla
      const horizontalOffset = (windowWidth - totalPatternWidth) / 2;
      const verticalOffset = (windowHeight - totalPatternHeight) / 2;
      
      // Calculamos el centro de la pantalla para efectos radiales
      const centerX = windowWidth / 2;
      const centerY = windowHeight / 2;
      
      const newPixels: Pixel[] = [];
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          // Posición exacta de cada círculo
          const pixelCenterX = horizontalOffset + (x * spacing) + (spacing / 2);
          const pixelCenterY = verticalOffset + (y * spacing) + (spacing / 2);
          
          // Calculamos distancias para los patrones radiales
          const dx = pixelCenterX - centerX;
          const dy = pixelCenterY - centerY;
          const distFromCenter = Math.sqrt(dx * dx + dy * dy);
          
          // Calculamos ángulo desde el centro para efectos barrido
          const angle = Math.atan2(dy, dx) * (180 / Math.PI);
          
          // Delay para el patrón principal
          let delay = 0;
          
          switch (currentPattern) {
            case "radar":
              // Barrido circular, como un radar
              delay = ((angle + 180) / 360) * 3; // Barrido completo en 3 segundos
              break;
            case "wave":
              // Onda desde el centro
              delay = distFromCenter * 0.001; // Retardo basado en distancia
              break;
            case "ripple":
              // Ondas concéntricas
              delay = (distFromCenter % 200) * 0.005; // Múltiples anillos
              break;
            case "sweep":
              // Barrido horizontal
              delay = (pixelCenterX / windowWidth) * 2; // Barrido en 2 segundos
              break;
          }
          
          // Para no sobrecargar el rendimiento
          if (Math.random() > 0.2) {
            // Delay independiente para el cambio de color
            const colorDelay = Math.random() * 10; // Entre 0 y 10 segundos
            
            newPixels.push({
              left: pixelCenterX - (circleSize / 2),
              top: pixelCenterY - (circleSize / 2),
              size: circleSize,
              pattern: currentPattern,
              delay: delay,
              colorDelay: colorDelay,
              distFromCenter: distFromCenter
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
  }, [currentPattern, theme]);
  
  return (
    <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
      {pixels.map((pixel, index) => {
        // Animación del patrón principal - enfocada en efectos tipo radar
        let patternAnimation;
        
        switch (pixel.pattern) {
          case "radar":
            // Efecto de barrido con escala
            patternAnimation = {
              scale: [1, 1.3, 1],
              opacity: [1, 0.7, 1],
            };
            break;
          case "wave":
            // Onda expandiéndose
            patternAnimation = {
              scale: [1, 1.2, 1],
            };
            break;
          case "ripple":
            // Pulsaciones concéntricas
            patternAnimation = {
              scale: [1, 1.5, 1],
            };
            break;
          case "sweep":
            // Barrido horizontal
            patternAnimation = {
              scale: [1, 1.3, 1],
            };
            break;
          default:
            patternAnimation = {
              scale: [1, 1.2, 1],
            };
        }
        
        // Alternando entre rojo y negro para todos los círculos
        const colorAnimation = {
          backgroundColor: [colors.black, colors.red, colors.black],
        };
        
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
            animate={{
              ...patternAnimation,
              ...colorAnimation
            }}
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