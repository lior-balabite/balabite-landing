'use client';

import React from 'react';

interface BalaBiteHebrewInspiredLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteHebrewInspiredLogo: React.FC<BalaBiteHebrewInspiredLogoProps> = ({ 
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
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900 rounded-full border border-accent-400/50 overflow-hidden">
          {/* Hebrew-inspired BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Elegant plate outline */}
            <circle 
              cx="50" 
              cy="50" 
              r="36" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2.5" 
              strokeLinecap="round" 
            />
            
            {/* Stylized bet (ב) in Hebrew - modified to be more subtle and integrated */}
            <path 
              d="M33 30Q28 32 28 38L28 48Q28 54 33 56L38 56Q43 56 43 52L43 38Q43 30 38 30L33 30Z" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Stylized ayin (ע) in Hebrew - very abstract, integrated with design */}
            <path 
              d="M57 30Q62 32 62 38L62 48Q62 54 57 56L52 56Q47 56 47 52L47 38Q47 30 52 30L57 30Z" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill="none"
            />
            
            {/* Horizontal line connecting the forms - symbolizing the lamed (ל) */}
            <path 
              d="M38 43L62 43" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            
            {/* Smile-like curve that also suggests hospitality */}
            <path 
              d="M35 65Q43 72 50 70Q57 72 65 65" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Subtle tech elements that don't overwhelm the traditional inspiration */}
            <circle cx="50" cy="30" r="2" className="text-accent-400" fill="currentColor" />
            <path 
              d="M25 50H30M70 50H75" 
              stroke="currentColor" 
              className="text-accent-400/60"
              strokeWidth="1" 
              strokeLinecap="round"
              strokeDasharray="1 2" 
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
            <span className="text-accent-300/90">tradition</span> × innovation
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteHebrewInspiredLogo; 