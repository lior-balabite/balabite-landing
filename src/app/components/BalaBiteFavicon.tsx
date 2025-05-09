'use client';

import React from 'react';
import { useEffect } from 'react';

interface BalaBiteFaviconProps {
  baseUrl?: string;
}

const BalaBiteFavicon: React.FC<BalaBiteFaviconProps> = ({ 
  baseUrl = '' 
}) => {
  // We'll update favicon dynamically since Next.js App Router handles
  // static favicons in layout.tsx metadata
  useEffect(() => {
    // As a fallback, we can add a favicon link if needed
    const existingFavicon = document.querySelector('link[rel="icon"]');
    
    if (!existingFavicon) {
      const link = document.createElement('link');
      link.rel = 'icon';
      link.href = `${baseUrl}/favicon.svg`;
      link.type = 'image/svg+xml';
      document.head.appendChild(link);
    }
  }, [baseUrl]);

  return null; // This component doesn't render anything, just sets up favicon
};

export default BalaBiteFavicon; 