/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FFFFFF]">
      {/* 
        OPTIMIZATION:
        Replaced heavy SVG filter/blur animations with CSS Radial Gradients.
        This runs on the compositor thread and is much lighter on mobile GPUs.
      */}
      
      <style>{`
        @keyframes float-1 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
          33% { transform: translate(30px, -50px) scale(1.1); opacity: 0.4; }
          66% { transform: translate(-20px, 20px) scale(0.9); opacity: 0.3; }
        }
        @keyframes float-2 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(-40px, 40px) scale(1.1); opacity: 0.3; }
        }
        @keyframes float-3 {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50% { transform: translate(40px, -30px) scale(0.95); opacity: 0.1; }
        }
        
        .blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px); 
          will-change: transform, opacity;
        }
      `}</style>

      {/* Blob 1: Yellow (#E2BA3D) */}
      <div 
        className="blob"
        style={{
          top: '-10%',
          left: '-10%',
          width: '80vw',
          height: '80vw',
          background: 'radial-gradient(circle, #E2BA3D 0%, transparent 70%)',
          animation: 'float-1 20s infinite ease-in-out',
        }}
      />

      {/* Blob 2: Medium Blue (#566B99) */}
      <div 
        className="blob"
        style={{
          top: '20%',
          right: '-20%',
          width: '90vw',
          height: '70vw',
          background: 'radial-gradient(circle, #566B99 0%, transparent 70%)',
          animation: 'float-2 25s infinite ease-in-out',
          animationDelay: '-5s'
        }}
      />

      {/* Blob 3: Red (#961D1D) - Subtle */}
      <div 
        className="blob"
        style={{
          bottom: '-20%',
          left: '10%',
          width: '70vw',
          height: '70vw',
          background: 'radial-gradient(circle, #961D1D 0%, transparent 70%)',
          animation: 'float-3 30s infinite ease-in-out',
          animationDelay: '-10s'
        }}
      />

      {/* Static Grain Overlay - Lightened for better performance */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;
