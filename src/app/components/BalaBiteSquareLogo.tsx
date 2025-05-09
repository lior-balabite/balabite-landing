'use client';

import React from 'react';

interface BalaBiteSquareLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteSquareLogo: React.FC<BalaBiteSquareLogoProps> = ({ 
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
          className="absolute inset-0 bg-accent-500/20 rounded-sm blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900 rounded-sm border border-accent-400/50 overflow-hidden">
          {/* Square-based BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Square frame */}
            <rect 
              x="20" 
              y="20" 
              width="60" 
              height="60" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
            />
            
            {/* Inner square elements */}
            <rect 
              x="30" 
              y="30" 
              width="40" 
              height="40" 
              stroke="currentColor" 
              className="text-accent-400/50"
              strokeWidth="1.5" 
              strokeDasharray="2 2"
            />
            
            {/* Vertical utensil elements */}
            <path 
              d="M40 25V75" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            <path 
              d="M60 25V75" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Horizontal element suggesting a plate or interface */}
            <path 
              d="M30 50H70" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Modern AI element */}
            <rect 
              x="45" 
              y="40" 
              width="10" 
              height="20" 
              className="text-accent-400/20" 
              fill="currentColor"
            />
            
            {/* Digital connection points */}
            <circle cx="40" cy="40" r="2" className="text-accent-300" fill="currentColor" />
            <circle cx="40" cy="60" r="2" className="text-accent-300" fill="currentColor" />
            <circle cx="60" cy="40" r="2" className="text-accent-300" fill="currentColor" />
            <circle cx="60" cy="60" r="2" className="text-accent-300" fill="currentColor" />
            
            {/* Subtle corner accents */}
            <path 
              d="M25 25L15 15M75 25L85 15M25 75L15 85M75 75L85 85" 
              stroke="currentColor" 
              className="text-accent-400/30"
              strokeWidth="1" 
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
            <span className="text-accent-300/90">structured</span> × modern
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteSquareLogo; 