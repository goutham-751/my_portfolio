import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { philosophy } from '../../data/projects';

const TheObjective = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section ref={containerRef} style={{ height: `${philosophy.length * 100}vh`, position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        
        {philosophy.map((text, index) => {
          // Calculate the active window for each statement
          const start = index / philosophy.length;
          const end = (index + 1) / philosophy.length;
          const mid = (start + end) / 2;
          
          // Fade in and out
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const opacity = useTransform(scrollYProgress, [start, mid, end], [0, 1, 0]);
          // Slight upward drift
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const y = useTransform(scrollYProgress, [start, end], [50, -50]);

          return (
            <motion.div 
              key={index} 
              style={{ position: 'absolute', opacity, y, width: '100%', padding: '0 var(--space-xl)', textAlign: 'center' }}
            >
              <h2 className="text-display text-xl" style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {text}
              </h2>
            </motion.div>
          );
        })}
        
      </div>
    </section>
  );
};

export default TheObjective;
