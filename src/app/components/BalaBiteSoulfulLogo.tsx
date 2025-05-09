'use client';

import React from 'react';

interface BalaBiteSoulfulLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const BalaBiteSoulfulLogo: React.FC<BalaBiteSoulfulLogoProps> = ({ 
  className = "", 
  showText = true,
  size = 'md',
  animate = true
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
        {/* Warm, embracing glow representing hospitality */}
        <div 
          className="absolute inset-0 bg-gradient-to-br from-accent-400/30 to-accent-500/20 rounded-full blur-lg"
          style={{ filter: `blur(${logoSize.glowSize}px)` }}
        ></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-primary-950 to-primary-900 rounded-full border border-accent-300/50 overflow-hidden">
          {/* Soulful BalaBite Icon */}
          <svg 
            viewBox="0 0 100 100" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Stylized house shape representing "בעל הבית" (house owner) */}
            <path 
              d="M50 20L75 40V75H25V40L50 20Z" 
              className="text-accent-400/5" 
              fill="currentColor" 
            />
            
            <path 
              d="M50 20L75 40V75H25V40L50 20Z" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5"
              strokeLinejoin="round"  
            />
            
            {/* Door - represents welcoming/hospitality */}
            <path 
              d="M43 75V55C43 53 45 51 47 51H53C55 51 57 53 57 55V75" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            
            {/* Hebrew letter Beth (ב) subtly integrated */}
            <path 
              d="M35 35C35 35 33 40 33 45C33 50 35 55 35 55C35 55 38 52 42 52C46 52 47 55 47 55" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              opacity="0.9"
            />
            
            {/* AI circuit pattern emanating from the house - representing technology enhancing hospitality */}
            <path 
              d="M25 45C15 45 10 50 10 60" 
              stroke="currentColor" 
              className="text-accent-400/60"
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeDasharray="1 3"
            />
            
            <path 
              d="M75 45C85 45 90 50 90 60" 
              stroke="currentColor" 
              className="text-accent-400/60"
              strokeWidth="1" 
              strokeLinecap="round" 
              strokeDasharray="1 3"
            />
            
            {/* Digital pulse throughout the house - AI flowing through the hospitality */}
            <path 
              d="M30 65H40M40 65H45M45 65H55M55 65H60M60 65H70" 
              stroke="currentColor" 
              className={`text-accent-300 ${animate ? "animate-[dash_3s_linear_infinite]" : ""}`}
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeDasharray={animate ? "1 8" : ""}
            />
            
            {/* The plate/serving element - representing food service */}
            <circle cx="50" cy="40" r="8" className="text-accent-500/10" fill="currentColor" />
            <circle cx="50" cy="40" r="8" stroke="currentColor" className="text-accent-200" strokeWidth="1.5" />
            
            {/* Stylized smile in the plate - representing the warm, hospitable experience */}
            <path 
              d="M45 40C45 40 47 43 50 43C53 43 55 40 55 40" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
            />
            
            {/* Connection points - representing digital touchpoints enhancing hospitality */}
            <circle cx="25" cy="45" r="2" className="text-accent-300" fill="currentColor" />
            <circle cx="75" cy="45" r="2" className="text-accent-300" fill="currentColor" />
            <circle cx="50" cy="30" r="1.5" className="text-accent-400" fill="currentColor" />
            
            {/* Digital aura - representing the AI assistance */}
            <path 
              d="M30 30C35 25 45 20 50 20C55 20 65 25 70 30" 
              stroke="currentColor" 
              className="text-accent-400/50"
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
            <span className="text-accent-300/90">בעל הבית</span> × intelligence
          </div>
        </div>
      )}
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes dash {
          to {
            stroke-dashoffset: 20;
          }
        }
      `}</style>
    </div>
  );
};

export default BalaBiteSoulfulLogo; 