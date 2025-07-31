import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  return (
    <section className="contact" id="contact">
      <div className="contact-container">
        <div className="contact-social-links">
          <a href="https://www.linkedin.com/in/goutham-kumar7" target="_blank" rel="noopener noreferrer" className="contact-link linkedin" aria-label="LinkedIn">
            <FaLinkedin size={32} />
          </a>
          <a href="https://github.com/goutham-751" target="_blank" rel="noopener noreferrer" className="contact-link github" aria-label="GitHub">
            <FaGithub size={32} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact; 