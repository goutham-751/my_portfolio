import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaChartLine, FaBrain, FaDatabase } from 'react-icons/fa';
import { projects } from '../../data/projects';
import './Projects.css';

const Projects = () => {
  const getProjectIcon = (techStack) => {
    if (techStack.some(tech => tech.includes('Tableau') || tech.includes('Visualization'))) {
      return <FaChartLine />;
    } else if (techStack.some(tech => tech.includes('Neural') || tech.includes('ML'))) {
      return <FaBrain />;
    } else {
      return <FaDatabase />;
    }
  };

  return (
    <section className="projects" id="projects">
      <div className="projects-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          My Projects
        </motion.h2>
        <motion.p
          className="projects-intro"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
        >
          A collection of my data science and machine learning projects, showcasing my expertise in
          predictive modeling, natural language processing, and data visualization.
        </motion.p>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              className="project-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="project-image">
                <img src={project.image} alt={project.title} />
                <div className="project-icon">
                  {getProjectIcon(project.techStack)}
                </div>
              </div>
              <div className="project-content">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tech-stack">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaGithub /> Code
                  </a>
                  <a
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="project-link"
                  >
                    <FaExternalLinkAlt /> Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects; 