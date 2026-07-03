import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const TheArchitecture = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // Smooth out the scroll progress for snapping effects
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Fragments: "Architect.", "Researcher.", "AI Engineer."
  // They start scattered and snap into a grid layout.
  
  // Architect (Starts top right)
  const archX = useTransform(smoothProgress, [0, 0.4, 0.5], ['50vw', '10vw', '0vw']);
  const archY = useTransform(smoothProgress, [0, 0.4, 0.5], ['-30vh', '0vh', '0vh']);
  const archOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  // Researcher (Starts bottom left)
  const resX = useTransform(smoothProgress, [0, 0.4, 0.5], ['-40vw', '-10vw', '0vw']);
  const resY = useTransform(smoothProgress, [0, 0.4, 0.5], ['30vh', '10vh', '0vh']);
  const resOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  // AI Engineer (Starts bottom right)
  const aiX = useTransform(smoothProgress, [0, 0.4, 0.5], ['40vw', '20vw', '0vw']);
  const aiY = useTransform(smoothProgress, [0, 0.4, 0.5], ['40vh', '20vh', '0vh']);
  const aiOpacity = useTransform(scrollYProgress, [0.2, 0.4], [0, 1]);

  // Final statement reveal
  const finalOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const finalY = useTransform(scrollYProgress, [0.6, 0.8], [20, 0]);

  // Mouse interaction for the "live" grid background using direct DOM mutation
  const bgRef = useRef(null);

  useEffect(() => {
    const updateMousePosition = (e) => {
      if (bgRef.current) {
        const x = (e.clientX / window.innerWidth) * -10;
        const y = (e.clientY / window.innerHeight) * -10;
        bgRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };
    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  return (
    <section ref={containerRef} style={{ height: '150vh', position: 'relative' }}>
      
      {/* Background Grid - Reactive to mouse */}
      <div 
        ref={bgRef}
        style={{
          position: 'absolute',
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundImage: 'radial-gradient(var(--text-tertiary) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
          opacity: 0.1,
          transition: 'transform 0.1s ease-out'
        }}
      />

      <div style={{ position: 'sticky', top: 0, height: '100vh', padding: 'var(--space-2xl) var(--space-lg)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        
        {/* The Grid layout for fragments */}
        <div className="grid-container" style={{ position: 'relative', height: '50vh' }}>
          
          <motion.div style={{ gridColumn: '2 / 6', opacity: archOpacity, x: archX, y: archY }}>
            <h2 className="text-xl">Architect.</h2>
            <div style={{ height: '1px', width: '100%', background: 'var(--text-primary)', marginTop: '1rem', opacity: 0.2 }} />
          </motion.div>

          <motion.div style={{ gridColumn: '8 / 12', marginTop: '10vh', opacity: resOpacity, x: resX, y: resY }}>
            <h2 className="text-xl text-secondary">Researcher.</h2>
            <div style={{ height: '1px', width: '100%', background: 'var(--text-primary)', marginTop: '1rem', opacity: 0.2 }} />
          </motion.div>

          <motion.div style={{ gridColumn: '3 / 9', marginTop: '20vh', opacity: aiOpacity, x: aiX, y: aiY }}>
            <h2 className="text-display text-huge">AI Engineer.</h2>
          </motion.div>
        
        </div>

        {/* Final Statement */}
        <motion.div 
          className="grid-container"
          style={{ 
            opacity: finalOpacity,
            y: finalY,
            marginTop: '10vh' 
          }}
        >
          <div style={{ gridColumn: '2 / 10' }}>
            <p className="text-body text-secondary" style={{ maxWidth: '600px' }}>
              An engineer bridging raw data and autonomous systems. 
              The stack is irrelevant. The architecture is everything.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default TheArchitecture;
