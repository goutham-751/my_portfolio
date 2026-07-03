import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const TheFeedback = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  // Abstract equation morphing into the final call to action
  const equationOpacity = useTransform(scrollYProgress, [0.2, 0.6], [1, 0]);
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);
  const ctaScale = useTransform(scrollYProgress, [0.6, 1], [0.95, 1]);

  return (
    <section ref={containerRef} className="chapter" style={{ height: '150vh', backgroundColor: 'var(--bg-dark)', color: 'var(--text-inverse)', position: 'relative' }}>
      <div className="flex-center" style={{ position: 'sticky', top: 0, height: '100vh', flexDirection: 'column' }}>
        
        {/* The Equation */}
        <motion.div 
          style={{ position: 'absolute', opacity: equationOpacity }}
          className="text-mono"
        >
          f(x) = lim(x→∞) ∑ [ (Data × Logic) / Latency ]
        </motion.div>

        {/* The Final CTA */}
        <motion.div
          style={{ opacity: ctaOpacity, scale: ctaScale, textAlign: 'center' }}
        >
          <h1 className="text-display text-huge" style={{ marginBottom: 'var(--space-md)' }}>
            Let's build<br />something impossible.
          </h1>
          <a 
            href="mailto:goutham@example.com" 
            className="text-mono"
            style={{
              textDecoration: 'none',
              color: 'var(--text-inverse)',
              borderBottom: '1px solid var(--text-inverse)',
              paddingBottom: '4px'
            }}
          >
            INITIATE CONTACT
          </a>
        </motion.div>

      </div>
    </section>
  );
};

export default TheFeedback;
