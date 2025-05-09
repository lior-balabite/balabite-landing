'use client';

import React from 'react';

interface BalaBiteMinimalistLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteMinimalistLogo: React.FC<BalaBiteMinimalistLogoProps> = ({ 
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
        {/* Logo background with subtle glow effect */}
        <div 
          className="absolute inset-0 bg-accent-500/10 rounded-full blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900 rounded-full border border-accent-400/30 overflow-hidden">
          {/* Minimalist BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Simple plate outline */}
            <circle 
              cx="50" 
              cy="50" 
              r="36" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
            />
            
            {/* Abstract knife and fork */}
            <path 
              d="M35 40L35 60" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            
            <path 
              d="M65 40L65 60" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            
            {/* Minimalist smile */}
            <path 
              d="M35 55C35 55 42 65 50 65C58 65 65 55 65 55" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Abstract AI element */}
            <circle cx="50" cy="35" r="3" className="text-accent-400" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold ${logoSize.fontSize} bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text`}>
            BalaBite<span className="text-accent-500/70 text-xs align-top">.ai</span>
          </div>
          <div className="text-[9px] text-primary-100/60 font-light -mt-1">
            <span className="text-accent-300/90">simply</span> × smarter
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteMinimalistLogo; 