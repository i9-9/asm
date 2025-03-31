"use client";

import Link from 'next/link';

interface ContactSectionProps {
  theme: string;
}

export default function ContactSection({ theme }: ContactSectionProps) {
  return (
    <section 
      id="contact" 
      className={`w-full h-screen ${theme === 'dark' ? 'bg-[#202021]' : 'bg-[#F7F7F7]'} relative`}
    >
      <div className="px-[30px] h-full flex items-end pb-[60px]">
        <div className="grid grid-cols-4 md:grid-cols-12 gap-[20px] w-full">
          <div className="col-span-4 md:col-span-6">
            <div className="space-y-4 font-['Scotch_Display'] font-normal">
              <p className="text-[96px] leading-[1] tracking-[-0.03em] text-[#ff4b4b] whitespace-nowrap font-normal">
                ASSEMBLY BS.AS
              </p>
              <Link 
                href="mailto:INFO@ASM.STUDIO"
                className="block text-[96px] leading-[1] tracking-[-0.03em] text-[#ff4b4b] hover:opacity-80 transition-opacity whitespace-nowrap font-normal"
              >
                INFO@ASM.STUDIO
              </Link>
              <Link 
                href="https://wa.me/5491140753025"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-[96px] leading-[1] tracking-[-0.03em] text-[#ff4b4b] hover:opacity-80 transition-opacity whitespace-nowrap font-normal"
              >
                +54 911 4075 3025
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 