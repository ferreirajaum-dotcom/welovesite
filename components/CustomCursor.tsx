
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [isHovering, setIsHovering] = useState(false);
  
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400, mass: 0.1 }; 
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement;
      const clickable = target.closest('button') || 
                        target.closest('a') || 
                        target.closest('[data-hover="true"]') ||
                        target.tagName === 'INPUT' ||
                        target.tagName === 'TEXTAREA';
      setIsHovering(!!clickable);
    };

    window.addEventListener('mousemove', updateMousePosition, { passive: true });
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 z-[9999] pointer-events-none flex items-center justify-center hidden md:flex"
      style={{ x, y, translateX: '-50%', translateY: '-50%' }}
    >
      <motion.div
        className="rounded-full bg-[#E2BA3D] border border-white/20 shadow-xl opacity-80"
        animate={{
          scale: isHovering ? 2.5 : 1,
          backgroundColor: isHovering ? 'rgba(226, 186, 61, 0.4)' : '#E2BA3D',
        }}
        style={{ width: 14, height: 14 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      />
    </motion.div>
  );
};

export default CustomCursor;
