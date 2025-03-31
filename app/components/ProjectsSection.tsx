"use client";

import { useState, useEffect } from 'react';
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
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleProjectInteraction = (projectId: string) => {
    if (isMobile) {
      // En mobile, toggle el proyecto al hacer tap
      setHoveredProject(hoveredProject === projectId ? null : projectId);
    }
  };

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
      x: -20,
      height: 0
    },
    animate: { 
      opacity: 1,
      x: 0,
      height: 'auto',
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    exit: { 
      opacity: 0,
      x: -20,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeIn"
      }
    }
  };

  return (
    <section id="selected-works" className={`w-full ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F7F7F7]'}`}>
      <div className="px-[30px] py-[60px]">
        {/* Grid container para el título principal */}
        <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px] mb-20">
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
              onMouseEnter={() => !isMobile && setHoveredProject(project.id)}
              onMouseLeave={() => !isMobile && setHoveredProject(null)}
              onClick={() => handleProjectInteraction(project.id)}
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
                    >
                      {/* Descripción expandida */}
                      <div className="md:col-span-2 order-2 md:order-1">
                        <h4 className="text-[#ff4b4b] text-[19px] uppercase mb-4">Description</h4>
                        <p className="text-[#ff4b4b] text-[16px] leading-[1.4] mb-8">
                          {project.description}
                        </p>
                        <button className="px-4 py-2 border border-[#ff4b4b] text-[#ff4b4b] hover:bg-[#ff4b4b] hover:text-[#202021] transition-colors rounded-[8px]">
                          See project
                        </button>
                      </div>

                      {/* Imagen expandida - Ahora segundo */}
                      <div className="md:col-span-3 order-1 md:order-2">
                        <div className="aspect-square bg-[#2E2E2E] relative overflow-hidden rounded-[4px]">
                          <Image
                            src="/img/kostume_tiny.png"
                            alt={project.title}
                            fill
                            className="object-cover"
                          />
                        </div>
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