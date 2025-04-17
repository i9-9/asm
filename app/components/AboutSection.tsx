"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import VerticalMarquee from "./VerticalMarquee";

interface AboutSectionProps {
  theme: string;
}

const AnimatedCharacter = ({ char, progress }: { char: string; progress: MotionValue<number> }) => (
  <motion.span
    className="inline-block text-[#ff4b4b]"
    style={{ opacity: progress }}
  >
    {char === ' ' ? '\u00A0' : char}
  </motion.span>
);

const AnimatedLine = ({ text }: { text: string }) => {
  const lineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: lineRef,
    offset: ["start center", "end center"]
  });

  const progressValues = useTransform(
    scrollYProgress,
    [0, 1],
    [0, 1]
  );

  const characters = text.split('');

  return (
    <div ref={lineRef} className="overflow-hidden md:whitespace-nowrap">
      {characters.map((char, i) => (
        <AnimatedCharacter 
          key={i} 
          char={char} 
          progress={progressValues} 
        />
      ))}
    </div>
  );
};

export default function AboutSection({ theme }: AboutSectionProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Texto organizado para mobile y desktop
  const text1Mobile = [
    "Creative agency that",
    "builds bespoke,",
    "high-performance digital",
    "experiences. We dismantle",
    "the limitations of",
    "templated platforms with",
    "precision-engineered,",
    "API-driven, and",
    "custom-coded solutions."
  ];

  const text2Mobile = [
    "Tailored for brands that",
    "refuse to settle. Crafted",
    "for seamless scalability,",
    "intuitive design, and",
    "uncompromising",
    "performance."
  ];

  const text1Desktop = [
    "Creative agency that builds bespoke,",
    "high-performance digital experiences.",
    "We dismantle the limitations of templated",
    "platforms with precision-engineered,",
    "API-driven, and custom-coded solutions."
  ];

  const text2Desktop = [
    "Tailored for brands that refuse to settle.",
    "Crafted for seamless scalability, intuitive",
    "design, and uncompromising performance."
  ];

  const text3 = [
    "ASM: Machinery for the Digital World."
  ];

  return (
    <section 
      id="about-section" 
      className={`w-full h-screen ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F3F1E4]'} relative`}
    >
      <div className="px-[30px] h-full">
        <div className="grid grid-cols-4 md:grid-cols-12 h-full gap-[20px]">
          <div className="hidden md:block md:col-span-2 h-full min-h-[40px] relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <VerticalMarquee className="h-full" />
            </div>
          </div>

          <div className="hidden md:block md:col-span-2"></div>

          <div className="col-span-4 md:col-span-8 py-[60px] h-full flex items-center">
            <div className="w-full">
              <div className="text-[32px] leading-[40px] md:text-[46px] md:leading-[56px] tracking-[-0.03em] mb-6">
                {(isMobile ? text1Mobile : text1Desktop).map((line, i) => (
                  <AnimatedLine key={i} text={line} />
                ))}
              </div>
              <div className="text-[32px] leading-[40px] md:text-[46px] md:leading-[56px] tracking-[-0.03em] mb-12">
                {(isMobile ? text2Mobile : text2Desktop).map((line, i) => (
                  <AnimatedLine key={i} text={line} />
                ))}
              </div>
              <div className="text-[32px] leading-[40px] md:text-[46px] md:leading-[56px] tracking-[-0.03em] font-bold">
                {text3.map((line, i) => (
                  <AnimatedLine key={i} text={line} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 