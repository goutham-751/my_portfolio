import React, { useRef } from 'react';
import './Projects.css';
import { projects } from '../../data/projects';

/**
 * Projects — 3D Edition
 * Cards use JavaScript mousemove for per-card dynamic tilt,
 * giving a more precise "following the cursor" feel than pure CSS.
 * On mobile the JS listener simply doesn't register (touch events
 * don't fire mousemove), and CSS handles a simple translateY instead.
 */
function ProjectCard({ project }) {
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;

    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2); // -1..1
    const dy     = (e.clientY - cy) / (rect.height / 2); // -1..1

    // Max tilt 8° horizontal, 5° vertical
    const rotY =  dx *  8;
    const rotX = -dy *  5;

    card.style.transform = `
      perspective(800px)
      rotateX(${rotX}deg)
      rotateY(${rotY}deg)
      translateZ(10px)
      translateY(-4px)
    `;
    // Dynamic glow shifts with cursor
    card.style.boxShadow = `
      ${-dx * 8}px ${-dy * 8}px 40px rgba(0,0,0,0.4),
      0 0 0 1px rgba(77, 255, 196, 0.12),
      ${dx * 12}px ${dy * 12}px 30px rgba(0,0,0,0.2)
    `;
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = '';
    card.style.boxShadow = '';
  };

  return (
    <a
      ref={cardRef}
      key={project.id}
      href={project.demoLink || project.githubLink}
      className="project-card reveal"
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--project-color': project.color }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="project-header">
        <span className="project-pill text-mono" style={{ color: project.color, borderColor: project.color }}>
          {project.subtitle || project.title}
        </span>
        <span className="project-card__icon text-display">{project.icon}</span>
      </div>
      <h3 className="project-card__title text-display">{project.title}</h3>
      <p className="project-card__desc text-body">{project.description}</p>
      <div className="project-stack text-mono">
        {project.techStack.map((t) => (
          <span key={t} className="project-stack__item">{t}</span>
        ))}
      </div>
      <span className="project-link text-mono" style={{ color: project.color }}>
        View Project <span>→</span>
      </span>
    </a>
  );
}

function Projects() {
  const projectList = projects.filter(p => p.id !== 4);

  return (
    <section className="projects" id="work">
      <div className="container">
        <p className="section-label reveal">02 ── SELECTED WORK</p>

        <div className="project-grid reveal-stagger">
          {projectList.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;