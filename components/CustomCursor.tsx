/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize off-screen to prevent flash
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  // Smooth spring animation
  const springConfig = { damping: 20, stiffness: 350, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]');
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex will-change-transform"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="relative rounded-full bg-gradient-to-tr from-[#E2BA3D] via-[#F5D77C] to-[#B8841A] border border-white/70 shadow-[0_0_10px_rgba(0,0,0,0.35)] flex items-center justify-center opacity-90"
        style={{ width: 20, height: 20 }}
        animate={{
          scale: isHovering ? 4 : 1, 
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <motion.span 
          className="z-10 text-[#213D7A] font-bold uppercase tracking-widest text-[10px] overflow-hidden whitespace-nowrap"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: isHovering ? 1 : 0,
          }}
          transition={{ duration: 0.2 }}
        >
          View
        </motion.span>
      </motion.div>
    </motion.div>
  );
};

export default CustomCursor;