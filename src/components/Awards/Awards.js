import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import './Awards.css';
import { awards } from '../../data/projects';

function Awards() {
  return (
    <motion.section 
      className="awards" 
      id="awards"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>06 — AWARDS</span>
        
        <div className="awards-grid">
          {awards.map((award, idx) => (
            <motion.div key={idx} variants={fadeUp} className="award-card">
              <div className="award-card__glow" />
              <div className="award-card__inner">
                <div className="award-card__visual-anchor text-mono">
                  {award.title.includes('₹50,000') ? '₹50K' : 'AWARD'}
                </div>
                
                <div className="award-card__content">
                  <h3 className="award-card__title text-display">{award.title}</h3>
                  <div className="award-card__meta text-mono">
                    <span>{award.date}</span>
                    <span className="award-card__meta-sep">·</span>
                    <span>{award.awardedBy}</span>
                  </div>
                  
                  <p className="award-card__desc text-body">
                    <strong>{award.project}:</strong> {award.description}
                  </p>
                  
                  <div className="award-card__tags text-mono">
                    {award.tags?.map(tag => (
                      <span key={tag} className="award-card__tag">{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

export default Awards;
