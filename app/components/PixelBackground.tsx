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
  initialColor: string;
  id: string;
}

const PixelBackground = ({ theme }: PixelProps) => {
  const [pixels, setPixels] = useState<Pixel[]>([]);
  const [currentPattern, setCurrentPattern] = useState<string>("");
  
  const colors = {
    red: "#ff4b4b",
    black: "#202021",
    white: "#F0F0F0",
  };
  
  // Determinar colores basados en el tema
  const primaryColor = colors.red;
  const secondaryColor = theme === 'dark' ? colors.black : colors.white;
  
  // Manejar el cambio de patrones
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
    }, 20000); // 20 segundos
    
    return () => clearInterval(patternInterval);
  }, []);
  
  // Generar píxeles
  useEffect(() => {
    // Salir si ya tenemos píxeles o no hay patrón seleccionado
    if (pixels.length > 0 || !currentPattern) return;
    
    // Esperar a que el DOM esté completamente cargado
    if (typeof window === 'undefined') return;
    
    const generateCircles = () => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;
      
      // Ajustes específicos para dispositivos móviles
      const isMobile = windowWidth < 768;
      const circleSize = isMobile ? 6 : 10; // Círculos más pequeños para ahorrar recursos
      
      // Mantenemos un espaciado que permita apreciar los patrones
      const spacing = isMobile ? 28 : 35;
      
      // Calculamos cuántas columnas y filas caben
      const columns = Math.floor(windowWidth / spacing);
      const rows = Math.floor(windowHeight / spacing);
      
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
      
      // Ajustamos densidad por patrón - algunos patrones necesitan más píxeles para ser visibles
      let baseSkipProb;
      let centerDensityBoost;
      
      switch (currentPattern) {
        case "radar":
          // El radar necesita mayor densidad angular
          baseSkipProb = isMobile ? 0.5 : 0.3;
          centerDensityBoost = 0.25;
          break;
        case "wave": 
          // Las ondas necesitan ser más densas para verse bien
          baseSkipProb = isMobile ? 0.45 : 0.25;
          centerDensityBoost = 0.4;
          break;
        case "ripple":
          // Los anillos necesitan buena distribución radial
          baseSkipProb = isMobile ? 0.5 : 0.3;
          centerDensityBoost = 0.35;
          break;
        case "sweep":
          // El barrido necesita densidad horizontal
          baseSkipProb = isMobile ? 0.5 : 0.3;
          centerDensityBoost = 0.25;
          break;
        default:
          baseSkipProb = isMobile ? 0.55 : 0.35;
          centerDensityBoost = 0.3;
      }
      
      // Crear mapa de coordenadas para garantizar distribución uniforme
      const coordMap = new Map();
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          // Posición exacta de cada círculo
          const pixelCenterX = horizontalOffset + (x * spacing) + (spacing / 2);
          const pixelCenterY = verticalOffset + (y * spacing) + (spacing / 2);
          
          // Calculamos distancias para los patrones radiales
          const dx = pixelCenterX - centerX;
          const dy = pixelCenterY - centerY;
          const distFromCenter = Math.sqrt(dx * dx + dy * dy);
          
          // Normalizamos la distancia al centro (0-1 donde 0 es el centro y 1 es la esquina más lejana)
          const maxPossibleDist = Math.sqrt(windowWidth * windowWidth / 4 + windowHeight * windowHeight / 4);
          const normalizedDist = distFromCenter / maxPossibleDist;
          
          // Calculamos ángulo desde el centro para efectos barrido (0-360)
          const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 180; // +180 para tener valores 0-360
          
          // Patrones de delay ajustados para cada tipo
          let delay = 0;
          let skipModifier = 0; // Modificador para skip probability basado en el patrón
          
          switch (currentPattern) {
            case "radar":
              // Barrido angular, sectores más definidos
              delay = (angle / 360) * 4; // Completa rotación en 4 segundos
              
              // Hacemos que algunos sectores angulares tengan más densidad (cada 30 grados)
              const sectorAngle = Math.floor(angle / 30) * 30;
              skipModifier = (angle - sectorAngle < 10) ? -0.2 : 0; // Más densidad en estos sectores
              break;
              
            case "wave":
              // Ondas que salen desde el centro, más evidentes
              delay = (distFromCenter / maxPossibleDist) * 3; // Más lento
              
              // Aumentar densidad en ciertas distancias para crear anillos más evidentes
              const normalizedWaveDist = (distFromCenter % (spacing * 3)) / (spacing * 3);
              skipModifier = (normalizedWaveDist < 0.3) ? -0.3 : 0; // Más densidad en estas distancias
              break;
              
            case "ripple":
              // Múltiples anillos concéntricos
              delay = ((distFromCenter % (spacing * 4)) / (spacing * 4)) * 2;
              
              // Mayor densidad en los bordes de cada anillo
              const ringPosition = (distFromCenter % (spacing * 4)) / (spacing * 4);
              skipModifier = (ringPosition > 0.4 && ringPosition < 0.6) ? -0.25 : 0;
              break;
              
            case "sweep":
              // Barrido horizontal más definido
              delay = (pixelCenterX / windowWidth) * 3; // 3 segundos de lado a lado
              
              // Densidad variable horizontalmente para formar líneas verticales
              const normalizedX = (pixelCenterX % (spacing * 4)) / (spacing * 4);
              skipModifier = (normalizedX < 0.2) ? -0.3 : 0; // Líneas verticales más definidas
              break;
          }
          
          // Base probability ajustada según el patrón
          const skipProbability = baseSkipProb + (normalizedDist * centerDensityBoost) + skipModifier;
          
          // Para evitar efectos de patrón demasiado regulares
          const jitter = spacing * 0.1; // 10% de aleatoriedad
          const jitteredX = pixelCenterX + (Math.random() * jitter * 2 - jitter);
          const jitteredY = pixelCenterY + (Math.random() * jitter * 2 - jitter);
          
          if (Math.random() > skipProbability) {
            // Color inicial - preferimos más píxeles primarios para los patrones
            // Esto hace que los patrones sean más visibles
            const initialColor = Math.random() > 0.4 ? primaryColor : secondaryColor;
            
            newPixels.push({
              left: jitteredX - (circleSize / 2),
              top: jitteredY - (circleSize / 2),
              size: circleSize,
              pattern: currentPattern,
              delay: delay,
              initialColor: initialColor,
              id: `pixel-${x}-${y}`
            });
            
            // Guardamos coordenada para evitar superposición
            coordMap.set(`${x}-${y}`, true);
          }
        }
      }
      
      setPixels(newPixels);
    };
    
    // Llamamos a la función para generar los círculos
    generateCircles();
    
    // Regeneramos cuando cambie el tamaño de la pantalla
    const handleResize = () => {
      setPixels([]);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, [currentPattern, pixels.length]);
  
  return (
    <div 
      className="absolute inset-0 w-full h-full" 
      style={{ 
        zIndex: 0,
        backgroundColor: theme === 'dark' ? colors.black : colors.white
      }}
    >
      {pixels.map((pixel) => {
        // Animaciones personalizadas por patrón para hacerlos más distinguibles
        let scaleValues;
        let colorAnimation;
        
        // Duración base para cada patrón
        let duration;
        
        switch (pixel.pattern) {
          case "radar":
            // Radar tiene animación más pronunciada en escala
            scaleValues = [1, 1.25, 1];
            // Más contrastante en colores para el radar
            colorAnimation = {
              backgroundColor: [
                pixel.initialColor,
                pixel.initialColor === primaryColor ? secondaryColor : primaryColor,
                pixel.initialColor
              ]
            };
            duration = 4;
            break;
            
          case "wave":
            // Para ondas, escalado más suave pero pulsante
            scaleValues = [1, 1.15, 1];
            // Transición de color más larga para wave
            colorAnimation = {
              backgroundColor: [
                pixel.initialColor,
                pixel.initialColor === primaryColor ? secondaryColor : primaryColor,
                pixel.initialColor === primaryColor ? secondaryColor : primaryColor,
                pixel.initialColor
              ]
            };
            duration = 5;
            break;
            
          case "ripple":
            // Anillos con expansión más dramática
            scaleValues = [1, 1.3, 1];
            // Color estándar para ripple
            colorAnimation = {
              backgroundColor: [
                pixel.initialColor,
                pixel.initialColor === primaryColor ? secondaryColor : primaryColor,
                pixel.initialColor
              ]
            };
            duration = 3.5; // Más rápido para el efecto de ondas
            break;
            
          case "sweep":
            // Barrido con animación horizontal
            scaleValues = [1, 1.2, 1];
            // Efecto de resplandor para sweep
            colorAnimation = {
              backgroundColor: [
                pixel.initialColor,
                pixel.initialColor === primaryColor ? secondaryColor : primaryColor,
                pixel.initialColor
              ],
              opacity: [1, 0.8, 1]
            };
            duration = 4.5;
            break;
            
          default:
            scaleValues = [1, 1.1, 1];
            colorAnimation = {
              backgroundColor: [
                pixel.initialColor,
                pixel.initialColor === primaryColor ? secondaryColor : primaryColor,
                pixel.initialColor
              ]
            };
            duration = 4;
        }
        
        return (
          <motion.div
            key={pixel.id}
            style={{
              position: 'absolute',
              left: `${pixel.left}px`,
              top: `${pixel.top}px`,
              width: `${pixel.size}px`,
              height: `${pixel.size}px`,
              borderRadius: '50%',
              backgroundColor: pixel.initialColor,
              aspectRatio: '1/1',
              willChange: 'transform, background-color', // Optimización de rendimiento
            }}
            animate={{
              scale: scaleValues,
              ...colorAnimation
            }}
            transition={{
              repeat: Infinity,
              repeatType: "loop",
              duration: duration,
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