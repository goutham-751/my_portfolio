import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import './Skills.css';
import { skills } from '../../data/projects';

function Skills() {
  const domains = [
    { label: 'Frameworks', key: 'frameworks' },
    { label: 'Libraries', key: 'libraries' },
    { label: 'Languages', key: 'languages' },
    { label: 'Developer Tools', key: 'tools' },
    { label: 'Databases', key: 'databases' },
    { label: 'Business Analytics Tools', key: 'analytics' },
  ];

  return (
    <motion.section 
      className="skills" 
      id="skills"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>05 — SKILLS</span>
        
        <div className="skills__grid">
          {domains.map((domain, idx) => (
            <motion.div key={domain.key} variants={fadeUp} className="skills__category">
              <h3 className="skills__category-title text-mono">{domain.label}</h3>
              <div className="skills__list">
                {skills[domain.key].map(skill => (
                  <span key={skill} className="skills__item text-mono">{skill}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Skills;
