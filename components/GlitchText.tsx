
import React from 'react';

interface GradientTextProps {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span';
  className?: string;
}

const GradientText: React.FC<GradientTextProps> = ({ text, as: Component = 'span', className = '' }) => {
  return (
    <Component className={`relative inline-block font-black tracking-tighter ${className}`}>
      <span className="text-[#213D7A]">
        {text}
      </span>
    </Component>
  );
};

export default GradientText;
