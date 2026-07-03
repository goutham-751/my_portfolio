import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkBackground = () => {
      // Get all dark sections
      const darkSections = document.querySelectorAll('#projects, #contact');
      const navbarY = 40; // Approximate vertical center of navbar
      
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
    checkBackground(); // Initial check
    return () => window.removeEventListener('scroll', checkBackground);
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const textColor = isDark ? '#F4F4F0' : 'var(--text-primary)';

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: 'var(--space-md) var(--space-lg)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      zIndex: 100,
      color: textColor,
      transition: 'color 0.3s ease',
      backdropFilter: 'blur(8px)',
      backgroundColor: isDark ? 'rgba(17,17,17,0.5)' : 'rgba(244,244,240,0.5)'
    }}>
      <div className="text-display" style={{ fontSize: '1.5rem', cursor: 'pointer' }} onClick={() => scrollTo('about')}>
        GK.
      </div>
      <div style={{ display: 'flex', gap: '2rem' }} className="text-mono">
        <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('about')}>About Me</span>
        <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('projects')}>Projects</span>
        <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('experience')}>Experience</span>
        <span style={{ cursor: 'pointer' }} onClick={() => scrollTo('research')}>Research Work</span>
        <span style={{ cursor: 'pointer', color: 'var(--accent-color)' }} onClick={() => scrollTo('contact')}>Contact</span>
      </div>
    </nav>
  );
};

export default Navbar;