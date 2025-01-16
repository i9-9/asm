"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dots from "./components/Dots";
import Image from "next/image";

const menuItems = ["PROJECTS", "SERVICES", "TOOLS", "CONTACT"];

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* First Section */}
      <div className="relative w-screen h-screen">
        <div className="absolute inset-0">
          <Dots />
        </div>
        <div className="relative z-10 p-5 text-white">
          <Image src="/logo/logo.svg" alt="Logo" width={355} height={74} />

          {/* Hamburger Menu Icon or Cross Icon */}
          <div
            className="absolute right-5 top-5 z-50 cursor-pointer"
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
                className="absolute top-0 right-0 w-full bg-gray-800 p-2 rounded-b-lg bg-secondary"
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{
                  duration: 0.3,
                  ...(isMenuOpen
                    ? {}
                    : { delay: (menuItems.length + 1) * 0.2 }),
                }}
              >
                <motion.div
                  className="grid grid-cols-3 gap-4"
                  initial={{
                    opacity: 0,
                    x: -50,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -50,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Menu Items Column 1 (Li 1 and 2) */}
                  <motion.ul
                    className="list-none p-0 m-0 col-span-3 sm:col-span-1"
                    initial={{
                      opacity: 0,
                      x: -50,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -50,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {menuItems.slice(0, 2).map((item, index) => (
                      <motion.li
                        key={item}
                        className="font-suisse uppercase text-[68px] text-primary p-2 hover:text-accent transition-all duration-700 cursor-pointer"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -50,
                          transition: { duration: 0 },
                        }} // Instant exit animation
                        transition={{ duration: 0.3, delay: index * 0.2 }}
                      >
                        {item}
                      </motion.li>
                    ))}
                  </motion.ul>

                  {/* Menu Items Column 2 (Li 3 and 4) */}
                  <motion.ul
                    className="list-none p-0 m-0 col-span-3 sm:col-span-1"
                    initial={{
                      opacity: 0,
                      x: -50,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -50,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    {menuItems.slice(2).map((item, index) => (
                      <motion.li
                        key={item}
                        className="font-suisse uppercase text-[68px] text-primary p-2 hover:text-accent transition-all duration-700 cursor-pointer"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{
                          opacity: 0,
                          x: -50,
                          transition: { duration: 0 },
                        }} // Instant exit animation
                        transition={{ duration: 0.3, delay: index * 0.2 }}
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

        {/* Rectangle at Bottom Left Corner */}
        <div className="absolute bottom-10 left-10 w-[800px] h-8 bg-secondary z-10 rounded-md">
          <div className="flex py-1 px-3 justify-between">
            <p className="text-primary">ASSEMBLY</p>
            <p className="text-primary">BS. AS. ARG</p>
            <p className="text-primary">ZONE 3</p>
            <p className="text-primary">2025</p>
          </div>
        </div>
      </div>

      {/* Second Section */}
<div className="relative w-screen h-screen">
  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
    <h2 className="text-4xl font-bold text-white">
      At ASM, design and development come together to create unique digital
      experiences. We build high-quality websites and e-commerce platforms,
      integrating with tools like Shopify and Tienda Nube. Our focus is on
      delivering functional, expressive solutions for brands through a
      professional, straightforward approach.
    </h2>
  </div>
</div>

{/* Hamburger Menu */}
<div className="relative z-10 p-5 text-white">
  <div
    className="absolute right-5 top-5 z-50 cursor-pointer"
    onClick={toggleMenu}
  >
    <img
      src={isMenuOpen ? "/icons/cross.svg" : "/icons/hamburger.svg"}
      alt={isMenuOpen ? "Close Menu" : "Menu"}
    />
  </div>
</div>
