"use client";

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const TOTAL_COLUMNS = 45;
const WAVE_DELAY = 10; // seconds between waves
const COLUMN_TRANSITION_DURATION = 0.25; // seconds for each column to transition
const DELAY_BETWEEN_COLUMNS = 0.05; // seconds between consecutive column animations

interface AnimatedModularLogoProps {
  theme?: string;
}

export default function AnimatedModularLogo({ theme = 'dark' }: AnimatedModularLogoProps) {
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Base color based on theme
  const baseColor = theme === 'light' ? "#C43931" : "#DB4C40";
  const highlightColor = "#FFFFFF";
  
  // Initialize the animation cycle
  useEffect(() => {
    // Function to animate one complete wave
    const animateWave = () => {
      setIsAnimating(true);
      
      // Animate through each column
      for (let i = 0; i < TOTAL_COLUMNS; i++) {
        setTimeout(() => {
          setActiveColumn(i);
          
          // If this is the last column, prepare for the next wave
          if (i === TOTAL_COLUMNS - 1) {
            setTimeout(() => {
              setActiveColumn(null);
              setIsAnimating(false);
              
              // Schedule the next wave after the pause
              setTimeout(() => {
                animateWave();
              }, WAVE_DELAY * 1000);
            }, COLUMN_TRANSITION_DURATION * 1000);
          }
        }, i * DELAY_BETWEEN_COLUMNS * 1000);
      }
    };
    
    // Start the first animation cycle after initial delay
    const initialTimer = setTimeout(() => {
      animateWave();
    }, WAVE_DELAY * 1000);
    
    // Cleanup
    return () => {
      clearTimeout(initialTimer);
    };
  }, []);
  
  // Generate the columns of dots
  const renderColumns = () => {
    const columns = [];
    
    for (let colIndex = 0; colIndex < TOTAL_COLUMNS; colIndex++) {
      // Each column has a random number of dots between 3 and 8
      const dotCount = Math.floor(Math.random() * 6) + 3;
      const dots = [];
      
      for (let dotIndex = 0; dotIndex < dotCount; dotIndex++) {
        // Determine if this column is currently being animated
        const isActive = activeColumn === colIndex;
        
        dots.push(
          <motion.div
            key={`dot-${colIndex}-${dotIndex}`}
            className="w-3 h-3 rounded-full mb-2"
            style={{ 
              backgroundColor: isActive ? highlightColor : baseColor,
              transition: `background-color ${COLUMN_TRANSITION_DURATION}s ease-in-out`
            }}
          />
        );
      }
      
      columns.push(
        <div 
          key={`column-${colIndex}`} 
          className="flex flex-col items-center mx-1"
        >
          {dots}
        </div>
      );
    }
    
    return columns;
  };
  
  return (
    <div className="w-full flex items-center justify-center overflow-hidden">
      <div className="flex flex-row flex-wrap justify-center">
        {renderColumns()}
      </div>
    </div>
  );
} 