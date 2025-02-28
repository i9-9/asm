"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import SplashScreen from "./components/SplashScreen";
import Dots from "./components/Dots";
import Modulos from "../public/logo/modulos.svg";
import Icon1 from "./components/icons/icon1";
import Icon2 from "./components/icons/icon2";
import Icon3 from "./components/icons/icon3";
import Icon4 from "./components/icons/icon4";

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const menuItems = ["Projects", "Services", "Tools", "Contact"];

  return (
    <div className="min-h-screen overflow-y-auto">
      <SplashScreen />

      {/* First Section */}
      <div className="relative w-screen min-h-screen pt-20">
        <div className="absolute inset-0">
          <Dots />
        </div>
        <div className="relative z-10 p-5 text-white">
          {/* Logo Outside Menu */}
          <div>
            <Image src={Modulos} alt="My icon" width={300} height={300} />
          </div>

          {/* Hamburger Menu */}
          <div
            className="absolute right-10 top-10 z-50 cursor-pointer"
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
                className="absolute top-0 right-0 w-full bg-gray-800 p-5 rounded-b-lg overflow-hidden"
                initial={{ scaleY: 0, opacity: 0 }}
                animate={{ scaleY: 1, opacity: 1 }}
                exit={{ scaleY: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <motion.div className="grid grid-cols-3 gap-4">
                  {/* First Column - Logo */}
                  <motion.div className="flex justify-start items-start pt-7 pl-5">
                    <Image src={Modulos} alt="My icon" width={300} height={300} />
                  </motion.div>

                  {/* Second & Third Columns - Menu Items */}
                  {menuItems.map((item, index) => (
                    <motion.div key={index} className="p-2 text-3xl">
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Additional sections */}
      <div className="relative w-screen min-h-screen bg-dark">
        <div className="absolute top-0 left-0 p-8">
          <h2 className="text-4xl text-primary">
            At ASM, design and development come together to create unique digital experiences.
          </h2>
        </div>
      </div>

      {/* Icons Section */}
      <div className="flex space-x-8 justify-center mt-10">
        <Icon1 />
        <Icon2 />
        <Icon3 />
        <Icon4 />
      </div>
    </div>
  );
}
