'use client';

import React, { useRef, useEffect } from 'react';

const FaviconGenerator: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = 512;
    canvas.height = 512;
    
    // Create the favicon
    const drawFavicon = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background gradient
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgGradient.addColorStop(0, '#1f2937');  // primary-900
      bgGradient.addColorStop(1, '#111827');  // primary-950
      
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Plate/dish outer circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFC107';  // accent-300
      ctx.lineWidth = canvas.width * 0.03;
      ctx.stroke();
      
      // Plate/dish inner circle
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.3, 0, Math.PI * 2);
      ctx.strokeStyle = '#FFCA28';  // accent-400
      ctx.lineWidth = canvas.width * 0.02;
      ctx.stroke();
      
      // Left eye (fork)
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.35, canvas.height * 0.35);
      ctx.bezierCurveTo(
        canvas.width * 0.3, canvas.height * 0.4,
        canvas.width * 0.32, canvas.height * 0.45,
        canvas.width * 0.38, canvas.height * 0.45
      );
      ctx.strokeStyle = '#FFE082';  // accent-200
      ctx.lineWidth = canvas.width * 0.02;
      ctx.stroke();
      
      // Right eye (knife)
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.65, canvas.height * 0.35);
      ctx.bezierCurveTo(
        canvas.width * 0.7, canvas.height * 0.4,
        canvas.width * 0.68, canvas.height * 0.45,
        canvas.width * 0.62, canvas.height * 0.45
      );
      ctx.strokeStyle = '#FFE082';  // accent-200
      ctx.lineWidth = canvas.width * 0.02;
      ctx.stroke();
      
      // Smile (spoon)
      ctx.beginPath();
      ctx.moveTo(canvas.width * 0.35, canvas.height * 0.6);
      ctx.bezierCurveTo(
        canvas.width * 0.4, canvas.height * 0.7,
        canvas.width * 0.6, canvas.height * 0.7,
        canvas.width * 0.65, canvas.height * 0.6
      );
      ctx.strokeStyle = '#FFE082';  // accent-200
      ctx.lineWidth = canvas.width * 0.02;
      ctx.stroke();
      
      // AI "thinking" dot at the top
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height * 0.3, canvas.width * 0.015, 0, Math.PI * 2);
      ctx.fillStyle = '#FFC107';  // accent-300
      ctx.fill();
      
      // Optional: Add a glow effect
      ctx.shadowColor = '#FFC107';
      ctx.shadowBlur = 20;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width * 0.4, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 193, 7, 0.3)';
      ctx.lineWidth = canvas.width * 0.01;
      ctx.stroke();
      ctx.shadowBlur = 0;
    };
    
    drawFavicon();
    
    // Export function for download button
    (window as any).downloadFavicon = () => {
      const link = document.createElement('a');
      link.download = 'favicon.png';
      link.href = canvas.toDataURL('image/png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };
  }, []);
  
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="text-2xl font-bold text-accent-300">BalaBite Favicon Generator</h1>
      <p className="text-sm text-primary-100/70 mb-4">Preview of the favicon based on our logo design</p>
      
      <div className="relative">
        <div className="absolute inset-0 bg-accent-500/20 rounded-xl blur-xl"></div>
        <canvas 
          ref={canvasRef} 
          className="relative border-2 border-accent-500/30 rounded-xl bg-primary-800/50"
          style={{ width: '256px', height: '256px' }}
        />
      </div>
      
      <div className="flex gap-4 mt-4">
        <button 
          onClick={() => (window as any).downloadFavicon()} 
          className="px-4 py-2 bg-accent-500/20 text-accent-300 rounded-lg hover:bg-accent-500/30 transition-colors"
        >
          Download PNG (512×512)
        </button>
      </div>
      
      <div className="mt-8 p-6 bg-primary-800/40 backdrop-blur-sm border border-accent-500/30 rounded-xl max-w-lg">
        <h2 className="text-xl font-bold text-accent-300 mb-4">How to Use</h2>
        <ol className="list-decimal ml-5 space-y-2 text-primary-100/80">
          <li>Download the PNG using the button above</li>
          <li>Use a favicon generator tool like <a href="https://realfavicongenerator.net/" target="_blank" rel="noopener noreferrer" className="text-accent-300 hover:underline">realfavicongenerator.net</a> to create all the required sizes</li>
          <li>Place the generated files in the <code className="bg-primary-950 px-1 rounded">public</code> folder of your Next.js project</li>
          <li>The necessary metadata has already been added to the layout.tsx file</li>
        </ol>
      </div>
    </div>
  );
};

export default FaviconGenerator; 