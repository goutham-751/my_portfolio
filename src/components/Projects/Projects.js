import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { projects } from '../../data/projects';

/* ── Individual Project Card ── */
const ProjectCard = ({ project, index, smoothProgress, totalProjects }) => {
  // Each card occupies an equal slice of the 0→1 progress range
  const segmentSize = 1 / totalProjects;
  const start = index * segmentSize;
  const mid = start + segmentSize * 0.3;
  
  // Card slides up from below and fades in
  const cardY = useTransform(smoothProgress, [start, mid], [120, 0]);
  const cardOpacity = useTransform(smoothProgress, [start, mid], [0, 1]);

  return (
    <motion.div
      style={{
        opacity: index === 0 ? 1 : cardOpacity,
        y: index === 0 ? 0 : cardY,
        marginBottom: 'var(--space-xl)',
      }}
    >
      <div style={{ 
        backgroundColor: '#1A1A1A', 
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: '16px', 
        padding: 'var(--space-lg)',
        display: 'grid', 
        gridTemplateColumns: '1fr 1.5fr', 
        gap: 'var(--space-lg)',
      }}>
        {/* Left: Meta */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
          <div className="text-mono" style={{ color: 'var(--accent-color)', fontSize: '0.8rem' }}>
            {String(index + 1).padStart(2, '0')} // {project.type}
          </div>
          <h4 className="text-display text-xl" style={{ lineHeight: 1.1 }}>
            {project.title}
          </h4>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: 'var(--space-sm)' }}>
            {project.stack.map(tech => (
              <span key={tech} className="text-mono" style={{ 
                color: 'var(--text-inverse-sec)', 
                border: '1px solid rgba(255,255,255,0.2)', 
                padding: '0.25rem 0.75rem', 
                borderRadius: '4px', 
                fontSize: '0.7rem' 
              }}>
                {tech}
              </span>
            ))}
          </div>

          {project.link && (
            <a 
              href={project.link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-mono" 
              style={{ 
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                color: '#111', backgroundColor: '#F4F4F0', 
                padding: '0.6rem 1.2rem',
                textDecoration: 'none', textTransform: 'none', 
                transition: 'all 0.2s ease', cursor: 'pointer',
                marginTop: 'var(--space-sm)',
                alignSelf: 'flex-start',
                fontSize: '0.85rem'
              }}
            >
              View Project ↗
            </a>
          )}
        </div>

        {/* Right: Bullets */}
        <div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', padding: 0 }}>
            {project.bullets.map((bullet, i) => (
              <li key={i} className="text-body" style={{ color: 'var(--text-inverse-sec)', display: 'flex', gap: '0.75rem', lineHeight: 1.5 }}>
                <span style={{ color: 'var(--accent-color)', flexShrink: 0 }}>+</span>
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main Projects Section ── */
const Projects = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 20, restDelta: 0.001 });

  return (
    <section 
      id="projects" 
      ref={containerRef} 
      style={{ 
        position: 'relative', 
        backgroundColor: 'var(--bg-dark)', 
        color: 'var(--text-inverse)',
        padding: 'var(--space-xl) 0 var(--space-2xl) 0'
      }}
    >
      <div className="grid-container">
        {/* Header */}
        <div style={{ gridColumn: '2 / 12', marginBottom: 'var(--space-xl)' }}>
          <h2 className="text-mono" style={{ color: 'var(--text-inverse-sec)' }}>02 — Projects</h2>
          <h3 className="text-display text-huge" style={{ marginTop: 'var(--space-sm)' }}>BUILT SYSTEMS</h3>
        </div>

        {/* Project Cards — simple vertical stack */}
        <div style={{ gridColumn: '2 / 12' }}>
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              totalProjects={projects.length}
              smoothProgress={smoothProgress}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;