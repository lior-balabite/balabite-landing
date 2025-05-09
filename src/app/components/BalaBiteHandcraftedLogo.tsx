'use client';

import React from 'react';

interface BalaBiteHandcraftedLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteHandcraftedLogo: React.FC<BalaBiteHandcraftedLogoProps> = ({ 
  className = "", 
  showText = true,
  size = 'md'
}) => {
  // Determine the size of the logo
  const logoSize = {
    sm: { width: 40, height: 40, fontSize: 'text-lg', iconScale: 0.7, glowSize: 5 },
    md: { width: 56, height: 56, fontSize: 'text-2xl', iconScale: 0.9, glowSize: 8 },
    lg: { width: 72, height: 72, fontSize: 'text-3xl', iconScale: 1.2, glowSize: 12 }
  }[size];

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        className="relative"
        style={{ 
          width: logoSize.width, 
          height: logoSize.height 
        }}
      >
        {/* Logo background with warm glow effect */}
        <div 
          className="absolute inset-0 bg-accent-500/20 rounded-full blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900/90 rounded-full border border-accent-400/50 overflow-hidden">
          {/* Hand-drawn style BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Hand-drawn style plate (slightly off-center, imperfect circle) */}
            <path
              d="M52 15C68 17 84 28 87 47C90 66 79 84 60 87C41 90 23 78 20 59C17 40 28 16 52 15Z"
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2.5" 
              strokeLinecap="round"
              fill="none"
            />
            
            {/* Hand-drawn inner plate detail */}
            <path
              d="M53 25C65 27 76 35 78 48C80 61 72 74 58 76C44 78 31 70 29 57C27 44 35 25 53 25Z"
              stroke="currentColor" 
              className="text-accent-400/70"
              strokeWidth="1.5" 
              strokeLinecap="round"
              strokeDasharray="3 3"
              fill="none"
            />
            
            {/* Hand-drawn fork (left eye) */}
            <path 
              d="M35 38C35 38 32 43 36 46C40 49 42 44 42 44" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Hand-drawn knife (right eye) */}
            <path 
              d="M65 38C65 38 68 43 64 46C60 49 58 44 58 44" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Hand-drawn smile (spoon) */}
            <path 
              d="M35 60C35 60 42 72 52 70C62 68 65 60 65 60" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Hand-drawn stars/highlights */}
            <path 
              d="M30 30L32 32M70 30L68 32M30 70L32 68M70 70L68 68" 
              stroke="currentColor" 
              className="text-accent-400/60"
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            
            {/* Hand-drawn dots */}
            <circle cx="50" cy="30" r="2" className="text-accent-300" fill="currentColor" />
            <circle cx="48" cy="77" r="1.5" className="text-accent-400" fill="currentColor" />
            <circle cx="75" cy="50" r="1.5" className="text-accent-400" fill="currentColor" />
            <circle cx="25" cy="50" r="1.5" className="text-accent-400" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold ${logoSize.fontSize} bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text`}>
            BalaBite<span className="text-accent-500/70 text-xs align-top">.ai</span>
          </div>
          <div className="text-[9px] text-primary-100/60 font-light -mt-1">
            <span className="text-accent-300/90">artisan</span> × crafted
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteHandcraftedLogo; 