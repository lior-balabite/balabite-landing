'use client';

import React from 'react';

interface BalaBiteFuturisticLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteFuturisticLogo: React.FC<BalaBiteFuturisticLogoProps> = ({ 
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
        {/* Logo background with futuristic glow effect */}
        <div 
          className="absolute inset-0 bg-accent-500/40 rounded-full blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-950 rounded-full border-2 border-accent-400 overflow-hidden">
          {/* Futuristic BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Tech-inspired plate */}
            <circle 
              cx="50" 
              cy="50" 
              r="35" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeDasharray="1 3"
            />
            
            {/* Inner circuit ring */}
            <circle 
              cx="50" 
              cy="50" 
              r="25" 
              stroke="currentColor" 
              className="text-accent-400"
              strokeWidth="1.5" 
              strokeDasharray="5 2"
            />
            
            {/* Digital brain/circuit pathways */}
            <path 
              d="M50 20L50 30M30 30L40 40M70 30L60 40M30 70L40 60M70 70L60 60" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            
            {/* AI elements */}
            <circle cx="50" cy="50" r="8" className="text-accent-500/30" fill="currentColor" />
            <circle cx="50" cy="50" r="8" stroke="currentColor" className="text-accent-300" strokeWidth="1.5" strokeDasharray="2 1" />
            
            {/* Data visualization elements */}
            <path 
              d="M35 45L45 50L35 55M65 45L55 50L65 55" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Digital smile that resembles a graph or waveform */}
            <path 
              d="M38 60Q44 70 50 65Q56 60 62 70" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            
            {/* Tech connection points */}
            <circle cx="50" cy="30" r="2" className="text-accent-400" fill="currentColor" />
            <circle cx="40" cy="40" r="1.5" className="text-accent-400" fill="currentColor" />
            <circle cx="60" cy="40" r="1.5" className="text-accent-400" fill="currentColor" />
            <circle cx="40" cy="60" r="1.5" className="text-accent-400" fill="currentColor" />
            <circle cx="60" cy="60" r="1.5" className="text-accent-400" fill="currentColor" />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <div className={`font-bold ${logoSize.fontSize} bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text`}>
            BalaBite<span className="text-accent-500/70 text-xs align-top">.ai</span>
          </div>
          <div className="text-[9px] text-primary-100/60 font-light -mt-1">
            <span className="text-accent-300/90">future</span> × intelligence
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteFuturisticLogo; 