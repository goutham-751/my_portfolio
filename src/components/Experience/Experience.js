import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { experience } from '../../data/projects';

const ExperienceNode = ({ job, index, totalNodes, smoothProgress }) => {
  const startThreshold = index / totalNodes;

  const nodeScale = useTransform(smoothProgress, [startThreshold, startThreshold + 0.1], [0.5, 1.5]);
  const nodeColor = useTransform(smoothProgress, [startThreshold, startThreshold + 0.1], ['var(--text-tertiary)', 'var(--accent-color)']);

  return (
    <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>

      {/* Neural Node */}
      <motion.div
        style={{
          position: 'absolute', left: '-4rem', top: '0.5rem',
          width: '12px', height: '12px', borderRadius: '50%',
          backgroundColor: nodeColor, scale: nodeScale,
          zIndex: 2, transform: 'translateX(-50%)'
        }}
      />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid var(--text-tertiary)', paddingBottom: '1rem' }}>
        <div>
          <h4 className="text-display text-xl">{job.role}</h4>
          <div className="text-mono" style={{ color: 'var(--accent-color)', marginTop: '0.5rem' }}>{job.company}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div className="text-mono">{job.period}</div>
          <div className="text-mono" style={{ color: 'var(--text-secondary)' }}>{job.location}</div>
        </div>
      </div>

      <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', paddingLeft: '0' }}>
        {job.bullets.map((bullet, i) => (
          <li key={i} className="text-body" style={{ display: 'flex', gap: '1rem' }}>
            <span style={{ color: 'var(--accent-color)' }}>+</span>
            <span>{bullet}</span>
          </li>
        ))}
      </ul>

    </div>
  );
};

const Experience = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const lineHeight = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  return (
    <section id="experience" ref={containerRef} className="chapter chapter-padding" style={{ backgroundColor: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="grid-container">

        {/* Header */}
        <div style={{ gridColumn: '2 / 12', marginBottom: 'var(--space-2xl)' }}>
          <h2 className="text-mono">03 — Experience</h2>
          <h3 className="text-display text-huge" style={{ marginTop: 'var(--space-sm)' }}>WORK HISTORY</h3>
        </div>

        <div style={{ gridColumn: '2 / 12', position: 'relative', paddingLeft: '4rem' }}>

          {/* Neural Timeline Line */}
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '15px', width: '2px', backgroundColor: 'var(--text-tertiary)' }} />
          <motion.div
            style={{
              position: 'absolute', top: 0, left: '15px', width: '2px',
              backgroundColor: 'var(--text-primary)', height: lineHeight, transformOrigin: 'top'
            }}
          />

          {/* Experience List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2xl)' }}>
            {experience.map((job, index) => (
              <ExperienceNode
                key={job.id}
                job={job}
                index={index}
                totalNodes={experience.length}
                smoothProgress={smoothProgress}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Experience;
