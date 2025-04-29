"use client";

import Navbar from './Navbar';
import Image from 'next/image';

interface ProjectData {
  title: string;
  images: string[];
  about: string;
  aim: string;
  concepts: string[];
}

interface ProjectTemplateProps {
  data: ProjectData;
}

export default function ProjectTemplate({ data }: ProjectTemplateProps) {
  return (
    <div className="bg-[#202021] text-[#F3F1E4] min-h-screen">
      <Navbar theme="dark" />
      <div className="px-8 py-16">
        <h1 className="text-6xl font-bold mb-8">{data.title}</h1>
        <div className="flex flex-col md:flex-row gap-8 mb-16">
          <div className="flex-1">
            <Image src={data.images[0]} alt={`${data.title} Image 1`} width={800} height={600} className="w-full h-auto" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">About</h2>
            <p className="mb-4">{data.about}</p>
            <h3 className="text-xl font-bold mb-2">Aim</h3>
            <p>{data.aim}</p>
          </div>
        </div>
        <div className="mb-16">
          <Image src={data.images[1]} alt={`${data.title} Image 2`} width={1200} height={800} className="w-full h-auto" />
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Concepts</h2>
          <ul className="list-disc pl-5">
            {data.concepts.map((concept, index) => (
              <li key={index}>{concept}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
} 