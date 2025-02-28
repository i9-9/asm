"use client";

import Image from "next/image";
import Tira from "../../public/splash/tira.svg";
import { useState, useEffect } from "react";
import { motion as m } from "framer-motion";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setHidden(true);
        onFinish();
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [onFinish]);

  const stripVariants = (direction: "up" | "down", delay: number = 0) => ({
    initial: {
      y: direction === "down" ? "-120%" : "120%"
    },
    animate: {
      y: [
        direction === "down" ? "-120%" : "120%",
        "0%",
        direction === "down" ? "120%" : "-120%"
      ],
      transition: {
        y: {
          duration: 40,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
          delay: delay
        }
      },
    },
  } as const);

  return (
    <m.div
      className="flex flex-col h-screen items-center justify-center bg-[#202021] z-50 px-10"
      animate={hidden ? { opacity: 0, y: "-100%" } : {}}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Responsive Columns */}
      <m.div className="flex w-full h-full space-x-3 px-8">
        {/* Column 1 - No offset */}
        <m.div className="w-1/4 h-full flex flex-col space-y-3 overflow-hidden">
          <m.div
            className="flex-1"
            variants={stripVariants("down", 0)}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-3">
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
            </div>
          </m.div>
        </m.div>

        {/* Column 2 - Offset down by 20px */}
        <m.div className="w-1/4 h-full flex flex-col space-y-3 overflow-hidden">
          <m.div
            className="flex-1"
            variants={stripVariants("up", 5)}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-3">
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
            </div>
          </m.div>
        </m.div>

        {/* Column 3 - Offset down by 40px */}
        <m.div className="w-1/4 h-full flex flex-col space-y-3 overflow-hidden">
          <m.div
            className="flex-1"
            variants={stripVariants("down", 10)}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-3">
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
            </div>
          </m.div>
        </m.div>

        {/* Column 4 - Offset down by 60px */}
        <m.div className="w-1/4 h-full flex flex-col space-y-3 overflow-hidden">
          <m.div
            className="flex-1"
            variants={stripVariants("up", 15)}
            initial="initial"
            animate="animate"
          >
            <div className="space-y-3">
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
              <Image alt="assembly line" src={Tira} width={344} height={80} />
            </div>
          </m.div>
        </m.div>
      </m.div>
    </m.div>
  );
}
