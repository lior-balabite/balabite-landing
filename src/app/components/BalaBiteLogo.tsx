'use client';

import React from 'react';

interface BalaBiteLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const BalaBiteLogo: React.FC<BalaBiteLogoProps> = ({ 
  className = "", 
  showText = true,
  size = 'md'
}) => {
  // Determine the size of the logo
  const logoSize = {
    sm: { width: 32, height: 32, fontSize: 'text-lg', iconScale: 0.7 },
    md: { width: 40, height: 40, fontSize: 'text-2xl', iconScale: 0.9 },
    lg: { width: 56, height: 56, fontSize: 'text-3xl', iconScale: 1.2 }
  }[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div 
        className="relative"
        style={{ 
          width: logoSize.width, 
          height: logoSize.height 
        }}
      >
        {/* Logo background with glow effect */}
        <div className="absolute inset-0 bg-accent-500/30 rounded-full blur-sm"></div>
        
        {/* Logo container */}
        <div className="relative w-full h-full flex items-center justify-center bg-primary-800 rounded-full border-2 border-accent-400/70 overflow-hidden">
          {/* Custom BalaBite Icon - A stylized plate with utensils that forms a smiling face */}
          <svg 
            viewBox="0 0 24 24" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full p-1"
            style={{ 
              transform: `scale(${logoSize.iconScale})`,
            }}
          >
            {/* Plate/dish circle with hand-drawn feel */}
            <path 
              d="M12 3.5C7 3.5 3.5 7 3.5 12C3.5 17 7 20.5 12 20.5C17 20.5 20.5 17 20.5 12C20.5 7 17 3.5 12 3.5Z" 
              stroke="currentColor" 
              className="text-accent-300"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Inner plate circle */}
            <path 
              d="M12 5.5C8 5.5 5.5 8 5.5 12C5.5 16 8 18.5 12 18.5C16 18.5 18.5 16 18.5 12C18.5 8 16 5.5 12 5.5Z" 
              stroke="currentColor" 
              className="text-accent-400"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Fork (left eye) */}
            <path 
              d="M9 9C9 9 8 10 8.5 11C9 12 10 11.5 10 11.5" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Knife (right eye) */}
            <path 
              d="M15 9C15 9 16 10 15.5 11C15 12 14 11.5 14 11.5" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* Spoon (smiling mouth) */}
            <path 
              d="M9 14C9 14 10.5 16 12 16C13.5 16 15 14 15 14" 
              stroke="currentColor" 
              className="text-accent-200"
              strokeWidth="1.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
            />
            
            {/* AI "thinking" dot */}
            <circle 
              cx="12" 
              cy="7.5" 
              r="0.75" 
              className="text-accent-500"
              fill="currentColor" 
            />
          </svg>
        </div>
      </div>
      
      {showText && (
        <div className={`font-bold ${logoSize.fontSize} bg-gradient-to-r from-accent-300 to-accent-400 text-transparent bg-clip-text`}>
          BalaBite<span className="text-accent-500/70 text-xs align-top">.ai</span>
        </div>
      )}
    </div>
  );
};

export default BalaBiteLogo; 