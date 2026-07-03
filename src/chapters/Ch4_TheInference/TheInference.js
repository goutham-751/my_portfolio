import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { projects } from '../../data/projects';

const TheInference = () => {
  const containerRef = useRef(null);

  // The total width depends on the number of projects. 
  // We want to scroll horizontally across all of them.
  // We make the section N * 100vh tall to allow for that much scrolling.
  const numProjects = projects.length;
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transform vertical scroll progress into horizontal translation
  // e.g., for 4 projects, we want to translate X from 0% to -75%
  const x = useTransform(scrollYProgress, [0, 1], ['0%', `-${(numProjects - 1) * 100}vw`]);

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: `${numProjects * 70}vh`, 
        position: 'relative',
        backgroundColor: 'var(--bg-dark)', 
        color: 'var(--text-inverse)'
      }}
    >
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          width: '100vw', 
          overflow: 'hidden' 
        }}
      >
        <motion.div 
          style={{ 
            x,
            display: 'flex',
            height: '100%',
            width: `${numProjects * 100}vw`
          }}
        >
          {projects.map((project, index) => (
            <ProjectExhibit key={project.id} project={project} index={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ProjectExhibit = ({ project, index }) => {
  return (
    <div style={{ width: '100vw', height: '100vh', padding: 'var(--space-2xl) var(--space-xl)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      
      <div className="grid-container" style={{ padding: 0 }}>
        
        {/* Meta Data */}
        <div style={{ gridColumn: '1 / 13', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--text-inverse-sec)', paddingBottom: 'var(--space-md)', marginBottom: 'var(--space-xl)' }}>
          <span className="text-mono" style={{ color: 'var(--text-inverse-sec)' }}>{String(index + 1).padStart(2, '0')} // {project.type}</span>
          <span className="text-mono" style={{ color: 'var(--text-inverse-sec)' }}>{project.label}</span>
        </div>

        {/* Left Column: Title & Headline */}
        <div style={{ gridColumn: '1 / 6' }}>
          <h2 className="text-display text-xl" style={{ marginBottom: 'var(--space-md)' }}>
            {project.title.split(':').map((part, i) => (
              <React.Fragment key={i}>
                {part}
                {i === 0 && <><br /><span style={{ color: 'var(--text-inverse-sec)' }}>:</span> </>}
              </React.Fragment>
            ))}
          </h2>
          <p className="text-body" style={{ color: 'var(--text-inverse-sec)', fontSize: '1.25rem' }}>
            {project.headline}
          </p>
        </div>

        {/* Right Column: Architecture Details */}
        <div style={{ gridColumn: '7 / 13' }}>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            {project.bullets.map((bullet, i) => (
              <li key={i} className="text-body" style={{ display: 'flex', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem' }}>
                <span style={{ color: 'var(--text-inverse-sec)', opacity: 0.5 }}>{String(i + 1).padStart(2, '0')}</span>
                {bullet}
              </li>
            ))}
          </ul>
          
          <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {project.stack.map(tech => (
              <span key={tech} className="text-mono" style={{ border: '1px solid var(--text-inverse-sec)', padding: '0.5rem 1rem', borderRadius: '4px' }}>
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
      
    </div>
  );
};

export default TheInference;
