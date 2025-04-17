"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Project {
  id: string;
  number: string;
  title: string;
  tags: string[];
  description?: string;
}

interface ProjectsSectionProps {
  theme: string;
}

export default function ProjectsSection({ theme }: ProjectsSectionProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const projects: Project[] = [
    {
      id: '1',
      number: '01',
      title: 'PROJECT 1',
      tags: ['Web Design', 'Web Development'],
      description: 'A comprehensive web platform that seamlessly integrates modern design principles with cutting-edge development technologies. Our approach focused on creating an intuitive user experience while maintaining robust functionality.',
    },
    {
      id: '2',
      number: '02',
      title: 'PROJECT 2',
      tags: ['Web Design', 'Web Development'],
      description: 'Project description will appear here.',
    },
    {
      id: '3',
      number: '03',
      title: 'PROJECT 3',
      tags: ['Web Design', 'Web Development'],
      description: 'Project description will appear here.',
    },
    {
      id: '4',
      number: '04',
      title: 'PROJECT 4',
      tags: ['Web Design', 'Web Development'],
      description: 'Project description will appear here.',
    },
    {
      id: '5',
      number: '05',
      title: 'PROJECT 5',
      tags: ['Web Design', 'Web Development'],
      description: 'Project description will appear here.',
    },
    {
      id: '6',
      number: '06',
      title: 'PROJECT 6',
      tags: ['Web Design', 'Web Development'],
      description: 'Project description will appear here.',
    }
  ];

  const expandAnimation = {
    initial: { 
      opacity: 0,
      height: 0,
      scale: 0.98,
      transformOrigin: "center top"
    },
    animate: { 
      opacity: 1,
      height: 'auto',
      scale: 1,
      transition: {
        height: {
          duration: 0.6,
          ease: [0.16, 1, 0.3, 1] // Custom bezier curve for smoother animation
        },
        opacity: {
          duration: 0.4,
          ease: "easeOut",
          delay: 0.1
        },
        scale: {
          duration: 0.5,
          ease: "easeOut"
        }
      }
    },
    exit: { 
      opacity: 0,
      height: 0,
      scale: 0.98,
      transition: {
        height: {
          duration: 0.4,
          ease: [0.32, 0, 0.67, 0] // Smooth easing out
        },
        opacity: {
          duration: 0.25,
          ease: "easeIn"
        },
        scale: {
          duration: 0.3,
          ease: "easeIn"
        }
      }
    }
  };

  return (
    <section id="selected-works" className={`w-full ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F3F1E4]'}`}>
      <div className="px-[30px] py-[60px]">
        {/* Grid container para el título principal */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px] mb-6">
          <h2 className="col-span-4 md:col-start-5 md:col-span-4 text-[#ff4b4b] text-2xl font-bold">
            SELECTED WORKS
          </h2>
        </div>

        {/* Lista de proyectos */}
        <div>
          <div className="w-full border-t border-dotted border-[#ff4b4b]" />
          
          {projects.map((project) => (
            <motion.div
              key={project.id}
              className="relative"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px] py-6">
                {/* Número del proyecto */}
                <div className="col-span-1">
                  <span className="text-[#ff4b4b] text-xl">{project.number}</span>
                </div>

                {/* Título y tags */}
                <div className="col-span-3 md:col-start-5 md:col-span-2">
                  <h3 className="text-[#ff4b4b] text-xl mb-4">{project.title}</h3>
                  <div className="flex flex-wrap md:flex-nowrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-[#ff4b4b] text-sm border border-[#ff4b4b] px-3 py-1 rounded-[4px] whitespace-nowrap"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <AnimatePresence>
                  {hoveredProject === project.id && (
                    <motion.div 
                      className="col-span-4 md:col-start-8 md:col-span-5 grid grid-cols-1 md:grid-cols-5 gap-[20px] overflow-hidden mt-4 md:mt-0"
                      variants={expandAnimation}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      layout
                    >
                      {/* Descripción expandida */}
                      <div className="md:col-span-2 order-2 md:order-1">
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ 
                            opacity: 1, 
                            y: 0,
                            transition: { 
                              delay: 0.1,
                              duration: 0.4
                            }
                          }}
                        >
                          <h4 className="text-[#ff4b4b] text-[19px] uppercase mb-4">Description</h4>
                          <p className="text-[#ff4b4b] text-[16px] leading-[1.4] mb-8">
                            {project.description}
                          </p>
                          <motion.button 
                            className="px-4 py-2 border border-[#ff4b4b] text-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-[#202021] transition-colors rounded-[8px]"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            See project
                          </motion.button>
                        </motion.div>
                      </div>

                      {/* Imagen expandida - Ahora segundo */}
                      <div className="md:col-span-3 order-1 md:order-2">
                        <motion.div 
                          className="aspect-square bg-[#2E2E2E] relative overflow-hidden rounded-[4px]"
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ 
                            opacity: 1, 
                            scale: 1,
                            transition: { 
                              duration: 0.5,
                              ease: "easeOut"
                            }
                          }}
                        >
                          <Image
                            src="/img/kostume_tiny.png"
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </motion.div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="w-full border-b border-dotted border-[#ff4b4b]" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 