import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '../../data/projects';

const TheWeights = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  // The Loss Curve SVG Path drawing
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="chapter chapter-padding" style={{ position: 'relative', minHeight: '150vh' }}>
      <div className="grid-container">
        
        {/* Header */}
        <div style={{ gridColumn: '2 / 12', marginBottom: '10vh' }}>
          <h2 className="text-mono">03 — The Weights</h2>
          <h3 className="text-display text-huge" style={{ marginTop: 'var(--space-md)' }}>TRAINING ITERATIONS</h3>
        </div>

        {/* The Loss Curve Graphic */}
        <div style={{ gridColumn: '2 / 5', position: 'relative' }}>
          <svg viewBox="0 0 100 800" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
            <path 
              d="M 50 0 Q 50 200, 10 400 T 90 800" 
              fill="transparent" 
              stroke="var(--text-tertiary)" 
              strokeWidth="1" 
              strokeDasharray="4 4"
            />
            <motion.path 
              d="M 50 0 Q 50 200, 10 400 T 90 800" 
              fill="transparent" 
              stroke="var(--text-primary)" 
              strokeWidth="2" 
              style={{ pathLength }}
            />
          </svg>
        </div>

        {/* Timeline Content */}
        <div style={{ gridColumn: '6 / 12', display: 'flex', flexDirection: 'column', gap: '20vh', paddingTop: '10vh' }}>
          {timeline.map((item, index) => (
            <TimelineItem key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

const TimelineItem = ({ item, index }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ['start 80%', 'center center'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [50, 0]);

  return (
    <motion.div ref={itemRef} style={{ opacity, y }} className="relative">
      <p className="text-mono" style={{ color: 'var(--accent-color)', marginBottom: 'var(--space-sm)' }}>
        {item.period}
      </p>
      <h4 className="text-display text-xl">{item.role}</h4>
      <p className="text-body text-secondary" style={{ marginTop: '0.5rem', marginBottom: 'var(--space-md)' }}>
        {item.org} — {item.location}
      </p>
      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
        {item.bullets.map((bullet, i) => (
          <li key={i} className="text-body" style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ color: 'var(--accent-color)' }}>+</span>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
};

export default TheWeights;
