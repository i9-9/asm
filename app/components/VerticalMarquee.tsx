"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function VerticalMarquee() {
  return (
    <div className="relative h-screen overflow-hidden">
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
        className="flex flex-col"
      >
        {/* Repetimos el SVG varias veces para crear un efecto más continuo */}
        {[...Array(4)].map((_, index) => (
          <Image
            key={index}
            src="/marquee-vertical/marqueevertical.svg"
            alt="Vertical Marquee"
            width={100}
            height={400}
            className="w-full"
          />
        ))}
      </motion.div>
    </div>
  );
} 