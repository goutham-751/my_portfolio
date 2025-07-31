import React from 'react';
import { motion } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import './Home.css';

const Home = () => {
  const scrollToAbout = () => {
    const aboutSection = document.getElementById('about');
    aboutSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="home" id="home">
      <div className="home-content">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          Goutham Kumar
        </motion.h1>
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          Aspiring Data Scientist & Software Developer
        </motion.h2>
        <motion.div
          className="scroll-indicator"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          onClick={scrollToAbout}
        >
          <FaChevronDown />
        </motion.div>
      </div>
    </section>
  );
};

export default Home; 