/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';

const FluidBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#FFFFFF]">
      
      {/* Blob 1: Yellow (#E2BA3D) */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[90vw] h-[90vw] bg-[#E2BA3D] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 will-change-transform"
        animate={{
          x: [0, 50, -25, 0],
          y: [0, -25, 25, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 2: Medium Blue (#566B99) */}
      <motion.div
        className="absolute top-[20%] right-[-20%] w-[100vw] h-[80vw] bg-[#566B99] rounded-full mix-blend-multiply filter blur-[80px] opacity-20 will-change-transform"
        animate={{
          x: [0, -50, 25, 0],
          y: [0, 50, -25, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Blob 3: Red (#961D1D) - Sutil */}
      <motion.div
        className="absolute bottom-[-20%] left-[20%] w-[80vw] h-[80vw] bg-[#961D1D] rounded-full mix-blend-multiply filter blur-[80px] opacity-10 will-change-transform"
        animate={{
          x: [0, 75, -75, 0],
          y: [0, -50, 50, 0],
        }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Static Grain Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none"></div>
    </div>
  );
};

export default FluidBackground;