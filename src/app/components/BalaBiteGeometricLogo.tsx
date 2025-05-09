'use client';

import React from 'react';

interface BalaBiteGeometricLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteGeometricLogo: React.FC<BalaBiteGeometricLogoProps> = ({ 
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
        {/* Logo background with angular glow effect */}
        <div 
          className="absolute inset-0 bg-accent-500/20 rounded-md blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900 rounded-md border border-accent-400/50 overflow-hidden">
          {/* Geometric BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Diamond shape base */}
            <path 
              d="M50 15L85 50L50 85L15 50L50 15Z" 
              className="text-accent-400/10" 
              fill="currentColor"
            />
            
            <path 
              d="M50 15L85 50L50 85L15 50L50 15Z" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinejoin="round"
            />
            
            {/* Crossed utensils forming modern "X" shape */}
            <path 
              d="M35 30L65 70" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            
            <path 
              d="M65 30L35 70" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            
            {/* Abstract "B" shape in the center */}
            <path 
              d="M45 40H55V50H45V60H55" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Tech element triangles */}
            <path 
              d="M50 25L55 35H45L50 25Z" 
              className="text-accent-400/60" 
              fill="currentColor"
            />
            
            <path 
              d="M50 75L55 65H45L50 75Z" 
              className="text-accent-400/60" 
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold ${logoSize.fontSize} bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text`}>
            BalaBite<span className="text-accent-500/70 text-xs align-top">.ai</span>
          </div>
          <div className="text-[9px] text-primary-100/60 font-light -mt-1">
            <span className="text-accent-300/90">precision</span> × service
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteGeometricLogo; 