"use client";

import { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Link from 'next/link';

// Define TypeScript interfaces for project data
interface Concept {
  id: string;
  title: string;
}

interface ProjectSection {
  title: string;
  description: string;
}

interface ProjectData {
  title: string;
  stack: string;
  duration: string;
  year: string;
  services: string;
  client: ProjectSection;
  aim: ProjectSection;
  concepts: Concept[];
  images: string[];
  heroImage: string;
  mobileImages: string;
}

interface ProjectPageProps {
  data: ProjectData;
}

export default function ProjectPage({ data }: ProjectPageProps) {
  // State for accordion
  const [openConcept, setOpenConcept] = useState<string | null>(null);

  // Toggle concept accordion
  const toggleConcept = (id: string) => {
    if (openConcept === id) {
      setOpenConcept(null);
    } else {
      setOpenConcept(id);
    }
  };

  // Sequence for staggered animations
  const containerAnimation = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  };

  return (
    <div className="bg-[#1A1A1A] text-[#DB4C40] min-h-screen">
      <Navbar theme="dark" />
      
      {/* Main content */}
      <div className="w-full px-[30px]">
        {/* Title */}
        <motion.h1 
          className="text-6xl md:text-8xl lg:text-9xl mb-48 pt-32 font-normal"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {data.title}
        </motion.h1>

        {/* Two column layout for information and Live Site button */}
        <div className="grid grid-cols-12 gap-x-5 mb-36">
          {/* Left column for Live Site button */}
          <div className="col-span-6 md:col-span-6 flex items-end">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-8 md:mb-0"
            >
              <Link href="https://kostume.com" target="_blank" rel="noopener noreferrer">
                <div className="bg-[#DB4C40] text-white py-3 px-6 rounded-[8px] inline-block font-bold">
                  Live Site
                </div>
              </Link>
            </motion.div>
          </div>

          {/* Right column for info */}
          <motion.div 
            className="col-span-12 md:col-span-6"
            variants={containerAnimation}
            initial="hidden"
            animate="visible"
          >
            {/* Stack */}
            <motion.div variants={itemAnimation} className="mb-0">
              <div className="flex justify-between py-4 border-t border-dashed border-[#DB4C40]">
                <div className="text-sm opacity-80">Stack</div>
                <div className="text-md text-right">{data.stack}</div>
              </div>
            </motion.div>

            {/* Duration */}
            <motion.div variants={itemAnimation} className="mb-0">
              <div className="flex justify-between py-4 border-t border-dashed border-[#DB4C40]">
                <div className="text-sm opacity-80">Duration</div>
                <div className="text-md text-right">{data.duration}</div>
              </div>
            </motion.div>

            {/* Year */}
            <motion.div variants={itemAnimation} className="mb-0">
              <div className="flex justify-between py-4 border-t border-dashed border-[#DB4C40]">
                <div className="text-sm opacity-80">Year</div>
                <div className="text-md text-right">{data.year}</div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div variants={itemAnimation} className="mb-0">
              <div className="flex justify-between py-4 border-t border-dashed border-[#DB4C40] border-b">
                <div className="text-sm opacity-80">Services</div>
                <div className="text-md text-right">{data.services}</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero image */}
        <motion.div 
          className="mb-16 md:mb-36"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full aspect-video">
            <Image 
              src={data.heroImage} 
              alt={`${data.title} Hero Image`} 
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* About section with columns */}
        <motion.div 
          className="mb-36"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">About</h2>
            <span className="text-3xl md:text-4xl font-bold">01</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 gap-x-10">
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">{data.client.title}</h3>
              <p className="opacity-80">{data.client.description}</p>
            </div>
            <div className="col-span-1">
              <h3 className="text-xl font-bold mb-4">{data.aim.title}</h3>
              <p className="opacity-80">{data.aim.description}</p>
            </div>
          </div>
        </motion.div>

        {/* Mobile showcase section */}
        <motion.div 
          className="mb-36"
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-full aspect-video md:aspect-[16/9] bg-black overflow-hidden">
            <Image 
              src={data.mobileImages} 
              alt={`${data.title} Mobile Showcase`} 
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Concepts section with accordion */}
        <motion.div 
          className="pb-36"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">Concepts</h2>
            <span className="text-3xl md:text-4xl font-bold">02</span>
          </div>
          <div className="border-t border-dashed border-[#DB4C40]">
            {data.concepts.map((concept, index) => (
              <motion.div 
                key={concept.id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div 
                  className="border-b border-dashed border-[#DB4C40]"
                  onClick={() => toggleConcept(concept.id)}
                >
                  <div className="py-5 grid grid-cols-12 gap-4 cursor-pointer">
                    <div className="col-span-1">
                      <span>{concept.id}</span>
                    </div>
                    <div className="col-span-10">
                      <span className="text-lg">{concept.title}</span>
                    </div>
                    <div className="col-span-1 flex justify-end items-center">
                      <div className="transform transition-transform duration-300 text-xl">
                        {openConcept === concept.id ? '−' : '+'}
                      </div>
                    </div>
                  </div>
                  
                  <AnimatePresence>
                    {openConcept === concept.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-5 grid grid-cols-12">
                          <div className="col-span-1"></div>
                          <div className="col-span-10 opacity-80">
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 