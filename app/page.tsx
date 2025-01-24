"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dots from "./components/Dots";
import Modulos from "../public/logo/modulos.svg";
import Image from "next/image";
import Icon1 from "./components/icons/icon1";
import Icon2 from "./components/icons/icon2";
import Icon3 from "./components/icons/icon3";
import Icon4 from "./components/icons/icon4";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [hoveredCircle, setHoveredCircle] = useState<number | null>(null); // Track hovered circle

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = ["Projects", "Services", "Tools", "Contact"];

  return (
    <div>
      {/* First Section */}
      <div className="relative w-screen h-screen">
        <div className="absolute inset-0">
          <Dots />
        </div>
        <div className="relative z-10 p-5 text-white">
          {/* Logo Outside Menu */}
          <div>
            <Image src={Modulos} alt="My icon" width={500} height={500} />
          </div>

          {/* Hamburger Menu */}
          <div
            className="absolute right-10 top-10 z-50 cursor-pointer fixed"
            onClick={toggleMenu}
          >
            <img
              src={isMenuOpen ? "/icons/cross.svg" : "/icons/hamburger.svg"}
              alt={isMenuOpen ? "Close Menu" : "Menu"}
            />
          </div>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                className="absolute top-0 right-0 w-full bg-gray-800 p-5 bg-secondary rounded-b-lg"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Parent Container */}
                <motion.div className="grid grid-cols-3 gap-4">
                  {/* First Column - Logo */}
                  <motion.div className="flex justify-center items-start">
                    <Image
                      src={Modulos}
                      alt="My icon"
                      width={600}
                      height={600}
                    />
                  </motion.div>

                  {/* Second Column - First Two Menu Items */}
                  <motion.ul className="list-none p-0 m-0 flex flex-col">
                    {menuItems.slice(0, 2).map((item, index) => (
                      <motion.li
                        key={item}
                        className="font-suisse uppercase text-[68px] text-primary p-2 hover:text-accent transition-all duration-700 cursor-pointer"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{
                          duration: 0.3,
                          exit: { duration: 0 },
                          delay: index * 0.2,
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Third Column - Last Two Menu Items */}
                  <motion.ul className="list-none p-0 m-0 flex flex-col">
                    {menuItems.slice(2, 4).map((item, index) => (
                      <motion.li
                        key={item}
                        className="font-suisse uppercase text-[68px] text-primary p-2 hover:text-accent transition-all duration-700 cursor-pointer"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{
                          duration: 0.3,
                          exit: { duration: 0 },
                          delay: index * 0.2,
                        }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Additional sections */}
      <div className="relative w-screen h-screen bg-dark">
        <div className="absolute top-0 left-0 p-8">
          <motion.div
            initial={{ filter: "blur(20px)" }}
            animate={{ filter: "blur(0px)" }}
            transition={{ duration: 1, delay: 0 }}
          >
            <h2 className="text-4xl font-helvetica tracking-[-0.03em] text-[53px] leading-[72px] text-left text-primary">
              At ASM, design and development come together to create
              unique digital experiences. <br /> <br /> We build high-quality
              websites and e-commerce platforms, integrating with tools like
              Shopify and Tienda Nube. <br /> Our focus is on delivering
              functional, expressive solutions for brands through a
              professional, straightforward approach.
            </h2>
          </motion.div>
          <div className="mt-8 flex justify-start items-center space-x-32">
            <motion.div
              className="w-48 h-48 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <Icon1 />
            </motion.div>

            <motion.div
              className="w-48 h-48 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <Icon2 />
            </motion.div>

            <motion.div
              className="w-48 h-48 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              <Icon3 />
            </motion.div>

            <motion.div
              className="w-48 h-48 text-primary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.6 }}
            >
              <Icon4 />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Us section */}

      <div className="relative w-screen h-screen bg-dark">
        <div className="absolute top-0 left-0 p-8">
          <h2 className="font-bold text-primary text-6xl tracking-tighter">
            US
          </h2>
        </div>
        <div className="absolute bottom-0 left-0 p-8">
          <Image src={Modulos} alt="My icon" width={1000} height={1000} />
        </div>
      </div>

      {/* Location section */}

      <div className="relative w-screen h-screen bg-dark">
        <div className="absolute top-0 left-0 p-8">
        </div>
        <div className="absolute bottom-0 left-0 p-8">
          <h3 className="leading-[120px] font-scotch-display text-primary text-[140px]">ASSEMBLY BS.AS <br/> INFO@ASM.STUDIO <br/> +54 911 4075 3025</h3>
        </div>
      </div>
    </div>
  );
}
