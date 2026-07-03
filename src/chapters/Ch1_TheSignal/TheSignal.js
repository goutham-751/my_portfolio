import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TheSignal = () => {
  const containerRef = useRef(null);

  // We make the section 400vh tall to allow plenty of scrolling space
  // to sequence the animations.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // SEQUENCE 1: The Signal Line drops (0 -> 0.15)
  const lineHeight = useTransform(scrollYProgress, [0, 0.15], ['15%', '100%']);
  const lineOpacity = useTransform(scrollYProgress, [0, 0.1, 0.2, 0.25], [1, 1, 1, 0]);

  // SEQUENCE 2: Splinter into 3 branches (0.2 -> 0.35)
  const branchesOpacity = useTransform(scrollYProgress, [0.15, 0.2, 0.4, 0.45], [0, 1, 1, 0]);
  const branchSpread = useTransform(scrollYProgress, [0.2, 0.35], [0, 50]); // Spread pixels

  // TEXT 1: "Raw data is noise." (0.2 -> 0.4)
  const text1Opacity = useTransform(scrollYProgress, [0.2, 0.25, 0.35, 0.4], [0, 1, 1, 0]);
  const text1Y = useTransform(scrollYProgress, [0.2, 0.4], [20, -20]);

  // SEQUENCE 3: Merge back into node (0.45 -> 0.6)
  const nodeScale = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const nodeOpacity = useTransform(scrollYProgress, [0.4, 0.45, 0.65, 0.7], [0, 1, 1, 0]);

  // TEXT 2: "I build the systems that understand it." (0.45 -> 0.65)
  const text2Opacity = useTransform(scrollYProgress, [0.45, 0.5, 0.6, 0.65], [0, 1, 1, 0]);
  const text2Y = useTransform(scrollYProgress, [0.45, 0.65], [20, -20]);

  // SEQUENCE 4: Mask Reveal of Goutham Kumar (0.7 -> 1.0)
  const nameY = useTransform(scrollYProgress, [0.7, 0.9], ['100%', '0%']);
  const nameOpacity = useTransform(scrollYProgress, [0.7, 0.8], [0, 1]);

  return (
    <section ref={containerRef} style={{ height: '250vh', position: 'relative' }}>
      {/* Sticky viewport that holds the graphics */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }} className="flex-center">
        
        {/* The Initial Line */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            width: '1px',
            height: lineHeight,
            backgroundColor: 'var(--text-primary)',
            opacity: lineOpacity,
            transformOrigin: 'top center',
          }}
        />

        {/* The 3 Branches */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            opacity: branchesOpacity,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            width: '100px',
            height: '100px'
          }}
        >
          <motion.div style={{ width: '1px', height: '100%', backgroundColor: 'var(--text-primary)', x: useTransform(branchSpread, s => -s), rotate: -15, transformOrigin: 'top' }} />
          <motion.div style={{ width: '1px', height: '100%', backgroundColor: 'var(--text-primary)' }} />
          <motion.div style={{ width: '1px', height: '100%', backgroundColor: 'var(--text-primary)', x: branchSpread, rotate: 15, transformOrigin: 'top' }} />
        </motion.div>

        {/* Text 1 */}
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            opacity: text1Opacity,
            y: text1Y,
          }}
        >
          <h2 className="text-body text-secondary">Raw data is noise.</h2>
        </motion.div>

        {/* The Node (Grid/Box) */}
        <motion.div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: '12px',
            height: '12px',
            marginLeft: '-6px',
            marginTop: '-6px',
            backgroundColor: 'var(--text-primary)',
            opacity: nodeOpacity,
            scale: nodeScale,
          }}
        />

        {/* Text 2 */}
        <motion.div
          style={{
            position: 'absolute',
            top: '60%',
            opacity: text2Opacity,
            y: text2Y,
          }}
        >
          <h2 className="text-body text-primary" style={{ fontWeight: 500 }}>
            I build the systems that understand it.
          </h2>
        </motion.div>

        {/* The Name Reveal */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '10vh', // Rests near bottom to allow Chapter 2 to overlap naturally
            left: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            overflow: 'hidden', // The mask
            padding: '0 2rem',
          }}
        >
          <motion.h1 
            className="text-display text-massive"
            style={{ 
              y: nameY, 
              opacity: nameOpacity,
              textAlign: 'center',
              width: '100%'
            }}
          >
            GOUTHAM KUMAR
          </motion.h1>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            opacity: useTransform(scrollYProgress, [0, 0.05], [0.5, 0]),
          }}
          className="text-mono"
        >
          SCROLL
        </motion.div>
        
      </div>
    </section>
  );
};

export default TheSignal;
