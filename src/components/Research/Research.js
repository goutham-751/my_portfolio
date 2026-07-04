import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { research } from '../../data/projects';

const Research = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'center center']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scale = useTransform(smoothProgress, [0, 1], [0.8, 1]);
  const opacity = useTransform(smoothProgress, [0, 1], [0, 1]);
  const rotateX = useTransform(smoothProgress, [0, 1], [15, 0]);

  return (
    <section id="research" ref={containerRef} className="chapter chapter-padding" style={{ perspective: '1000px' }}>
      <div className="grid-container">

        {/* Header */}
        <div style={{ gridColumn: '2 / 12', marginBottom: 'var(--space-xl)' }}>
          <h2 className="text-mono">04 — Research</h2>
          <h3 className="text-display text-huge" style={{ marginTop: 'var(--space-sm)' }}>ACADEMIC WORK</h3>
        </div>

        {/* Research Content */}
        <div style={{ gridColumn: '2 / 12' }}>

          <motion.div
            style={{
              border: '1px solid var(--text-primary)',
              padding: 'var(--space-xl)',
              backgroundColor: 'var(--bg-secondary)',
              scale, opacity, rotateX,
              transformOrigin: 'bottom center',
              boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
            }}
          >
            <div className="text-mono" style={{ color: 'var(--accent-color)', marginBottom: 'var(--space-md)' }}>
              {research.period}
            </div>

            <h4 className="text-display text-xl" style={{ marginBottom: 'var(--space-lg)', lineHeight: '1.2' }}>
              {research.title}
            </h4>

            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {research.bullets.map((bullet, i) => (
                <li key={i} className="text-body text-lg" style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ color: 'var(--text-tertiary)' }}>—</span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default Research;
