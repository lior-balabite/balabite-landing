'use client';

import React from 'react';

interface BalaBiteNetworkLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteNetworkLogo: React.FC<BalaBiteNetworkLogoProps> = ({ 
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
        {/* Logo background with network-like glow */}
        <div 
          className="absolute inset-0 bg-accent-500/20 rounded-full blur-md"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container - hexagonal shape */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-900 overflow-hidden" style={{ 
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
        }}>
          {/* Network BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Hexagonal grid pattern */}
            <path 
              d="M20 35L35 25M35 25L50 35M35 25L35 10M50 35L65 25M65 25L80 35M65 25L65 10M80 35L80 65M80 65L65 75M65 75L50 65M65 75L65 90M50 65L35 75M35 75L20 65M35 75L35 90M20 65L20 35" 
              stroke="currentColor" 
              className="text-accent-400/30"
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Central hub - representing AI intelligence */}
            <circle cx="50" cy="50" r="15" className="text-accent-400/10" fill="currentColor" />
            <circle cx="50" cy="50" r="15" stroke="currentColor" className="text-accent-300" strokeWidth="1.5" />
            
            {/* Network node points */}
            <circle cx="35" cy="25" r="3" className="text-accent-400/70" fill="currentColor" />
            <circle cx="65" cy="25" r="3" className="text-accent-400/70" fill="currentColor" />
            <circle cx="80" cy="50" r="3" className="text-accent-400/70" fill="currentColor" />
            <circle cx="65" cy="75" r="3" className="text-accent-400/70" fill="currentColor" />
            <circle cx="35" cy="75" r="3" className="text-accent-400/70" fill="currentColor" />
            <circle cx="20" cy="50" r="3" className="text-accent-400/70" fill="currentColor" />
            
            {/* Fork and knife elements integrated into the network */}
            <path 
              d="M40 40L50 50" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            <path 
              d="M60 40L50 50" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            <path 
              d="M40 60L60 60" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
              strokeLinecap="round" 
            />
            
            {/* Central "B" glyph */}
            <path 
              d="M50 43V57" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="2" 
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
            <span className="text-accent-300/90">connected</span> × service
          </div>
        </div>
      )}
    </div>
  );
};

export default BalaBiteNetworkLogo; 