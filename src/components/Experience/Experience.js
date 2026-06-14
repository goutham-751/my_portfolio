import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import './Experience.css';
import { experience } from '../../data/projects';

function Experience() {
  return (
    <motion.section 
      className="experience" 
      id="experience"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>02 — EXPERIENCE</span>
        
        <div className="experience-list">
          {experience.map((exp) => (
            <motion.div key={exp.id} variants={fadeUp} className="exp-card">
              <div className="exp-card__header">
                <div className="exp-card__role-org">
                  <h3 className="exp-card__role text-display">{exp.role}</h3>
                  <div className="exp-card__org text-mono">{exp.org}</div>
                  {exp.division && <div className="exp-card__division text-mono">{exp.division}</div>}
                </div>
                <div className="exp-card__meta text-mono">
                  <span className="exp-card__period">{exp.period}</span>
                  <span className="exp-card__location">{exp.location}</span>
                </div>
              </div>
              
              <ul className="exp-card__bullets text-body">
                {exp.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              
              <div className="exp-card__tags text-mono">
                {exp.tags.map(tag => (
                  <span key={tag} className="exp-card__tag">{tag}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Experience;
