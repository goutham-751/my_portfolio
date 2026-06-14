import React from 'react';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer } from '../../lib/animations';
import './About.css';

function About() {
  return (
    <motion.section 
      className="about" 
      id="about"
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
    >
      <div className="container">
        <span className="section-label" style={{ marginBottom: '1rem', display: 'block' }}>01 — ABOUT</span>

        <div className="about__split">
          <motion.div variants={fadeUp} className="about__bio">
            <p className="text-body about__bio-text">
              I'm Goutham — a CS and Data Science student at VIT Chennai,
              building at the edge of systems, ML, and product. I've analysed
              dose data at a nuclear research facility, shipped AI platforms
              people actually use, and won bounties for blockchain systems that
              solve real economic problems for gig workers.
            </p>
            <p className="text-body about__bio-text" style={{ marginTop: '1.5rem', marginBottom: '3rem' }}>
              I care about work that has stakes. Software that runs something
              important. Systems that hold.
            </p>

            {/* Education */}
            <div className="about__education">
              <h3 className="about__edu-title text-mono" style={{ fontSize: '13px', color: 'var(--color-text-secondary)', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                Education
              </h3>
              
              <div className="about__edu-row" style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-mono" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>B.Tech Computer Science (Data Science)</span>
                  <span className="text-mono" style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>2023 – 2027</span>
                </div>
                <span className="text-mono" style={{ fontSize: '14px', color: 'var(--color-accent)' }}>Vellore Institute of Technology, Chennai</span>
                <span className="text-mono" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>CGPA: 8.85 / 10</span>
              </div>

              <div className="about__edu-row" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="text-mono" style={{ fontSize: '16px', color: 'var(--color-text-primary)' }}>Higher Secondary (12th Grade)</span>
                  <span className="text-mono" style={{ fontSize: '13px', color: 'var(--color-text-tertiary)' }}>2022 – 2023</span>
                </div>
                <span className="text-mono" style={{ fontSize: '14px', color: 'var(--color-accent)' }}>Adhyapana School, Madurai</span>
                <span className="text-mono" style={{ fontSize: '14px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>Percentage: 94.2%</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

export default About;