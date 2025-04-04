"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface VerticalMarqueeProps {
  className?: string;
}

export default function VerticalMarquee({ className }: VerticalMarqueeProps) {
  return (
    <div className={`w-full h-full flex items-center justify-center ${className || ''}`}>
      <div className="relative w-full h-full overflow-hidden">
        <motion.div
          animate={{
            y: ["-50%", "0%"],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            repeatType: "loop"
          }}
          className="flex flex-col items-center"
        >
          {/* Repetimos el SVG varias veces para crear un efecto más continuo */}
          {[...Array(4)].map((_, index) => (
            <div key={index} className="w-full flex justify-center">
              <Image
                src="/marquee-vertical/marqueevertical.svg"
                alt="Vertical Marquee"
                width={60}  // Reducido para ajustarse al ancho del logo
                height={240}
                className="w-auto"
                style={{ 
                  maxWidth: '100%', 
                  height: 'auto',
                  display: 'block'
                }}
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
} 