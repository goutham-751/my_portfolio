import React, { useState, useEffect } from 'react';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false); // Close mobile menu after clicking
    }
  };

  return (
    <>
      <div 
        className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-container">
          <div className="navbar-social-links">
            <a href="https://www.linkedin.com/in/goutham-kumar7" target="_blank" rel="noopener noreferrer" className="navbar-social-link linkedin">www.linkedin.com/in/goutham-kumar7</a>
            <a href="https://github.com/goutham-751" target="_blank" rel="noopener noreferrer" className="navbar-social-link github">@goutham-751</a>
            <a href="mailto:kgoutham2k5@gmail.com" className="navbar-social-link gmail">kgoutham2k5@gmail.com</a>
          </div>
          <div className={`nav-links ${isMobileMenuOpen ? 'mobile-open' : ''}`}>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}>Home</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              scrollToSection('about');
            }}>About</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              scrollToSection('projects');
            }}>Projects</a>
            <a href="#" onClick={(e) => {
              e.preventDefault();
              scrollToSection('contact');
            }}>Contact</a>
            <button className="theme-toggle" onClick={toggleDarkMode}>
              {darkMode ? <FaSun /> : <FaMoon />}
            </button>
          </div>
          <button 
            className="mobile-menu-toggle" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar; 