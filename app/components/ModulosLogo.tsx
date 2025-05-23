"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { logoPathsData } from "./logoPathsData";

interface ModulosLogoProps {
  theme: string;
  isOverPixelBackground?: boolean;
}

// Definir el tipo para los patrones de onda
type WavePattern = () => void;

interface WavePatterns {
  horizontalWave: WavePattern;
  verticalWave: WavePattern;
  diagonalWave: WavePattern;
  doubleWave: WavePattern;
  sinusoidalWave: WavePattern;
}

export default function ModulosLogo({ theme, isOverPixelBackground = false }: ModulosLogoProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [activeModules, setActiveModules] = useState<string[]>([]);
  
  const isMounted = useRef(true);
  const timeoutsRef = useRef<number[]>([]);
  const patternIndexRef = useRef(0);
  const patternsRef = useRef<WavePatterns | null>(null);
  
  const columns = 20;
  const rows = 8;
  
  // Colores para diferentes estados y condiciones
  const colors = {
    default: theme === 'light' ? "#DB4C40" : "#DB4C40",    // Color normal (rojo)
    white: "#F3F1E4",                                      // Blanco puro
    highlight: theme === 'light' ? "#202021" : "#F3F1E4",  // Color de resaltado según tema
  };
  
  // Determinar los colores a usar basado en la posición
  const moduleColor = isOverPixelBackground ? colors.white : colors.default;
  const highlightColor = isOverPixelBackground ? colors.default : colors.highlight;
  
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  // Función para ejecutar un patrón
  const executePattern = useCallback((patternObj: WavePatterns) => {
    if (!isMounted.current) return;
    
    clearAllTimeouts();
    
    const keys = Object.keys(patternObj) as Array<keyof WavePatterns>;
    const nextIndex = Math.floor(Math.random() * keys.length);
    patternIndexRef.current = nextIndex;
    
    const patternFunction = patternObj[keys[patternIndexRef.current]];
    patternFunction();
  }, [clearAllTimeouts]);

  // Función para programar la siguiente animación
  const scheduleNextAnimation = useCallback((delay: number = 1500) => {
    const repeatTimeout = window.setTimeout(() => {
      if (isMounted.current && patternsRef.current) {
        executePattern(patternsRef.current);
      }
    }, delay);
    
    timeoutsRef.current.push(repeatTimeout);
  }, [executePattern]);

  // Definimos los patrones
  useEffect(() => {
    // Definición de patrones
    const patterns: WavePatterns = {
      horizontalWave: () => {
        const modulesPerColumn = Math.ceil(logoPathsData.length / columns);
        
        const animateWave = (colIndex: number) => {
          if (!isMounted.current || colIndex >= columns) {
            scheduleNextAnimation(1500);
            return;
          }
          
          const startIdx = colIndex * modulesPerColumn;
          const endIdx = Math.min(startIdx + modulesPerColumn, logoPathsData.length);
          const columnModules = logoPathsData.slice(startIdx, endIdx).map(m => m.id);
          
          setActiveModules(columnModules);
          
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateWave(colIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        animateWave(0);
      },
      
      verticalWave: () => {
        const moduleMatrix: string[][] = Array(rows).fill(0).map(() => Array(columns).fill(''));
        
        logoPathsData.forEach((module, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          if (row < rows && col < columns) {
            moduleMatrix[row][col] = module.id;
          }
        });
        
        const animateRow = (rowIndex: number) => {
          if (!isMounted.current || rowIndex >= rows) {
            scheduleNextAnimation(1500);
            return;
          }
          
          const rowModules = moduleMatrix[rowIndex].filter(id => id !== '');
          
          setActiveModules(rowModules);
          
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateRow(rowIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        animateRow(0);
      },
      
      diagonalWave: () => {
        const moduleMatrix: string[][] = Array(rows).fill(0).map(() => Array(columns).fill(''));
        
        logoPathsData.forEach((module, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          if (row < rows && col < columns) {
            moduleMatrix[row][col] = module.id;
          }
        });
        
        const totalDiagonals = rows + columns - 1;
        
        const animateDiagonal = (diagIndex: number) => {
          if (!isMounted.current || diagIndex >= totalDiagonals) {
            scheduleNextAnimation(1500);
            return;
          }
          
          const diagModules: string[] = [];
          
          for (let i = 0; i <= diagIndex; i++) {
            const row = i;
            const col = diagIndex - i;
            
            if (row < rows && col < columns && row >= 0 && col >= 0) {
              const moduleId = moduleMatrix[row][col];
              if (moduleId) {
                diagModules.push(moduleId);
              }
            }
          }
          
          setActiveModules(diagModules);
          
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateDiagonal(diagIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        animateDiagonal(0);
      },
      
      doubleWave: () => {
        // Implementation of double wave pattern
        const modulesPerColumn = Math.ceil(logoPathsData.length / columns);
         
        const animateDoubleWave = (startCol: number) => {
          if (!isMounted.current || startCol >= columns) {
            scheduleNextAnimation(1500);
            return;
          }
           
          const waveModules: string[] = [];
           
          for (let c = startCol; c < Math.min(startCol + 2, columns); c++) {
            const startIdx = c * modulesPerColumn;
            const endIdx = Math.min(startIdx + modulesPerColumn, logoPathsData.length);
             
            logoPathsData.slice(startIdx, endIdx).forEach(module => {
              waveModules.push(module.id);
            });
          }
           
          setActiveModules(waveModules);
           
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
           
          timeoutsRef.current.push(clearTimeout);
           
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateDoubleWave(startCol + 2);
            }
          }, 200);
           
          timeoutsRef.current.push(nextTimeout);
        };
         
        animateDoubleWave(0);
      },
      
      sinusoidalWave: () => {
        // Implementation of sinusoidal wave pattern
        const framesCount = 20;
         
        const getSinWaveColumns = (frameIndex: number) => {
          const waveLength = columns;
          const waveModules: string[] = [];
           
          for (let col = 0; col < columns; col++) {
            const phase = (col + frameIndex) % waveLength;
            const sinValue = Math.sin((phase / waveLength) * Math.PI * 2);
             
            if (sinValue > 0.3) {
              const startIdx = col * Math.ceil(logoPathsData.length / columns);
              const endIdx = Math.min(startIdx + Math.ceil(logoPathsData.length / columns), logoPathsData.length);
               
              logoPathsData.slice(startIdx, endIdx).forEach(module => {
                waveModules.push(module.id);
              });
            }
          }
           
          return waveModules;
        };
         
        const animateFrame = (frameIndex: number) => {
          if (!isMounted.current || frameIndex >= framesCount) {
            scheduleNextAnimation(1500);
            return;
          }
           
          const waveModules = getSinWaveColumns(frameIndex);
           
          setActiveModules(waveModules);
           
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateFrame(frameIndex + 1);
            }
          }, 150);
           
          timeoutsRef.current.push(nextTimeout);
        };
         
        animateFrame(0);
      }
    };

    // Asignamos los patrones al ref
    patternsRef.current = patterns;

    // Iniciar animación cuando se monte el componente
    if (patternsRef.current) {
      executePattern(patternsRef.current);
    }

    return () => {
      isMounted.current = false;
      clearAllTimeouts();
    };
  }, [clearAllTimeouts, columns, executePattern, rows, scheduleNextAnimation]);

  // Estilo adicional para el SVG cuando está sobre PixelBackground
  const svgStyle = {};

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      className="w-full h-full"
      viewBox="0 0 10201 1962"
      preserveAspectRatio="xMidYMid meet"
      style={svgStyle}
    >
      <g clipPath="url(#clip0_519_279)">
        {logoPathsData.map((pathData) => {
          // Determine the fill color based on hover state or animation
          const isHovered = hoveredModule === pathData.id;
          const isActive = activeModules.includes(pathData.id);
          const fill = isHovered || isActive ? highlightColor : moduleColor;
          
          return (
            <motion.path
              key={pathData.id}
              d={pathData.path}
              fill={fill}
              onMouseEnter={() => setHoveredModule(pathData.id)}
              onMouseLeave={() => setHoveredModule(null)}
              className="cursor-pointer transition-colors duration-200"
            />
          );
        })}
        
        <defs>
          <clipPath id="clip0_519_279">
            <path fill="#fff" d="M0 0h10201v1962H0z" />
          </clipPath>
        </defs>
      </g>
    </motion.svg>
  );
} 