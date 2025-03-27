"use client";

import * as React from "react";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import { logoPathsData } from "./logoPathsData";

interface ModulosLogoProps {
  theme: string;
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

export default function ModulosLogo({ theme }: ModulosLogoProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null);
  const [activeModules, setActiveModules] = useState<string[]>([]);
  
  const isMounted = useRef(true);
  const timeoutsRef = useRef<number[]>([]);
  const patternIndexRef = useRef(0);
  
  const columns = 20;
  const rows = 8;
  
  const moduleColor = theme === 'light' ? "#C43931" : "#DB4C40";
  const highlightColor = "#FFFFFF";
  
  const clearAllTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(timeoutId => clearTimeout(timeoutId));
    timeoutsRef.current = [];
  }, []);

  // Crear una función auxiliar para ejecutar el siguiente patrón
  const executePattern = useCallback((patterns: WavePatterns, keys: Array<keyof WavePatterns>) => {
    if (!isMounted.current) return;
    
    clearAllTimeouts();
    
    const nextIndex = Math.floor(Math.random() * keys.length);
    patternIndexRef.current = nextIndex;
    
    const patternFunction = patterns[keys[patternIndexRef.current]];
    patternFunction();
  }, [clearAllTimeouts]);

  // Definir wavePatterns con tipo explícito
  const { patterns, patternKeys } = useMemo<{ 
    patterns: WavePatterns; 
    patternKeys: Array<keyof WavePatterns>;
  }>(() => {
    const patterns: WavePatterns = {
      horizontalWave: () => {
        // Ya no declaramos totalModules aquí para evitar el warning
        const modulesPerColumn = Math.ceil(logoPathsData.length / columns);
        
        // Animar cada columna con un retraso incremental
        const animateWave = (colIndex: number) => {
          if (!isMounted.current || colIndex >= columns) {
            // Programar la próxima animación después de completar la onda
            const repeatTimeout = window.setTimeout(() => {
              if (isMounted.current) {
                runNextPattern();
              }
            }, 1500);
            
            timeoutsRef.current.push(repeatTimeout);
            return;
          }
          
          // Obtener módulos de esta columna
          const startIdx = colIndex * modulesPerColumn;
          const endIdx = Math.min(startIdx + modulesPerColumn, logoPathsData.length);
          const columnModules = logoPathsData.slice(startIdx, endIdx).map(m => m.id);
          
          // Activar columna
          setActiveModules(columnModules);
          
          // Desactivar después de un tiempo
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          // Programar la siguiente columna
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateWave(colIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        // Iniciar la animación de onda
        animateWave(0);
      },
      
      verticalWave: () => {
        // Estimar la matriz de módulos - sin declarar totalModules que no se usa
        const moduleMatrix: string[][] = Array(rows).fill(0).map(() => Array(columns).fill(''));
        
        // Llenar la matriz con IDs de módulos
        logoPathsData.forEach((module, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          if (row < rows && col < columns) {
            moduleMatrix[row][col] = module.id;
          }
        });
        
        // Animar cada fila con un retraso incremental
        const animateRow = (rowIndex: number) => {
          if (!isMounted.current || rowIndex >= rows) {
            // Programar la próxima animación después de completar la onda
            const repeatTimeout = window.setTimeout(() => {
              if (isMounted.current) {
                runNextPattern();
              }
            }, 1500);
            
            timeoutsRef.current.push(repeatTimeout);
            return;
          }
          
          // Obtener módulos de esta fila, filtrando IDs vacíos
          const rowModules = moduleMatrix[rowIndex].filter(id => id !== '');
          
          // Activar fila
          setActiveModules(rowModules);
          
          // Desactivar después de un tiempo
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          // Programar la siguiente fila
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateRow(rowIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        // Iniciar la animación de onda
        animateRow(0);
      },
      
      diagonalWave: () => {
        // Estimar la matriz de módulos - sin declarar totalModules que no se usa
        const moduleMatrix: string[][] = Array(rows).fill(0).map(() => Array(columns).fill(''));
        
        // Llenar la matriz con IDs de módulos
        logoPathsData.forEach((module, index) => {
          const row = Math.floor(index / columns);
          const col = index % columns;
          if (row < rows && col < columns) {
            moduleMatrix[row][col] = module.id;
          }
        });
        
        // Total de diagonales posibles
        const totalDiagonals = rows + columns - 1;
        
        // Animar cada diagonal con un retraso incremental
        const animateDiagonal = (diagIndex: number) => {
          if (!isMounted.current || diagIndex >= totalDiagonals) {
            // Programar la próxima animación después de completar la onda
            const repeatTimeout = window.setTimeout(() => {
              if (isMounted.current) {
                runNextPattern();
              }
            }, 1500);
            
            timeoutsRef.current.push(repeatTimeout);
            return;
          }
          
          // Obtener módulos de esta diagonal
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
          
          // Activar diagonal
          setActiveModules(diagModules);
          
          // Desactivar después de un tiempo
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          // Programar la siguiente diagonal
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateDiagonal(diagIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        // Iniciar la animación de onda diagonal
        animateDiagonal(0);
      },
      
      doubleWave: () => {
        const modulesPerColumn = Math.ceil(logoPathsData.length / columns);
        
        // Animar columnas con un patrón alterno
        const animateDoubleWave = (startCol: number) => {
          if (!isMounted.current || startCol >= columns) {
            // Programar la próxima animación después de completar la onda
            const repeatTimeout = window.setTimeout(() => {
              if (isMounted.current) {
                runNextPattern();
              }
            }, 1500);
            
            timeoutsRef.current.push(repeatTimeout);
            return;
          }
          
          // Obtener módulos de las dos columnas (actual y actual+1)
          const waveModules: string[] = [];
          
          for (let c = startCol; c < Math.min(startCol + 2, columns); c++) {
            const startIdx = c * modulesPerColumn;
            const endIdx = Math.min(startIdx + modulesPerColumn, logoPathsData.length);
            
            logoPathsData.slice(startIdx, endIdx).forEach(module => {
              waveModules.push(module.id);
            });
          }
          
          // Activar columnas
          setActiveModules(waveModules);
          
          // Desactivar después de un tiempo
          const clearTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              setActiveModules([]);
            }
          }, 300);
          
          timeoutsRef.current.push(clearTimeout);
          
          // Programar las siguientes columnas (saltando de 2 en 2)
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateDoubleWave(startCol + 2);
            }
          }, 200);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        // Iniciar la animación con columnas pares
        animateDoubleWave(0);
        
        // Después de terminar, iniciar con columnas impares
        const oddTimeout = window.setTimeout(() => {
          if (isMounted.current) {
            clearAllTimeouts();
            
            // Una breve pausa antes de comenzar las columnas impares
            const pauseTimeout = window.setTimeout(() => {
              if (isMounted.current) {
                animateDoubleWave(1);
              }
            }, 1000);
            
            timeoutsRef.current.push(pauseTimeout);
          }
        }, (columns / 2 + 1) * 200 + 300);
        
        timeoutsRef.current.push(oddTimeout);
      },
      
      sinusoidalWave: () => {
        const framesCount = 20; // Número de "frames" para la animación completa
        
        // Función para simular una onda sinusoidal a través de las columnas
        const getSinWaveColumns = (frameIndex: number) => {
          const waveLength = columns; // Una onda completa a lo largo del logo
          const waveModules: string[] = [];
          
          for (let col = 0; col < columns; col++) {
            // Calcular la fase de esta columna en la onda sinusoidal
            const phase = (col + frameIndex) % waveLength;
            const sinValue = Math.sin((phase / waveLength) * Math.PI * 2);
            
            // Si el valor del seno es positivo (parte superior de la onda), activar la columna
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
        
        // Función para animar un frame de la onda
        const animateFrame = (frameIndex: number) => {
          if (!isMounted.current || frameIndex >= framesCount) {
            // Programar la próxima animación después de completar la onda
            const repeatTimeout = window.setTimeout(() => {
              if (isMounted.current) {
                runNextPattern();
              }
            }, 1500);
            
            timeoutsRef.current.push(repeatTimeout);
            return;
          }
          
          // Obtener columnas para este frame
          const waveModules = getSinWaveColumns(frameIndex);
          
          // Activar el patrón de onda
          setActiveModules(waveModules);
          
          // Programar el siguiente frame
          const nextTimeout = window.setTimeout(() => {
            if (isMounted.current) {
              animateFrame(frameIndex + 1);
            }
          }, 150);
          
          timeoutsRef.current.push(nextTimeout);
        };
        
        // Iniciar la animación de onda sinusoidal
        animateFrame(0);
      }
    };

    return {
      patterns,
      patternKeys: Object.keys(patterns) as Array<keyof WavePatterns>
    };
  }, [isMounted, clearAllTimeouts]);

  // Función para ejecutar el siguiente patrón
  const runNextPattern = useCallback(() => {
    executePattern(patterns, patternKeys);
  }, [executePattern, patterns, patternKeys]);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
      clearAllTimeouts();
    };
  }, [clearAllTimeouts]);

  useEffect(() => {
    if (isMounted.current) {
      runNextPattern();
    }
    return () => {
      clearAllTimeouts();
    };
  }, [runNextPattern, clearAllTimeouts]);

  return (
    <div className="flex items-center justify-center w-full h-full">
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        className="w-full h-full"
        viewBox="0 0 10201 1962"
        preserveAspectRatio="xMidYMid meet"
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
    </div>
  );
} 