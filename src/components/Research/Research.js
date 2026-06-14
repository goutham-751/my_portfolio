import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import './Research.css';

const research = {
  title: 'CalibSSL: Reliability and Calibration of Self-Supervised Neural Networks on Tabular Data',
  status: 'Under Review (Springer)',
  abstract: 'Investigating why self-supervised models fail silently on tabular data — and fixing it through calibration-aware training objectives and entropy regularization.',
  contributions: [
    'Calibration-aware loss: cross-entropy + entropy-based confidence penalty to reduce overconfidence',
    'ViME (Value Imputation & Mask Estimation) for SSL pretraining on unlabeled tabular data',
    'Benchmarked against 6 baselines (RF, XGBoost, MLP variants) across 5 datasets',
    '5 label-scarcity settings (5%–100%) — 600+ total experiments',
    'Full statistical significance pipeline: paired t-tests, Wilcoxon, Friedman tests',
    'Publication-ready visualizations and reproducible experimental pipeline',
  ],
  tags: ['Self-Supervised Learning', 'Calibration', 'Tabular Data', 'PyTorch', 'Statistical Testing'],
  github: 'https://github.com/goutham-751/CalibSSL-Reliability-and-Calibration-of-Self-supervised-Neural-networks-on-Tabular-data-',
};

function Research() {
  return (
    <motion.section 
      className="research" 
      id="research"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>04 — RESEARCH</span>
        
        <motion.div variants={fadeUp} className="research__card">
          <div className="research__header">
            <span className="research__status text-mono">{research.status}</span>
          </div>
          
          <h3 className="research__title text-display">{research.title}</h3>
          
          <p className="research__abstract text-mono">{research.abstract}</p>
          
          <ul className="research__contributions text-body">
            {research.contributions.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
          
          <div className="research__tags text-mono">
            {research.tags.map((tag) => (
              <span key={tag} className="research__tag">{tag}</span>
            ))}
          </div>
          
          <a href={research.github} className="research__link text-mono" target="_blank" rel="noopener noreferrer">
            View Code <span>→</span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Research;
