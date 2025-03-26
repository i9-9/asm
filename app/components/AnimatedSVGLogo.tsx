"use client";

import { useEffect, useState } from 'react';

const TOTAL_COLUMNS = 45;
const WAVE_DELAY = 10; // seconds between waves
const COLUMN_TRANSITION_DURATION = 0.25; // seconds for each column to transition
const DELAY_BETWEEN_COLUMNS = 0.05; // seconds between consecutive column animations

interface AnimatedSVGLogoProps {
  theme?: string;
}

export default function AnimatedSVGLogo({ theme = 'dark' }: AnimatedSVGLogoProps) {
  const [activeColumn, setActiveColumn] = useState<number | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);
  
  // Base color based on theme
  const baseColor = theme === 'light' ? "#C43931" : "#DB4C40";
  const highlightColor = "#FFFFFF";
  
  // Group SVG paths by their column
  // This would be based on your actual SVG paths
  const getColumnPaths = () => {
    // This is an example - you'd replace this with your own SVG paths
    const columns = [];
    
    for (let i = 0; i < TOTAL_COLUMNS; i++) {
      columns.push([
        // Paths that belong to column i
        // Each path would have an ID like `path-${i}-${j}`
      ]);
    }
    
    return columns;
  };
  
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
  
  // Change the color of each path based on the active column
  useEffect(() => {
    if (activeColumn === null) {
      // Reset all paths to base color
      for (let i = 0; i < TOTAL_COLUMNS; i++) {
        const pathElements = document.querySelectorAll(`[data-column="${i}"]`);
        pathElements.forEach(path => {
          (path as SVGPathElement).style.fill = baseColor;
          (path as SVGPathElement).style.transition = `fill ${COLUMN_TRANSITION_DURATION}s ease-in-out`;
        });
      }
    } else {
      // Highlight the active column
      const pathElements = document.querySelectorAll(`[data-column="${activeColumn}"]`);
      pathElements.forEach(path => {
        (path as SVGPathElement).style.fill = highlightColor;
      });
    }
  }, [activeColumn, baseColor, highlightColor]);
  
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1000 500"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* This is where you would include your actual SVG paths */}
        {/* Each path would have an attribute data-column="X" to identify its column */}
        
        {/* Example path (replace with your actual paths) */}
        <path 
          d="M100,100 L150,100 L150,150 L100,150 Z" 
          data-column="0"
          fill={baseColor} 
        />
        
        {/* More paths here... */}
      </svg>
    </div>
  );
} 