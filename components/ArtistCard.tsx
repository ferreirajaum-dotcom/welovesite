/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React from 'react';
import { motion } from 'framer-motion';
import { Artist } from '../types';
import { ArrowUpRight } from 'lucide-react';

interface ArtistCardProps {
  artist: Artist;
  onClick: () => void;
}

const ArtistCard: React.FC<ArtistCardProps> = ({ artist, onClick }) => {
  return (
    <motion.div
      className="group relative h-[300px] md:h-[380px] w-full overflow-hidden border border-white/10 bg-[#28295c] rounded-2xl cursor-pointer shadow-lg"
      initial="rest"
      whileHover="hover"
      whileTap="hover"
      animate="rest"
      data-hover="true"
      onClick={onClick}
    >
      {/* Image Background with Zoom */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <motion.img 
          src={artist.image} 
          alt={artist.name} 
          className="h-full w-full object-cover grayscale will-change-transform"
          variants={{
            rest: { scale: 1, opacity: 0.7, filter: 'grayscale(100%)' },
            hover: { scale: 1.05, opacity: 0.9, filter: 'grayscale(0%)' }
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
        />
        <div className="absolute inset-0 bg-[#31326f]/30 group-hover:bg-[#637ab9]/20 transition-colors duration-500" />
      </div>

      {/* Overlay Info */}
      <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between pointer-events-none">
        <div className="flex justify-between items-start">
           <span className="text-xs font-mono border border-white/30 px-2 py-1 rounded-full backdrop-blur-md">
             {artist.day}
           </span>
           <motion.div
             variants={{
               rest: { opacity: 0, x: 20, y: -20 },
               hover: { opacity: 1, x: 0, y: 0 }
             }}
             className="bg-white text-black rounded-full p-2 will-change-transform"
           >
             <ArrowUpRight className="w-6 h-6" />
           </motion.div>
        </div>

        <div>
          <div className="overflow-hidden">
            <motion.h3 
              className="font-heading text-2xl md:text-3xl font-bold uppercase text-white mix-blend-normal drop-shadow-lg will-change-transform"
              variants={{
                rest: { y: 0 },
                hover: { y: -5 }
              }}
              transition={{ duration: 0.4 }}
            >
              {artist.name}
            </motion.h3>
          </div>
          <motion.p 
            className="text-xs md:text-sm font-medium uppercase tracking-widest text-[#a8fbd3] mt-2 will-change-transform drop-shadow-md"
            variants={{
              rest: { opacity: 0, y: 10 },
              hover: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {artist.genre}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export default ArtistCard;