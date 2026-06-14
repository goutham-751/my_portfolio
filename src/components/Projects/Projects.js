import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import './Projects.css';
import { projects } from '../../data/projects';

function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    cardRef.current.style.setProperty('--mouse-x', `${x}%`);
    cardRef.current.style.setProperty('--mouse-y', `${y}%`);
  };

  return (
    <motion.a
      variants={fadeUp}
      ref={cardRef}
      key={project.id}
      href={project.github}
      className="project-card"
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
    >
      <div className="project-header">
        <span className="project-pill text-mono">
          {project.label}
        </span>
        <span className="project-type text-mono">{project.type}</span>
      </div>
      <h3 className="project-card__title text-display">{project.title}</h3>
      <p className="project-card__desc text-body">{project.headline}</p>
      <ul className="project-card__bullets text-mono" style={{ paddingLeft: '1.2rem', marginTop: '1rem', color: 'var(--color-text-tertiary)', fontSize: '0.85rem' }}>
        {project.bullets.map((b, i) => (
          <li key={i} style={{ marginBottom: '0.25rem' }}>{b}</li>
        ))}
      </ul>
      <div className="project-stack text-mono">
        {project.stack.map((t) => (
          <span key={t} className="project-stack__item">{t}</span>
        ))}
      </div>
      <span className="project-link text-mono">
        View Project <span>→</span>
      </span>
    </motion.a>
  );
}

function Projects() {
  return (
    <motion.section 
      className="projects" 
      id="work"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>03 — PROJECTS</span>

        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Projects;