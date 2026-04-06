import React from 'react';
import './Projects.css';
import { projects } from '../../data/projects';

function Projects() {
  const projectList = projects.filter(p => p.id !== 4);

  return (
    <section className="projects" id="work">
      <div className="container">
        <p className="section-label reveal">02 ── SELECTED WORK</p>

        <div className="project-grid reveal-stagger">
          {projectList.map((project) => (
            <a
              key={project.id}
              href={project.demoLink || project.githubLink}
              className="project-card reveal"
              target="_blank"
              rel="noopener noreferrer"
              style={{ '--project-color': project.color }}
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
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;