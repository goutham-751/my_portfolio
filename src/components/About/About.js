import React from 'react';
import { motion } from 'framer-motion';
import './About.css';

const About = () => {
  const skills = [
    { name: 'Machine Learning', level: 50 },
    { name: 'Data Analysis', level: 60 },
    { name: 'Python', level: 58 },
    { name: 'SQL', level: 52 },
    { name: 'Data Visualization', level: 56 },
    { name: 'Deep Learning', level: 30 }
  ];

  return (
    <section className="about" id="about">
      <div className="about-container">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          About Me
        </motion.h2>
        <div className="about-cards-grid">
          <motion.div
            className="about-card profile-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <img src={process.env.PUBLIC_URL + '/WhatsApp Image 2025-06-17 at 16.12.05_ad7fa56b.jpg'} alt="Goutham Kumar" className="about-profile-img large" />
            <h3 className="about-name">Goutham Kumar</h3>
            <p className="about-title">Data Scientist & Machine Learning Engineer</p>
            <div className="about-links professional">
              <a href="https://www.linkedin.com/in/goutham-kumar7" target="_blank" rel="noopener noreferrer" className="about-link linkedin">LinkedIn</a>
              <a href="https://github.com/goutham-751" target="_blank" rel="noopener noreferrer" className="about-link github">GitHub</a>
              <a href="mailto:kgoutham2k5@gmail.com" className="about-link gmail">Gmail</a>
            </div>
          </motion.div>
          <motion.div
            className="about-card about-text-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <p>
              Hi, I'm Goutham Kumar, an aspiring Data Scientist and Machine Learning Engineer with a passion for transforming complex data into actionable insights. My journey in data science has been driven by a deep curiosity about how machine learning can solve real-world problems and create meaningful impact.
            </p>
            <p>
              I specialize in developing predictive models, conducting thorough data analysis, and creating intuitive data visualizations. My projects span across various domains including customer behavior analysis, sentiment analysis, and healthcare predictions. I'm particularly interested in exploring the intersection of machine learning and business intelligence to drive data-driven decision making.
            </p>
            <p>
              As a continuous learner, I'm constantly expanding my knowledge in emerging technologies and methodologies in the field of data science. I believe in the power of data to tell stories and solve complex problems, and I'm excited to contribute to innovative solutions that make a difference.
            </p>
          </motion.div>
          <motion.div
            className="about-card skills-card"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3>Skills</h3>
            <ul className="skills-list">
              <li>Networking</li>
              <li>Data Analysis</li>
              <li>Machine Learning</li>
              <li>Deep Learning</li>
              <li>Python</li>
              <li>SQL</li>
              <li>Data Visualization</li>
              <li>Tableau</li>
              <li>Linux</li>
              <li>Cisco Routers & Switches</li>
              <li>Project Management</li>
              <li>Natural Language Processing</li>
              
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About; 