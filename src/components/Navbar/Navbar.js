import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      const darkSections = document.querySelectorAll('#projects, #contact');
      const navbarY = 40; 
      
      let onDark = false;
      darkSections.forEach(section => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navbarY && rect.bottom >= navbarY) {
          onDark = true;
        }
      });
      setIsDark(onDark);
    };

    window.addEventListener('scroll', checkBackground, { passive: true });
    checkBackground();
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  const scrollTo = (id) => {
    setMenuOpen(false); // Close menu on click
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${isDark ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner">
        <button className="navbar__monogram" onClick={() => scrollTo('about')}>
          GK.
        </button>

        <div className="navbar__links">
          <button className="navbar__link" onClick={() => scrollTo('about')}>About Me</button>
          <span className="navbar__sep">/</span>
          <button className="navbar__link" onClick={() => scrollTo('projects')}>Projects</button>
          <span className="navbar__sep">/</span>
          <button className="navbar__link" onClick={() => scrollTo('experience')}>Experience</button>
          <span className="navbar__sep">/</span>
          <button className="navbar__link" onClick={() => scrollTo('research')}>Research Work</button>
          <span className="navbar__sep">/</span>
          <button className="navbar__link" style={{ color: 'var(--accent-color)' }} onClick={() => scrollTo('contact')}>Contact</button>
        </div>

        <button 
          className="navbar__menu-toggle" 
          onClick={() => setMenuOpen(true)}
        >
          MENU
        </button>
      </div>

      <div className={`navbar__overlay ${menuOpen ? 'open' : ''}`}>
        <button 
          className="navbar__overlay-close"
          onClick={() => setMenuOpen(false)}
        >
          CLOSE
        </button>
        <div className="navbar__overlay-links">
          <button className="navbar__overlay-link" onClick={() => scrollTo('about')}>ABOUT</button>
          <button className="navbar__overlay-link" onClick={() => scrollTo('projects')}>PROJECTS</button>
          <button className="navbar__overlay-link" onClick={() => scrollTo('experience')}>EXPERIENCE</button>
          <button className="navbar__overlay-link" onClick={() => scrollTo('research')}>RESEARCH</button>
          <button className="navbar__overlay-link" style={{ color: 'var(--accent-color)' }} onClick={() => scrollTo('contact')}>CONTACT</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;