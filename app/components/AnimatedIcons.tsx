"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnimatedIconsProps {
  theme: string;
}

export default function AnimatedIcons({ theme }: AnimatedIconsProps) {
  const [currentIcon, setCurrentIcon] = useState(0);
  const icons = ['/icons2/Group 50.svg', '/icons2/Group 51.svg', '/icons2/Group 54.svg'];
  const colors = ['#DB4C40', '#ff4b4b', '#EE3C36'];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIcon((prev) => (prev + 1) % icons.length);
    }, 1500);

    return () => clearInterval(interval);
  }, [icons.length]);

  const variants = {
    enter: {
      opacity: 0,
    },
    center: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    },
    exit: {
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div className="absolute bottom-8 right-8">
      <div className="relative w-40 h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIcon}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0"
          >
            <svg
              width="160"
              height="160"
              viewBox="0 0 160 160"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g>
                <path
                  d="M80 0L160 40V120L80 160L0 120V40L80 0Z"
                  fill={colors[currentIcon]}
                />
                <path
                  d="M80 20L140 50V110L80 140L20 110V50L80 20Z"
                  fill={theme === 'dark' ? '#202021' : '#F3F1E4'}
                />
                <path
                  d="M80 40L120 60V100L80 120L40 100V60L80 40Z"
                  fill={colors[(currentIcon + 1) % colors.length]}
                />
              </g>
            </svg>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 