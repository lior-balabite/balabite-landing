'use client';

import React from 'react';

interface BalaBiteTypographicLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteTypographicLogo: React.FC<BalaBiteTypographicLogoProps> = ({ 
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
        {/* Logo background with glow effect */}
        <div 
          className="absolute inset-0 bg-accent-500/20 rounded-sm blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900 rounded-sm border-b-2 border-accent-400 overflow-hidden">
          {/* Typographic BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Stylized "B" letter */}
            <path 
              d="M30 25H55C60 25 65 30 65 35C65 40 60 45 55 45H30V25Z"
              className="text-accent-400/20" 
              fill="currentColor" 
            />
            
            <path 
              d="M30 45H60C65 45 70 50 70 55C70 60 65 65 60 65H30V45Z"
              className="text-accent-400/10" 
              fill="currentColor" 
            />
            
            <path 
              d="M30 25H55C60 25 65 30 65 35C65 40 60 45 55 45H30M30 45H60C65 45 70 50 70 55C70 60 65 65 60 65H30V25" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            
            {/* Utensil elements integrated into typography */}
            <path 
              d="M45 70V75" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            <path 
              d="M55 70V75" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Dot for the "i" in "Bite" */}
            <circle cx="65" cy="30" r="3" className="text-accent-300" fill="currentColor" />
            
            {/* AI-inspired elements */}
            <path 
              d="M75 45H80M20 45H25" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeDasharray="1 2"
            />
            
            <path 
              d="M30 75H70" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
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
            <span className="text-accent-300/90">bold</span> × distinctive
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteTypographicLogo; 