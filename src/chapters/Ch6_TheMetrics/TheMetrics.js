import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';

const TheMetrics = () => {
  return (
    <section className="chapter chapter-padding flex-center" style={{ minHeight: '100vh' }}>
      <div className="grid-container" style={{ width: '100%' }}>
        <div style={{ gridColumn: '2 / 12', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          
          <MetricCounter label="AI Projects" target={15} suffix="+" />
          <MetricCounter label="Research Works" target={3} suffix="" />
          <MetricCounter label="Training Samples" target={500} suffix="K+" />
          <MetricCounter label="Hackathon Wins" target={1} suffix="" />
          
        </div>
      </div>
    </section>
  );
};

const MetricCounter = ({ label, target, suffix }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, target, {
        duration: 2,
        ease: [0.76, 0, 0.24, 1],
        onUpdate(value) {
          setCount(Math.floor(value));
        }
      });
      return () => controls.stop();
    }
  }, [isInView, target]);

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
      <div className="text-display text-huge" style={{ letterSpacing: '-0.05em' }}>
        {count}{suffix}
      </div>
      <div className="text-mono" style={{ color: 'var(--text-secondary)' }}>
        {label}
      </div>
    </div>
  );
};

export default TheMetrics;
