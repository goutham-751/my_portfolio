import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { about } from '../../data/projects';

const AboutMe = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  // Name is always visible, but the subtitles and summary animate in
  const titleOpacity = useTransform(smoothProgress, [0.05, 0.3], [0, 1]);
  const frag1X = useTransform(smoothProgress, [0.05, 0.3], [-150, 0]);
  const frag2X = useTransform(smoothProgress, [0.05, 0.3], [150, 0]);
  
  const dividerWidth = useTransform(smoothProgress, [0.2, 0.45], ['0%', '100%']);
  
  const summaryOpacity = useTransform(smoothProgress, [0.3, 0.55], [0, 1]);
  const summaryY = useTransform(smoothProgress, [0.3, 0.55], [30, 0]);

  return (
    <section id="about" ref={containerRef} style={{ height: '120vh', position: 'relative', backgroundColor: 'var(--bg-primary)' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center' }}>

        <div className="grid-container" style={{ width: '100%' }}>
          <div style={{ gridColumn: '2 / 12', position: 'relative', zIndex: 5 }}>
            
            {/* Name — always visible, no animation needed */}
            <h1 
              className="text-display text-massive" 
              style={{ letterSpacing: '-0.05em', lineHeight: 0.85 }}
            >
              {about.name}
            </h1>
            
            {/* Title fragments slide in */}
            <div style={{ display: 'flex', gap: '2rem', marginTop: 'var(--space-sm)', flexWrap: 'wrap' }}>
              <motion.span className="text-display text-xl" style={{ opacity: titleOpacity, x: frag1X }}>
                FULL-STACK DEVELOPER.
              </motion.span>
              <motion.span className="text-display text-xl" style={{ color: 'var(--accent-color)', opacity: titleOpacity, x: frag2X }}>
                AI ENGINEER.
              </motion.span>
            </div>

            {/* Divider draws across */}
            <div style={{ overflow: 'hidden', margin: 'var(--space-lg) 0' }}>
              <motion.div style={{ width: dividerWidth, height: '1px', backgroundColor: 'var(--text-tertiary)' }} />
            </div>
            
            {/* Summary fades up */}
            <motion.p 
              className="text-body text-lg" 
              style={{ 
                maxWidth: '800px', lineHeight: '1.6',
                opacity: summaryOpacity, y: summaryY
              }}
            >
              {about.summary}
            </motion.p>
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutMe;