"use client";

import AnimatedModularLogo from './AnimatedModularLogo';
import { logoPathsData } from './logoPathsData';

export default function LogoAnimation() {
  // Extraer solo los paths del logoPathsData
  const paths = logoPathsData.map(item => item.path);

  return (
    <div className="w-full h-[300px] flex items-center justify-center bg-[#202021]">
      <div className="w-[80%] max-w-[900px]">
        <AnimatedModularLogo 
          pathData={paths}
          color="#DB4C40"
          hoverColor="#FFFFFF"
        />
      </div>
    </div>
  );
} 