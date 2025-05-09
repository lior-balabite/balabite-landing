'use client';

import React from 'react';

interface BalaBiteIconicLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteIconicLogo: React.FC<BalaBiteIconicLogoProps> = ({ 
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
          className="absolute inset-0 bg-accent-500/20 rounded-full blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-950 rounded-full border border-accent-300 overflow-hidden">
          {/* Iconic BalaBite Symbol */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Plate shape */}
            <circle 
              cx="50" 
              cy="50" 
              r="35" 
              className="text-accent-400/20" 
              fill="currentColor" 
            />
            
            <circle 
              cx="50" 
              cy="50" 
              r="35" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="3" 
            />
            
            {/* Fork symbol */}
            <path 
              d="M30 45L30 60Q30 65 35 65L50 65"
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Knife symbol */}
            <path 
              d="M70 35L70 50Q70 60 60 60L50 60"
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* B symbol (for BalaBite) */}
            <path 
              d="M50 25L50 40M50 40C50 40 55 40 55 35C55 30 50 30 50 30M50 40C50 40 55 40 55 45C55 50 50 50 50 50L50 40"
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="3" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Digital/AI element */}
            <circle cx="50" cy="50" r="2" className="text-white" fill="currentColor" />
            <circle cx="38" cy="38" r="1.5" className="text-accent-300" fill="currentColor" />
            <circle cx="62" cy="38" r="1.5" className="text-accent-300" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold ${logoSize.fontSize} bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text`}>
            BalaBite<span className="text-accent-500/70 text-xs align-top">.ai</span>
          </div>
          <div className="text-[9px] text-primary-100/60 font-light -mt-1">
            <span className="text-accent-300/90">iconic</span> × service
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteIconicLogo; 